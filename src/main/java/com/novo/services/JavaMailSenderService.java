package com.novo.services;

public interface JavaMailSenderService {
    void sendMail(String to, String subject, String body);
    void sendVerificationMail(String code, String email);
}
