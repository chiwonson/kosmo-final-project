package BreadTour.models.Product.service;

import java.util.List;

import org.springframework.stereotype.Service;

import BreadTour.models.Product.dto.Product;
import BreadTour.models.Product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    /*
     * 상품의 모든 목록을 조회하여 반환한다
     * 
     * @return
     */
    @Override
    public List<Product> getProducts() {
        // TODO Auto-generated method stub
        return productRepository.selectAll();
    }

    /*
     * 상품 id로 조회한 상품 객체를 반환한다
     * 
     * @param productId 상품번호(id)
     * 
     * @return
     */
    @Override
    public Product findProductById(int productId) {
        // TODO Auto-generated method stub
        return productRepository.selectById(productId);
    }

}
