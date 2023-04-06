package com.hyu.kobot.application;

import com.hyu.kobot.domain.candle.Market;
import com.hyu.kobot.domain.member.Member;
import com.hyu.kobot.domain.tradingKey.TradingKey;
import com.hyu.kobot.infra.UPBITClient;
import com.hyu.kobot.repository.MemberRepository;
import com.hyu.kobot.repository.TradingKeyRepository;
import com.hyu.kobot.ui.dto.AppMember;
import com.hyu.kobot.ui.dto.TradingKeyRequest;
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

    public void register(AppMember appMember, TradingKeyRequest tradingKeyRequest){
        Member member = memberRepository.findById(appMember.getPayload())
                .orElseThrow(() -> new IllegalStateException("DB에서 유저네임을 조회할 수 없습니다."));

        if (tradingKeyRepository.existsTradingKeyByMarketAndMemberAndAccessKey(Market.of(tradingKeyRequest.getMarket()),
                member, tradingKeyRequest.getAccessKey())) {
            throw new IllegalStateException("이미 등록된 키입니다");
        }

        TradingKey tradingKey = new TradingKey(
                tradingKeyRequest.getMarket(),
                member,
                tradingKeyRequest.getAccessKey(),
                tradingKeyRequest.getSecretKey(),
                tradingKeyRequest.getOther()
        );
        upbitClient.lookup(tradingKey);

        tradingKeyRepository.save(tradingKey);
    }
}
