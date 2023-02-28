package com.hyu.kobot.application;

import static org.assertj.core.api.Assertions.assertThat;

import com.hyu.kobot.domain.member.Member;
import com.hyu.kobot.repository.MemberRepository;
import com.hyu.kobot.ui.dto.SignUpRequest;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class MemberServiceTest {

    @Autowired
    private MemberService memberService;

    @Autowired
    private MemberRepository memberRepository;

    @Test
    void 회원을_생성한다() {
        SignUpRequest request = new SignUpRequest("조형래", "chohyeongrae", "qwer1234");
        memberService.create(request);

        List<Member> members = memberRepository.findAll();

        assertThat(members).hasSize(1);
    }
}
