package com.hyu.kobot.domain.tradingKey;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class TradingKeyEncryptorTest {

    @Autowired
    private TradingKeyEncryptor tradingKeyEncryptor;

    private String test_keystring = "$$$auto@trading!kobot$$$";

    private String test_encrypted = "Ds64qEbCCjxsG32Tk3vcpw8CvaConbSpKqikuDVCh+s=";

    @Test
    void AES256_암호화() {
        Assertions.assertThat(tradingKeyEncryptor.convertToDatabaseColumn(test_keystring))
                .isEqualTo(test_encrypted);
    }

    @Test
    void AES256_복호화() {
        Assertions.assertThat(tradingKeyEncryptor.convertToEntityAttribute(test_encrypted))
                .isEqualTo(test_keystring);
    }
}
