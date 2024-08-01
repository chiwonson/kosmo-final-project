package BreadTour.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import BreadTour.domain.User;
import BreadTour.dto.AddUserRequest;
import BreadTour.repository.UserRepository;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public Long save(AddUserRequest dto) {
        return userRepository.save(User.builder()
                .username(dto.getMid())
                .email(dto.getMemail())
                .password(bCryptPasswordEncoder.encode(dto.getMpw()))
                .name(dto.getMname())
                .nickname(dto.getMnick())
                .photo(dto.getMphoto())
                .email(dto.getMemail())
                .address(dto.getMaddr())
                .insertDate(java.time.LocalDateTime.now())
                .deleteYn("N")
                .build()).getId();
    }
}
