package BreadTour.models.User;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "b_mboard")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
