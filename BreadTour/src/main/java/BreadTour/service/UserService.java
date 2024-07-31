package BreadTour.service;

import BreadTour.models.User.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    void registerUser(User user);

    List<User> getAllUsers();

    Optional<User> findUserByMid(String mid);
}
