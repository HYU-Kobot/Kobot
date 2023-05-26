package com.hyu.kobot.repository;

import com.hyu.kobot.domain.candle.Market;
import com.hyu.kobot.domain.member.Member;
import com.hyu.kobot.domain.tradingKey.TradingKey;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TradingKeyRepository extends JpaRepository<TradingKey, Long> {

    boolean existsTradingKeyByMarketAndMemberAndAccessKey(Market market, Member member, String accesskey);

    Optional<TradingKey> findByMember(Member member);
}
