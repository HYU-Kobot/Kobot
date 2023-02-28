package com.hyu.kobot.domain.member;

import com.hyu.kobot.domain.auth.Encryptor;
import javax.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class Password {

    private String value;

    private Password(String value) {
        this.value = value;
    }

    public static Password of(Encryptor encryptor, String value) {
        validateNull(value);
        validateLength(value);
        return new Password(encryptor.encrypt(value));
    }

    private static void validateNull(String value) {
        if (value == null) {
            throw new IllegalArgumentException("비밀번호는 null일 수 없습니다.");
        }
    }

    private static void validateLength(String value) {
        String trimmedValue = value.trim();
        if (trimmedValue.length() > 20 || trimmedValue.length() < 8) {
            throw new IllegalArgumentException("비밀번호의 길이는 8자 이상 20자 이하이어야합니다.");
        }
    }
}
