package com.hyu.kobot.ui;

import static org.hibernate.validator.internal.metadata.core.ConstraintHelper.PAYLOAD;

import com.hyu.kobot.ui.dto.AppMember;
import com.hyu.kobot.ui.dto.GuestMember;
import com.hyu.kobot.ui.dto.LoginMember;
import java.util.Objects;
import javax.servlet.http.HttpServletRequest;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

public class AuthenticationArgumentResolver implements HandlerMethodArgumentResolver {

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(AuthenticationPrinciple.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
                                  NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        HttpServletRequest request = webRequest.getNativeRequest(HttpServletRequest.class);
        validateNullRequest(request);
        return getAppMember(request);
    }

    private void validateNullRequest(HttpServletRequest request) {
        if (Objects.isNull(request)) {
            throw new IllegalStateException("request가 유효하지 않습니다.");
        }
    }

    private AppMember getAppMember(HttpServletRequest request) {
        if (Objects.isNull(request.getAttribute(PAYLOAD))) {
            return new GuestMember();
        }
        Long payload = Long.valueOf(String.valueOf(request.getAttribute(PAYLOAD)));
        return new LoginMember(payload);
    }
}
