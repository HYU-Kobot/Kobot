package com.hyu.kobot.domain.repository;

import com.hyu.kobot.domain.OneMinuteChart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OneChartRepository extends JpaRepository<OneMinuteChart, Long> {

}
