package com.hyu.kobot.domain.bot;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class Name {

    @Column(name = "name", nullable = false)
    private String value;

    public Name(String value) {
        validateNull(value);
        validateLength(value);
        this.value = value;
    }

    private void validateNull(String value) {
        if (value == null) {
            throw new IllegalArgumentException("봇 이름은 null일 수 없습니다.");
        }
    }

    private void validateLength(String value) {
        String trimmedValue = value.trim();
        if (trimmedValue.length() > 20 || trimmedValue.length() == 0) {
            throw new IllegalArgumentException("봇 이름의 길이는 0자 초과 20자 이하이어야합니다.");
        }
    }
}
