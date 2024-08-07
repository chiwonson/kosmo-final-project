package BreadTour.controller;

import BreadTour.dto.AddUserRequest;
import BreadTour.dto.UserUpdateRequest;
import BreadTour.domain.User;
import BreadTour.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Controller
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @GetMapping("/signup")
    public String signup(Model model) {
        model.addAttribute("isLoggedIn", false);
        return "signup";
    }

    @PostMapping("/signup")
    public String registerUser(AddUserRequest addUserRequest, Model model) {
        try {
            if (userService.checkEmailDuplicate(addUserRequest.getMemail())) {
                model.addAttribute("errorMessage", "이미 사용 중인 이메일입니다.");
                return "signup";
            }
            userService.save(addUserRequest);
            return "redirect:/login";
        } catch (IllegalStateException e) {
            model.addAttribute("errorMessage", e.getMessage());
            return "signup";
        }
    }

    @GetMapping("/login")
    public String loginPage(Model model) {
        model.addAttribute("isLoggedIn", isAuthenticated());
        return "login";
    }

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

    // 이메일 중복 확인 엔드포인트
    @GetMapping("/user/check-email")
    @ResponseBody
    public boolean checkEmailDuplicate(@RequestParam String email) {
        return userService.checkEmailDuplicate(email);
    }

    @GetMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        new SecurityContextLogoutHandler().logout(request, response,
                SecurityContextHolder.getContext().getAuthentication());
        return "redirect:/login";
    }

    @GetMapping("/main")
    public String main(@AuthenticationPrincipal UserDetails userDetails, Model model) {
        boolean isLoggedIn = (userDetails != null);
        model.addAttribute("isLoggedIn", isLoggedIn);
        return "main";
    }

    @GetMapping("/welcome")
    public String welcome() {
        return "welcome";
    }

    @GetMapping("/cart")
    public String cart() {
        return "cart";
    }

    // 회원탈퇴 페이지
    @GetMapping("/delete-account")
    public String deleteAccountPage() {
        return "delete"; // delete.html로 매핑
    }

    @PostMapping("/confirm-delete-account")
    public String confirmDeleteAccount(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails != null) {
            if (userDetails instanceof User) {
                User user = (User) userDetails;
                String email = user.getEmail();
                logger.debug("Deleting user with email: {}", email);
                userService.deleteUserByEmail(email);
            } else {
                logger.error("UserDetails is not an instance of User");
            }
        } else {
            logger.error("UserDetails is null");
        }
        return "redirect:/main?accountDeleted=true"; // 탈퇴 성공 시 메시지를 보이기 위한 파라미터 추가
    }

    private boolean isAuthenticated() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null && authentication.isAuthenticated()
                && !(authentication.getPrincipal() instanceof String);
    }
}