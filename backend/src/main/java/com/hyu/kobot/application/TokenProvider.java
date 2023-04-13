package com.hyu.kobot.application;

public interface TokenProvider {

    String createToken(String payload);

    String getPayload(String token);

    boolean validateToken(String token);
}