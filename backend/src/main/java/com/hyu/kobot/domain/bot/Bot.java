package com.hyu.kobot.domain.bot;

import com.hyu.kobot.domain.candle.Market;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "strategy", nullable = false)
    @Enumerated(value = EnumType.STRING)
    private Strategy strategy;

    @Column(name = "market", nullable = false)
    @Enumerated(value = EnumType.STRING)
    private Market market;

    @Column(name = "balance", nullable = false, precision = 30, scale = 10)
    private BigDecimal balance;

    public Bot(
            String name,
            Member member,
            Strategy strategy,
            Market market,
            BigDecimal balance
    ) {
        this(
                null,
                new Name(name),
                member,
                strategy,
                market,
                balance
        );
    }

    public boolean isOwner(Member member) {
        return this.member == member;
    }
}
