package com.hyu.kobot.acceptance;

import static org.assertj.core.api.Assertions.assertThat;

import com.hyu.kobot.ui.dto.AccessTokenResponse;
import com.hyu.kobot.ui.dto.ErrorMessageResponse;
import com.hyu.kobot.ui.dto.SignInRequest;
import com.hyu.kobot.ui.dto.SignUpRequest;
import io.restassured.RestAssured;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

public class AuthAcceptanceTest extends AcceptanceTest {

    @Test
    void 회원가입을_할_수_있다() {
        RestAssured
                .given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(new SignUpRequest("조형래", "chohyeongrae", "qwer1234"))
                .when()
                .post("/api/auth/member")
                .then().log().all()
                .statusCode(HttpStatus.OK.value());
    }

    @Test
    void 로그인을_할_수_있다() {
        RestAssured
                .given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(new SignUpRequest("조형래", "chohyeongrae", "qwer1234"))
                .when()
                .post("/api/auth/member")
                .then().log().all()
                .statusCode(HttpStatus.OK.value());

        AccessTokenResponse accessTokenResponse = RestAssured
                .given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(new SignInRequest("chohyeongrae", "qwer1234"))
                .when()
                .get("/api/auth/member")
                .then().log().all()
                .statusCode(HttpStatus.OK.value())
                .extract()
                .as(AccessTokenResponse.class);

        assertThat(accessTokenResponse.getAccessToken()).isNotNull();
    }

    @Test
    void 가입된_유저네임이_아니면_로그인을_할_수_없다() {
        RestAssured
                .given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(new SignUpRequest("조형래", "chohyeongrae", "qwer1234"))
                .when()
                .post("/api/auth/member")
                .then().log().all()
                .statusCode(HttpStatus.OK.value());

        ErrorMessageResponse response = RestAssured
                .given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(new SignInRequest("aaaa1111", "qwer1234"))
                .when()
                .get("/api/auth/member")
                .then().log().all()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .extract()
                .as(ErrorMessageResponse.class);

        assertThat(response.getMessage()).isNotNull();
    }

    @Test
    void 비밀번호가_틀리면_로그인을_할_수_없다() {
        RestAssured
                .given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(new SignUpRequest("조형래", "chohyeongrae", "qwer1234"))
                .when()
                .post("/api/auth/member")
                .then().log().all()
                .statusCode(HttpStatus.OK.value());

        ErrorMessageResponse response = RestAssured
                .given().log().all()
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .body(new SignInRequest("chohyeongrae", "qwer1233"))
                .when()
                .get("/api/auth/member")
                .then().log().all()
                .statusCode(HttpStatus.BAD_REQUEST.value())
                .extract()
                .as(ErrorMessageResponse.class);

        assertThat(response).isNotNull();
    }
}
