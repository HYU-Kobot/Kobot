package com.hyu.kobot.presentation;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChartController {

    @GetMapping("/hi")
    public String get() {
        return "hi";
    }
}
