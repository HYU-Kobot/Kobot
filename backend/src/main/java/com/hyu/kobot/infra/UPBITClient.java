package com.hyu.kobot.infra;

import com.hyu.kobot.application.TokenProvider;
import com.hyu.kobot.domain.candle.Market;
import com.hyu.kobot.domain.tradingKey.TradingKey;
import com.hyu.kobot.ui.dto.AccountResponse;
import com.hyu.kobot.ui.dto.TickerResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@Component
@Transactional
public class UPBITClient {

    public static final String UPBIT_URL = "https://api.upbit.com/v1/accounts";

    private final RestTemplate restTemplate;

    @Autowired
    public UPBITClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }


    public TickerResponse getTicker(Market market) {
        ResponseEntity<TickerResponse> response = restTemplate.exchange(
                "https://api.upbit.com/v1/ticker?markets=KRW-BTC",
                HttpMethod.GET,
                new HttpEntity<>(new HttpHeaders()),
                TickerResponse.class
        );
        return response.getBody();
    }

    public AccountResponse getAccount(TradingKey tradingKey) {
        String token = createToken(tradingKey);

        HttpHeaders header = new HttpHeaders();
        header.setBearerAuth(token);

        HttpEntity<Void> entity = new HttpEntity<>(header);
        ResponseEntity<List<AccountResponse>> response = restTemplate.exchange(
                UPBIT_URL,
                HttpMethod.GET,
                entity,
                new ParameterizedTypeReference<>() {
                }
        );
        return response.getBody().get(0);
    }

    private String createToken(TradingKey tradingKey) {
        TokenProvider tradingKeyToken = new JwtTokenProvider(
                tradingKey.getSecretKey(), 1800000);

        Map<String, Object> claims = new HashMap<>();
        claims.put("access_key", tradingKey.getAccessKey());

        String token = tradingKeyToken.createToken(claims);
        return token;
    }
}
