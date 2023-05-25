package com.hyu.kobot.repository;

import com.hyu.kobot.domain.bot.strategy.Strategy;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StrategyRepository extends JpaRepository<Strategy,Long> {

}
