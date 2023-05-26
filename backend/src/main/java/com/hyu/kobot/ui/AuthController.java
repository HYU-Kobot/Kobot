package com.hyu.kobot.ui;

import com.hyu.kobot.application.AuthService;
import com.hyu.kobot.ui.dto.AccessTokenResponse;
import com.hyu.kobot.ui.dto.SignInRequest;
import com.hyu.kobot.ui.dto.SignUpRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping
    public ResponseEntity<Void> signUp(@RequestBody SignUpRequest signUpRequest) {
        authService.create(signUpRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/member")
    public ResponseEntity<AccessTokenResponse> signIn(@RequestBody SignInRequest signInRequest) {
        AccessTokenResponse response = authService.login(signInRequest);
        return ResponseEntity.ok(response);
    }
}
