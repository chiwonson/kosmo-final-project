package BreadTour.models.Product.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import BreadTour.models.Product.dao.CartDAO;
import BreadTour.models.Product.vo.Cart;

@Service
public class CartService {

    @Autowired
    private CartDAO cartDAO;

    public List<Cart> findAll() {
        return cartDAO.findAll();
    }

    public void save(Cart cart) {
        cartDAO.save(cart);
    }

}
