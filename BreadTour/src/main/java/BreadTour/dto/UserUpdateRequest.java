package BreadTour.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserUpdateRequest {
    private String mname;
    private String mid;
    private String mpw;
    private String mnick;
    private String mphoto;
    private String memail;
    private String maddr;
}
