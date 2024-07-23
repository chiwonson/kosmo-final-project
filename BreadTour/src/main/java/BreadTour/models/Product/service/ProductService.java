package BreadTour.models.Product.service;

import java.util.List;

import BreadTour.models.Product.vo.ProductVO;

public interface ProductService {

    public List<ProductVO> productSelectAll(ProductVO pvo);

    public List<ProductVO> productSelect(ProductVO pvo);

    public int productInsert(ProductVO pvo);

    public int productUpdate(ProductVO pvo);

    public int productDelete(ProductVO pvo);
}
