package com.hyu.kobot.domain;

import java.util.Arrays;

public enum Exchange {

    UPBIT;

    public static Exchange of(String exchange) {
        return Arrays.stream(values())
                .filter(it -> it.name().equalsIgnoreCase(exchange))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("거래소를 찾을 수 없습니다."));
    }
}
