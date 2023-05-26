package com.hyu.kobot.ui;

import com.hyu.kobot.application.BotService;
import com.hyu.kobot.domain.bot.Bot;
import com.hyu.kobot.ui.dto.AppMember;
import com.hyu.kobot.ui.dto.BotRequest;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/bot")
public class BotController {

    private final BotService botService;

    @PostMapping
    public ResponseEntity<Void> create(@AuthenticationPrinciple AppMember appMember,
                                       @RequestBody BotRequest botRequest) {
        botService.create(appMember, botRequest);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{botId}")
    public ResponseEntity<Void> delete(@AuthenticationPrinciple AppMember appMember,
                                       @PathVariable Long botId) {
        botService.delete(appMember, botId);
        return ResponseEntity.ok().build();
    }
}
