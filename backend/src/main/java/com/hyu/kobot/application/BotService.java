package com.hyu.kobot.application;

import com.hyu.kobot.domain.bot.Bot;
import com.hyu.kobot.domain.bot.strategy.Strategy;
import com.hyu.kobot.domain.member.Member;
import com.hyu.kobot.domain.member.Username;
import com.hyu.kobot.repository.BotRepository;
import com.hyu.kobot.repository.MemberRepository;
import com.hyu.kobot.repository.StrategyRepository;
import com.hyu.kobot.ui.dto.AppMember;
import com.hyu.kobot.ui.dto.BotRequest;
import com.hyu.kobot.ui.dto.SignUpRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@RequiredArgsConstructor
@Transactional
@Service
public class BotService {
    private final BotRepository botRepository;

    private final MemberRepository memberRepository;

    private final StrategyRepository strategyRepository;

    public List<Strategy> showStrategy(){
        List<Strategy> strategies = strategyRepository.findAll();
        return strategies;
    }

    public List<Bot> fetchAllBotInfo(){
        List<Bot> allBotInfo = botRepository.findAll();
        return allBotInfo;
    }

    //request안의 봇 전략명이 없으면 err, parameter갯수 맞지않으면 err
    public void create(AppMember appMember, BotRequest botRequest) {
        botRepository.save();
    }

    public void delete(AppMember appMember, Long botId){
        Member member = memberRepository.findById(appMember.getPayload())
                .orElseThrow(() -> new EntityNotFoundException("DB에서 유저네임을 조회할 수 없습니다."));

        Bot bot = botRepository.findById(botId)
                .orElseThrow(() -> new EntityNotFoundException("존재하지 않는 botId입니다"));

        if (!bot.getMember().equals(member)) {
            throw new IllegalArgumentException("bot의 주인과 요청을 넣은 member가 일치하지 않습니다.");
        }

        botRepository.deleteById(botId);
    }
}
