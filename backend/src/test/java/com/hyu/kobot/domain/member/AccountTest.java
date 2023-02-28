package com.hyu.kobot.domain.member;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class AccountTest {

    @ValueSource(ints = {1, 20})
    @ParameterizedTest
    void 아이디의_길이는_1이상_20이하_이다(int count) {
        String value = "a".repeat(count);

        Account account = new Account(value);

        assertThat(account).isNotNull();
    }

    @Test
    void 아이디가_null이면_에외가_발생한다() {
        String value = null;

        assertThatThrownBy(() -> new Account(value))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("아이디는 null일 수 없습니다.");
    }

    @ValueSource(strings = {"aaaaaaaaaaaaaaaaaaaaa", " aaaaaaaaaaaaaaaaaaaaa", "aaaaaaaaaaaaaaaaaaaaa ", " ", "\n"})
    @ParameterizedTest
    void 아이디의_양끝_공백을_제거하고_길이가_0이거나_20자를_넘으면_예외가_발생한다(String account) {
        String value = account;

        assertThatThrownBy(() -> new Account(value))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("아이디의 길이는 0자 초과 20자 이하이어야합니다.");
    }
}
