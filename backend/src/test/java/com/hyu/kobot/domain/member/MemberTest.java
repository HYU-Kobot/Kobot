package com.hyu.kobot.domain.member;

import static org.assertj.core.api.Assertions.assertThat;

import com.hyu.kobot.util.Encryptor;
import org.junit.jupiter.api.Test;

class MemberTest {

    @Test
    void 회원을_생성할_수_있다() {
        Member member = new Member("조형래", "jhr1111", "qwer1234", new Encryptor());

        assertThat(member).isNotNull();
    }
}
