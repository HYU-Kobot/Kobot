package com.hyu.kobot.domain.repository;

import static org.junit.jupiter.api.Assertions.*;

import com.hyu.kobot.domain.Chart;
import com.hyu.kobot.domain.Exchange;
import com.hyu.kobot.domain.Market;
import com.hyu.kobot.domain.TimeUnit;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
class ChartRepositoryTest {

    @Autowired
    private ChartRepository chartRepository;

    @Test
    void test() {
        Chart chart = chartRepository.save(
                new Chart(Exchange.UPBIT, Market.KRW_BTC, TimeUnit.MINUTE_1, LocalDateTime.now(), BigDecimal.ONE,
                        BigDecimal.ONE, BigDecimal.ONE, BigDecimal.ONE, BigDecimal.ONE, BigDecimal.ONE));

        System.out.println("chart = " + chart);
    }

}
