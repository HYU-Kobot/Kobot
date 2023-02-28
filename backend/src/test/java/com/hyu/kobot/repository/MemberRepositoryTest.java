package com.hyu.kobot.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.hyu.kobot.domain.auth.Encryptor;
import com.hyu.kobot.domain.member.Member;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
class MemberRepositoryTest {

    @Autowired
    private MemberRepository memberRepository;

    @Test
    void 회원을_저장할_수_있다() {
        Member member = new Member("조형래", "jhr1111", "qwer1234", new Encryptor());

        Member savedMember = memberRepository.save(member);

        assertThat(savedMember).isSameAs(member);
    }
}
