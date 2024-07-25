package BreadTour.models.Product.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.NonNull;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import BreadTour.models.Product.vo.Product;

@Repository
public class ProductDAO {

    private final JdbcTemplate jdbcTemplate;

    public ProductDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Product> findAll() {
        String sql = "SELECT * FROM Product WHERE DELETEYN = 'N'";
        return jdbcTemplate.query(sql, new ProductRowMapper());
    }

    public Product findById(Long prnum) {
        String sql = "SELECT * FROM Product WHERE PRNUM = ? AND DELETEYN = 'N'";
        return jdbcTemplate.queryForObject(sql, new ProductRowMapper(), prnum);
    }

    private static class ProductRowMapper implements RowMapper<Product> {
        @Override
        public Product mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException {
            Product product = new Product();
            product.setPrnum(rs.getLong("PRNUM"));
            product.setPrid(rs.getString("PRID"));
            product.setPrname(rs.getString("PRNAME"));
            product.setPrcnt(rs.getInt("PRCNT"));
            product.setPrprice(rs.getBigDecimal("PRPRICE"));
            product.setInsertdate(rs.getTimestamp("INSERTDATE"));
            product.setPrphoto(rs.getString("PRPHOTO"));
            product.setMid(rs.getString("MID"));
            product.setDeleteyn(rs.getString("DELETEYN").charAt(0));
            return product;
        }
    }

}
