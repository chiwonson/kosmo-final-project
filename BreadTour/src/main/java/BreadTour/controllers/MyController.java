package BreadTour.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/BreadTour")
public class MyController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello, BreadTour!";
    }

    @GetMapping("/api/reserv")
	@ResponseBody
	public Map<String, String> react_test() {
		Map<String, String> response = new HashMap<>();
        response.put("memail", "jus7676@naver.com");
        response.put("mname", "장윤수");
        return response;
	}
}
