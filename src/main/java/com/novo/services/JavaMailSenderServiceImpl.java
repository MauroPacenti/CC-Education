package com.novo.services;

import com.novo.entities.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class JavaMailSenderServiceImpl implements JavaMailSenderService {
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private AdminService adminService;

    @Override
    public void sendMail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("mauro.pacenti@edu.itspiemonte.it");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }

    @Override
    public void sendVerificationMail(String code, String email) {
        Admin admin = adminService.getAdmin();
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("neotrinal@gmail.com");
        message.setTo(email);
        message.setSubject("codice di verifica");
        message.setText("Il tuo codice di verifica per la modifica delle informazioni è: " + code);
        mailSender.send(message);
    }
}
