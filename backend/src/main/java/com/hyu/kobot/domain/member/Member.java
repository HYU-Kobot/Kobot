package com.hyu.kobot.domain.member;

import com.hyu.kobot.util.EncryptorInterface;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
@Getter
@Entity
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded
    private Nickname nickname;

    @Embedded
    private Username username;

    @Embedded
    private Password password;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public Member(Nickname nickname, Username username, Password password) {
        this(null, nickname, username, password, null);
    }

    public Member(String name, String username, String password, EncryptorInterface encryptor) {
        this(null, new Nickname(name), new Username(username), Password.of(encryptor, password), null);
    }

    public boolean hasPassword(Password password) {
        return this.password.isSame(password);
    }
}
