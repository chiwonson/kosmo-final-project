package BreadTour.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import BreadTour.service.UserDetailService;

@RequiredArgsConstructor
@Configuration
public class WebSecurityConfig implements WebMvcConfigurer {

        private final UserDetailService userService;

        @Bean
        public WebSecurityCustomizer configure() {
                return (web) -> web.ignoring()
                                .requestMatchers("/static/**", "/resources/**", "/css/**", "/icons/**", "/images/**",
                                                "/img/**", "/js/**", "/api/reserv", "/api/**");
        }

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
                http
                                .authorizeHttpRequests(authorize -> authorize
                                                .requestMatchers("/login", "/logout", "/welcome", "/signup",
                                                                "/user", "/main", "/check-email", "/api/**",
                                                                "/order-success")
                                                .permitAll()
                                                .requestMatchers("/shopping", "/edit", "/reservation",
                                                                "/recommend", "/map")
                                                .authenticated()
                                                .anyRequest().authenticated())
                                .formLogin(formLogin -> formLogin
                                                .loginPage("/login")
                                                .defaultSuccessUrl("/main")
                                                .failureUrl("/login?error=true"))
                                .rememberMe(rememberMe -> rememberMe
                                                .tokenValiditySeconds(600) // 토큰 유효기간을 10분으로 설정
                                                .key("mySecretKey") // 보안을 위한 키 설정
                                                .rememberMeParameter("remember-me") // remember-me 체크박스의 이름
                                )
                                .logout(logout -> logout
                                                .logoutUrl("/logout")
                                                .logoutSuccessUrl("/main")
                                                .invalidateHttpSession(true))
                                .csrf(csrf -> csrf
                                                .ignoringRequestMatchers(
                                                                new AntPathRequestMatcher(
                                                                                "http://localhost:8083/api/delivery/save"))
                                                .ignoringRequestMatchers(
                                                                new AntPathRequestMatcher("/api/reserv")));

                return http.build();
        }

        @Bean
        public AuthenticationManager authenticationManager(HttpSecurity http,
                        BCryptPasswordEncoder bCryptPasswordEncoder,
                        UserDetailService userDetailService) throws Exception {
                return http.getSharedObject(AuthenticationManagerBuilder.class)
                                .userDetailsService(userService)
                                .passwordEncoder(bCryptPasswordEncoder)
                                .and()
                                .build();
        }

        @Bean
        public BCryptPasswordEncoder bCryptPasswordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Override
        public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                                .allowedOrigins("http://192.168.0.2:8083")
                                .allowedMethods("GET", "POST", "PUT", "DELETE")
                                .allowedHeaders("*")
                                .allowCredentials(true);
        }

}
