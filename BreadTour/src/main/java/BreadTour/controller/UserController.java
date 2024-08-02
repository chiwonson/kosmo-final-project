package BreadTour.controller;

import BreadTour.domain.User;
import BreadTour.dto.UserUpdateRequest;
import BreadTour.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@RequiredArgsConstructor
@Controller
public class UserController {

    private final UserService userService;

    @GetMapping("/user/edit")
    public String showEditForm(Model model, Authentication authentication) {
        String username = authentication.getName();
        User user = userService.findByUsername(username);
        model.addAttribute("user", user);
        return "user/edit"; // user/edit.html로 매핑됨
    }

    @PostMapping("/user/edit")
    public String updateUser(UserUpdateRequest userUpdateRequest, Authentication authentication) {
        String username = authentication.getName();
        User existingUser = userService.findByUsername(username);

        // DTO에서 기존 사용자 정보로 업데이트
        existingUser.setName(userUpdateRequest.getMname());
        existingUser.setNickname(userUpdateRequest.getMnick());
        existingUser.setPhoto(userUpdateRequest.getMphoto());
        existingUser.setEmail(userUpdateRequest.getMemail());
        existingUser.setAddress(userUpdateRequest.getMaddr());

        userService.updateUser(existingUser);
        return "redirect:/main";
    }
}
