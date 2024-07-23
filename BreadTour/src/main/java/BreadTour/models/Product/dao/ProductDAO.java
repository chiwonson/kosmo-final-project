package BreadTour.models.Product.dao;

import java.util.List;

import BreadTour.models.Product.vo.ProductVO;

public interface ProductDAO {

    public List<ProductVO> productSelectAll(ProductVO pvo);

    public List<ProductVO> productSelect(ProductVO pvo);

    public int productInsert(ProductVO pvo);

    public int productUpdate(ProductVO pvo);

    public int productDelete(ProductVO pvo);

}
