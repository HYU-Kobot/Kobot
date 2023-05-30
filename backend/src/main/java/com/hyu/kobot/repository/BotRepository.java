package com.hyu.kobot.repository;

import com.hyu.kobot.domain.bot.Bot;
import com.hyu.kobot.domain.bot.Name;
import com.hyu.kobot.domain.member.Member;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BotRepository extends JpaRepository<Bot, Long> {

    List<Bot> findAllByMember(Member member);

    boolean existsByMemberAndName(Member member, Name name);
}
