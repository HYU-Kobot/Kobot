package com.hyu.kobot;

import io.restassured.RestAssured;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

public class CandleAcceptanceTest extends AcceptanceTest {

    @Test
    void 일분봉_데이터를_조회할_수_있다() {
        RestAssured
                .given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .when()
                .get("/api/candles/minutes/1?market=KRW_BTC")
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract();
    }
}
