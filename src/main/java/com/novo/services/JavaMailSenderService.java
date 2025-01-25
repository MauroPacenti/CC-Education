package com.novo.services;

import jakarta.mail.MessagingException;


import java.util.Map;

public interface JavaMailSenderService {
    void sendMail(String to, String subject, String body) throws MessagingException;
    void sendVerificationMail(String code, String email) ;
    String loadTemplate(Map<String, String> placeholders) throws Exception;
}
