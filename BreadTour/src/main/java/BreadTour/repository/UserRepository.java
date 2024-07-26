package BreadTour.repository;

import BreadTour.models.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

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
            user.setMnick(rs.getString("mnick"));
            user.setMphoto(rs.getString("mphoto"));
            user.setMhp(rs.getString("mhp"));
            user.setMemail(rs.getString("memail"));
            user.setMaddr(rs.getString("maddr"));
            user.setInsertDate(rs.getTimestamp("insertdate") != null
                    ? rs.getTimestamp("insertdate").toLocalDateTime()
                    : null);
            user.setUpdateDate(rs.getTimestamp("updatedate") != null
                    ? rs.getTimestamp("updatedate").toLocalDateTime()
                    : null);
            user.setDeleteYn(rs.getString("deleteyn"));
            return user;
        }
    };

    public void save(User user) {
        String sql = "INSERT INTO b_mboard (mname, mid, mpw, mnick, mphoto, mhp, memail, maddr, insertdate, updatedate, deleteyn) "
                + "VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), ?)";
        jdbcTemplate.update(sql, user.getMname(), user.getMid(), user.getMpw(),
                user.getMnick(), user.getMphoto(), user.getMhp(), user.getMemail(),
                user.getMaddr(), user.getDeleteYn());
    }

    public void update(User user) {
        String sql = "UPDATE b_mboard SET mname = ?, mpw = ?, mnick = ?, mphoto = ?, mhp = ?, memail = ?, maddr = ?, updatedate = NOW(), deleteyn = ? "
                + "WHERE mid = ?";
        jdbcTemplate.update(sql, user.getMname(), user.getMpw(), user.getMnick(),
                user.getMphoto(), user.getMhp(), user.getMemail(), user.getMaddr(),
                user.getDeleteYn(), user.getMid());
    }

    public List<User> findAll() {
        String sql = "SELECT * FROM b_mboard";
        return jdbcTemplate.query(sql, userRowMapper);
    }

    public Optional<User> findByMid(String mid) {
        String sql = "SELECT * FROM b_mboard WHERE mid = ?";
        try {
            User user = jdbcTemplate.queryForObject(sql, new Object[] { mid }, userRowMapper);
            return Optional.ofNullable(user);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }
}