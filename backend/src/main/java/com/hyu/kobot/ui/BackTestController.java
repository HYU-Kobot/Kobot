package com.hyu.kobot.ui;

import com.hyu.kobot.application.BackTestService;
import com.hyu.kobot.domain.Exchange;
import com.hyu.kobot.domain.Market;
import com.hyu.kobot.domain.TimeUnit;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@RequiredArgsConstructor
@RestController
public class BackTestController {

    private BackTestService backTestService;

    @GetMapping("/test ")
    public void test(@RequestParam Exchange exchange,
                     @RequestParam Market market,
                     @RequestParam TimeUnit timeUnit,
                     @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDateTime start,
                     @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd")LocalDateTime end,
                     @RequestParam Integer period,
                     @RequestParam Double sd) {
        System.out.printf("111111  ");
        backTestService.createBollingerBand(exchange, market, timeUnit, start, end, period, sd);
    }
}
