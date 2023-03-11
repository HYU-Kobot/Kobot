package com.hyu.kobot.ui.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class TradingKeyRequest {

    private String market;
    private String username;
    private String accessKey;
    private String secretKey;
    private String other;
}
