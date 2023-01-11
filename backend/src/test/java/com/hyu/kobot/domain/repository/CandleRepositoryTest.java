package com.hyu.kobot.domain.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.hyu.kobot.domain.Candle;
import com.hyu.kobot.domain.Exchange;
import com.hyu.kobot.domain.Market;
import com.hyu.kobot.domain.TimeUnit;
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
        Exchange expectedExchange = Exchange.UPBIT;
        Market expectedMarket = Market.KRW_BTC;
        TimeUnit expectedTimeUnit = TimeUnit.DAY;
        LocalDateTime expectedDateTimeKST = LocalDateTime.of(2023, 1, 1, 1, 1, 1);
        BigDecimal expectedOpeningPrice = BigDecimal.valueOf(1000);
        BigDecimal expectedHighPrice = BigDecimal.valueOf(1000);
        BigDecimal expectedLowPrice = BigDecimal.valueOf(1000);
        BigDecimal expectedTradePrice = BigDecimal.valueOf(1000);
        BigDecimal expectedAccTradePrice = BigDecimal.valueOf(1000);
        BigDecimal expectedAccTradeVolume = BigDecimal.valueOf(1000);
        Candle candle = candleRepository.save(
                new Candle(
                        expectedExchange,
                        expectedMarket,
                        expectedTimeUnit,
                        expectedDateTimeKST,
                        expectedOpeningPrice,
                        expectedHighPrice,
                        expectedLowPrice,
                        expectedTradePrice,
                        expectedAccTradePrice,
                        expectedAccTradeVolume
                )
        );

        List<Candle> foundCandles = candleRepository.findByExchangeAndMarketAndTimeUnit(
                Exchange.UPBIT, Market.KRW_BTC, TimeUnit.DAY);

        assertThat(candle).isEqualTo(foundCandles.get(0));
    }
}
