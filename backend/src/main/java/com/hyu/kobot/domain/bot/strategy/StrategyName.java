package com.hyu.kobot.domain.bot.strategy;

import java.util.Arrays;

public enum StrategyName {
    BOLLINGER_BAND,
    MEAN_REVERSION;

    public static StrategyName of(String strategy){
        return Arrays.stream(values())
                .filter(it -> it.name().equalsIgnoreCase(strategy))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("전략을 찾을 수 없습니다."));
    }
}
