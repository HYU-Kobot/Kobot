package com.hyu.kobot.ui;

import com.hyu.kobot.application.MemberService;
import com.hyu.kobot.ui.dto.SignUpRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/member")
    public ResponseEntity<Void> signUp(@RequestBody SignUpRequest signUpRequest) {
        memberService.create(signUpRequest);
        return ResponseEntity.ok().build();
    }
}
