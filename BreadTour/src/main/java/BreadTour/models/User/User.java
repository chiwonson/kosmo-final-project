package BreadTour.models.User;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "b_mboard") // 테이블 이름을 지정할 수 있습니다.
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
