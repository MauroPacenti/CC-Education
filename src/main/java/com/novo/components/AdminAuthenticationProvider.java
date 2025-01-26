package com.novo.components;

import com.novo.entities.Admin;
import com.novo.repos.AdminRepository;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminAuthenticationProvider implements AuthenticationProvider {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminAuthenticationProvider(AdminRepository adminRepository, PasswordEncoder passwordEncoder) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
    	
        // Password from the login form
        String password = authentication.getCredentials().toString();

        // Fetch admin from the database
        Admin admin = adminRepository.findById("admin")
                .orElseThrow(() -> new BadCredentialsException("Errore durante il recupero dell'amministratore"));

        // Validate password
        if (!passwordEncoder.matches(password, admin.getPassword())) {
            throw new BadCredentialsException("Password non valida");
        }

        // Return authenticated token
        return new UsernamePasswordAuthenticationToken(admin.getUsername(), null, null);
    }

    // Return true if authenticationProvider supports the authentication object
    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }
}
