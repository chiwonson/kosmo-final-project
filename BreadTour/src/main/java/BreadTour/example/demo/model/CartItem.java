package BreadTour.example.demo.model;

import java.math.BigDecimal;

public class CartItem {
    private int id; // 고유 식별자 (Primary Key)
    private int orNum; // 주문번호 (null이면 장바구니에 담긴 상태)
    private int prNum; // 상품 번호 (PRNUM)
    private String prId; // 상품 아이디 (PRID)
    private String prName; // 상품명 (PRNAME)
    private int prCnt; // 수량 (PRCNT)
    private BigDecimal prPrice; // 가격 (PRPRICE)
    private String mid; // 회원 아이디 (MID)
    private char deleteYn; // 삭제 여부 (DELETEYN)

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getOrNum() {
        return orNum;
    }

    public void setOrNum(int orNum) {
        this.orNum = orNum;
    }

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