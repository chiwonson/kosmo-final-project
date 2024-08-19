package BreadTour.example.demo.model;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class Payment {
    private int orNum; // 주문번호
    private Timestamp orderDate; // 주문일자
    private int mNum; // 회원번호
    private String mid; // 회원아이디
    private String mName; // 회원이름
    private BigDecimal crTotal; // 결제금액
    private String pOption; // 결제방법
    private String pStatus; // 결제상태
    private String mAddr; // 배송지
    private String mHp; // 회원전화번호
    private char deleteYn; // 삭제여부

    // Getters and Setters
    public int getOrNum() {
        return orNum;
    }

    public void setOrNum(int orNum) {
        this.orNum = orNum;
    }

    public Timestamp getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(Timestamp orderDate) {
        this.orderDate = orderDate;
    }

    public int getMNum() {
        return mNum;
    }

    public void setMNum(int mNum) {
        this.mNum = mNum;
    }

    public String getMid() {
        return mid;
    }

    public void setMid(String mid) {
        this.mid = mid;
    }

    public String getMName() {
        return mName;
    }

    public void setMName(String mName) {
        this.mName = mName;
    }

    public BigDecimal getCrTotal() {
        return crTotal;
    }

    public void setCrTotal(BigDecimal crTotal) {
        this.crTotal = crTotal;
    }

    public String getPOption() {
        return pOption;
    }

    public void setPOption(String pOption) {
        this.pOption = pOption;
    }

    public String getPStatus() {
        return pStatus;
    }

    public void setPStatus(String pStatus) {
        this.pStatus = pStatus;
    }

    public String getMAddr() {
        return mAddr;
    }

    public void setMAddr(String mAddr) {
        this.mAddr = mAddr;
    }

    public String getMHp() {
        return mHp;
    }

    public void setMHp(String mHp) {
        this.mHp = mHp;
    }

    public char getDeleteYn() {
        return deleteYn;
    }

    public void setDeleteYn(char deleteYn) {
        this.deleteYn = deleteYn;
    }
}