package BreadTour.service;

import lombok.RequiredArgsConstructor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import BreadTour.domain.User;
import BreadTour.dto.AddUserRequest;
import BreadTour.repository.UserRepository;

import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RequiredArgsConstructor
@Service
public class UserService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public Long save(AddUserRequest dto) throws IOException {
        if (checkEmailDuplicate(dto.getMemail())) {
            throw new IllegalStateException("이미 사용 중인 이메일입니다.");
        }
        // 사진 파일 저장 경로 설정
        String uploadDir = "C:/upload/photos/"; // 사진 파일을 저장할 디렉토리 경로
        MultipartFile photoFile = dto.getMphoto();
        String photoFilename = null;

        if (photoFile != null && !photoFile.isEmpty()) {
            photoFilename = System.currentTimeMillis() + "_" + photoFile.getOriginalFilename();
            File destinationFile = new File(uploadDir + photoFilename);
            photoFile.transferTo(destinationFile); // 파일을 설정된 경로에 저장
        }
        User user = User.builder()
                .username(dto.getMid())
                .email(dto.getMemail())
                .password(bCryptPasswordEncoder.encode(dto.getMpw()))
                .name(dto.getMname())
                .nickname(dto.getMnick())
                .photo(photoFilename)
                .address(dto.getMaddr())
                .insertDate(java.time.LocalDateTime.now())
                .deleteYn("N")
                .build();
        return userRepository.save(user).getId();
    }

    @Transactional
    public void updateUser(User user, MultipartFile mphoto) {
        if (mphoto != null && !mphoto.isEmpty()) {
            String uploadDir = "C:/upload/photos/";
            String photoFilename = System.currentTimeMillis() + "_" + mphoto.getOriginalFilename();

            // 파일 업로드 디렉토리가 없을 경우 생성
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                boolean dirCreated = directory.mkdirs();
                if (!dirCreated) {
                    throw new RuntimeException("업로드 디렉토리를 생성할 수 없습니다: " + uploadDir);
                }
            }

            File destinationFile = new File(uploadDir + photoFilename);
            try {
                mphoto.transferTo(destinationFile);
                user.setPhoto(photoFilename);
            } catch (Exception e) {
                throw new RuntimeException("파일 저장 중 오류가 발생했습니다.", e);
            }
        }

        userRepository.save(user);
    }

    public User findByEmail(String email) {
        logger.debug("Searching for user with email: {}", email);
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            logger.warn("User not found for email: {}", email);
        }
        return user;
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
