package com.hyu.kobot.presentation.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ChartDataDTO {

    private String market;

    @JsonProperty(value = "candle_date_time_kst")
    private LocalDateTime dateTimeKST;

    @JsonProperty(value = "opening_price")
    private BigDecimal openingPrice;

    @JsonProperty(value = "high_price")
    private BigDecimal highPrice;

    @JsonProperty(value = "low_price")
    private BigDecimal lowPrice;

    @JsonProperty(value = "trade_price")
    private BigDecimal tradePrice;

    @JsonProperty(value = "candle_acc_trade_price")
    private BigDecimal accTradePrice;

    @JsonProperty(value = "candle_acc_trade_volume")
    private BigDecimal accTradeVolume;

    @Override
    public String toString() {
        return "ChartDataDTO{" +
                ", market='" + market + '\'' +
                ", dateTimeKST=" + dateTimeKST +
                ", openingPrice=" + openingPrice +
                ", highPrice=" + highPrice +
                ", lowPrice=" + lowPrice +
                ", tradePrice=" + tradePrice +
                ", accTradePrice=" + accTradePrice +
                ", accTradeVolume=" + accTradeVolume +
                '}';
    }
}
