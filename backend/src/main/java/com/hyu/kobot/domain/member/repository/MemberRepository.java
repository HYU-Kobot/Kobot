package com.hyu.kobot.domain.member.repository;

import com.hyu.kobot.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
