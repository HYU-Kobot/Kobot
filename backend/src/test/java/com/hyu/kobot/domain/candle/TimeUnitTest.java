package com.hyu.kobot.domain.candle;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

class TimeUnitTest {

    @ParameterizedTest
    @CsvSource(value = {"minutes, 1, MINUTE_1", "minutes, 5, MINUTE_5", "minutes, 15, MINUTE_15",
            "minutes, 30, MINUTE_30",
            "hours, 1, HOUR_1", "hours, 4, HOUR_4", "days, 1, DAY", "weeks, 1, WEEK", "months, 1, MONTH"})
    void 타임_프레임을_찾을_수_있다(String unit, int time, TimeUnit expected) {
        TimeUnit actual = TimeUnit.of(unit, time);

        assertThat(actual).isEqualTo(expected);
    }

    @ParameterizedTest
    @CsvSource(value = {"minte, 5", "minutes, 3", "hours, 2", "days, 2", "weeks, 2", "months,2"})
    void 시간_단위가_잘못되면_예외가_발생한다(String unit, int time) {
        assertThatThrownBy(() -> TimeUnit.of(unit, time))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("타임 프레임을 찾을 수 없습니다.");
    }
}
