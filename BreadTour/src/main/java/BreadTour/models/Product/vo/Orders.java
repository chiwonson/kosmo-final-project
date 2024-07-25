package BreadTour.models.Product.vo;

import java.sql.Timestamp;

// 주문
public class Orders {

    private Long ornum;// 주문번호
    private Timestamp orderdate;// 주문일자
    private Long mnum;// 회원번호
    private String mid;// 회원아이디
    private String maddr;// 배송지
    private String mhp;// 회원전화번호
    private char deleteyn;// 삭제여부

    // Getters Setters
    public Long getOrnum() {
        return ornum;
    }

    public void setOrnum(Long ornum) {
        this.ornum = ornum;
    }

    public Timestamp getOrderdate() {
        return orderdate;
    }

    public void setOrderdate(Timestamp orderdate) {
        this.orderdate = orderdate;
    }

    public Long getMnum() {
        return mnum;
    }

    public void setMnum(Long mnum) {
        this.mnum = mnum;
    }

    public String getMid() {
        return mid;
    }

    public void setMid(String mid) {
        this.mid = mid;
    }

    public String getMaddr() {
        return maddr;
    }

    public void setMaddr(String maddr) {
        this.maddr = maddr;
    }

    public String getMhp() {
        return mhp;
    }

    public void setMhp(String mhp) {
        this.mhp = mhp;
    }

    public char getDeleteyn() {
        return deleteyn;
    }

    public void setDeleteyn(char deleteyn) {
        this.deleteyn = deleteyn;
    }

}
