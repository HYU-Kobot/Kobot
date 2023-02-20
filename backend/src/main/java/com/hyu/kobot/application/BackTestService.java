package com.hyu.kobot.application;

import com.hyu.kobot.application.dto.returnDto;
import com.hyu.kobot.domain.Candle;
import com.hyu.kobot.domain.Exchange;
import com.hyu.kobot.domain.Market;
import com.hyu.kobot.domain.TimeUnit;
import com.hyu.kobot.domain.repository.CandleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.MathContext;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class BackTestService {

    private CandleRepository candleRepository;

    public List<returnDto> createBollingerBand(
            Exchange exchange,
            Market market,
            TimeUnit timeUnit,
            LocalDateTime start,
            LocalDateTime end,
            Integer period,
            Double standardDeviation) {
        Candle existFirstCandle = candleRepository.findTopByExchangeAndMarketAndTimeUnitOrderByDateTimeKSTAsc(exchange,market,timeUnit);
        LocalDateTime calculatedDateTime = timeUnit.calculate(start, period);
        if (existFirstCandle.HasDateTimeAfter(calculatedDateTime)) {
            throw new IllegalArgumentException("기간이 잘못되었습니다.");
        }
        List<Candle> candles = candleRepository.findAllByExchangeAndMarketAndTimeUnitAndDateTimeKSTBetweenOrderByDateTimeKSTDesc(exchange, market, timeUnit, calculatedDateTime, end);
        List<BigDecimal> truePrices = candles.stream()
                .map(Candle::calculateTruePrice)
                .collect(Collectors.toList());//원하는 1분봉 백테스트 기간 : 20분~119분. size 100 0~19분

        List<BigDecimal> bollingerUpper = new ArrayList<>();
        List<BigDecimal> bollingerLower = new ArrayList<>();
        List<BigDecimal> movingAverage = new ArrayList<>();

        for (int i = period; i < truePrices.size(); i++) {
            List<BigDecimal> vars = truePrices.subList(i - period, i);//0~20 79~99
            BigDecimal movingAverageVal = average(vars);
            BigDecimal standard_deviation = variance(vars).sqrt(new MathContext(10)).multiply(new BigDecimal(standardDeviation));

            bollingerUpper.add(movingAverageVal.add(standard_deviation));
            movingAverage.add(movingAverageVal);
            bollingerLower.add(movingAverageVal.subtract((standard_deviation)));
        }
        return simulateTrading(candles, movingAverage, bollingerLower);
    }

    private List<returnDto> simulateTrading(List<Candle> candles, List<BigDecimal> movingAverage, List<BigDecimal> bollingerLower) {
        List<Candle> buy = new ArrayList<>();
        List<Candle> sell = new ArrayList<>();
        boolean canBuy = true;
        List<returnDto> result = new ArrayList<>();
        for (int i = 0; i < candles.size(); i++) {
            Candle candle = candles.get(i);
            if (!candle.isGreaterThan(bollingerLower.get(i))) {
                if(canBuy){
                    buy.add(candle);
                    canBuy = false;
                }
            }
            if (candle.isGreaterThan(movingAverage.get(i))) {
                if(!canBuy){
                    sell.add(candle);
                    canBuy = true;
                }
            }
            if(!canBuy){//매수했음
                BigDecimal revenue = (candle.getTradePrice().divide(buy.get(buy.size()-1).getTradePrice()).subtract(BigDecimal.ONE)).multiply(BigDecimal.valueOf(100));
                result.add(new returnDto(candle.getDateTimeKST(),revenue));
            }
            else{
                result.add(new returnDto(candle.getDateTimeKST(),BigDecimal.ZERO));
            }
        }
        return result;
    }

    private BigDecimal average(List<BigDecimal> data) {
        BigDecimal num = BigDecimal.ZERO;
        for (int i = 0; i < data.size(); i++) {
            num.add(data.get(i));
        }
        num.divide(new BigDecimal(data.size()));
        return num;
    }

    private BigDecimal variance(List<BigDecimal> data) {
        List<BigDecimal> doubled = new ArrayList<>();
        for (int i = 0; i < data.size(); i++) {
            doubled.add(data.get(i).multiply(data.get(i)));
        }
        BigDecimal average_data = average(data);
        return average(doubled).subtract(average_data.multiply(average_data));
    }
}
//data period만큼 더 줘야함
//캔들을 실시간으로 불러와서 그거를 20개갖고 평균내서 밴드 만들고 이 밴드 넘는지 판단 넘으면 주문넣어야함
