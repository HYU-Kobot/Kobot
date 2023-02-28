package com.hyu.kobot.domain.member;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class Nickname {

    @Column(name = "nickname", nullable = false)
    private String value;

    public Nickname(String value) {
        validateNull(value);
        validateLength(value);
        this.value = value;
    }

    private void validateNull(String value) {
        if (value == null) {
            throw new IllegalArgumentException("이름은 null일 수 없습니다.");
        }
    }

    private void validateLength(String value) {
        String trimmedValue = value.trim();
        if (trimmedValue.length() > 20 || trimmedValue.length() == 0) {
            throw new IllegalArgumentException("이름의 길이는 0자 초과 20자 이하이어야합니다.");
        }
    }
}
