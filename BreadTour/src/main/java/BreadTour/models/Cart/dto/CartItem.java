package BreadTour.models.Cart.dto;

import BreadTour.models.Product.dto.Product;

import lombok.AllArgsConstructor;
import lombok.Data;

/*
 * 장바구니 상품을 위한 dto로 cart 테이블의 컬럼명과 일치
 */
@Data
@AllArgsConstructor
public class CartItem {

    private int prnum; // id
    private String deliveryGroup;
    private String prname; // name
    private int prprice; // price
    private int prcnt; // quantity
    private String prphoto; // image
    private boolean selected;

    public CartItem(Product product) {
        this.prnum = product.getPrnum();
        this.deliveryGroup = product.getDeliveryGroup();
        this.prname = product.getPrname();
        this.prprice = product.getPrprice();
        this.prcnt = 1;
        this.selected = false;
    }

    public CartItem(int prnum, CartItem selectedItem) {
        this.prnum = prnum;
        this.deliveryGroup = selectedItem.getDeliveryGroup();
        this.prname = selectedItem.getPrname();
        this.prprice = selectedItem.getPrprice();
        this.prcnt = selectedItem.getPrcnt();
        this.selected = selectedItem.isSelected();
    }

}
