package com.hyu.kobot.repository;

import com.hyu.kobot.domain.candle.Market;
import com.hyu.kobot.domain.tradingKey.TradingKey;
import com.hyu.kobot.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.Optional;

public interface TradingKeyRepository extends JpaRepository<TradingKey, Long> {

    boolean existsTradingKeyByMarketAndMemberAndAccessKey(Market market, Member member, String accesskey);

    Optional<TradingKey> findByMember(Member member);
}
