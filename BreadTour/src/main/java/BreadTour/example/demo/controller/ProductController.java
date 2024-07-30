package BreadTour.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import BreadTour.example.demo.model.Product;
import BreadTour.example.demo.service.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    @GetMapping("/{prId}")
    public Product getProductById(@PathVariable String prId) {
        return productService.getProductById(prId);
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @PostMapping
    public void addProduct(@RequestBody Product product) {
        productService.addProduct(product);
    }

    @PutMapping("/{prNum}")
    public void updateProduct(@PathVariable int prNum, @RequestBody Product product) {
        product.setPrNum(prNum);
        productService.updateProduct(product);
    }

    @DeleteMapping("/{prNum}")
    public void deleteProduct(@PathVariable int prNum) {
        productService.deleteProduct(prNum);
    }

    @GetMapping("/")
    public String index(Model model) {
        // Model에 데이터 추가
        return "index";
    }

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/{categoryId}")
    public List<Product> getProductsByCategory(@PathVariable int categoryId) {
        return productService.getProductsByCategory(categoryId);
    }
}
