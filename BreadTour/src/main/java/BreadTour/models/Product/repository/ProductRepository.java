package BreadTour.models.Product.repository;

import java.util.List;

import BreadTour.models.Product.dto.Product;

public interface ProductRepository {
    List<Product> selectAll();

    Product selectById(int productId);
}
