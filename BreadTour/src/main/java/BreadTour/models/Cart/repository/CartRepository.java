package BreadTour.models.Cart.repository;

import java.util.List;

import BreadTour.models.Cart.dto.CartItem;

public interface CartRepository {
    List<CartItem> selectAll();

    CartItem selectById(int prnum);

    void insert(CartItem cartItem);

    void updatePrcnt(CartItem cartItem);

    void delete(int prnum);

    void deleteAll();

    void updateSelected(int prnum);

    int selectStockPrcnt(int prnum);

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