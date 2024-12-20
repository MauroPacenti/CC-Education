package com.novo.services;

import com.novo.entities.Admin;

public interface AdminService {
    void saveTemporaryCredentials(String password, String email);
    void saveNewCredentials();
    void resetPassword();
    Admin getAdmin();
    Admin getTemp();
    boolean validatePassword(String password);
    boolean validateEmail(String email);

}
