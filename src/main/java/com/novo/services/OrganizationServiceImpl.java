package com.novo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.novo.entities.*;
import com.novo.repos.KeeperRepository;
import com.novo.repos.OrganizationRepository;
import java.util.List;

@Service
public class OrganizationServiceImpl implements OrganizationService {

    @Autowired
    private OrganizationRepository organizationRepository;
    @Autowired
    private KeeperRepository keeperRepository;

	// Returns all Organizations
    @Override
    public List<Organization> findAll() {
        return organizationRepository.findAll();
    }
    
	// Returns Organization by its id, if it does not exist, throws an exception
    @Override
    public Organization findById(int id) {
        return organizationRepository.findById(id).orElseThrow(() -> new RuntimeException("Organization not found with id: " + id));
    }

	// Adds a Organization by requested parameters
    @Override
    public Organization addOrganization(String name, String type, String address, String phone, String email, int keeperId) {
    	// If the id keeper is not found, it throws an exception.
        Keeper keeper = keeperRepository.findById(keeperId).orElseThrow(() -> new RuntimeException("Keeper not found with id: " + keeperId));

        Organization organization = new Organization();
        organization.setName(name);
        organization.setType(type);
        organization.setAddress(address);
        organization.setPhone(phone);
        organization.setEmail(email);
        organization.setKeeper(keeper);
        organizationRepository.save(organization);
        List<Organization> newOrganizations = organizationRepository.findAll();
        return newOrganizations.get(newOrganizations.size() - 1);
    }
 
    // Updates an existing organization by requested parameters
    @Override
    public Organization updateOrganization(int id, String name, String type, String address, String phone, String email, int keeperId) {
  	    // If the organization is not found, it throws an exception.
        Organization existingOrganization = organizationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Organization not found with id: " + id));
  	    // If the keeper is not found, it throws an exception.
        Keeper keeper = keeperRepository.findById(keeperId)
                .orElseThrow(() -> new RuntimeException("Keeper not found with id: " + keeperId));

        existingOrganization.setName(name);
        existingOrganization.setType(type);
        existingOrganization.setAddress(address);
        existingOrganization.setPhone(phone);
        existingOrganization.setEmail(email);
        existingOrganization.setKeeper(keeper);
        return organizationRepository.save(existingOrganization);
    }

	// Deletes an existing Organization
    @Override
    public void deleteOrganization(int id) {
        organizationRepository.deleteById(id);
    }
}
