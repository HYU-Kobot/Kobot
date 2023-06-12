package com.hyu.kobot.domain.candle;

import java.util.Arrays;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum TimeUnit {

    MINUTE_1("1minute"),
    MINUTE_5("5minute"),
    MINUTE_15("15minute"),
    MINUTE_30("30minute"),
    HOUR_1("hour"),
    HOUR_4("4hour"),
    DAY("day"),
    WEEK("week"),
    MONTH("month");

    private final String unit;

    public static TimeUnit of(String unit) {
        return Arrays.stream(values())
                .filter(it -> it.unit.equalsIgnoreCase(unit))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("타임 프레임을 찾을 수 없습니다."));
    }
}
