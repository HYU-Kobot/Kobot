package com.hyu.kobot.application.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class returnDto {
    private LocalDateTime date;
    private BigDecimal revenue;
}
