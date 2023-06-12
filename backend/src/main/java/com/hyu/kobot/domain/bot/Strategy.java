package com.hyu.kobot.domain.bot;

import java.util.Arrays;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Strategy {

    BOLLINGER_BAND("bollingerband", List.of("upperMovingAverage", "lowerMovingAverage", "upperK", "lowerK")),
    ;

    private String name;
    private List<String> params;

    public static Strategy from(String strategyName, List<String> parameters) {
        return Arrays.stream(values())
                .filter(it -> it.name.equalsIgnoreCase(strategyName) && it.params.containsAll(parameters))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("전략이나 파라미터가 잘못되었습니다."));
    }
}
