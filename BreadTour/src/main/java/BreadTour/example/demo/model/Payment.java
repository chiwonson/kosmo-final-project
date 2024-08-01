package BreadTour.example.demo.model;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class Payment {
    private int orNum;
    private Timestamp orderDate;
    private int mNum;
    private String mid;
    private String mName;
    private BigDecimal crTotal;
    private String pOption;
    private String pStatus;
    private String mAddr;
    private String mHp;
    private char deleteYn;

    // 추가된 필드
    private int productId;
    private int quantity;
    private int price;

    public Payment() {

    }

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

    public int getmNum() {
        return mNum;
    }

    public void setmNum(int mNum) {
        this.mNum = mNum;
    }

    public String getMid() {
        return mid;
    }

    public void setMid(String mid) {
        this.mid = mid;
    }

    public String getmName() {
        return mName;
    }

    public void setmName(String mName) {
        this.mName = mName;
    }

    public BigDecimal getCrTotal() {
        return crTotal;
    }

    public void setCrTotal(BigDecimal crTotal) {
        this.crTotal = crTotal;
    }

    public String getpOption() {
        return pOption;
    }

    public void setpOption(String pOption) {
        this.pOption = pOption;
    }

    public String getpStatus() {
        return pStatus;
    }

    public void setpStatus(String pStatus) {
        this.pStatus = pStatus;
    }

    public String getmAddr() {
        return mAddr;
    }

    public void setmAddr(String mAddr) {
        this.mAddr = mAddr;
    }

    public String getmHp() {
        return mHp;
    }

    public void setmHp(String mHp) {
        this.mHp = mHp;
    }

    public char getDeleteYn() {
        return deleteYn;
    }

    public void setDeleteYn(char deleteYn) {
        this.deleteYn = deleteYn;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

}
