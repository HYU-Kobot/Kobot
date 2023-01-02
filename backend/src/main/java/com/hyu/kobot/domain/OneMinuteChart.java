package com.hyu.kobot.domain;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor
public class OneMinuteChart {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long Id;

    @Column(unique = true, nullable = false, length = 20)
    private String market;

    @Column(nullable = false)
    private LocalDateTime dateTimeKST;

    @Column(nullable = false, precision = 12, scale = 8)
    private BigDecimal openingPrice;

    @Column(nullable = false, precision = 12, scale = 8)
    private BigDecimal highPrice;

    @Column(nullable = false, precision = 12, scale = 8)
    private BigDecimal lowPrice;

    @Column(nullable = false, precision = 12, scale = 8)
    private BigDecimal tradePrice;

    @Column(nullable = false, precision = 12, scale = 8)
    private BigDecimal accTradePrice;

    @Column(nullable = false, precision = 12, scale = 8)
    private BigDecimal accTradeVolume;
}
