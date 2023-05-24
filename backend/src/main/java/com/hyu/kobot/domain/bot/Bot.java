package com.hyu.kobot.domain.bot;

import com.hyu.kobot.domain.member.Member;
import com.hyu.kobot.domain.bot.strategy.Strategy;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Bot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    private BotName botName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "strategy_id")
    private Strategy strategy;

    @Column(name = "balance", nullable = false, precision = 30, scale = 10)
    private BigDecimal balance;

    public Bot(
            BotName botName,
            Member member,
            Strategy strategy,
            BigDecimal balance
    ) {
        this(
                null,
                botName,
                member,
                strategy,
                balance
        );
    }
}
