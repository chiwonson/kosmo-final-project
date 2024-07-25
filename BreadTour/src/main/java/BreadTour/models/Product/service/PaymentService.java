package BreadTour.models.Product.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import BreadTour.models.Product.dao.PaymentDAO;
import BreadTour.models.Product.vo.Payment;

@Service
public class PaymentService {

    @Autowired
    private PaymentDAO paymentDAO;

    public List<Payment> findAll() {
        return paymentDAO.findAll();
    }

    public void save(Payment payment) {
        paymentDAO.save(payment);
    }
}
