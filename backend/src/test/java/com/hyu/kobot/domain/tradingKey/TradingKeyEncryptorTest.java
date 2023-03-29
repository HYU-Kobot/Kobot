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

    @Value("${security.aes.encryption.test.keystring}")
    private String test_encrypted;
    @Test
    void AES256_암호화(){
        //미완
        System.out.println(tradingKeyEncryptor.convertToDatabaseColumn(test_keystring));
    }
    @Test
    void 암호화에_성공한다() throws IOException, InterruptedException {
        Member member = new Member("정지혁", "jihyeok1234", "qwer1234", new Encryptor());
        memberRepository.save(member);
        TradingKeyRequest tradingKeyRequest = new TradingKeyRequest("KRW_BTC","jihyeok1234","XU0V9uMGegWVRxjxfErD6v2RIx2MN9QI9IvI4Pjk","GdWQOYxaBpInHVqM19CxQFf7yNpDhfMzxa0LOZLf",null);
        tradingKeyService.create(tradingKeyRequest);

        TradingKey tradingKey = tradingKeyRepository.findByMember(member).get();

        System.out.print(tradingKey.getAccessKey());
        //Assertions.assertThat(tradingKey.).isSameAs();
        //미완

    }
}
