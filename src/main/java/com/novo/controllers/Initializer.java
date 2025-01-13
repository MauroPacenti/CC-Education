package com.novo.controllers;

import com.novo.entities.Admin;
import com.novo.entities.Status;
import com.novo.repos.AdminRepository;
import com.novo.repos.StatusRepository;
import com.novo.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class Initializer {
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private AdminService adminService;
    @Autowired
    private StatusRepository statusRepository;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/pub/initialize")
    String initalize(String email){
        String password = ("123456");
        try{
            if(adminService.validateEmail(email)){
                throw new RuntimeException("email non valida");
            }
            if(!adminRepository.findAll().isEmpty() || !statusRepository.findAll().isEmpty()){
                throw new RuntimeException("Il database è già inizializzato");
            }
            Status ricevuta = new Status();
            ricevuta.setId(1);
            ricevuta.setName("Ricevuta");
            Status confermata = new Status();
            confermata.setId(2);
            confermata.setName("confermata");
            Status conclusa = new Status();
            conclusa.setId(3);
            conclusa.setName("conclusa");
            statusRepository.save(ricevuta);
            statusRepository.save(confermata);
            statusRepository.save(conclusa);
            List<Admin> credentialCouple = new ArrayList<Admin>();
            Admin admin= new Admin();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode(password));
            admin.setEmail(email);
            Admin temp= new Admin();
            temp.setUsername("temp");
            temp.setPassword("");
            temp.setEmail("");
            adminRepository.save(admin);
            adminRepository.save(temp);
            return "Inizializzazione completata";
        }
        catch (Exception e){
            return "Inizializzazione fallita: " + e.getMessage();
        }
    }
}
