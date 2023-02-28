package com.hyu.kobot.domain.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
class CandleRepositoryTest {

    @Autowired
    private CandleRepository candleRepository;

    @Test
    void 캔들을_조회할_수_있다() {
        Candle candle = candleRepository.save(
                new Candle(
                        Exchange.UPBIT,
                        Market.KRW_BTC,
                        TimeUnit.DAY,
                        LocalDateTime.of(2023, 1, 1, 1, 1, 1),
                        BigDecimal.valueOf(1000),
                        BigDecimal.valueOf(1000),
                        BigDecimal.valueOf(1000),
                        BigDecimal.valueOf(1000),
                        BigDecimal.valueOf(1000),
                        BigDecimal.valueOf(1000)
                )
        );

        List<Candle> foundCandles = candleRepository.findByExchangeAndMarketAndTimeUnit(
                Exchange.UPBIT, Market.KRW_BTC, TimeUnit.DAY);

        assertThat(candle).isEqualTo(foundCandles.get(0));
    }
}
