package BreadTour.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;

import BreadTour.example.demo.service.IamportService;

@RestController
@RequestMapping("/api/payments")
public class IamportController {
    @Autowired
    private IamportService iamportService;

    @PostMapping("/complete")
    public IamportResponse<Payment> paymentComplete(@RequestParam String impUid) throws Exception {
        return iamportService.getPayment(impUid);
    }
}
