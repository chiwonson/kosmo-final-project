package BreadTour.models.Product.dao;

import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import BreadTour.models.Product.vo.ProductVO;

@Repository
public class ProductDAOImpl implements ProductDAO {
    Logger logger = LogManager.getLogger(ProductDAOImpl.class);

    @Autowired(required = false)
    private SqlSession sqlSession;

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
