package com.hyu.kobot.application;

import com.hyu.kobot.domain.candle.Exchange;
import com.hyu.kobot.domain.member.Member;
import com.hyu.kobot.domain.tradingKey.TradingKey;
import com.hyu.kobot.infra.UPBITClient;
import com.hyu.kobot.repository.MemberRepository;
import com.hyu.kobot.repository.TradingKeyRepository;
import com.hyu.kobot.ui.dto.AppMember;
import com.hyu.kobot.ui.dto.TradingKeyRequest;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
public class TradingKeyService {

    private final MemberRepository memberRepository;

    private final TradingKeyRepository tradingKeyRepository;

    private final UPBITClient upbitClient;

    public void register(AppMember appMember, TradingKeyRequest tradingKeyRequest) {
        Member member = memberRepository.findById(appMember.getPayload())
                .orElseThrow(() -> new IllegalStateException("존재하지 않는 유저입니다."));

        if (tradingKeyRepository.existsTradingKeyByExchangeAndMemberAndAccessKey(
                Exchange.of(tradingKeyRequest.getExchange()),
                member, tradingKeyRequest.getAccessKey())) {
            throw new IllegalStateException("이미 등록된 키입니다");
        }

        TradingKey tradingKey = new TradingKey(
                tradingKeyRequest.getExchange(),
                member,
                tradingKeyRequest.getAccessKey(),
                tradingKeyRequest.getSecretKey(),
                tradingKeyRequest.getOther()
        );

        upbitClient.lookup(tradingKey);
        tradingKeyRepository.save(tradingKey);
    }
}
