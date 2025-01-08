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

    @Override
    public List<Organization> findAll() {
        return organizationRepository.findAll();
    }

    @Override
    public Organization findById(int id) {
        return organizationRepository.findById(id).orElseThrow(() -> new RuntimeException("Organization not found with id: " + id));
    }

    @Override
    public Organization save(String name, String type, String address, String phone, String email, int keeperId) {
        Keeper keeper = keeperRepository.findById(keeperId).orElseThrow(() -> new RuntimeException("Keeper not found with id: " + keeperId));

        Organization organization = new Organization();
        organization.setName(name);
        organization.setType(type);
        organization.setAddress(address);
        organization.setPhone(phone);
        organization.setEmail(email);
        organization.setKeeper(keeper);

        return organizationRepository.save(organization);
    }

    @Override
    public Organization update(int id, String name, String type, String address, String phone, String email, int keeperId) {
        Organization existingOrganization = organizationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Organization not found with id: " + id));
        
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

    @Override
    public void delete(int id) {
        organizationRepository.deleteById(id);
    }
}
