package com.novo.services;

import com.novo.entities.Admin;

public interface AdminService {
    void saveTemporaryCredentials(String password, String email);
    void saveNewCredentials();
    boolean securityCheck(String oldEmailCode);
    boolean securityCheck(String oldEmailCode, String newEmailCode);
    Admin getAdmin();
    boolean validatePassword(String password);
    void validateEmail(String email);
    boolean validateUsername(String username);

}
