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
    public Organization update(Organization updatedOrganization) {
        Organization existingOrganization = organizationRepository.findById(updatedOrganization.getId())
                .orElseThrow(() -> new RuntimeException("Organization not found with id: " + updatedOrganization.getId()));

        if (updatedOrganization.getName() != null) {
            existingOrganization.setName(updatedOrganization.getName());
        }
        if (updatedOrganization.getType() != null) {
            existingOrganization.setType(updatedOrganization.getType());
        }
        if (updatedOrganization.getAddress() != null) {
            existingOrganization.setAddress(updatedOrganization.getAddress());
        }
        if (updatedOrganization.getPhone() != null) {
            existingOrganization.setPhone(updatedOrganization.getPhone());
        }
        if (updatedOrganization.getEmail() != null) {
            existingOrganization.setEmail(updatedOrganization.getEmail());
        }
        if (updatedOrganization.getKeeper() != null) {
            Keeper keeper = keeperRepository.findById(updatedOrganization.getKeeper().getId())
                    .orElseThrow(() -> new RuntimeException("Keeper not found with id: " + updatedOrganization.getKeeper().getId()));
            existingOrganization.setKeeper(keeper);
        }

        return organizationRepository.save(existingOrganization);
    }

    @Override
    public void delete(int id) {
        organizationRepository.deleteById(id);
    }
}
