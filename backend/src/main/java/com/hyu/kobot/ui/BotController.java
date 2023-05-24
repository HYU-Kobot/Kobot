package com.hyu.kobot.ui;

import com.hyu.kobot.application.BotService;
import com.hyu.kobot.domain.bot.Bot;
import com.hyu.kobot.ui.dto.AppMember;
import com.hyu.kobot.ui.dto.BotRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/bot")
public class BotController {

    private final BotService botService;
    @GetMapping("")
    public ResponseEntity<List<Bot>> getMyBotInfo() {
        List<Bot> body = botService.fetchAllBotInfo();
        return ResponseEntity.ok().body(body);
    }
    //봇 create, delete기능
    @PostMapping("")
    public ResponseEntity<Void> addBot(@AuthenticationPrinciple AppMember appMember,
                                       @RequestBody BotRequest botRequest) {
        botService.create(appMember, botRequest);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/{botId}")
    public ResponseEntity<Void> deleteBot(@AuthenticationPrinciple AppMember appMember,
                                          @PathVariable Long botId) {
        botService.delete(appMember, botId);
        return ResponseEntity.ok().build();
    }

    //봇 update(봇 명 변경, 봇 설정 변경)
    @PutMapping("/{botId}")
    public ResponseEntity<Void> updateBot(@AuthenticationPrinciple AppMember appMember,
                                          @PathVariable Long botId) {
        //
        return ResponseEntity.ok().build();
    }
}
