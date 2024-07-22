package BreadTour.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ViewController {

    @GetMapping("/hello")
    public String sayHello() {
        return "Hello, BreadTour!";
    }

}
// http://localhost:8081/hello