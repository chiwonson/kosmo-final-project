package BreadTour.service;

import BreadTour.models.User.User;
import BreadTour.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // 사용자 등록 메서드
    public void registerUser(User user) {
        // 비밀번호 인코딩
        String encodedPassword = passwordEncoder.encode(user.getMpw());
        user.setMpw(encodedPassword);
        userRepository.save(user);
    }

    // 모든 사용자 조회 메서드
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // mid로 사용자 조회 메서드
    public Optional<User> findUserByMid(String mid) {
        return userRepository.findByMid(mid);
    }

    // 비밀번호 검증 메서드
    public boolean validatePassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}
