package com.hyu.kobot.repository;

import com.hyu.kobot.domain.member.Username;
import com.hyu.kobot.domain.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

    public boolean existsMemberByUsername(Username username);
}
