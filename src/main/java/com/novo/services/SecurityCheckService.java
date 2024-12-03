package com.novo.services;

public interface SecurityCheckService {
    boolean codeSecurityCheck(String oldEmailCode);
    boolean codeSecurityCheck(String oldEmailCode, String newEmailCode);
    String codeSecurityGeneration();
    void saveCodes(String oldEmailCode, String newEmailCode);
    void saveCodes(String oldEmailCode);
}
