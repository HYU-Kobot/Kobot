package com.hyu.kobot.domain.order;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Category {

    SELL("SELL"),
    BUY("BUY");

    private String value;
}
