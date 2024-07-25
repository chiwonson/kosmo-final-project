package BreadTour.models.Product.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import BreadTour.models.Product.dao.ProductDAO;
import BreadTour.models.Product.vo.Product;

@Service
public class ProductService {

    @Autowired
    private ProductDAO productDAO;

    public List<Product> findAll() {
        return productDAO.findAll();
    }

    public Product findById(Long prnum) {
        return productDAO.findById(prnum);
    }
}