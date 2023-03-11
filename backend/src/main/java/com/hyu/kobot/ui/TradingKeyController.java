package com.hyu.kobot.ui;

import com.hyu.kobot.application.TradingKeyService;
import com.hyu.kobot.ui.dto.TradingKeyRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class TradingKeyController {

    private final TradingKeyService tradingKeyService;
    @GetMapping("/key")
    public ResponseEntity<Void> checkTradingKey(@RequestBody TradingKeyRequest tradingKeyRequest) throws IOException, InterruptedException {
        boolean validTradingKey = tradingKeyService.lookup(tradingKeyRequest);
        if (validTradingKey) {
            tradingKeyService.create(tradingKeyRequest);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

}
