package BreadTour.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import BreadTour.example.demo.mapper.PaymentMapper;
import BreadTour.example.demo.model.CartItem;
import BreadTour.example.demo.model.Payment;

@Service
public class CartService {
    private final PaymentMapper paymentMapper;

    @Autowired
    public CartService(PaymentMapper paymentMapper) {
        this.paymentMapper = paymentMapper;
    }

    public void checkout(List<CartItem> cartItems) {
        for (CartItem item : cartItems) {
            Payment payment = new Payment();
            // Fill in the payment details using CartItem and other necessary data
            payment.setProductId(item.getProductId());
            payment.setQuantity(item.getQuantity());
            payment.setPrice(item.getPrice());
            paymentMapper.insertPayment(payment);
        }
    }

}
