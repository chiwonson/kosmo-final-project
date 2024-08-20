package BreadTour.dto;

import java.time.LocalDateTime;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateRequest {
    private String mname;
    private String mid;
    private String mpw;
    private String mnick;
    private MultipartFile mphoto; // 업로드된 파일을 처리할 필드
    private String existingPhoto; // 기존에 저장된 파일명을 처리할 필드
    private String memail;
    private String maddr;
    private LocalDateTime UPDATEDATE;
}
