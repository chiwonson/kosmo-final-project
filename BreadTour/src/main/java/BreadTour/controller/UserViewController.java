package BreadTour.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import BreadTour.domain.User;
import BreadTour.service.UserService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Controller
public class UserViewController {

    private static final Logger logger = LoggerFactory.getLogger(UserViewController.class);
    private final UserService userService;

    @GetMapping("/login")
    public String login() {
        return "login";
    }

    @GetMapping("/signup")
    public String signup() {
        return "signup";
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

    @GetMapping("/edit")
    public String edit() {
        return "edit";
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

}