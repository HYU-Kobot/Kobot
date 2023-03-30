package com.hyu.kobot.domain.tradingKey;

import com.hyu.kobot.application.TradingKeyService;
import com.hyu.kobot.domain.auth.Encryptor;
import com.hyu.kobot.domain.member.Member;
import com.hyu.kobot.domain.member.Username;
import com.hyu.kobot.repository.MemberRepository;
import com.hyu.kobot.repository.TradingKeyRepository;
import com.hyu.kobot.ui.dto.TradingKeyRequest;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
@SpringBootTest
class TradingKeyEncryptorTest {
    @Autowired
    private TradingKeyService tradingKeyService;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private TradingKeyRepository tradingKeyRepository;

    @Autowired
    private TradingKeyEncryptor tradingKeyEncryptor;

    @Value("${security.aes.encryption.test.keystring}")
    private String test_keystring;

    @Value("${security.aes.encryption.test.encrypted}")
    private String test_encrypted;

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
