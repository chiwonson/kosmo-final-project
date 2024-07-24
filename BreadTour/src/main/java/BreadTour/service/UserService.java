package BreadTour.service;

import BreadTour.models.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // 사용자 등록 메서드
    public void registerUser(User user) {
        // 비밀번호 인코딩
        String encodedPassword = passwordEncoder.encode(user.getMpw());

        // SQL 쿼리 실행
        String sql = "INSERT INTO b_mboard (mname, mid, mpw) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, user.getMname(), user.getMid(), encodedPassword);
    }

    // 모든 사용자 조회 메서드
    public List<User> getAllUsers() {
        String sql = "SELECT * FROM b_mboard";
        return jdbcTemplate.query(sql, new UserRowMapper());
    }

    // mid로 사용자 조회 메서드
    public User findUserByMid(String mid) {
        String sql = "SELECT * FROM b_mboard WHERE mid = ?";
        return jdbcTemplate.queryForObject(sql, new Object[] { mid }, new UserRowMapper());
    }

    // RowMapper 구현
    private static class UserRowMapper implements RowMapper<User> {
        @Override
        public User mapRow(ResultSet rs, int rowNum) throws SQLException {
            User user = new User();
            user.setMnum(rs.getInt("mnum"));
            user.setMname(rs.getString("mname"));
            user.setMid(rs.getString("mid"));
            user.setMpw(rs.getString("mpw"));
            return user;
        }
    }
}
