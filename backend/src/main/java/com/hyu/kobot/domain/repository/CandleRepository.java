package com.hyu.kobot.domain.repository;

import com.hyu.kobot.domain.Candle;
import com.hyu.kobot.domain.Exchange;
import com.hyu.kobot.domain.Market;
import com.hyu.kobot.domain.TimeUnit;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CandleRepository extends JpaRepository<Candle, Long> {

    List<Candle> findByExchangeAndMarketAndTimeUnit(Exchange exchange, Market market, TimeUnit timeUnit);
}
