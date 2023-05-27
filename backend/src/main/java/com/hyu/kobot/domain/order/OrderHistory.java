package com.hyu.kobot.domain.order;

import com.hyu.kobot.domain.bot.Bot;
import com.hyu.kobot.domain.candle.Market;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class OrderHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "category", nullable = false)
    @Enumerated(value = EnumType.STRING)
    private Category category;

    @Column(name = "trade_date", nullable = false)
    private LocalDateTime tradeDate;

    @Column(name = "amount", nullable = false)
    private BigDecimal amount;

    @Column(name = "price", nullable = false)
    private BigDecimal price;

    @Column(name = "market", nullable = false)
    @Enumerated(value = EnumType.STRING)
    private Market market;

    @ManyToOne(fetch = FetchType.LAZY)
    private Bot bot;

    public BigDecimal calculateCoinCount() {
        if (category == Category.SELL) {
            return amount.multiply(new BigDecimal(-1));
        }
        return amount;
    }

    public BigDecimal calculatePrice() {
        return calculateCoinCount().multiply(price);
    }
}
