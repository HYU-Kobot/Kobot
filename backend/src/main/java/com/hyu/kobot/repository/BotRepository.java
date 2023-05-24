package com.hyu.kobot.repository;

import com.hyu.kobot.domain.bot.Bot;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BotRepository extends JpaRepository<Bot,Long> {
}
