package com.hyu.kobot.domain.member;

import com.hyu.kobot.domain.auth.Encryptor;
import javax.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class Password {

    private String value;

    public Password(String value) {
        validateNull(value);
        validateLength(value);
        this.value = value;
    }

    private void validateNull(String value) {
        if (value == null) {
            throw new IllegalArgumentException("비밀번호는 null일 수 없습니다.");
        }
    }

    private void validateLength(String value) {
        String trimmedValue = value.trim();
        if (trimmedValue.length() > 20 || trimmedValue.length() < 8) {
            throw new IllegalArgumentException("비밀번호의 길이는 8자 이상 20자 이하이어야합니다.");
        }
    }

    public String encrypt(Encryptor encryptor) {
        return encryptor.encrypt(value);
    }
}
