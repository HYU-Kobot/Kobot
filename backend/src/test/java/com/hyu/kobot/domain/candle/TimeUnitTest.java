package com.hyu.kobot.domain.candle;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

class TimeUnitTest {

    @ParameterizedTest
    @CsvSource(value = {"1minute, MINUTE_1", "5minute, MINUTE_5", "15minute, MINUTE_15",
            "30minute, MINUTE_30",
            "hour, HOUR_1", "4hour, HOUR_4", "day, DAY", "week, WEEK", "month, MONTH"})
    void 타임_프레임을_찾을_수_있다(String unit, TimeUnit expected) {
        TimeUnit actual = TimeUnit.of(unit);

        assertThat(actual).isEqualTo(expected);
    }

    @ParameterizedTest
    @CsvSource(value = {"minte", "minutes", "hours", "days", "weeks", "months"})
    void 시간_단위가_잘못되면_예외가_발생한다(String unit) {
        assertThatThrownBy(() -> TimeUnit.of(unit))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("타임 프레임을 찾을 수 없습니다.");
    }
}
