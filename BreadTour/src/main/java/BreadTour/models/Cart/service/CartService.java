package BreadTour.models.Cart.service;

import java.util.List;
import java.util.Map;

import BreadTour.models.Cart.dto.CartItem;
import BreadTour.models.Cart.dto.CartItemInsertResponse;
import BreadTour.models.Product.dto.Product;

public interface CartService {
    Map<String, List<CartItem>> getCartItems();

    CartItem getCartItem(int prnum);

    CartItemInsertResponse addCartItem(Product product);

    void updatePrcnt(int prnum, int updatedPrcnt);

    void deleteCartItem(int prnum);

    void updateSelected(int prnum);

    void payAll();

    void paySelectedItems();

}

/*
 * private int prnum; // id
 * private String deliveryGroup;
 * private String prname; // name
 * private int prprice; // price
 * private int prcnt; // quantity
 * private String prphoto; // image
 * private boolean selected;
 */