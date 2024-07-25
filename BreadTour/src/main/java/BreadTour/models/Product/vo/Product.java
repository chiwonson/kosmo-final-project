package BreadTour.models.Product.vo;

import java.math.BigDecimal;
import java.sql.Timestamp;

// 상품
public class Product {

    private Long prnum; // 상품 번호
    private String prid; // 상품 아이디
    private String prname; // 상품명
    private int prcnt; // 잔여물량
    private BigDecimal prprice; // 가격
    private Timestamp insertdate; // 등록일
    private String prphoto; // 사진
    private String mid; // 아이디
    private char deleteyn; // 삭제여부

    // Getters and Setters
    public Long getPrnum() {
        return prnum;
    }

    public void setPrnum(Long prnum) {
        this.prnum = prnum;
    }

    public String getPrid() {
        return prid;
    }

    public void setPrid(String prid) {
        this.prid = prid;
    }

    public String getPrname() {
        return prname;
    }

    public void setPrname(String prname) {
        this.prname = prname;
    }

    public int getPrcnt() {
        return prcnt;
    }

    public void setPrcnt(int prcnt) {
        this.prcnt = prcnt;
    }

    public BigDecimal getPrprice() {
        return prprice;
    }

    public void setPrprice(BigDecimal prprice) {
        this.prprice = prprice;
    }

    public Timestamp getInsertdate() {
        return insertdate;
    }

    public void setInsertdate(Timestamp insertdate) {
        this.insertdate = insertdate;
    }

    public String getPrphoto() {
        return prphoto;
    }

    public void setPrphoto(String prphoto) {
        this.prphoto = prphoto;
    }

    public String getMid() {
        return mid;
    }

    public void setMid(String mid) {
        this.mid = mid;
    }

    public char getDeleteyn() {
        return deleteyn;
    }

    public void setDeleteyn(char deleteyn) {
        this.deleteyn = deleteyn;
    }

}
