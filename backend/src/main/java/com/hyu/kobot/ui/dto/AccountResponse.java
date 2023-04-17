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
public class AccountResponse {

    private String currency;

    private BigDecimal balance;

    private BigDecimal locked;

    @JsonFormat(pattern = "avg_buy_price")
    private BigDecimal avgBuyPrice;

    @JsonFormat(pattern = "avg_buy_price_modified")
    private boolean avgBuyPriceModified;

    @JsonFormat(pattern = "unit_currency")
    private String unitCurrency;
}
