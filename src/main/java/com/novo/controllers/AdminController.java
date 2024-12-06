package com.novo.controllers;

import com.novo.entities.Admin;
import com.novo.services.AdminService;
import com.novo.services.JavaMailSenderService;
import com.novo.services.SecurityCheckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AdminController {
    @Autowired
    private AdminService adminService;
    @Autowired
    private SecurityCheckService securityCheckService;
    @Autowired
    private JavaMailSenderService javaMailSenderService;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @GetMapping("/auth/getAdmin")
    public ResponseEntity<Admin> getAdmin() {
        Admin admin = adminService.getAdmin();
        return ResponseEntity.ok(admin);
    }

    @PutMapping("/auth/saveTemp")
    public ResponseEntity<Admin> saveTemp(@RequestParam String email, @RequestParam String password) {
        try {
            if(email.isEmpty() && password.isEmpty()){
                throw new Error("I campi sono entrambi vuoti");
            }
            else if(email.isEmpty()) {
                adminService.saveTemporaryCredentials(passwordEncoder.encode(password), adminService.getAdmin().getEmail());
                String code = securityCheckService.codeSecurityGeneration();
                securityCheckService.saveCodes(code, "");
                javaMailSenderService.sendVerificationMail(code, adminService.getAdmin().getEmail());
            }
            else if(password.isEmpty()) {
                adminService.saveTemporaryCredentials(adminService.getAdmin().getPassword(), email);
                String codeOld = securityCheckService.codeSecurityGeneration();
                String codeNew = securityCheckService.codeSecurityGeneration();
                securityCheckService.saveCodes(codeOld, codeNew);
                javaMailSenderService.sendVerificationMail(codeOld, adminService.getAdmin().getEmail());
                javaMailSenderService.sendVerificationMail(codeNew, email);
            }
            else {
                adminService.saveTemporaryCredentials(passwordEncoder.encode(password), email);
                String codeOld = securityCheckService.codeSecurityGeneration();
                String codeNew = securityCheckService.codeSecurityGeneration();
                securityCheckService.saveCodes(codeOld, codeNew);
                javaMailSenderService.sendVerificationMail(codeOld, adminService.getAdmin().getEmail());
                javaMailSenderService.sendVerificationMail(codeNew, email);
            }
            return ResponseEntity.ok(adminService.getTemp());
        }
        catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
