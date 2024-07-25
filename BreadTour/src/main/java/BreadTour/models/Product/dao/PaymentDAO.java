package BreadTour.models.Product.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import BreadTour.models.Product.vo.Payment;

@Repository
public class PaymentDAO {

    private final JdbcTemplate jdbcTemplate;

    public PaymentDAO(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Payment> findAll() {
        String sql = "SELECT * FROM Payment WHERE DELETEYN = 'N'";
        return jdbcTemplate.query(sql, new PaymentRowMapper());
    }

    public void save(Payment payment) {
        String sql = "INSERT INTO Payment (MNUM, MNAME, CRTOTAL, POPTION, PSTATUS, DELETEYN) VALUES (?, ?, ?, ?, ?, 'N')";
        jdbcTemplate.update(sql, payment.getMnum(), payment.getMname(), payment.getCrtotal(), payment.getPoption(),
                payment.getPstatus());
    }

    private static class PaymentRowMapper implements RowMapper<Payment> {
        @Override
        public Payment mapRow(@NonNull ResultSet rs, int rowNum) throws SQLException {
            Payment payment = new Payment();
            payment.setPnum(rs.getLong("PNUM"));
            payment.setPdate(rs.getTimestamp("PDATE"));
            payment.setMnum(rs.getLong("MNUM"));
            payment.setMname(rs.getString("MNAME"));
            payment.setCrtotal(rs.getBigDecimal("CRTOTAL"));
            payment.setPoption(rs.getString("POPTION"));
            payment.setPstatus(rs.getString("PSTATUS"));
            payment.setDeleteyn(rs.getString("DELETEYN").charAt(0));
            return payment;
        }
    }
}
