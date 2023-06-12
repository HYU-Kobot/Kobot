package com.hyu.kobot.domain.candle;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class ExchangeTest {

    @ParameterizedTest
    @ValueSource(strings = {"upbit", "UPBIT", "Upbit", "UpBit"})
    void 거래소를_찾을_수_있다() {
        Exchange expected = Exchange.UPBIT;
        Exchange actual = Exchange.of("upbit");

        assertThat(actual).isEqualTo(expected);
    }

    @ParameterizedTest
    @ValueSource(strings = {"upbi", "pbit", "up_bit"})
    void 종목이_잘못되면_예외가_발생한다(String exchange) {
        assertThatThrownBy(() -> Exchange.of(exchange))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("거래소를 찾을 수 없습니다.");
    }

}
