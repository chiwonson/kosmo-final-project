package BreadTour.example.demo.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import BreadTour.example.demo.model.CartItem;

import java.util.List;

@Mapper
public interface CartItemMapper {
    void insertCartItem(CartItem cartItem);

    List<CartItem> getCartItemsByMid(@Param("mid") String mid);

    List<CartItem> getOrderItemsByOrNum(@Param("orNum") int orNum);

    void deleteCartItem(@Param("id") int id);

    void deleteCartItemsByMid(@Param("mid") String mid);
}