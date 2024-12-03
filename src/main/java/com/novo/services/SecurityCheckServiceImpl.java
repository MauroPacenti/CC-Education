package com.novo.services;

import com.novo.repos.SecurityCheckRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SecurityCheckServiceImpl implements SecurityCheckService{
    @Autowired
    SecurityCheckRepository securityCheckRepo;

    @Override
    public boolean codeSecurityCheck(String oldEmailCode) {
        //Retrieves security code from security_check table and confronts it with the code given
        return securityCheckRepo.findById(1).isPresent() &&
                securityCheckRepo.findById(1).get().getOldEmailCode().equals(oldEmailCode);
    }

    @Override
    public boolean codeSecurityCheck(String oldEmailCode, String newEmailCode) {
        //Retrieves security codes from security_check table and confronts them with the codes given
        return securityCheckRepo.findById(1).isPresent() &&
                (securityCheckRepo.findById(1).get().getOldEmailCode().equals(oldEmailCode) &&
                securityCheckRepo.findById(1).get().getNewEmailCode().equals(newEmailCode));
    }
}
