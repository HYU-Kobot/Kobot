package com.hyu.kobot.domain.candle;

import java.util.Arrays;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum TimeUnit {

    MINUTE_1("minutes", 1),
    MINUTE_5("minutes", 5),
    MINUTE_15("minutes", 15),
    MINUTE_30("minutes", 30),
    HOUR_1("hours", 1),
    HOUR_4("hours", 4),
    DAY("days", 1),
    WEEK("weeks", 1),
    MONTH("months", 1);

    private final String unit;
    private final int time;

    public static TimeUnit of(String unit, int time) {
        return Arrays.stream(values())
                .filter(it -> it.unit.equalsIgnoreCase(unit) && it.time == time)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("타임 프레임을 찾을 수 없습니다."));
    }
}
