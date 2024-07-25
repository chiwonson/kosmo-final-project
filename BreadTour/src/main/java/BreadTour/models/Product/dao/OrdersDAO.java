package BreadTour.models.Product.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import BreadTour.models.Product.vo.Orders;

@Repository
public class OrdersDAO {

    private final JdbcTemplate jdbcTemplate;

    public OrdersDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Orders> findAll() {
        String sql = "SELECT * FROM Orders WHERE DELTEYN = 'N'";
        return jdbcTemplate.query(sql, new OrdersRowMapper());
    }

    public void save(Orders order) {
        String sql = "INSERT INTO Orders(MNUM,MID,MADDR,MHP, DELETEYN) VALUES (?,?,?,?,'N')";
        jdbcTemplate.update(sql, order.getMnum(), order.getMid(), order.getMaddr(), order.getMaddr(), order.getMhp());
    }

    private static class OrdersRowMapper implements RowMapper<Orders> {
        @Override
        public Orders mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException {
            Orders order = new Orders();
            order.setOrnum(rs.getLong("ORNUM"));
            order.setOrderdate(rs.getTimestamp("ORDERDATE"));
            order.setMnum(rs.getLong("MNUM"));
            order.setMid(rs.getString("MID"));
            order.setMaddr(rs.getString("MADDR"));
            order.setMhp(rs.getString("MHP"));
            order.setDeleteyn(rs.getString("DELETEYN").charAt(0));
            return order;
        }
    }
}
