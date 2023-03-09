package com.hyu.kobot.domain.auth;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;

class EncryptorTest {

    @Test
    void 비밀번호를_암호화한다() {
        Encryptor encryptor = new Encryptor();
        String password = "qwer1234";

        String encryptedPassword = encryptor.encrypt(password);

        String secondEncryptedPassword = encryptor.encrypt(password);
        assertThat(encryptedPassword).isEqualTo(secondEncryptedPassword);
    }

}
