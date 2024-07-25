package BreadTour.models.Product.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import BreadTour.models.Product.dao.OrdersDAO;
import BreadTour.models.Product.vo.Orders;

@Service
public class OrdersService {

    @Autowired
    private OrdersDAO ordersDAO;

    public List<Orders> findAll() {
        return ordersDAO.findAll();
    }

    public void save(Orders order) {
        ordersDAO.save(order);
    }
}
