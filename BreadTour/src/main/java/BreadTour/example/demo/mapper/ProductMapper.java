package BreadTour.example.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import BreadTour.example.demo.model.Product;

@Mapper
public interface ProductMapper {

    Product selectProductById(String prId);

    void insertProduct(Product product);

    void updateProduct(Product product);

    void deleteProduct(int prNum);

    List<Product> selectAllProducts();

    List<Product> selectProductsByCategory(int categoryId);
}
