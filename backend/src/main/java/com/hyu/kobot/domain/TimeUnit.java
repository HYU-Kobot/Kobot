package com.hyu.kobot.domain;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.function.BiFunction;
import java.util.function.Supplier;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum TimeUnit {

    MINUTE_1("minutes", 1, LocalDateTime::minusMinutes),
    MINUTE_5("minutes", 5, (dateTime,period) -> dateTime.minusMinutes(5L * period)),
    MINUTE_15("minutes", 15, (dateTime,period) -> dateTime.minusMinutes(15L * period)),
    MINUTE_30("minutes", 30, (dateTime,period) -> dateTime.minusMinutes(30L * period)),
    HOUR_1("hours", 1, LocalDateTime::minusHours),
    HOUR_4("hours", 4, (dateTime,period) -> dateTime.minusMinutes(4L * period)),
    DAY("days", 1, LocalDateTime::minusDays),
    WEEK("weeks", 1, LocalDateTime::minusWeeks),
    MONTH("months", 1, LocalDateTime::minusMonths);

    private final String unit;
    private final int time;

    private final BiFunction<LocalDateTime, Integer, LocalDateTime> calcDateTimeBeforePeriod;

    public static TimeUnit of(String unit, int time) {
        return Arrays.stream(values())
                .filter(it -> it.unit.equalsIgnoreCase(unit) && it.time == time)
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("타임 프레임을 찾을 수 없습니다."));
    }

    public LocalDateTime calculate(LocalDateTime localDateTime, int period) {
        return this.calcDateTimeBeforePeriod.apply(localDateTime, period);
    }
}
