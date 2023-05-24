package com.hyu.kobot.domain.bot.strategy;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Getter
public class Parameter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "strategy_id")
    private Strategy strategy;

    @Column(name = "parameter_name")
    private String parameterName;

    public Parameter(
            Strategy strategy,
            String parameterName
    ) {
        this(
                null,
                strategy,
                parameterName
        );
    }
}
