package com.hyu.kobot.application;

import com.hyu.kobot.domain.auth.EncryptorInterface;
import com.hyu.kobot.domain.member.Member;
import com.hyu.kobot.repository.MemberRepository;
import com.hyu.kobot.ui.dto.SignUpRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MemberService {

    private final MemberRepository memberRepository;

    private final EncryptorInterface encryptor;

    public void create(SignUpRequest signUpRequest) {
        Member member = new Member(signUpRequest.getName(), signUpRequest.getId(), signUpRequest.getPassword(),
                encryptor);
        memberRepository.save(member);
    }
}
