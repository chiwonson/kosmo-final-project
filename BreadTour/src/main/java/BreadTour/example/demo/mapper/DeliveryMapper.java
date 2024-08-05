package BreadTour.example.demo.mapper;

import org.apache.ibatis.annotations.Mapper;

import BreadTour.example.demo.model.Delivery;

@Mapper
public interface DeliveryMapper {
    void insertDeliveryInfo(Delivery delivery);
}
