package BreadTour.controller;

import BreadTour.dto.AddUserRequest;
import BreadTour.dto.UserUpdateRequest;
import BreadTour.domain.User;
import BreadTour.service.UserService;

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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Controller
public class UserController {

    // Constructor injection for UserService
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public String home() {
        return "welcome"; // main.html을 로드
    }

    @GetMapping("/signup")
    public String signup(Model model) {
        model.addAttribute("isLoggedIn", false);
        return "signup";
    }

    @PostMapping("/signup")
    public String registerUser(AddUserRequest addUserRequest, Model model) {
        try {
            // 파일이 제대로 전송되었는지 확인
            if (addUserRequest.getMphoto() != null) {
                System.out.println("Uploaded file name: " + addUserRequest.getMphoto().getOriginalFilename());
            }

            if (userService.checkEmailDuplicate(addUserRequest.getMemail())) {
                model.addAttribute("errorMessage", "이미 사용 중인 이메일입니다.");
                return "signup";
            }
            userService.save(addUserRequest);
            return "redirect:/login";
        } catch (Exception e) {
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

            User user = userService.findByEmail(memail);
            if (user != null) {
                UserUpdateRequest userUpdateRequest = new UserUpdateRequest();
                userUpdateRequest.setMid(user.getUsername());
                userUpdateRequest.setMname(user.getName());
                userUpdateRequest.setMnick(user.getNickname());
                userUpdateRequest.setExistingPhoto(user.getPhoto()); // 기존 사진 파일명을 설정
                userUpdateRequest.setMemail(user.getEmail());
                userUpdateRequest.setMaddr(user.getAddress());
                model.addAttribute("user", userUpdateRequest);
            } else {
                model.addAttribute("user", new UserUpdateRequest());
            }
        } else {
            model.addAttribute("user", new UserUpdateRequest());
        }
        return "edit";
    }

    @PostMapping("/edit")
    public String updateUser(@ModelAttribute UserUpdateRequest userUpdateRequest, MultipartFile mphoto) {
        User user = userService.findByEmail(userUpdateRequest.getMemail());
        if (user != null) {
            // 업데이트할 정보 설정
            user.setName(userUpdateRequest.getMname());
            user.setNickname(userUpdateRequest.getMnick());
            user.setEmail(userUpdateRequest.getMemail());
            user.setAddress(userUpdateRequest.getMaddr());
            user.setUpdateDate(LocalDateTime.now());

            // 업데이트 수행
            userService.updateUser(user, mphoto);
        } else {
            // 유저가 없을 경우의 처리 (필요한 경우)
        }
        return "redirect:/main";
    }

    // 이메일 중복 확인 엔드포인트
    @GetMapping("/user/check-email")
    @ResponseBody
    public boolean checkEmailDuplicate(@RequestParam String email) {
        boolean isDuplicate = userService.checkEmailDuplicate(email);
        return isDuplicate;
    }

    @GetMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        new SecurityContextLogoutHandler().logout(request, response,
                SecurityContextHolder.getContext().getAuthentication());
        return "/welcome";
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
                userService.deleteUserByEmail(email);
            } else {
            }
        } else {
        }
        return "redirect:/main?accountDeleted=true"; // 탈퇴 성공 시 메시지를 보이기 위한 파라미터 추가
    }

    private boolean isAuthenticated() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication != null && authentication.isAuthenticated()
                && !(authentication.getPrincipal() instanceof String);
    }

    @GetMapping("/reservation")
    public String reservation() {
        return "redirect:http://192.168.0.2:3000/reservation";
    }

    @GetMapping("/recommend")
    public String recommend() {
        return "redirect:http://127.0.0.1:5000/recommend";
    }

    @GetMapping("/map")
    public String map() {
        return "redirect:http://192.168.0.2:5000/map";
    }

    // 윤수
    @GetMapping("/api/reserv")
    @CrossOrigin(origins = "http://192.168.0.2:3000")
    @ResponseBody
    public Map<String, String> react_test() {
        Map<String, String> response = new HashMap<>();
        response.put("memail", "kostest0730@gmail.com");
        response.put("mname", "장윤수");
        return response;
    }

    @GetMapping("/order-success")
    public String orderSuccess(Model model) {
        // 필요한 데이터 추가
        return "order-success"; // order-success.html 뷰를 반환
    }

}