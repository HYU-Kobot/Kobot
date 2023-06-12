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
public class BotRequest {

    private String name;

    private String market;

    private String strategy;

    private List<ParameterRequest> parameters;

    private BigDecimal price;

    private BigDecimal riskRate;

    private String timeFrame;
}
