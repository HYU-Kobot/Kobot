package com.hyu.kobot.ui.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class OrderHistoryResponse {

    private String category;
    private String market;
    private BigDecimal amount;
    private LocalDateTime tradeDate;
    private BigDecimal price;
}
