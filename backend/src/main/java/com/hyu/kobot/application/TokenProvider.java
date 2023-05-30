package com.hyu.kobot.application;

import java.util.Map;

public interface TokenProvider {

    String createToken(String payload);

    String createToken(Map<String, Object> map);

    String getPayload(String token);

    boolean validateToken(String token);
}
