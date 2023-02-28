package com.hyu.kobot.acceptance;

import com.hyu.kobot.ui.dto.SignUpRequest;
import io.restassured.RestAssured;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

public class MemberAcceptanceTest extends AcceptanceTest {

    @Test
    void 회원가입을_할_수_있다() {
        RestAssured
                .given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(new SignUpRequest("조형래", "chohyeongrae", "qwer1234"))
                .when()
                .post("/api/member")
                .then().log().all()
                .statusCode(HttpStatus.OK.value());
    }
}
