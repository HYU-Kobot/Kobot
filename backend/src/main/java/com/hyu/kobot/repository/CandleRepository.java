package com.hyu.kobot.repository;

import com.hyu.kobot.domain.candle.Candle;
import com.hyu.kobot.domain.candle.Exchange;
import com.hyu.kobot.domain.candle.Market;
import com.hyu.kobot.domain.candle.TimeUnit;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandleRepository extends JpaRepository<Candle, Long> {

    List<Candle> findByExchangeAndMarketAndTimeUnit(Exchange exchange, Market market, TimeUnit timeUnit);
}
