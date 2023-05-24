package com.hyu.kobot.domain.bot.strategy;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
public class Strategy {
    @Id
    @Column(name = "strategy_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "strategy_name", nullable = false)
    @Enumerated(value = EnumType.STRING)
    private StrategyName strategyName;

    @OneToMany(mappedBy = "strategy", cascade = CascadeType.ALL)
    private List<Parameter> parameters = new ArrayList<>();

    public Strategy(
            StrategyName strategyName,
            List<Parameter> parameters
    ) {
        this(
                null,
                strategyName,
                parameters
        );
    }
}
