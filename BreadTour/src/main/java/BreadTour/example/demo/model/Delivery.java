package BreadTour.example.demo.model;

import java.time.LocalDateTime;

public class Delivery {

    private String buyerName;
    private String buyerAddress;
    private String buyerTel;
    private LocalDateTime purchaseTime;

    public Delivery() {
    }

    public Delivery(String buyerName, String buyerAddress, String buyerTel, LocalDateTime purchaseTime) {
        this.buyerName = buyerName;
        this.buyerAddress = buyerAddress;
        this.buyerTel = buyerTel;
        this.purchaseTime = purchaseTime;
    }

    public String getBuyerName() {
        return buyerName;
    }

    public void setBuyerName(String buyerName) {
        this.buyerName = buyerName;
    }

    public String getBuyerAddress() {
        return buyerAddress;
    }

    public void setBuyerAddress(String buyerAddress) {
        this.buyerAddress = buyerAddress;
    }

    public String getBuyerTel() {
        return buyerTel;
    }

    public void setBuyerTel(String buyerTel) {
        this.buyerTel = buyerTel;
    }

    public LocalDateTime getPurchaseTime() {
        return purchaseTime;
    }

    public void setPurchaseTime(LocalDateTime purchaseTime) {
        this.purchaseTime = purchaseTime;
    }

}
