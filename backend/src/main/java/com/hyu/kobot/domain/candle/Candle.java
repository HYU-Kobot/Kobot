package com.hyu.kobot.domain.candle;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Candle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "exchange", nullable = false)
    @Enumerated(value = EnumType.STRING)
    private Exchange exchange;

    @Column(name = "market", nullable = false)
    @Enumerated(value = EnumType.STRING)
    private Market market;

    @Column(name = "time_unit", nullable = false)
    @Enumerated(value = EnumType.STRING)
    private TimeUnit timeUnit;

    @Column(name = "date_time_KST", nullable = false)
    private LocalDateTime dateTimeKST;

    @Column(name = "opening_price", nullable = false, precision = 30, scale = 10)
    private BigDecimal openingPrice;

    @Column(name = "high_price", nullable = false, precision = 30, scale = 10)
    private BigDecimal highPrice;

    @Column(name = "low_price", nullable = false, precision = 30, scale = 10)
    private BigDecimal lowPrice;

    @Column(name = "trade_price", nullable = false, precision = 30, scale = 10)
    private BigDecimal tradePrice;

    @Column(name = "acc_trade_price", nullable = false, precision = 30, scale = 10)
    private BigDecimal accTradePrice;

    @Column(name = "acc_trade_volume", nullable = false, precision = 30, scale = 10)
    private BigDecimal accTradeVolume;

    public Candle(
            Exchange exchange,
            Market market,
            TimeUnit timeUnit,
            LocalDateTime dateTimeKST,
            BigDecimal openingPrice,
            BigDecimal highPrice,
            BigDecimal lowPrice,
            BigDecimal tradePrice,
            BigDecimal accTradePrice,
            BigDecimal accTradeVolume
    ) {
        this(
                null,
                exchange,
                market,
                timeUnit,
                dateTimeKST,
                openingPrice,
                highPrice,
                lowPrice,
                tradePrice,
                accTradePrice,
                accTradeVolume
        );
    }

    public String getExchange() {
        return exchange.name();
    }

    public String getMarket() {
        return market.name();
    }

    public String getTimeUnit() {
        return timeUnit.name();
    }
}
