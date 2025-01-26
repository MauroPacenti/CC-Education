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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SpringSecurity {
	
    // Uses class Admin to authenticate
    @Autowired
    private AdminRepository adminRepository;

    // Interface for encoding passwords
    @Bean
    public static PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    // Defines a filter chain which is matched against an HttpServletRequest
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .authorizeHttpRequests((authorize) ->
                        authorize.requestMatchers("/error").permitAll()
                                .requestMatchers("/swagger-ui.html").permitAll()
                                .requestMatchers("/swagger-ui/**").permitAll()
                                .requestMatchers("/v3/api-docs/**").permitAll()
                                .requestMatchers("/swagger-resources/**").permitAll()
                                .requestMatchers("/webjars/**").permitAll()
                                .requestMatchers("/api/pub/**").permitAll()
                                .requestMatchers("/api/auth/**").authenticated()
                                .requestMatchers("/dashboard/**").authenticated()
                                .requestMatchers("/laboratori/**").permitAll()
                                .requestMatchers("/richiedi-prenotazione/**").permitAll()
                                .requestMatchers("/sign-in/**").permitAll()
                                .requestMatchers("/privacy/**").permitAll()
                                .requestMatchers("/assets/**").permitAll()
                                .requestMatchers("/img/**").permitAll()
                                .requestMatchers("/").permitAll()
                                .requestMatchers("/index.html").permitAll()
                ).formLogin(
                        form -> form
                                .loginPage("/")
                                .loginProcessingUrl("/login")
                                .defaultSuccessUrl("/api/auth/getAdmin", true)
                                .failureHandler((request, response, exception) -> {
                                    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
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
    	
        // Uses custom AdminAuthenticationProvider to authenticate with password only
        auth.authenticationProvider(new AdminAuthenticationProvider(adminRepository, passwordEncoder()));
    }
}