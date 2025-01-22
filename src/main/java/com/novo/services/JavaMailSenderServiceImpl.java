package com.novo.services;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;

@Service
public class JavaMailSenderServiceImpl implements JavaMailSenderService {
    @Autowired
    private JavaMailSender mailSender;



    @Override
    public void sendMail(String to, String subject, String body) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();

        // Use MimeMessageHelper for convenient handling of the MIME message
        MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");

        // Define the placeholders
        Map<String, String> contents = Map.of(
                "title", subject,
                "content", body
        );
        String htmlBody;

        try{
            htmlBody = loadTemplate(contents);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlBody, true);
        mailSender.send(message);
    }

    // Sends verification email containing security code
    @Override
    public void sendVerificationMail(String code, String email) {
        SimpleMailMessage message = new SimpleMailMessage();
        try {
            sendMail(email, "Codice di verifica", "Il tuo codice di verifica per la modifica delle informazioni è: " + code);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    // Loads email templates from src/main/resources/email-template.html
    @Override
    public String loadTemplate(Map<String, String> placeholders) throws Exception {
        String content = new String(Files.readAllBytes(Paths.get("src/main/resources/email-template.html")));

        // Replace placeholders like {{title}} and {{content}}
        for (Map.Entry<String, String> entry : placeholders.entrySet()) {
            content = content.replace("{{" + entry.getKey() + "}}", entry.getValue());
        }

        return content;

    }
}
