package BreadTour.models.Product.vo;

import java.math.BigDecimal;
import java.sql.Timestamp;

// 결제
public class Payment {

    private Long pnum;// 결제번호
    private Timestamp pdate;// 결제날짜
    private Long mnum;// 회원아이디
    private String mname;// 회원이름
    private BigDecimal crtotal;// 결제금액
    private String poption;// 결제방법
    private String pstatus;// 결제상태
    private char deleteyn;// 삭제여부

    // Getter Setter
    public Long getPnum() {
        return pnum;
    }

    public void setPnum(Long pnum) {
        this.pnum = pnum;
    }

    public Timestamp getPdate() {
        return pdate;
    }

    public void setPdate(Timestamp pdate) {
        this.pdate = pdate;
    }

    public Long getMnum() {
        return mnum;
    }

    public void setMnum(Long mnum) {
        this.mnum = mnum;
    }

    public String getMname() {
        return mname;
    }

    public void setMname(String mname) {
        this.mname = mname;
    }

    public BigDecimal getCrtotal() {
        return crtotal;
    }

    public void setCrtotal(BigDecimal crtotal) {
        this.crtotal = crtotal;
    }

    public String getPoption() {
        return poption;
    }

    public void setPoption(String poption) {
        this.poption = poption;
    }

    public String getPstatus() {
        return pstatus;
    }

    public void setPstatus(String pstatus) {
        this.pstatus = pstatus;
    }

    public char getDeleteyn() {
        return deleteyn;
    }

    public void setDeleteyn(char deleteyn) {
        this.deleteyn = deleteyn;
    }

}
