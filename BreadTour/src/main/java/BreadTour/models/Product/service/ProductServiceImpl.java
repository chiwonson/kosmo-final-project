package BreadTour.models.Product.service;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import BreadTour.models.Product.vo.ProductVO;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {
    Logger logger = LogManager.getLogger(ProductServiceImpl.class);

    @Override
    public int productDelete(ProductVO pvo) {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public int productInsert(ProductVO pvo) {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public List<ProductVO> productSelect(ProductVO pvo) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public List<ProductVO> productSelectAll(ProductVO pvo) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public int productUpdate(ProductVO pvo) {
        // TODO Auto-generated method stub
        return 0;
    }

}
