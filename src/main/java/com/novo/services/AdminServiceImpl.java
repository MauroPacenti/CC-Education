package com.novo.services;

import com.novo.entities.Admin;
import com.novo.repos.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.regex.Pattern;

@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    private AdminRepository adminRepo;

    // Saves temporary credentials into temp
    @Override
    public void saveTemporaryCredentials(String newPassword, String newEmail) {
        Admin temp = adminRepo.findById("temp").get();
        temp.setPassword(newPassword);
        temp.setEmail(newEmail);
        adminRepo.save(temp);
    }

    // Transfers temp credentials to admin and completes changes
    @Override
    public void saveNewCredentials() {
        Admin temp = adminRepo.findById("temp").get();
        Admin admin = adminRepo.findById("admin").get();
        admin.setEmail(temp.getEmail());
        admin.setPassword(temp.getPassword());
        adminRepo.save(admin);
    }

    // Retrieves admin
    @Override
    public Admin getAdmin() {
        return adminRepo.findAll().get(0);
    }

    // Retrieves temp
    @Override
    public Admin getTemp() {
        return adminRepo.findAll().get(1);
    }

    // Responsable to validate password changes
    @Override
    public boolean validatePassword(String password) {
        // Regex pattern for validation (at least a number, a special char, an upper char and a lower char)
        String regex = "(?=.*[0-9])(?=.*[!@#$%^&*.\\-_])(?=.*[A-Z])(?=.*[a-z])[A-Za-z0-9!@#$%^&*.\\-_]{12,}$";
        Pattern pattern = Pattern.compile(regex);
        return !pattern.matcher(password).matches();
    }

    // Responsable to validate email changes
    @Override
    public boolean validateEmail(String email) {
        // Regex pattern for email validation
        String regex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
        Pattern pattern = Pattern.compile(regex);
        return !pattern.matcher(email).matches();
    }
}
