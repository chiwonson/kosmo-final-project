package BreadTour.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import BreadTour.example.demo.mapper.PaymentMapper;
import BreadTour.example.demo.model.Payment;

@Service
public class PaymentService {

    @Autowired
    private PaymentMapper paymentMapper;

    public Payment getPaymentById(int orNum) {
        return paymentMapper.selectPaymentById(orNum);
    }

    public void savePayment(Payment payment) {
        if (payment.getOrNum() == 0) {
            paymentMapper.insertPayment(payment);
        } else {
            paymentMapper.updatePayment(payment);
        }
    }

    public void deletePayment(int orNum) {
        paymentMapper.deletePayment(orNum);
    }

}
