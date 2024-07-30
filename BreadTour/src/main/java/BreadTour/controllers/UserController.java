package BreadTour.controllers;

import BreadTour.models.User.User;
import BreadTour.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import jakarta.servlet.http.HttpSession;
import java.util.Optional;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @GetMapping("/register")
    public String showRegisterForm(Model model) {
        model.addAttribute("user", new User());
        return "register";
    }

    @PostMapping("/register")
    public String registerUser(@ModelAttribute User user, BindingResult result) {
        String encodedPassword = passwordEncoder.encode(user.getMpw());
        System.out.println("Encoded password: " + encodedPassword); // 디버깅용 로그
        user.setMpw(encodedPassword);
        userService.registerUser(user);
        return "redirect:/login";
    }

    @GetMapping("/login")
    public String showLoginForm(Model model) {
        model.addAttribute("user", new User());
        return "login";
    }

    @PostMapping("/login")
    public String loginUser(@ModelAttribute User user, HttpSession session, Model model) {
        Optional<User> existingUserOptional = userService.findUserByMid(user.getMid());
        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();
            System.out.println("Found user: " + existingUser); // 디버깅용 로그
            if (passwordEncoder.matches(user.getMpw(), existingUser.getMpw())) {
                session.setAttribute("user", existingUser);
                return "redirect:/main"; // 로그인 성공 시 이동할 페이지
            } else {
                model.addAttribute("error", "Invalid username or password");
                return "login";
            }
        } else {
            model.addAttribute("error", "Invalid username or password");
            return "login";
        }
    }

    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/welcome";
    }

    @GetMapping("/main")
    public String showDashboard(HttpSession session, Model model) {
        User user = (User) session.getAttribute("user");
        if (user != null) {
            model.addAttribute("user", user);
            return "main"; // 로그인된 사용자용 메인 페이지
        } else {
            return "main"; // 로그인 안 된 사용자도 접근 가능한 메인 페이지
        }
    }

    @GetMapping("/guest")
    public String guest() {
        // 게스트 링크 클릭 시 메인 페이지로 리다이렉트
        return "redirect:/main";
    }

    @GetMapping("/welcome")
    public String showWelcomePage() {
        return "welcome";
    }
}
