package BreadTour.service;

import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import BreadTour.domain.User;
import BreadTour.dto.AddUserRequest;
import BreadTour.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    // 사용자 저장
    public Long save(AddUserRequest dto) {
        User user = User.builder()
                .username(dto.getMid())
                .email(dto.getMemail())
                .password(bCryptPasswordEncoder.encode(dto.getMpw()))
                .name(dto.getMname())
                .nickname(dto.getMnick())
                .photo(dto.getMphoto())
                .address(dto.getMaddr())
                .insertDate(java.time.LocalDateTime.now())
                .deleteYn("N")
                .build();
        return userRepository.save(user).getId();
    }

    // 이메일로 사용자 조회
    public User findByEmail(String email) {
        logger.debug("Searching for user with email: {}", email);
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            logger.warn("User not found for email: {}", email);
        }
        return user;
    }

    // 사용자 업데이트
    public void updateUser(User user) {
        // 사용자 존재 여부 확인 후 업데이트
        if (userRepository.existsById(user.getId())) {
            userRepository.save(user);
        }
    }

    // 로그인 인증
    public boolean authenticate(String email, String password) {
        User user = findByEmail(email);
        if (user == null) {
            return false; // 사용자 없음
        }
        return bCryptPasswordEncoder.matches(password, user.getPassword()); // 비밀번호 확인
    }

    // 회원탈퇴
    @Transactional
    public void deleteUserByEmail(String email) {
        logger.info("Deleting user with email: {}", email);
        userRepository.findByEmail(email).ifPresent(user -> {
            userRepository.delete(user);
            logger.info("User deleted: {}", email);
        });
    }
}
