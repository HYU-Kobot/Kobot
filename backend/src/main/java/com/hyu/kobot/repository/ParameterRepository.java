package com.hyu.kobot.repository;

import com.hyu.kobot.domain.bot.Parameter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ParameterRepository extends JpaRepository<Parameter, Long> {

}
