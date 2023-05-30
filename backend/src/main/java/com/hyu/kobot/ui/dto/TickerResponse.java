package com.hyu.kobot.ui.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.math.BigDecimal;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class TickerResponse {

    private String market;

    @JsonProperty(value = "trade_date")
    private String tradeDate;

    @JsonProperty(value = "trade_time")
    private String tradeTime;

    @JsonProperty(value = "trade_time_kst")
    private String tradeTimeKST;

    @JsonProperty(value = "trade_timestamp")
    private Long tradeTimeStamp;

    @JsonProperty(value = "opening_price")
    private BigDecimal openingPrice;

    @JsonProperty(value = "high_price")
    private BigDecimal highPrice;

    @JsonProperty(value = "low_price")
    private BigDecimal lowPrice;

    @JsonProperty(value = "trade_price")
    private BigDecimal tradePrice;

    @JsonProperty(value = "prev_closing_price")
    private BigDecimal prevClosingPrice;

    private String change;

    @JsonProperty(value = "change_price")
    private BigDecimal changePrice;

    @JsonProperty(value = "change_rate")
    private BigDecimal changeRate;

    @JsonProperty(value = "signed_change_price")
    private BigDecimal signedChangePrice;

    @JsonProperty(value = "signed_change_rate")
    private BigDecimal signedChangeRate;

    @JsonProperty(value = "trade_volume")
    private BigDecimal tradeVolume;

    @JsonProperty(value = "acc_trade_price")
    private BigDecimal accTradePrice;

    @JsonProperty(value = "acc_trade_price_24h")
    private BigDecimal accTradePrice24h;

    @JsonProperty(value = "acc_trade_volume")
    private BigDecimal accTradeVolume;

    @JsonProperty(value = "acc_trade_volume_24h")
    private BigDecimal accTradeVolume24h;

    @JsonProperty(value = "highest_52_week_price")
    private BigDecimal highest52WeekPrice;

    @JsonProperty(value = "highest_52_week_date")
    private String highest52WeekDate;

    @JsonProperty(value = "lowest_52_week_price")
    private BigDecimal lowest52WeekPrice;

    @JsonProperty(value = "lowest_52_week_date")
    private String lowest52WeekDate;

    private BigDecimal timeStamp;
}
