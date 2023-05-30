package com.hyu.kobot.ui.dto;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class BotResponse {

    private Long botId;
    private String name;
    private String strategy;
    private String coinPair;
    private String timeFrame;
    private BigDecimal upperMovingAverage;
    private BigDecimal lowerMovingAverage;
    private BigDecimal upperK;
    private BigDecimal lowerK;
    private BigDecimal riskRate;
    private BigDecimal purchaseAmount; // 넣은 돈
    private BigDecimal netProfit; // 순이익
    private BigDecimal marketValue; // 미실현 수익
    private BigDecimal total; // 굴러간 돈
    private List<OrderHistoryResponse> orderHistory;

    public BotResponse(
            Long botId,
            String name,
            String strategy,
            String coinPair,
            String timeFrame,
            Map<String, BigDecimal> map,
            BigDecimal riskRate,
            BigDecimal purchaseAmount,
            BigDecimal netProfit,
            BigDecimal marketValue,
            BigDecimal total,
            List<OrderHistoryResponse> orderHistory
    ) {
        this.botId = botId;
        this.name = name;
        this.strategy = strategy;
        this.coinPair = coinPair;
        this.timeFrame = timeFrame;
        this.upperMovingAverage = map.get("upperMovingAverage");
        this.lowerMovingAverage = map.get("lowerMovingAverage");
        this.upperK = map.get("upperK");
        this.lowerK = map.get("lowerK");
        this.riskRate = riskRate;
        this.purchaseAmount = purchaseAmount;
        this.netProfit = netProfit;
        this.marketValue = marketValue;
        this.total = total;
        this.orderHistory = orderHistory;
    }
}
