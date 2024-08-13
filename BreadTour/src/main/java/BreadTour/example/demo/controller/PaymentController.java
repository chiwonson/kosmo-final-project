package BreadTour.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import BreadTour.example.demo.model.Payment;
import BreadTour.example.demo.service.PaymentService;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping("/{orNum}")
    public Payment getPaymentById(@PathVariable int orNum) {
        return paymentService.getPaymentById(orNum);
    }

    @PostMapping
    public void createPayment(@RequestBody Payment payment) {
        paymentService.savePayment(payment);
    }

    @PutMapping("/{orNum}")
    public void updatePayment(@PathVariable int orNum, @RequestBody Payment payment) {
        payment.setOrNum(orNum);
        paymentService.savePayment(payment);
    }

    @DeleteMapping("/{orNum}")
    public void deleteOrder(@PathVariable int orNum) {
        paymentService.deletePayment(orNum);
    }

}
