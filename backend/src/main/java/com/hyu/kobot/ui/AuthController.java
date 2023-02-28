package com.hyu.kobot.ui;

import com.hyu.kobot.application.AuthService;
import com.hyu.kobot.ui.dto.AccessTokenResponse;
import com.hyu.kobot.ui.dto.SignInRequest;
import com.hyu.kobot.ui.dto.SignUpRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/member")
    public ResponseEntity<Void> signUp(@RequestBody SignUpRequest signUpRequest) {
        authService.create(signUpRequest);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/member")
    public ResponseEntity<AccessTokenResponse> signIn(@RequestBody SignInRequest signInRequest){
        AccessTokenResponse response = authService.login(signInRequest);
        return ResponseEntity.ok(response);
    }
}
