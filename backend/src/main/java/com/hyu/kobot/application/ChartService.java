package com.hyu.kobot.application;

import com.hyu.kobot.domain.Chart;
import com.hyu.kobot.domain.repository.ChartRepository;
import org.springframework.stereotype.Service;

@Service
public class ChartService {

    private ChartRepository chartRepository;

    public void save() {
        new Chart();
    }

}
