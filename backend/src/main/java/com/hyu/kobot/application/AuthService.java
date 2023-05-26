
package com.hyu.kobot.application;

import com.hyu.kobot.domain.member.Member;
import com.hyu.kobot.domain.member.Password;
import com.hyu.kobot.domain.member.Username;
import com.hyu.kobot.infra.JwtTokenProvider;
import com.hyu.kobot.repository.MemberRepository;
import com.hyu.kobot.ui.dto.AccessTokenResponse;
import com.hyu.kobot.ui.dto.SignInRequest;
import com.hyu.kobot.ui.dto.SignUpRequest;
import com.hyu.kobot.util.EncryptorInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class AuthService {

    private final MemberRepository memberRepository;

    private final EncryptorInterface encryptor;

    private final JwtTokenProvider jwtTokenProvider;

    public void create(SignUpRequest signUpRequest) {
        if (memberRepository.existsMemberByUsername(new Username(signUpRequest.getUsername()))) {
            throw new IllegalArgumentException("이미 존재하는 아이디입니다.");
        }
        Member member = new Member(signUpRequest.getNickname(), signUpRequest.getUsername(),
                signUpRequest.getPassword(), encryptor);
        memberRepository.save(member);
    }

    public AccessTokenResponse login(SignInRequest signInRequest) {
        Member member = memberRepository.findByUsername(new Username(signInRequest.getUsername()))
                .orElseThrow(() -> new IllegalStateException("아이디를 확인해주세요."));
        Password encryptedPassword = Password.of(encryptor, signInRequest.getPassword());
        if (!member.hasPassword(encryptedPassword)) {
            throw new IllegalStateException("비밀번호를 확인해주세요.");
        }
        String token = jwtTokenProvider.createToken(String.valueOf(member.getId()));
        return new AccessTokenResponse(token);
    }
}
