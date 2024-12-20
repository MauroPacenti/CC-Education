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

import java.util.Random;

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

    @PostMapping("/auth/saveChanges")
    public ResponseEntity<String> saveChanges(@RequestParam String oldEmailCode, @RequestParam(required = false) String newEmailCode) {
        //sets newEmail code to empty string if null
        if(newEmailCode == null)
            newEmailCode = "";
        if(securityCheckService.codeSecurityCheck(oldEmailCode,newEmailCode)){
            adminService.saveNewCredentials();
            return ResponseEntity.ok("Verifica confermata");
        }
        else {
            return ResponseEntity.badRequest().body("I codici non corrispondono");
        }
    }

    @PostMapping("/pub/resetPassword")
    public ResponseEntity<String> resetPassword(@RequestParam String email) {
        String newPassword = adminService.generatePassword();
        try{
            adminService.resetPassword(email, passwordEncoder.encode(newPassword));
            javaMailSenderService.sendMail(email, "password reset", newPassword);
        } catch (Exception e){
            javaMailSenderService.sendMail(adminService.getAdmin().getEmail(),
                    "tentativo reset password",
                    "Salve, questa email di sistema segnala che qualcuno sta tentando di resettare la password del tuo applicativo.");
        }
        return ResponseEntity.ok("Operazione effettuata");
    }

    @PutMapping("/auth/saveTemp")
    public ResponseEntity<Admin> saveTemp(@RequestParam(required = false) String email, @RequestParam(required = false) String password) {
        try {
            //turns null values to empty strings
            if(email == null){
                email = "";
            }
            if(password == null){
                password = "";
            }
            //verifies which values are empty and decides how to fill temporary information
            if(email.isEmpty() && password.isEmpty()){
                throw new Error("I campi sono entrambi vuoti");
            }
            else if(email.isEmpty() || email.equals(adminService.getAdmin().getEmail())) {
                //password validation
                if(adminService.validatePassword(password)){
                    throw new Error("La password non rispetta i criteri di sicurezza." +
                            "\nSono necessari almeno:" +
                            "\nuna lettera maiuscola;" +
                            "\nuna lettera minuscola;" +
                            "\nun numero;" +
                            "\nun carattere speciale;");
                }
                adminService.saveTemporaryCredentials(passwordEncoder.encode(password), adminService.getAdmin().getEmail());
                String code = securityCheckService.codeSecurityGeneration();
                securityCheckService.saveCodes(code, "");
                javaMailSenderService.sendVerificationMail(code, adminService.getAdmin().getEmail());
            }
            else if(password.isEmpty()) {
                //email validation
                if(adminService.validateEmail(email)){
                    throw new Error("L'email non ha un formato idoneo.");
                }
                adminService.saveTemporaryCredentials(adminService.getAdmin().getPassword(), email);
                String codeOld = securityCheckService.codeSecurityGeneration();
                String codeNew = securityCheckService.codeSecurityGeneration();
                securityCheckService.saveCodes(codeOld, codeNew);
                javaMailSenderService.sendVerificationMail(codeOld, adminService.getAdmin().getEmail());
                javaMailSenderService.sendVerificationMail(codeNew, email);
            }
            else {
                //password validation
                if(adminService.validatePassword(password)){
                    throw new Error("La password non rispetta i criteri di sicurezza." +
                            "\nSono necessari almeno:" +
                            "\nuna lettera maiuscola;" +
                            "\nuna lettera minuscola;" +
                            "\nun numero;" +
                            "\nun carattere speciale;");
                }
                //email validation
                if(adminService.validateEmail(email)){
                    throw new Error("L'email non ha un formato idoneo.");
                }
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
