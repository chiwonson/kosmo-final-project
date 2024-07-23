package BreadTour.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/BreadTour")
public class MyController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello, BreadTour!";
    }
}
// http://localhost:8081/BreadTour/hello

/*
 * @RestController
 * public class MyController {
 * 
 * @GetMapping("/hello")
 * public String hello() {
 * return "Hello, World!";
 * }
 * }
 */