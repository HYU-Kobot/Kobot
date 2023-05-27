package com.hyu.kobot.ui.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
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

    @JsonFormat(pattern = "trade_date")
    private String tradeDate;

    @JsonFormat(pattern = "trade_time")
    private String tradeTime;

    @JsonFormat(pattern = "trade_time_kst")
    private String tradeTimeKST;

    @JsonFormat(pattern = "trade_timestamp")
    private BigDecimal tradeTimeStamp;

    @JsonFormat(pattern = "opening_price")
    private BigDecimal openingPrice;

    @JsonFormat(pattern = "high_price")
    private BigDecimal highPrice;

    @JsonFormat(pattern = "low_price")
    private BigDecimal lowPrice;

    @JsonFormat(pattern = "trade_price")
    private BigDecimal tradePrice;

    @JsonFormat(pattern = "prev_closing_price")
    private BigDecimal prevClosingPrice;

    private String change;

    @JsonFormat(pattern = "change_price")
    private BigDecimal changePrice;

    @JsonFormat(pattern = "change_rate")
    private BigDecimal changeRate;

    @JsonFormat(pattern = "signed_change_price")
    private BigDecimal signedChangePrice;

    @JsonFormat(pattern = "signed_change_rate")
    private BigDecimal signedChangeRate;

    @JsonFormat(pattern = "trade_volume")
    private BigDecimal tradeVolume;

    @JsonFormat(pattern = "acc_trade_price")
    private BigDecimal accTradePrice;

    @JsonFormat(pattern = "acc_trade_price_24h")
    private BigDecimal accTradePrice24h;

    @JsonFormat(pattern = "acc_trade_volume")
    private BigDecimal accTradeVolume;

    @JsonFormat(pattern = "acc_trade_volume_24h")
    private BigDecimal accTradeVolume24h;

    @JsonFormat(pattern = "highest_52_week_price")
    private BigDecimal highest52WeekPrice;

    @JsonFormat(pattern = "highest_52_week_date")
    private String highest52WeekDate;

    @JsonFormat(pattern = "lowest_52_week_price")
    private BigDecimal lowest52WeekPrice;

    @JsonFormat(pattern = "lowest_52_week_date")
    private String lowest52WeekDate;

    private BigDecimal timeStamp;
}
