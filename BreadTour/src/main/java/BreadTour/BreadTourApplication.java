package BreadTour;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("BreadTour.example.demo.mapper") // MyBatis 매퍼 인터페이스 패키지 스캔
public class BreadTourApplication {

	public static void main(String[] args) {
		SpringApplication.run(BreadTourApplication.class, args);
	}

}
