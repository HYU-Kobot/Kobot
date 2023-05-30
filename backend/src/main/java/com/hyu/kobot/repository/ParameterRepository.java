package com.hyu.kobot.repository;

import com.hyu.kobot.domain.bot.Bot;
import com.hyu.kobot.domain.bot.Parameter;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParameterRepository extends JpaRepository<Parameter, Long> {

    public List<Parameter> findByBot(Bot bot);
}
