package BreadTour.models.Product.service;

import java.util.List;

import BreadTour.models.Product.dto.Product;

public interface ProductService {
    List<Product> getProducts();

    Product findProductById(int productId);
}
