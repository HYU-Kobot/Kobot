package com.hyu.kobot.domain.order;

import java.math.BigDecimal;
import java.util.List;

public class OrderHistories {

    private List<OrderHistory> value;

    public OrderHistories(List<OrderHistory> value) {
        this.value = value;
    }

    public BigDecimal calculateNetProfit() {
        return value.stream()
                .map(OrderHistory::calculatePrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public BigDecimal calculateCoinCount() {
        return value.stream()
                .map(OrderHistory::calculateCoinCount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
