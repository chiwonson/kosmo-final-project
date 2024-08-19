package BreadTour.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Table(name = "b_mboard")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MNUM", updatable = false)
    private Long id;

    @Column(name = "MID", nullable = false, unique = true)
    private String username;

    @Column(name = "MPW", nullable = false)
    private String password;

    @Column(name = "MNAME", nullable = false)
    private String name;

    @Column(name = "MNICK")
    private String nickname;

    @Column(name = "MPHOTO")
    private String photo;

    @Column(name = "MEMAIL")
    private String email;

    @Column(name = "MADDR", nullable = false)
    private String address;

    @Column(name = "INSERTDATE")
    private java.time.LocalDateTime insertDate;

    @Column(name = "UPDATEDATE")
    private java.time.LocalDateTime updateDate;

    @Column(name = "DELETEYN", nullable = false)
    private String deleteYn;

    @Builder
    public User(String username, String password, String name, String nickname, String photo,
            String email, String address, java.time.LocalDateTime insertDate, java.time.LocalDateTime updateDate,
            String deleteYn) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.nickname = nickname;
        this.photo = photo;
        this.email = email;
        this.address = address;
        this.insertDate = insertDate;
        this.updateDate = updateDate;
        this.deleteYn = deleteYn;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("user"));
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    // 필요한 setter 메서드 추가
    public void setName(String name) {
        this.name = name;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    // User 클래스의 setter 메서드
    public void setUpdateDate(java.time.LocalDateTime updateDate) {
        this.updateDate = updateDate;
    }

}
