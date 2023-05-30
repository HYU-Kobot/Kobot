package com.hyu.kobot.domain.candle;

import java.util.Arrays;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Market {

    KRW_BTC("BTCKRW");

    private final String value;

    public static Market of(String market) {
        return Arrays.stream(values())
                .filter(it -> it.name().equalsIgnoreCase(market))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("종목을 찾을 수 없습니다."));
    }
}
