package BreadTour.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity

@Table(name = "b_mboard")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer mnum;
    private String mname;
    private String mid;
    private String mpw;

    // 기본 생성자
    public Member() {
    }

    // 매개변수가 있는 생성자
    public Member(String mname, String mid, String mpw) {
        this.mname = mname;
        this.mid = mid;
        this.mpw = mpw;
    }

    // Getter 및 Setter 메서드
    public Integer getMnum() {
        return mnum;
    }

    public void setMnum(Integer mnum) {
        this.mnum = mnum;
    }

    public String getMname() {
        return mname;
    }

    public void setMname(String mname) {
        this.mname = mname;
    }

    public String getMid() {
        return mid;
    }

    public void setMid(String mid) {
        this.mid = mid;
    }

    public String getMpw() {
        return mpw;
    }

    public void setMpw(String mpw) {
        this.mpw = mpw;
    }
}
