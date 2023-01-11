package com.hyu.kobot.domain;

import java.util.Arrays;

public enum Market {

    KRW_BTC;

    public static Market of(String market) {
        return Arrays.stream(values())
                .filter(it -> it.name().equalsIgnoreCase(market))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("종목을 찾을 수 없습니다."));
    }
}
