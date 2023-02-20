package com.hyu.kobot.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class MarketTest {

    @ParameterizedTest
    @ValueSource(strings = {"KRW_BTC", "krw_btc", "Krw_Btc"})
    void 종목을_찾을_수_있다() {
        Market expected = Market.KRW_BTC;
        Market actual = Market.of("KRW_BTC");

        assertThat(actual).isEqualTo(expected);
    }

    @ParameterizedTest
    @ValueSource(strings = {"KRW_BT", "KR_BTC", "R_BTC"})
    void 종목이_잘못되면_예외가_발생한다(String market) {
        assertThatThrownBy(() -> Market.of(market))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("종목을 찾을 수 없습니다.");
    }
}
