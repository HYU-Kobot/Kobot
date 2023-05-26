package com.hyu.kobot.application;

import com.hyu.kobot.domain.bot.Bot;
import com.hyu.kobot.domain.bot.Parameter;
import com.hyu.kobot.domain.bot.Strategy;
import com.hyu.kobot.domain.member.Member;
import com.hyu.kobot.domain.tradingKey.TradingKey;
import com.hyu.kobot.infra.UPBITClient;
import com.hyu.kobot.repository.BotRepository;
import com.hyu.kobot.repository.MemberRepository;
import com.hyu.kobot.repository.ParameterRepository;
import com.hyu.kobot.repository.TradingKeyRepository;
import com.hyu.kobot.ui.dto.AppMember;
import com.hyu.kobot.ui.dto.BotRequest;
import com.hyu.kobot.ui.dto.ParameterRequest;
import java.util.List;
import java.util.stream.Collectors;
import javax.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class BotService {

    private final BotRepository botRepository;

    private final MemberRepository memberRepository;

    private final ParameterRepository parameterRepository;

    private final TradingKeyRepository tradingKeyRepository;

    private final UPBITClient upbitClient;

    public void create(AppMember appMember, BotRequest botRequest) {
        Member member = memberRepository.findById(appMember.getPayload())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));

        TradingKey tradingKey = tradingKeyRepository.findByMember(member)
                .orElseThrow(() -> new IllegalArgumentException("트레이딩 키를 등록해주세요."));

        // price가 tradingKey로 보유하고 있는 자산보다 적은지 확인
        upbitClient.lookup(tradingKey);

        List<String> NameOfParams = getNameOfParams(botRequest);
        Strategy strategy = Strategy.from(botRequest.getStrategy(), NameOfParams);
        Bot savedBot = botRepository.save(
                new Bot(
                        botRequest.getName(),
                        member,
                        strategy,
                        botRequest.getPrice()
                ));
        List<Parameter> params = getParams(botRequest, savedBot);
        parameterRepository.saveAll(params);
    }

    private List<String> getNameOfParams(BotRequest botRequest) {
        return botRequest.getParameters().stream()
                .map(ParameterRequest::getName)
                .collect(Collectors.toList());
    }

    private List<Parameter> getParams(BotRequest botRequest, Bot savedBot) {
        return botRequest.getParameters().stream()
                .map(it -> new Parameter(it.getName(), it.getValue(), savedBot))
                .collect(Collectors.toList());
    }

    public void delete(AppMember appMember, Long botId) {
        Member member = memberRepository.findById(appMember.getPayload())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));

        Bot bot = botRepository.findById(botId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 봇입니다."));

        if (!bot.isOwner(member)) {
            throw new IllegalArgumentException("봇과 봇생성자가 일치하지 않습니다.");
        }

        botRepository.deleteById(botId);
    }
}
