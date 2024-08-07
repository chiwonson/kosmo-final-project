package BreadTour.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "main"; // main.html을 로드
    }

    @GetMapping("/main")
    public String main() {
        return "main"; // main.html을 로드
    }

    @GetMapping("/shopping")
    public String shopping() {
        return "index"; // index.html을 로드
    }
}
