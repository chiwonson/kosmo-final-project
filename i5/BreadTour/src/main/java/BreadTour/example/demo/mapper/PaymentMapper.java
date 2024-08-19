package BreadTour.example.demo.mapper;

import org.apache.ibatis.annotations.Mapper;
import BreadTour.example.demo.model.Payment;

@Mapper
public interface PaymentMapper {
    Payment selectPaymentById(int orNum);

    void insertPayment(Payment payment);

    void updatePayment(Payment payment);

    void deletePayment(int orNum);

}
