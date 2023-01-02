package com.hyu.kobot.application;

import com.hyu.kobot.domain.OneMinuteChart;
import com.hyu.kobot.domain.repository.OneChartRepository;
import org.springframework.stereotype.Service;

@Service
public class ChartService {

    private OneChartRepository oneChartRepository;

    public void save() {
        new OneMinuteChart();
    }

}
