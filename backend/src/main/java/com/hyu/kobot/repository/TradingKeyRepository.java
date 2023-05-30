package com.hyu.kobot.repository;

import com.hyu.kobot.domain.candle.Exchange;
import com.hyu.kobot.domain.member.Member;
import com.hyu.kobot.domain.tradingKey.TradingKey;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TradingKeyRepository extends JpaRepository<TradingKey, Long> {

    boolean existsTradingKeyByExchangeAndMemberAndAccessKey(Exchange exchange, Member member, String accessKey);

    Optional<TradingKey> findByMember(Member member);
}
