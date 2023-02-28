package com.hyu.kobot.application;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.hyu.kobot.domain.member.Member;
import com.hyu.kobot.repository.MemberRepository;
import com.hyu.kobot.ui.dto.SignUpRequest;
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
}
