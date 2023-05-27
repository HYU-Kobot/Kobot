package com.hyu.kobot.ui.dto;

import java.math.BigDecimal;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@Getter
public class BotsResponse {

    private BigDecimal moneyOnHand; // 예수금
    private BigDecimal purchaseAmountSum; // 넣은 돈
    private BigDecimal netProfitSum; // 순이익
    private BigDecimal marketValueSum; // 미실현 수익
    private BigDecimal totalSum; // 굴러간 돈
    private List<BotResponse> bot;
}

//{
//    "moneyOnHand": 예수금,
//    "purchaseAmountSum": 넣은 돈 합,
//    "netProfitSum": 순이익 합,
//    "marketValueSum": 미실현 수익 합,
//    "totalSum": 굴러간돈 합,
//    "bot" : [
//            {
//                "botId":,
//                "marekt":,
//                "purchasAmount":,
//                "netProfit":,
//                "marketValue":,
//                "total":
//                "orderHistory":[{
//                                    "category":,
//                                    "market":,
//                                    "amount":,
//                                    "tradeDate":,
//                                    "price":,
//                                    },{
//                                    "category":,
//                                    "market":,
//                                    "amount":,
//                                    "tradeDate":,
//                                    "price":,
//                                    }]
//            }
//    ]
//}
