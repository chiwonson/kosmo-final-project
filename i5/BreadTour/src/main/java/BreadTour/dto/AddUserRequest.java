package BreadTour.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddUserRequest {
    private String mname;
    private String mid;
    private String mpw;
    private String mnick;
    private MultipartFile mphoto;
    private String memail;
    private String maddr;

}