package com.hyu.kobot.ui;

import static org.hibernate.validator.internal.metadata.core.ConstraintHelper.PAYLOAD;

import com.hyu.kobot.infra.JwtTokenProvider;
import com.hyu.kobot.util.TokenExtractor;
import java.util.Objects;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.HandlerInterceptor;

public class AuthenticationInterceptor implements HandlerInterceptor {

    private final JwtTokenProvider jwtTokenProvider;

    public AuthenticationInterceptor(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if (HttpMethod.OPTIONS.matches(request.getMethod())) {
            return true;
        }

        if (isGuest(request)) {
            return checkHttpMethod(request);
        }

        String accessToken = TokenExtractor.extract(request.getHeader(HttpHeaders.AUTHORIZATION));
        validateAccessToken(accessToken);
        String payload = jwtTokenProvider.getPayload(accessToken);
        request.setAttribute(PAYLOAD, payload);
        return true;
    }

    private boolean isGuest(HttpServletRequest request) {
        return Objects.isNull(request.getHeader(HttpHeaders.AUTHORIZATION));
    }

    private boolean checkHttpMethod(HttpServletRequest request) {
        if (HttpMethod.GET.matches(request.getMethod())) {
            return true;
        }
        throw new IllegalArgumentException("로그인을 해주세요.");
    }

    private void validateAccessToken(String accessToken) {
        if (!jwtTokenProvider.validateToken(accessToken)) {
            throw new IllegalArgumentException("유효하지 않습니다. 로그인 해주세요.");
        }
    }
}
