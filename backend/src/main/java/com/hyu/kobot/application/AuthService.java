package com.hyu.kobot.application;

import com.hyu.kobot.domain.auth.EncryptorInterface;
import com.hyu.kobot.domain.member.Username;
import com.hyu.kobot.domain.member.Member;
import com.hyu.kobot.repository.MemberRepository;
import com.hyu.kobot.ui.dto.SignUpRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthService {

    private final MemberRepository memberRepository;

    private final EncryptorInterface encryptor;

    public void create(SignUpRequest signUpRequest) {
        if (memberRepository.existsMemberByUsername(new Username(signUpRequest.getUsername()))) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }
        Member member = new Member(signUpRequest.getNickname(), signUpRequest.getUsername(), signUpRequest.getPassword(),
                encryptor);
        memberRepository.save(member);
    }
}
