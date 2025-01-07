package com.novo.services;

import com.novo.entities.Organization;
import java.util.List;

public interface OrganizationService {
    List<Organization> findAll();
    Organization findById(int id);
    Organization save(String name, String type, String address, String phone, String email, int keeperId);
    Organization update(Organization updatedOrganization);
    void delete(int id);
}
