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

    public Long save(AddUserRequest dto) {
        if (checkEmailDuplicate(dto.getMemail())) {
            throw new IllegalStateException("이미 사용 중인 이메일입니다.");
        }
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

    public User findByEmail(String email) {
        logger.debug("Searching for user with email: {}", email);
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            logger.warn("User not found for email: {}", email);
        }
        return user;
    }

    public void updateUser(User user) {
        if (userRepository.existsById(user.getId())) {
            userRepository.save(user);
        }
    }

    public boolean authenticate(String email, String password) {
        User user = findByEmail(email);
        if (user == null) {
            return false;
        }
        return bCryptPasswordEncoder.matches(password, user.getPassword());
    }

    @Transactional
    public void deleteUserByEmail(String email) {
        logger.info("Deleting user with email: {}", email);
        userRepository.findByEmail(email).ifPresent(user -> {
            userRepository.delete(user);
            logger.info("User deleted: {}", email);
        });
    }

    public boolean checkEmailDuplicate(String email) {
        return userRepository.existsByEmail(email);
    }
}
