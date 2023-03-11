package com.hyu.kobot.application;

import com.hyu.kobot.domain.auth.Encryptor;
import com.hyu.kobot.domain.member.Member;
import com.hyu.kobot.domain.tradingKey.TradingKey;
import com.hyu.kobot.repository.MemberRepository;
import com.hyu.kobot.repository.TradingKeyRepository;
import com.hyu.kobot.ui.dto.TradingKeyRequest;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

@SpringBootTest
class TradingKeyServiceTest {
    @Autowired
    private TradingKeyService tradingKeyService;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private TradingKeyRepository tradingKeyRepository;
    @Test
    void 올바른_키값을_입력하여_조회에_성공한다() throws IOException, InterruptedException {
        TradingKeyRequest tradingKeyRequest = new TradingKeyRequest("KRW_BTC","jihyeok1234","XU0V9uMGegWVRxjxfErD6v2RIx2MN9QI9IvI4Pjk","GdWQOYxaBpInHVqM19CxQFf7yNpDhfMzxa0LOZLf",null);
        assertThat(tradingKeyService.lookup(tradingKeyRequest)).isTrue();
    }
    @Test
    void 존재하지_않는_회원이면_예외가_발생한다() {
        Member member = new Member("정지혁", "jihyeok123", "qwer1234", new Encryptor());
        memberRepository.save(member);
        TradingKeyRequest tradingKeyRequest = new TradingKeyRequest("KRW_BTC","jihyeok1234","XU0V9uMGegWVRxjxfErD6v2RIx2MN9QI9IvI4Pjk","GdWQOYxaBpInHVqM19CxQFf7yNpDhfMzxa0LOZLf",null);
        assertThatThrownBy(() -> tradingKeyService.create(tradingKeyRequest))
                .isInstanceOf(IllegalStateException.class)
                .hasMessage("DB에서 유저네임을 조회할 수 없습니다.");
    }
    @Test
    void 이미_등록된_키값이면_예외가_발생한다() {
        Member member = new Member("정지혁", "jihyeok1234", "qwer1234", new Encryptor());
        memberRepository.save(member);
        TradingKeyRequest tradingKeyRequest = new TradingKeyRequest("KRW_BTC","jihyeok1234","XU0V9uMGegWVRxjxfErD6v2RIx2MN9QI9IvI4Pjk","GdWQOYxaBpInHVqM19CxQFf7yNpDhfMzxa0LOZLf",null);
        tradingKeyService.create(tradingKeyRequest);
        assertThatThrownBy(() -> tradingKeyService.create(tradingKeyRequest))
                .isInstanceOf(IllegalStateException.class)
                .hasMessage("이미 등록된 키입니다");
    }
    @Test
    void 존재하는_회원의_올바른_키값을_주면_DB에_저장한다() {
        Member member = new Member("정지혁", "jihyeok1234", "qwer1234", new Encryptor());
        memberRepository.save(member);
        TradingKeyRequest tradingKeyRequest = new TradingKeyRequest("KRW_BTC","jihyeok1234","XU0V9uMGegWVRxjxfErD6v2RIx2MN9QI9IvI4Pjk","GdWQOYxaBpInHVqM19CxQFf7yNpDhfMzxa0LOZLf",null);
        tradingKeyService.create(tradingKeyRequest);

        List<TradingKey> tradingKeys = tradingKeyRepository.findAll();

        Assertions.assertThat(tradingKeys).hasSize(1);

    }
}