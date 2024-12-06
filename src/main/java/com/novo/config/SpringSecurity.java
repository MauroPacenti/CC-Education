package com.novo.config;

import com.novo.components.AdminAuthenticationProvider;
import com.novo.repos.AdminRepository;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SpringSecurity {

    @Autowired
    private AdminRepository adminRepository;

    @Bean
    public static PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeHttpRequests((authorize) ->
                        authorize.requestMatchers("/api/pub/**").permitAll()
                                .requestMatchers("/api/auth/**").authenticated()
                ).formLogin(
                        form -> form
                                .loginPage("/login.html")
                                .loginProcessingUrl("/login")
                                .defaultSuccessUrl("/api/pub/getAdmin", true)
                                .failureHandler((request, response, exception) -> {
                                    // Imposta il codice di stato HTTP personalizzato
                                    response.setStatus(HttpServletResponse.SC_FORBIDDEN); // Cambia il codice secondo le tue necessità
                                })
                                .permitAll()
                ).logout(
                        logout -> logout
                                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                                .permitAll()
                );
        
        return http.build();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(new AdminAuthenticationProvider(adminRepository, passwordEncoder()));
    }
}