package BreadTour.models.Product.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import BreadTour.models.Product.dto.Product;
import BreadTour.models.Product.service.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/product")
public class ProductController {
    private final ProductService productService;

    /*
     * 상품 목록을 조회하여 리스트로 반환한다
     * 
     * @return
     */
    @GetMapping
    public ResponseEntity<List<Product>> getProducts() {
        log.debug("상품 목록 불러오기");
        return ResponseEntity.ok(productService.getProducts());
    }
}
