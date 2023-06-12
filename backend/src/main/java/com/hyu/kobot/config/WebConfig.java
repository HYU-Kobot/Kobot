package com.hyu.kobot.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private static final String ALLOWED_METHOD_NAMES = "GET,POST,PUT,DELETE,OPTIONS,PATCH";

    @Override
    public void addCorsMappings(final CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("https://www.kobot.kro.kr", "https://kobot.kro.kr", "http://localhost:3000")
                .allowCredentials(true)
                .allowedMethods(ALLOWED_METHOD_NAMES.split(","))
                .exposedHeaders("*");
    }
}

