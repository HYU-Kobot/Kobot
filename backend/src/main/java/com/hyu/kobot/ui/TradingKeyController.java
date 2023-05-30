package com.hyu.kobot.ui;

import com.hyu.kobot.application.TradingKeyService;
import com.hyu.kobot.ui.dto.AppMember;
import com.hyu.kobot.ui.dto.TradingKeyRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class TradingKeyController {

    private final TradingKeyService tradingKeyService;

    @PostMapping("/key")
    public ResponseEntity<Void> addTradingKey(@AuthenticationPrinciple AppMember appMember,
                                              @RequestBody TradingKeyRequest tradingKeyRequest) {
        tradingKeyService.register(appMember, tradingKeyRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
