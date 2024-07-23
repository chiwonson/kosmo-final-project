package BreadTour;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "BreadTour.repository")
@EntityScan(basePackages = "BreadTour.entity")
public class BreadTourApplication {

	public static void main(String[] args) {
		SpringApplication.run(BreadTourApplication.class, args);
	}

}
