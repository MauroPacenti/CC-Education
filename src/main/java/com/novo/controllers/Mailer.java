package com.novo.controllers;

import com.novo.services.JavaMailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class Mailer {
    @Autowired
    private JavaMailSenderService javaMailSenderService;

    @PostMapping("/pub/sendMail")
    public ResponseEntity<Boolean> sendMail(@RequestParam String to, @RequestParam String subject, @RequestParam String body){
        try {
            javaMailSenderService.sendMail(to, subject, body);
            return ResponseEntity.ok(true);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(false);
        }
    }
}
