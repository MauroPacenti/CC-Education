package com.novo.services;

import com.novo.entities.Organization;
import java.util.List;

public interface OrganizationService {
	
    List<Organization> findAll();
    Organization findById(int id);
    Organization addOrganization(String name, String type, String address, String phone, String email, int keeperId);
    Organization updateOrganization(int organizationId, String name, String type, String address, String phone, String email, int keeperId);
    void deleteOrganization(int id);
}
