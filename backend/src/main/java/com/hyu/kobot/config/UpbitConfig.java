package com.hyu.kobot.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class UpbitConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

}