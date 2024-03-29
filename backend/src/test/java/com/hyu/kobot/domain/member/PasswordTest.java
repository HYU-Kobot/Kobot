package com.hyu.kobot.domain.member;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.hyu.kobot.util.Encryptor;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

class PasswordTest {

    @ParameterizedTest
    @ValueSource(ints = {8, 20})
    void 비밀번호의_길이는_8이상_20이하_이다(int count) {
        String value = "a".repeat(count);

        Password password = Password.of(new Encryptor(), value);

        assertThat(password).isNotNull();
    }

    @Test
    void 비밀번호가_null이면_에외가_발생한다() {
        String value = null;

        assertThatThrownBy(() -> Password.of(new Encryptor(), value))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("비밀번호는 null일 수 없습니다.");
    }

    @ParameterizedTest
    @ValueSource(strings = {"aaaaaa", "aaaaaaa ", "aaaaaaaaaaaaaaaaaaaaa", " aaaaaaaaaaaaaaaaaaaaa",
            "aaaaaaaaaaaaaaaaaaaaa ", " ", "\n"})
    void 비밀번호의_양끝_공백을_제거하고_길이가_8미만_이거나_20자를_넘으면_예외가_발생한다(String password) {
        String value = password;

        assertThatThrownBy(() -> Password.of(new Encryptor(), value))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("비밀번호의 길이는 8자 이상 20자 이하이어야합니다.");
    }

    @Test
    void 비밀번호를_암호화_할_수_있다() {
        Encryptor encryptor = new Encryptor();
        Password password = Password.of(encryptor, "qwer1234");

        assertThat(password).isNotNull();
    }
}
