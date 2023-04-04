package com.hyu.kobot.domain.auth;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Map;
import java.util.UUID;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;

public class TradingKeyJwtTokenProvider {

    private final SecretKey key;
    private final long validityInMilliseconds;

    public TradingKeyJwtTokenProvider(String key) {
        this.key = Keys.hmacShaKeyFor(key.getBytes(StandardCharsets.UTF_8));
        this.validityInMilliseconds = 1800000;
    }

    public String createToken(Map<String,Object> claims) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + validityInMilliseconds);

        JwtBuilder jwtBuilder = Jwts.builder()
                .setIssuedAt(now)
                .setExpiration(validity)
                .claim("nonce", UUID.randomUUID().toString());
        for(Map.Entry<String,Object>entry : claims.entrySet()){
            jwtBuilder.claim(entry.getKey(),entry.getValue());
        }
        return jwtBuilder.signWith(key, SignatureAlgorithm.HS256).compact();
    }

    public String getPayload(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);

            return !claims.getBody().getExpiration().before(new Date());
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}
