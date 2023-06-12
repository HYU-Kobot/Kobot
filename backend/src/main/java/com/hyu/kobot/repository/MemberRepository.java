package com.hyu.kobot.repository;

import com.hyu.kobot.domain.member.Member;
import com.hyu.kobot.domain.member.Username;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

    boolean existsMemberByUsername(Username username);

    Optional<Member> findByUsername(Username username);
}
