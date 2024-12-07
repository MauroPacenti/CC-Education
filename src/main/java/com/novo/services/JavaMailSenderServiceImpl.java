package com.novo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class JavaMailSenderServiceImpl implements JavaMailSenderService {
    @Autowired
    private JavaMailSender mailSender;

    //sends an email
    @Override
    public void sendMail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        //server email address
        message.setFrom("neotrinal@gmail.com");
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }

    //sends verification email containing security code
    @Override
    public void sendVerificationMail(String code, String email) {
        SimpleMailMessage message = new SimpleMailMessage();
        //server email address
        message.setFrom("neotrinal@gmail.com");
        message.setTo(email);
        message.setSubject("codice di verifica");
        message.setText("Il tuo codice di verifica per la modifica delle informazioni è: " + code);
        mailSender.send(message);
    }
}
