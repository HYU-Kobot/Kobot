package com.hyu.kobot.infra;

import com.hyu.kobot.domain.auth.TradingKeyJwtTokenProvider;
import com.hyu.kobot.domain.tradingKey.TradingKey;
import com.hyu.kobot.ui.dto.AccountResponse;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class UPBITClient {

    public static final String UPBIT_URL = "https://api.upbit.com/v1/accounts";

    private final RestTemplate restTemplate;

    public UPBITClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void lookup(TradingKey tradingKey) {
        TradingKeyJwtTokenProvider tradingKeyToken = new TradingKeyJwtTokenProvider(
                tradingKey.getSecretKey());
        String token = tradingKeyToken.createToken(tradingKey.getAccessKey());

        HttpHeaders header = new HttpHeaders();
        header.setBearerAuth(token);

        HttpEntity<Void> entity = new HttpEntity<>(header);
        ResponseEntity<AccountResponse> response = restTemplate.exchange(UPBIT_URL, HttpMethod.GET, entity,
                AccountResponse.class);

        if (response.getStatusCode().equals(HttpStatus.BAD_REQUEST)) {
            throw new IllegalStateException("존재하지 않는 키입니다.");
        }
    }
}
