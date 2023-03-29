package com.hyu.kobot.application;

import com.hyu.kobot.domain.auth.TradingKeyJwtTokenProvider;
import com.hyu.kobot.domain.candle.Market;
import com.hyu.kobot.domain.tradingKey.TradingKey;
import com.hyu.kobot.domain.member.Member;
import com.hyu.kobot.domain.member.Username;
import com.hyu.kobot.repository.TradingKeyRepository;
import com.hyu.kobot.repository.MemberRepository;
import com.hyu.kobot.ui.dto.TradingKeyRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Transactional
@RequiredArgsConstructor
@Service
public class TradingKeyService {
    private final MemberRepository memberRepository;

    private final TradingKeyRepository tradingKeyRepository;

    private final TradingKeyJwtTokenProvider tradingKeyJwtTokenProvider;

    public void create(TradingKeyRequest tradingKeyRequest){
        Member member = memberRepository.findByUsername(new Username(tradingKeyRequest.getUsername()))
                        .orElseThrow(()-> new IllegalStateException("DB에서 유저네임을 조회할 수 없습니다."));
        if(tradingKeyRepository.existsTradingKeyByMarketAndMemberAndAccessKey(Market.of(tradingKeyRequest.getMarket()),member,tradingKeyRequest.getAccessKey())){
            throw new IllegalStateException("이미 등록된 키입니다");
        }
        TradingKey tradingKey = new TradingKey(
                tradingKeyRequest.getMarket(),
                member,
                tradingKeyRequest.getAccessKey(),
                tradingKeyRequest.getSecretKey(),
                tradingKeyRequest.getOther()
        );
        tradingKeyRepository.save(tradingKey);
    }

    public boolean lookup(TradingKeyRequest tradingKeyRequest) throws IOException, InterruptedException {
        try{
            String url = "https://api.upbit.com/v1/accounts";
            tradingKeyJwtTokenProvider.ChangeTypeOfJwtTokenProvider(tradingKeyRequest.getSecretKey());
            String token = tradingKeyJwtTokenProvider.createToken(String.valueOf(tradingKeyRequest.getAccessKey()));

            RestTemplate restTemplate = new RestTemplate();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("accept", "application/json")
                    .header("Authorization", token)
                    .method("GET", HttpRequest.BodyPublishers.noBody())
                    .build();
            HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println(response.body());
            if(response.statusCode() == 200){
                return true;
            } else{
                return false;
            }
        } catch(IOException e){
            System.out.println(e.getMessage().toString());
            return false;
        } catch(InterruptedException e){
            System.out.println(e.getMessage().toString());
            return false;
        }
    }
}
