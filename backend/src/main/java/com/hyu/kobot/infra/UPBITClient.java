package com.hyu.kobot.infra;

import com.hyu.kobot.config.UpbitConfig;
import com.hyu.kobot.domain.auth.TradingKeyJwtTokenProvider;
import com.hyu.kobot.domain.tradingKey.TradingKey;
import com.hyu.kobot.ui.dto.AccountResponse;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Component
@Transactional
public class UPBITClient {

    public static final String UPBIT_URL = "https://api.upbit.com/v1/accounts";

    private final RestTemplate restTemplate;
    private final UpbitConfig upbitConfig;

    @Autowired
    public UPBITClient(RestTemplate restTemplate, UpbitConfig upbitConfig) {
        this.restTemplate = restTemplate;
        this.upbitConfig = upbitConfig;
    }

    public void lookup(TradingKey tradingKey) {
        TradingKeyJwtTokenProvider tradingKeyToken = new TradingKeyJwtTokenProvider(
                tradingKey.getSecretKey());

        Map<String,Object> claims = new HashMap<>();
        claims.put("access_key",tradingKey.getAccessKey());

        String token = tradingKeyToken.createToken(claims);

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
