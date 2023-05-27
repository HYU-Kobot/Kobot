package com.hyu.kobot.ui.dto;

import java.math.BigDecimal;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class BotResponse {

    private Long botId;
    private BigDecimal purchaseAmount; // 넣은 돈
    private BigDecimal netProfit; // 순이익
    private BigDecimal marketValue; // 미실현 수익
    private BigDecimal total; // 굴러간 돈
    private List<OrderHistoryResponse> orderHistory;
}
