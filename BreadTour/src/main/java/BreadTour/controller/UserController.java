package BreadTour.controller;

import BreadTour.dto.UserUpdateRequest;
import BreadTour.domain.User;
import BreadTour.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Controller
@RequestMapping("/user")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public @ResponseBody User login(@RequestParam String email, @RequestParam String password) {
        boolean isAuthenticated = userService.authenticate(email, password);
        if (isAuthenticated) {
            return userService.findByEmail(email); // 인증 성공 시 사용자 반환
        } else {
            // 인증 실패 시 적절한 처리를 수행
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }
    }

    @GetMapping("/edit")
    public String editUserForm(Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof User) {
            User loggedInUser = (User) authentication.getPrincipal();
            String memail = loggedInUser.getEmail();

            logger.debug("editUserForm called with memail: {}", memail);
            User user = userService.findByEmail(memail);
            if (user != null) {
                UserUpdateRequest userUpdateRequest = new UserUpdateRequest();
                userUpdateRequest.setMid(user.getUsername());
                userUpdateRequest.setMname(user.getName());
                userUpdateRequest.setMnick(user.getNickname());
                userUpdateRequest.setMphoto(user.getPhoto());
                userUpdateRequest.setMemail(user.getEmail());
                userUpdateRequest.setMaddr(user.getAddress());
                model.addAttribute("user", userUpdateRequest);
                logger.debug("User found and added to model: {}", userUpdateRequest);
            } else {
                logger.warn("User not found for email: {}", memail);
                model.addAttribute("user", new UserUpdateRequest());
            }
        } else {
            logger.warn("No authenticated user found");
            model.addAttribute("user", new UserUpdateRequest());
        }
        return "edit";
    }

    @PostMapping("/edit")
    public String updateUser(@ModelAttribute UserUpdateRequest userUpdateRequest) {
        logger.debug("updateUser called with userUpdateRequest: {}", userUpdateRequest);
        User user = userService.findByEmail(userUpdateRequest.getMemail());
        if (user != null) {
            user.setName(userUpdateRequest.getMname());
            user.setNickname(userUpdateRequest.getMnick());
            user.setPhoto(userUpdateRequest.getMphoto());
            user.setEmail(userUpdateRequest.getMemail());
            user.setAddress(userUpdateRequest.getMaddr());
            userService.updateUser(user);
            logger.debug("User updated: {}", user);
        } else {
            logger.warn("User not found for email: {}", userUpdateRequest.getMemail());
        }
        return "redirect:/main";
    }

}
