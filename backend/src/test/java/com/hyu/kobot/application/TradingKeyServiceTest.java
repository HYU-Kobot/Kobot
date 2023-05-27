package com.hyu.kobot.application;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;

import com.hyu.kobot.domain.candle.Market;
import com.hyu.kobot.domain.member.Member;
import com.hyu.kobot.domain.tradingKey.TradingKey;
import com.hyu.kobot.infra.JwtTokenProvider;
import com.hyu.kobot.infra.UPBITClient;
import com.hyu.kobot.repository.MemberRepository;
import com.hyu.kobot.repository.TradingKeyRepository;
import com.hyu.kobot.ui.dto.LoginMember;
import com.hyu.kobot.ui.dto.TradingKeyRequest;
import com.hyu.kobot.util.Encryptor;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@SpringBootTest
class TradingKeyServiceTest {

    @Autowired
    private TradingKeyService tradingKeyService;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private UPBITClient upbitClient;

    @Test
    void 존재하지_않는_회원이면_예외가_발생한다() {
        Member member = new Member("정지혁", "jihyeok1234", "qwer1234", new Encryptor());
        memberRepository.save(member);

        Member member2 = new Member("김민수", "minsu1234", "skap1321", new Encryptor());
        memberRepository.save(member2);

        LoginMember loginMember = new LoginMember(member2.getId());
        memberRepository.delete(member2);

        TradingKeyRequest tradingKeyRequest = new TradingKeyRequest("KRW_BTC",
                "XU0V9uMGegWVRxjxfErD6v2RIx2MN9QI9IvI4Pjk", "GdWQOYxaBpInHVqM19CxQFf7yNpDhfMzxa0LOZLf", null);

        assertThatThrownBy(() -> tradingKeyService.register(loginMember, tradingKeyRequest))
                .isInstanceOf(IllegalStateException.class)
                .hasMessage("존재하지 않는 유저입니다.");
    }
}
