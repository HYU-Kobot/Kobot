package com.hyu.kobot.ui.dto;

import com.hyu.kobot.domain.bot.strategy.Parameter;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class BotRequest {
    private String market;

    private String strategyName;

    private List<ParameterRequest> parameters;

}
