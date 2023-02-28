package com.hyu.kobot.repository;

import com.hyu.kobot.domain.member.Username;
import com.hyu.kobot.domain.member.Member;
import com.hyu.kobot.ui.dto.SignInRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    boolean existsMemberByUsername(Username username);
    Optional<Member> findByUsername(Username username);
}
