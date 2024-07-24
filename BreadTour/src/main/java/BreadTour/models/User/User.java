package BreadTour.models.User;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class User {
    private Integer mnum;
    private String mname;
    private String mid;
    private String mpw;
    private String mnick;
    private String mphoto;
    private String mhp;
    private String memail;
    private String maddr;
    private LocalDateTime insertDate;
    private LocalDateTime updateDate;
    private String deleteYn;

}

/*
 * MNUM INT NOT NULL,
 * MNAME VARCHAR(20) NOT NULL,
 * MID VARCHAR(300) NOT NULL,
 * MPW VARCHAR(300),
 * 
 * 
 * private String username;
 * private String password;
 * private String firstName;
 * private String lastName;
 * private String gender;
 * private int age;
 */