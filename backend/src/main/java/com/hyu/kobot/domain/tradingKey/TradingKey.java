package com.hyu.kobot.domain.tradingKey;

import com.hyu.kobot.domain.candle.Exchange;
import com.hyu.kobot.domain.member.Member;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class TradingKey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "exchange", nullable = false)
    @Enumerated(value = EnumType.STRING)
    private Exchange exchange;

    @OnDelete(action = OnDeleteAction.CASCADE)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(name = "access_key", nullable = false)
    @Convert(converter = TradingKeyEncryptor.class)
    private String accessKey;

    @Column(name = "secret_key", nullable = false)
    @Convert(converter = TradingKeyEncryptor.class)
    private String secretKey;

    @Column(name = "other")
    private String other;

    public TradingKey(
            String exchange,
            Member member,
            String accessKey,
            String secretKey,
            String other
    ) {
        this(
                null,
                Exchange.of(exchange),
                member,
                accessKey,
                secretKey,
                other
        );
    }
}
