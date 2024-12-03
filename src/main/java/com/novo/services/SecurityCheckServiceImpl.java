package com.novo.services;

import com.novo.entities.SecurityCheck;
import com.novo.repos.SecurityCheckRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class SecurityCheckServiceImpl implements SecurityCheckService{
    @Autowired
    SecurityCheckRepository securityCheckRepo;

    //Retrieves security code from security_check table and confronts it with the code given
    @Override
    public boolean codeSecurityCheck(String oldEmailCode) {
        return securityCheckRepo.findById(1).isPresent() &&
                securityCheckRepo.findById(1).get().getOldEmailCode().equals(oldEmailCode);
    }

    //Retrieves security codes from security_check table and confronts them with the codes given
    @Override
    public boolean codeSecurityCheck(String oldEmailCode, String newEmailCode) {
        return securityCheckRepo.findById(1).isPresent() &&
                (securityCheckRepo.findById(1).get().getOldEmailCode().equals(oldEmailCode) &&
                securityCheckRepo.findById(1).get().getNewEmailCode().equals(newEmailCode));
    }

    //Generates security codes
    @Override
    public String codeSecurityGeneration() {
            Random random = new Random();
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < 9; i++) {
                int digit = random.nextInt(10);
                sb.append(digit);
            }
            return sb.toString();
    }

    //Saves security codes into database
    @Override
    public void saveCodes(String oldEmailCode, String newEmailCode) {
        SecurityCheck securityCheck = new SecurityCheck();
        if(securityCheckRepo.findById(1).isPresent()) {
            securityCheck = securityCheckRepo.findById(1).get();
            securityCheck.setOldEmailCode(oldEmailCode);
            securityCheck.setNewEmailCode(newEmailCode);
        }
        else {
            securityCheck.setId(1);
            securityCheck.setOldEmailCode(oldEmailCode);
            securityCheck.setNewEmailCode(newEmailCode);
        }
        securityCheckRepo.save(securityCheck);
    }

    //Saves security codes into database, sets newEmailCode empty
    @Override
    public void saveCodes(String oldEmailCode) {
        SecurityCheck securityCheck = new SecurityCheck();
        if(securityCheckRepo.findById(1).isPresent()) {
            securityCheck = securityCheckRepo.findById(1).get();
            securityCheck.setOldEmailCode(oldEmailCode);
            securityCheck.setNewEmailCode("");
        }
        else {
            securityCheck.setId(1);
            securityCheck.setOldEmailCode(oldEmailCode);
            securityCheck.setNewEmailCode("");
        }
        securityCheckRepo.save(securityCheck);
    }
}
