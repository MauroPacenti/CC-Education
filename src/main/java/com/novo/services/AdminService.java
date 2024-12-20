package com.novo.services;

import com.novo.entities.Admin;

public interface AdminService {
    void saveTemporaryCredentials(String password, String email);
    void saveNewCredentials();
    void resetPassword(String email, String newPassword);
    Admin getAdmin();
    Admin getTemp();
    String generatePassword();
    boolean validatePassword(String password);
    boolean validateEmail(String email);

}
