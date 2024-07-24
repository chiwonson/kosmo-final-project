package BreadTour.models.Product.vo;

import java.math.BigDecimal;
import java.sql.Timestamp;

// 상품
public class Product {

    private Long prnum;
    private String prid;
    private String prname;
    private int prcnt;
    private BigDecimal prprice;
    private Timestamp insertdate;
    private String prphoto;
    private String mid;
    private char deleteyn;

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
