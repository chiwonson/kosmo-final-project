package BreadTour.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import BreadTour.example.demo.mapper.DeliveryMapper;
import BreadTour.example.demo.model.Delivery;

@Service
public class DeliveryService {

    @Autowired
    private DeliveryMapper deliveryMapper;

    public void saveDeliveryInfo(Delivery delivery) {
        deliveryMapper.insertDeliveryInfo(delivery);
    }
}
