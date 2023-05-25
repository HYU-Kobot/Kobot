package com.hyu.kobot.domain.bot;

import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class BotName {
    @Column(name = "nickname", nullable = false)
    private String value;

    public BotName(String value) {
        validateNull(value);
        validateLength(value);
        this.value = value;
    }

    private void validateNull(String value) {
        if (value == null) {
            throw new IllegalArgumentException("봇이름은 null일 수 없습니다.");
        }
    }

    private void validateLength(String value) {
        String trimmedValue = value.trim();
        if (trimmedValue.length() > 20 || trimmedValue.length() == 0) {
            throw new IllegalArgumentException("봇이름의 길이는 0자 초과 20자 이하이어야합니다.");
        }
    }
}
