package com.hyu.kobot.domain.tradingKey;

import com.hyu.kobot.domain.candle.Market;
import com.hyu.kobot.domain.member.Member;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import javax.persistence.Id;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class TradingKey {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "market", nullable = false)
    @Enumerated(value = EnumType.STRING)
    private Market market;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "access_key", nullable = false)
    private String accessKey;

    @Column(name = "secret_key", nullable = false)
    private String secretKey;

    @Column(name = "other")
    private String other;

    public TradingKey(
            String market,
            Member member,
            String accessKey,
            String secretKey,
            String other
    ) {
        this(
                null,
                Market.of(market),
                member,
                accessKey,
                secretKey,
                other
        );
    }

    public String getMarket() {
        return market.name();
    }
}
