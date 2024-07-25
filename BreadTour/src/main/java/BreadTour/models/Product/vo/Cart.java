package BreadTour.models.Product.vo;

import java.math.BigDecimal;
import java.sql.Timestamp;

// 카트
public class Cart {

    private Long crnum; // 카트번호
    private String crid; // 카트아이디
    private String mid; // 아이디
    private String mname; // 회원이름
    private int crcnt; // 총갯수
    private BigDecimal crtotal; // 총금액
    private String prphoto; // 사진
    private Timestamp insertdate; // 등록일
    private String prid; // 상품아이디
    private char deleteyn; // 삭제여부

    // Getter Setter
    public Long getCrnum() {
        return crnum;
    }

    public void setCrnum(Long crnum) {
        this.crnum = crnum;
    }

    public String getCrid() {
        return crid;
    }

    public void setCrid(String crid) {
        this.crid = crid;
    }

    public String getMid() {
        return mid;
    }

    public void setMid(String mid) {
        this.mid = mid;
    }

    public String getMname() {
        return mname;
    }

    public void setMname(String mname) {
        this.mname = mname;
    }

    public int getCrcnt() {
        return crcnt;
    }

    public void setCrcnt(int crcnt) {
        this.crcnt = crcnt;
    }

    public BigDecimal getCrtotal() {
        return crtotal;
    }

    public void setCrtotal(BigDecimal crtotal) {
        this.crtotal = crtotal;
    }

    public String getPrphoto() {
        return prphoto;
    }

    public void setPrphoto(String prphoto) {
        this.prphoto = prphoto;
    }

    public Timestamp getInsertdate() {
        return insertdate;
    }

    public void setInsertdate(Timestamp insertdate) {
        this.insertdate = insertdate;
    }

    public String getPrid() {
        return prid;
    }

    public void setPrid(String prid) {
        this.prid = prid;
    }

    public char getDeleteyn() {
        return deleteyn;
    }

    public void setDeleteyn(char deleteyn) {
        this.deleteyn = deleteyn;
    }

}
