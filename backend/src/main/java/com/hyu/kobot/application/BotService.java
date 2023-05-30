package com.hyu.kobot.application;

import com.hyu.kobot.domain.bot.Bot;
import com.hyu.kobot.domain.bot.Name;
import com.hyu.kobot.domain.bot.Parameter;
import com.hyu.kobot.domain.bot.Strategy;
import com.hyu.kobot.domain.candle.Market;
import com.hyu.kobot.domain.candle.TimeUnit;
import com.hyu.kobot.domain.member.Member;
import com.hyu.kobot.domain.order.OrderHistories;
import com.hyu.kobot.domain.order.OrderHistory;
import com.hyu.kobot.domain.tradingKey.TradingKey;
import com.hyu.kobot.infra.UPBITClient;
import com.hyu.kobot.repository.BotRepository;
import com.hyu.kobot.repository.MemberRepository;
import com.hyu.kobot.repository.OrderHistoryRepository;
import com.hyu.kobot.repository.ParameterRepository;
import com.hyu.kobot.repository.TradingKeyRepository;
import com.hyu.kobot.ui.dto.AccountResponse;
import com.hyu.kobot.ui.dto.AppMember;
import com.hyu.kobot.ui.dto.BotRequest;
import com.hyu.kobot.ui.dto.BotResponse;
import com.hyu.kobot.ui.dto.BotsResponse;
import com.hyu.kobot.ui.dto.OrderHistoryResponse;
import com.hyu.kobot.ui.dto.ParameterRequest;
import com.hyu.kobot.ui.dto.TickerResponse;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
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

    private final OrderHistoryRepository orderHistoryRepository;

    private final UPBITClient upbitClient;

    public void create(AppMember appMember, BotRequest botRequest) {
        Member member = memberRepository.findById(appMember.getPayload())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));

        TradingKey tradingKey = tradingKeyRepository.findByMember(member)
                .orElseThrow(() -> new IllegalArgumentException("트레이딩 키를 등록해주세요."));

        boolean isExist = botRepository.existsByMemberAndName(member, new Name(botRequest.getName()));
        if (isExist) {
            throw new IllegalArgumentException("이미 존재하는 봇 이름입니다.");
        }

        AccountResponse account = upbitClient.getAccount(tradingKey);
        if (account.getBalance().compareTo(botRequest.getPrice()) < 0) {
            throw new IllegalArgumentException("돈이 부족합니다.");
        }

        List<String> NameOfParams = getNameOfParams(botRequest);
        Strategy strategy = Strategy.from(botRequest.getStrategy(), NameOfParams);
        Market market = Market.of(botRequest.getMarket());
        TimeUnit timeUnit = TimeUnit.of(botRequest.getTimeFrame());
        Bot savedBot = botRepository.save(
                new Bot(
                        botRequest.getName(),
                        member,
                        strategy,
                        market,
                        timeUnit,
                        botRequest.getPrice(),
                        botRequest.getRiskRate()
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

    @Transactional(readOnly = true)
    public BotsResponse getAll(AppMember appMember) {
        Member member = memberRepository.findById(appMember.getPayload())
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 유저입니다."));

        List<Bot> bots = botRepository.findAllByMember(member);
        List<BotResponse> botResponses = new ArrayList<>();
        BigDecimal purchaseAmountSum = BigDecimal.ZERO;
        BigDecimal netProfitSum = BigDecimal.ZERO;
        BigDecimal marketValueSum = BigDecimal.ZERO;
        BigDecimal totalSum = BigDecimal.ZERO;

        for (Bot bot : bots) {
            List<OrderHistory> orderHistoryList = orderHistoryRepository.findByBot(bot);
            OrderHistories orderHistories = new OrderHistories(orderHistoryList);
            BigDecimal netProfit = orderHistories.calculateNetProfit(); // 순이익
            TickerResponse ticker = upbitClient.getTicker(Market.KRW_BTC);
            BigDecimal nowTradePrice = ticker.getTradePrice();
            BigDecimal marketValue = orderHistories.calculateCoinCount()
                    .multiply(nowTradePrice); // 미실현 수익 -> 현재 보유 코인 * 지금 현재 코인 가격
            BigDecimal total = bot.getBalance().add(netProfit); // 굴러간돈 -> 넣은돈 + 순이익
            purchaseAmountSum = purchaseAmountSum.add(bot.getBalance());
            netProfitSum = netProfitSum.add(netProfit);
            marketValueSum = marketValueSum.add(marketValue);
            totalSum = totalSum.add(total);
            List<Parameter> parameters = parameterRepository.findByBot(bot);
            Map<String, BigDecimal> parameterMap = parameters.stream()
                    .collect(Collectors.toMap(Parameter::getName, Parameter::getValue));
            BotResponse botResponse = new BotResponse(
                    bot.getId(),
                    bot.getName().getValue(),
                    bot.getStrategy().getName(),
                    bot.getMarket().name(),
                    bot.getTimeUnit().getUnit(),
                    parameterMap,
                    bot.getRiskRate(),
                    bot.getBalance(),
                    netProfit,
                    marketValue,
                    total,
                    getOrderHistoryResponse(orderHistoryList)
            );
            botResponses.add(botResponse);
        }
        TradingKey tradingKey = tradingKeyRepository.findByMember(member)
                .orElseThrow(() -> new IllegalArgumentException("트레이딩 키를 등록해주세요."));
        AccountResponse account = upbitClient.getAccount(tradingKey);
        return new BotsResponse(account.getBalance(), purchaseAmountSum, netProfitSum, marketValueSum, totalSum,
                botResponses);
    }

    public List<OrderHistoryResponse> getOrderHistoryResponse(List<OrderHistory> orderHistories) {
        return orderHistories.stream()
                .map(it -> new OrderHistoryResponse(it.getCategory().getValue(), it.getMarket().getValue(),
                        it.getAmount(), it.getTradeDate(), it.getPrice()))
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
