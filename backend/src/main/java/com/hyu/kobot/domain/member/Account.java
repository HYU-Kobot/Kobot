package com.hyu.kobot.domain.member;

import javax.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class Account {

    private String value;

    public Account(String value) {
        validateNull(value);
        validateLength(value);
        this.value = value;
    }

    private void validateNull(String value) {
        if (value == null) {
            throw new IllegalArgumentException("아이디는 null일 수 없습니다.");
        }
    }

    private void validateLength(String value) {
        String trimmedValue = value.trim();
        if (trimmedValue.length() > 20 || trimmedValue.length() == 0) {
            throw new IllegalArgumentException("아이디의 길이는 0자 초과 20자 이하이어야합니다.");
        }
    }
}
