package BreadTour.example.demo.service;

import BreadTour.example.demo.mapper.PaymentMapper;
import BreadTour.example.demo.mapper.CartItemMapper;
import BreadTour.example.demo.model.CartItem;
import BreadTour.example.demo.model.Payment;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.List;

@Service
public class CartService {
    private final PaymentMapper paymentMapper;
    private final CartItemMapper cartItemMapper;

    // @Autowired
    public CartService(PaymentMapper paymentMapper, CartItemMapper cartItemMapper) {
        this.paymentMapper = paymentMapper;
        this.cartItemMapper = cartItemMapper;
    }

    public void checkout(List<CartItem> cartItems) {
        Payment payment = new Payment();
        // Fill in the payment details using necessary data
        payment.setOrderDate(new Timestamp(System.currentTimeMillis()));
        payment.setMid(cartItems.get(0).getMid()); // Assuming all cart items belong to the same user
        payment.setCrTotal(calculateTotalAmount(cartItems));
        payment.setPOption("카드"); // 예시로 결제 방법을 설정
        payment.setPStatus("결제완료"); // 예시로 결제 상태를 설정
        payment.setMAddr("주소"); // 예시로 배송 주소를 설정
        payment.setMHp("010-1234-5678"); // 예시로 전화번호를 설정
        payment.setDeleteYn('N');

        // Insert payment information into the database
        paymentMapper.insertPayment(payment);

        // Update cart items with the generated order number (orNum)
        for (CartItem item : cartItems) {
            item.setOrNum(payment.getOrNum());
            cartItemMapper.insertCartItem(item);
        }
    }

    private BigDecimal calculateTotalAmount(List<CartItem> cartItems) {
        BigDecimal total = BigDecimal.ZERO;
        for (CartItem item : cartItems) {
            total = total.add(item.getPrPrice().multiply(new BigDecimal(item.getPrCnt())));
        }
        return total;
    }
}