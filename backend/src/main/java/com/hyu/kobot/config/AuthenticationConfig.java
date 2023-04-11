package com.hyu.kobot.config;

import com.hyu.kobot.infra.JwtTokenProvider;
import com.hyu.kobot.ui.AuthenticationArgumentResolver;
import com.hyu.kobot.ui.AuthenticationInterceptor;
import java.util.List;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class AuthenticationConfig implements WebMvcConfigurer {

    private final JwtTokenProvider jwtTokenProvider;

    public AuthenticationConfig(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new AuthenticationInterceptor(jwtTokenProvider))
                .addPathPatterns("/**")
                .excludePathPatterns("/api/auth/**");
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(new AuthenticationArgumentResolver());
    }
}
