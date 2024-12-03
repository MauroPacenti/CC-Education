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


    @Override
    public void saveTemporaryCredentials(String newPassword, String newEmail) {
        Admin temp = adminRepo.findById("temp").get();
        temp.setPassword(newPassword);
        temp.setEmail(newEmail);
        String oldEmail = adminRepo.findById("admin").get().getEmail();
        if(!newEmail.equals(oldEmail)){
            //save security codes into security_check and emails old and new adresses
            //securityActivation(newEmail, oldEmail);
            adminRepo.save(temp);
        }
        else{
            //save security codes into security_check and emails admin address
            //securityActivation(oldEmail);
            adminRepo.save(temp);
        }
    }

    @Override
    public void saveNewCredentials() {
        Admin admin = adminRepo.findById("temp").get();
        admin.setUsername("admin");
        adminRepo.save(admin);
    }

    @Override
    public boolean securityCheck(String oldEmailCode) {
        //Retrieves security code from security_check table and confronts it with the code given
        return false;
    }

    @Override
    public boolean securityCheck(String oldEmailCode, String newEmailCode) {
        //Retrieves security codes from security_check table and confronts them with the codes given
        return false;
    }


    //Retrieves admin
    @Override
    public Admin getAdmin() {
        return adminRepo.findAll().get(0);
    }

    //Responsable to validate password changes
    @Override
    public boolean validatePassword(String password) {
        // Regex pattern for validation (at least a number, a special char, an upper char and a lower char)
        String regex = "(?=.*[0-9])(?=.*[!@#$%^&*.\\-_])(?=.*[A-Z])(?=.*[a-z])[A-Za-z0-9!@#$%^&*.\\-_]{12,}$";
        Pattern pattern = Pattern.compile(regex);

        return pattern.matcher(password).matches();
    }

    //Responsable to validate email changes
    @Override
    public void validateEmail(String email) {
        //It must email the new address with a code,
        //the code must be inserted to confirm the change
    }

    //Responsable to validate username changes
    @Override
    public boolean validateUsername(String username) {
        return false;
    }
}
