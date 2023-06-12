package com.hyu.kobot.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.hyu.kobot.domain.member.Member;
import com.hyu.kobot.repository.MemberRepository;
import com.hyu.kobot.ui.dto.AccessTokenResponse;
import com.hyu.kobot.ui.dto.SignInRequest;
import com.hyu.kobot.ui.dto.SignUpRequest;
import com.hyu.kobot.util.Encryptor;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@SpringBootTest
class AuthServiceTest {

    @Autowired
    private AuthService authService;

    @Autowired
    private MemberRepository memberRepository;

    @Test
    void 회원을_생성한다() {
        SignUpRequest request = new SignUpRequest("조형래", "chohyeongrae", "qwer1234");
        authService.create(request);

        List<Member> members = memberRepository.findAll();

        assertThat(members).hasSize(1);
    }

    @Test
    void 다른_회원이_사용중인_아이디인_경우_예외가_발생한다() {
        SignUpRequest request = new SignUpRequest("조형래", "chohyeongrae", "qwer1234");
        authService.create(request);

        SignUpRequest otherRequest = new SignUpRequest("권순우", "chohyeongrae", "11112222");
        assertThatThrownBy(() -> authService.create(otherRequest))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessage("이미 존재하는 아이디입니다.");
    }

    @Test
    void 로그인_시_존재하지_않는_아이디이면_예외가_발생한다() {
        Member member = new Member("조형래", "jhr1111", "qwer1234", new Encryptor());
        memberRepository.save(member);

        SignInRequest signInRequest = new SignInRequest("abcd1111", "qwer1234");
        assertThatThrownBy(() -> authService.login(signInRequest))
                .isInstanceOf(IllegalStateException.class)
                .hasMessage("아이디를 확인해주세요.");
    }

    @Test
    void 로그인_시_비밀번호가_일치하지_않으면_예외가_발생한다() {
        Member member = new Member("조형래", "jhr1111", "qwer1234", new Encryptor());
        memberRepository.save(member);

        SignInRequest signInRequest = new SignInRequest("jhr1111", "qwer1233");
        assertThatThrownBy(() -> authService.login(signInRequest))
                .isInstanceOf(IllegalStateException.class)
                .hasMessage("비밀번호를 확인해주세요.");
    }

    @Test
    void 로그인에_성공하면_토큰을_발급한다() {
        Member member = new Member("조형래", "jhr1111", "qwer1234", new Encryptor());
        memberRepository.save(member);

        SignInRequest signInRequest = new SignInRequest("jhr1111", "qwer1234");
        AccessTokenResponse accessTokenResponse = authService.login(signInRequest);

        assertThat(accessTokenResponse).isNotNull();
    }
}
