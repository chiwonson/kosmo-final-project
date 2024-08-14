package BreadTour.example.demo.service;

import java.util.List;

//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import BreadTour.example.demo.mapper.ProductMapper;
import BreadTour.example.demo.model.Product;

@Service
public class ProductService {

    private final ProductMapper productMapper;

    public Product getProductById(String prId) {
        return productMapper.selectProductById(prId);
    }

    public void addProduct(Product product) {
        productMapper.insertProduct(product);
    }

    public void updateProduct(Product product) {
        productMapper.updateProduct(product);
    }

    public void deleteProduct(int prNum) {
        productMapper.deleteProduct(prNum);
    }

    // @Autowired
    public ProductService(ProductMapper productMapper) {
        this.productMapper = productMapper;
    }

    public List<Product> getAllProducts() {
        return productMapper.selectAllProducts();
    }

    public List<Product> getProductsByCategory(int categoryId) {
        return productMapper.selectProductsByCategory(categoryId);
    }
}
