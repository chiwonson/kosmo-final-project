package BreadTour.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import BreadTour.models.User.User;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class UserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private final RowMapper<User> userRowMapper = new RowMapper<User>() {
        @Override
        public User mapRow(ResultSet rs, int rowNum) throws SQLException {
            User user = new User();
            user.setMnum(rs.getInt("mnum"));
            user.setMname(rs.getString("mname"));
            user.setMid(rs.getString("mid"));
            user.setMpw(rs.getString("mpw"));
            return user;
        }
    };

    public void save(User user) {
        String sql = "INSERT INTO users (mname, mid, mpw) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, user.getMname(), user.getMid(), user.getMpw());
    }

    public List<User> findAll() {
        String sql = "SELECT * FROM users";
        return jdbcTemplate.query(sql, userRowMapper);
    }

    public User findByMid(String mid) {
        String sql = "SELECT * FROM users WHERE mid = ?";
        return jdbcTemplate.queryForObject(sql, new Object[] { mid }, userRowMapper);
    }
}
