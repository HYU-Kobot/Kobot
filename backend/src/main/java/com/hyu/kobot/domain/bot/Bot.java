package com.hyu.kobot.domain.bot;

import com.hyu.kobot.domain.candle.Market;
import com.hyu.kobot.domain.candle.TimeUnit;
import com.hyu.kobot.domain.member.Member;
import java.math.BigDecimal;
import javax.persistence.Column;
import javax.persistence.Embedded;
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
public class Bot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    private Name name;

    @OnDelete(action = OnDeleteAction.CASCADE)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(name = "strategy", nullable = false)
    @Enumerated(value = EnumType.STRING)
    private Strategy strategy;

    @Column(name = "market", nullable = false)
    @Enumerated(value = EnumType.STRING)
    private Market market;

    @Column(name = "time_unit", nullable = false)
    @Enumerated(value = EnumType.STRING)
    private TimeUnit timeUnit;

    @Column(name = "balance", nullable = false, precision = 30, scale = 10)
    private BigDecimal balance;

    @Column(name = "risk_rate", nullable = false)
    private BigDecimal riskRate;

    public Bot(
            String name,
            Member member,
            Strategy strategy,
            Market market,
            TimeUnit timeUnit,
            BigDecimal balance,
            BigDecimal riskRate
    ) {
        this(
                null,
                new Name(name),
                member,
                strategy,
                market,
                timeUnit,
                balance,
                riskRate
        );
    }

    public boolean isOwner(Member member) {
        return this.member == member;
    }
}
