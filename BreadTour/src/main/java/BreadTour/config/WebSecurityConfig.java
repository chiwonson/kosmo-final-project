package BreadTour.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import BreadTour.service.UserDetailService;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

        private final UserDetailService userService;

        @Bean
        public WebSecurityCustomizer configure() {
                return (web) -> web.ignoring()
                                .requestMatchers("/static/**", "/resources/**", "/css/**", "/icons/**", "/images/**",
                                                "/img/**", "/js/**");
        }

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
                http
                                .authorizeHttpRequests(authorize -> authorize
                                                .requestMatchers("/login", "/logout", "/welcome", "/signup", "/user",
                                                                "/main", "/check-email", "/api/reserv",
                                                                "/api/send-email")
                                                .permitAll()
                                                .requestMatchers("/cart.html", "/edit", "/index", "/sall")
                                                .authenticated()
                                                .anyRequest().authenticated())
                                .formLogin(formLogin -> formLogin
                                                .loginPage("/login")
                                                .defaultSuccessUrl("/main", true)
                                                .failureUrl("/login?error=true"))
                                .rememberMe(rememberMe -> rememberMe
                                                .tokenValiditySeconds(1209600) // 2주
                                                .key("mySecretKey")
                                                .rememberMeParameter("remember-me"))
                                .logout(logout -> logout
                                                .logoutUrl("/logout")
                                                .logoutSuccessUrl("/main")
                                                .invalidateHttpSession(true))
                                .csrf(csrf -> csrf
                                                .ignoringRequestMatchers(
                                                                new AntPathRequestMatcher("/api/delivery/save")))
                                .sessionManagement(sessionManagement -> sessionManagement
                                                .sessionFixation().migrateSession() // 세션 고정 공격 방지
                                                .invalidSessionUrl("/login?invalid-session=true")); // 유효하지 않은 세션 처리

                return http.build();
        }

        @Bean
        public AuthenticationManager authenticationManager(HttpSecurity http,
                        BCryptPasswordEncoder bCryptPasswordEncoder, UserDetailService userDetailService)
                        throws Exception {
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
}
