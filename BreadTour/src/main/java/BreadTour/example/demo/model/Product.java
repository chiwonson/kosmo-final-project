package BreadTour.example.demo.model;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class Product {
    private int prNum;
    private String prId;
    private String prName;
    private int prCnt;
    private BigDecimal prPrice;
    private Timestamp insertDate;
    private String prPhoto;
    private String mid;
    private char deleteYn;

    public Product() {

    }

    // Getters and Setters
    public int getPrNum() {
        return prNum;
    }

    public void setPrNum(int prNum) {
        this.prNum = prNum;
    }

    public String getPrId() {
        return prId;
    }

    public void setPrId(String prId) {
        this.prId = prId;
    }

    public String getPrName() {
        return prName;
    }

    public void setPrName(String prName) {
        this.prName = prName;
    }

    public int getPrCnt() {
        return prCnt;
    }

    public void setPrCnt(int prCnt) {
        this.prCnt = prCnt;
    }

    public BigDecimal getPrPrice() {
        return prPrice;
    }

    public void setPrPrice(BigDecimal prPrice) {
        this.prPrice = prPrice;
    }

    public Timestamp getInsertDate() {
        return insertDate;
    }

    public void setInsertDate(Timestamp insertDate) {
        this.insertDate = insertDate;
    }

    public String getPrPhoto() {
        return prPhoto;
    }

    public void setPrPhoto(String prPhoto) {
        this.prPhoto = prPhoto;
    }

    public String getMid() {
        return mid;
    }

    public void setMid(String mid) {
        this.mid = mid;
    }

    public char getDeleteYn() {
        return deleteYn;
    }

    public void setDeleteYn(char deleteYn) {
        this.deleteYn = deleteYn;
    }

}
