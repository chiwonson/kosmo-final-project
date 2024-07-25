package BreadTour.models.Product.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.ui.Model;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home(Model model) {
        model.addAttribute("message", "Welcome to the Home Page!");
        return "index"; // index.html 뷰를 반환
    }
}
