package com.hyu.kobot.repository;

import static org.assertj.core.api.Assertions.assertThat;

import com.hyu.kobot.domain.member.Member;
import com.hyu.kobot.domain.member.Username;
import com.hyu.kobot.util.Encryptor;
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

    @Test
    void 이미_유저네임이_존재하는_회원이_있는지_확인한다() {
        Member member = new Member("조형래", "jhr1111", "qwer1234", new Encryptor());
        memberRepository.save(member);

        boolean result = memberRepository.existsMemberByUsername(new Username("jhr1111"));

        assertThat(result).isTrue();
    }

    @Test
    void 회원_유저네임으로_회원을_조회한다() {
        Member member = new Member("조형래", "jhr1111", "qwer1234", new Encryptor());
        memberRepository.save(member);

        Member foundMember = memberRepository.findByUsername(new Username("jhr1111")).get();

        assertThat(foundMember).isSameAs(member);
    }
}
