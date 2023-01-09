package com.hyu.kobot.presentation;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hyu.kobot.presentation.dto.ChartDataDTO;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChartDataController {

    private final JdbcTemplate jdbcTemplate;
    private final ObjectMapper objectMapper;

    public ChartDataController(final JdbcTemplate jdbcTemplate, ObjectMapper objectMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.objectMapper = objectMapper;
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    @GetMapping("/btc")
    public void go() throws IOException, InterruptedException {
        get30Min();
        get15Min();
        get5Min();
        get1Min();
    }

    private void get30Min() throws IOException, InterruptedException {
        List<ChartDataDTO> dtos = new ArrayList<>();
        LocalDateTime lastTime = LocalDateTime.of(2022, 12, 31, 23, 59, 59);
        while (!lastTime.isBefore(LocalDateTime.of(2017, 9, 25, 0, 0, 1))) {
            String url = "https://api.upbit.com/v1/candles/minutes/30?market=KRW-BTC&to=" + lastTime.toString()
                    + "%2B09:00&count=200";
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("accept", "application/json")
                    .method("GET", HttpRequest.BodyPublishers.noBody())
                    .build();
            HttpResponse<String> response = HttpClient.newHttpClient()
                    .send(request, HttpResponse.BodyHandlers.ofString());
            dtos.addAll(objectMapper.readValue(response.body(),
                    new TypeReference<List<ChartDataDTO>>() {
                    }));
            lastTime = lastTime.minusMinutes(6000);

            Thread.sleep(500);
            System.out.println("===========ok30===========");
        }
        batchInsert(dtos, "MINUTE_30");
    }

    private void get15Min() throws IOException, InterruptedException {
        List<ChartDataDTO> dtos = new ArrayList<>();
        LocalDateTime lastTime = LocalDateTime.of(2022, 12, 31, 23, 59, 59);
        while (!lastTime.isBefore(LocalDateTime.of(2017, 9, 25, 0, 0, 1))) {
            String url = "https://api.upbit.com/v1/candles/minutes/15?market=KRW-BTC&to=" + lastTime.toString()
                    + "%2B09:00&count=200";
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("accept", "application/json")
                    .method("GET", HttpRequest.BodyPublishers.noBody())
                    .build();
            HttpResponse<String> response = HttpClient.newHttpClient()
                    .send(request, HttpResponse.BodyHandlers.ofString());
            dtos.addAll(objectMapper.readValue(response.body(),
                    new TypeReference<List<ChartDataDTO>>() {
                    }));
            lastTime = lastTime.minusMinutes(3000);

            Thread.sleep(500);
            System.out.println("===========ok15===========");
        }
        batchInsert(dtos, "MINUTE_15");
    }

    private void get5Min() throws IOException, InterruptedException {
        List<ChartDataDTO> dtos = new ArrayList<>();
        LocalDateTime lastTime = LocalDateTime.of(2022, 12, 31, 23, 59, 59);
        while (!lastTime.isBefore(LocalDateTime.of(2017, 9, 25, 0, 0, 1))) {
            String url = "https://api.upbit.com/v1/candles/minutes/5?market=KRW-BTC&to=" + lastTime.toString()
                    + "%2B09:00&count=200";
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("accept", "application/json")
                    .method("GET", HttpRequest.BodyPublishers.noBody())
                    .build();
            HttpResponse<String> response = HttpClient.newHttpClient()
                    .send(request, HttpResponse.BodyHandlers.ofString());
            dtos.addAll(objectMapper.readValue(response.body(),
                    new TypeReference<List<ChartDataDTO>>() {
                    }));
            lastTime = lastTime.minusMinutes(1000);

            Thread.sleep(500);
            System.out.println("===========ok5===========");
        }
        batchInsert(dtos, "MINUTE_5");
    }

    private void get1Min() throws IOException, InterruptedException {
        List<ChartDataDTO> dtos = new ArrayList<>();
        LocalDateTime lastTime = LocalDateTime.of(2022, 12, 31, 23, 59, 59);
        while (!lastTime.isBefore(LocalDateTime.of(2017, 9, 25, 0, 0, 1))) {
            String url = "https://api.upbit.com/v1/candles/minutes/1?market=KRW-BTC&to=" + lastTime.toString()
                    + "%2B09:00&count=200";
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("accept", "application/json")
                    .method("GET", HttpRequest.BodyPublishers.noBody())
                    .build();
            HttpResponse<String> response = HttpClient.newHttpClient()
                    .send(request, HttpResponse.BodyHandlers.ofString());
            dtos.addAll(objectMapper.readValue(response.body(),
                    new TypeReference<List<ChartDataDTO>>() {
                    }));
            lastTime = lastTime.minusMinutes(200);

            Thread.sleep(500);
            System.out.println("===========ok1===========");
        }
        batchInsert(dtos, "MINUTE_1");
    }

    private void batchInsert(final List<ChartDataDTO> dtos, String timeUnit) {
        jdbcTemplate.batchUpdate(
                "insert into chart("
                        + "exchange, "
                        + "market, "
                        + "time_unit, "
                        + "date_time_kst, "
                        + "opening_price, "
                        + "high_price, "
                        + "low_price, "
                        + "trade_price, "
                        + "acc_trade_price, "
                        + "acc_trade_volume"
                        + ") values (?,?,?,?,?,?,?,?,?,?)",
                dtos,
                100000,
                (ps, argument) -> {
                    ps.setString(1, "UPBIT");
                    ps.setString(2, "KRW_BTC");
                    ps.setString(3, timeUnit);
                    ps.setTimestamp(4, Timestamp.valueOf(argument.getDateTimeKST()));
                    ps.setBigDecimal(5, argument.getOpeningPrice());
                    ps.setBigDecimal(6, argument.getHighPrice());
                    ps.setBigDecimal(7, argument.getLowPrice());
                    ps.setBigDecimal(8, argument.getTradePrice());
                    ps.setBigDecimal(9, argument.getAccTradePrice());
                    ps.setBigDecimal(10, argument.getAccTradeVolume());
                }
        );
        System.out.println("=====================finnish===================");
    }
}
