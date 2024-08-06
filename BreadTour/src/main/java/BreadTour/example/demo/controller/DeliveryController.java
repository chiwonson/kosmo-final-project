package BreadTour.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import BreadTour.example.demo.model.Delivery;
import BreadTour.example.demo.service.DeliveryService;

@RestController
@RequestMapping("/api/delivery")
public class DeliveryController {

    @Autowired
    private DeliveryService deliveryService;

    @PostMapping("/save")
    public String saveDeliveryInfo(@RequestBody Delivery delivery) {
        deliveryService.saveDeliveryInfo(delivery);
        return "Delivery information saved successfully!";
    }

}
