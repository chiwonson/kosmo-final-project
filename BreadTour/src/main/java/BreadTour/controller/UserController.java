package BreadTour.controller;

import BreadTour.dto.AddUserRequest;
import BreadTour.dto.UserUpdateRequest;
import BreadTour.domain.User;
import BreadTour.service.UserService;

import java.util.HashMap;
import java.util.Map;

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
import jakarta.servlet.http.HttpSession;

@Controller
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    // 루트 경로에 대한 매핑 추가
    @GetMapping("/")
    public String root() {
        return "redirect:/welcome";
    }

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

    // 로그인 처리 메서드 수정
    @PostMapping("/login")
    public String login(@RequestParam String email, @RequestParam String password, HttpSession session, Model model) {
        boolean isAuthenticated = userService.authenticate(email, password);
        if (isAuthenticated) {
            User user = userService.findByEmail(email);
            session.setAttribute("userEmail", user.getEmail());
            session.setAttribute("userNick", user.getNickname());
            model.addAttribute("user", user);
            logger.info("User {} logged in with email {}", user.getNickname(), user.getEmail()); // 로그 추가
            return "redirect:/main";
        } else {
            model.addAttribute("errorMessage", "Invalid credentials");
            logger.warn("Login failed for email {}", email); // 로그 추가
            return "login";
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

    // main 메서드 추가
    @GetMapping("/main")
    public String main(HttpSession session, Model model) {
        String memail = (String) session.getAttribute("userEmail");
        String mnick = (String) session.getAttribute("userNick");
        boolean isLoggedIn = (memail != null && mnick != null);
        model.addAttribute("isLoggedIn", isLoggedIn);
        model.addAttribute("userEmail", memail);
        model.addAttribute("userNick", mnick);
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

    @GetMapping("/api/reserv")
    @ResponseBody
    public Map<String, String> react_test(HttpSession session) {
        Map<String, String> response = new HashMap<>();

        String userEmail = (String) session.getAttribute("userEmail");
        String userName = (String) session.getAttribute("userName");

        if (userEmail != null && userName != null) {
            response.put("memail", userEmail);
            response.put("mname", userName);
        } else {
            response.put("error", "User not logged in");
        }

        return response;
    }

    // 세션 설정
    @GetMapping("/setSession")
    public String setSession(HttpSession session, @RequestParam String memail, @RequestParam String mnick) {
        session.setAttribute("userEmail", memail);
        session.setAttribute("userNick", mnick);
        return "redirect:/main";
    }

    // 세션 읽기
    @GetMapping("/getSession")
    public String getSession(@SessionAttribute("userEmail") String memail, @SessionAttribute("userNick") String mnick,
            Model model) {
        model.addAttribute("userEmail", memail);
        model.addAttribute("userNick", mnick);
        return "main";
    }
}
