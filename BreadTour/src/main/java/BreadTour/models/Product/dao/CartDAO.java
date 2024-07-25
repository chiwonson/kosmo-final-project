package BreadTour.models.Product.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import BreadTour.models.Product.vo.Cart;

@Repository
public class CartDAO {

    private final JdbcTemplate jdbcTemplate;

    public CartDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Cart> findAll() {
        String sql = "SELECT * FROM Cart WHERE DELETEYN = 'N'";
        return jdbcTemplate.query(sql, new CartRowMapper());
    }

    public void save(Cart cart) {
        String sql = "INSERT INTO Cart (CRID, MID, MNAME, CRCNT, CRTOTAL, PRPHOTO, PRID, DELETEYN) VALUES (?, ?, ?, ?, ?, ?, ?, 'N')";
        jdbcTemplate.update(sql, cart.getCrid(), cart.getMid(), cart.getMname(), cart.getCrcnt(), cart.getCrtotal(),
                cart.getPrphoto(), cart.getPrid());
    }

    private static class CartRowMapper implements RowMapper<Cart> {
        @Override
        public Cart mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException {
            Cart cart = new Cart();
            cart.setCrnum(rs.getLong("CRNUM"));
            cart.setCrid(rs.getString("CRID"));
            cart.setMid(rs.getString("MID"));
            cart.setMname(rs.getString("MNAME"));
            cart.setCrcnt(rs.getInt("CRCNT"));
            cart.setCrtotal(rs.getBigDecimal("CRTOTAL"));
            cart.setPrphoto(rs.getString("PRPHOTO"));
            cart.setInsertdate(rs.getTimestamp("INSERTDATE"));
            cart.setPrid(rs.getString("PRID"));
            cart.setDeleteyn(rs.getString("DELETEYN").charAt(0));
            return cart;

        }
    }
}
