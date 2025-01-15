package com.novo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.novo.entities.Organization;
import com.novo.services.OrganizationService;

@RestController
public class OrganizationController {
	
	@Autowired
	private OrganizationService organizationService;
	
	// Returns all Organizations
	@GetMapping("api/pub/getAllOrganization")
	public List<Organization> getAllOrganization(){
		List<Organization> filteredOrganization = organizationService.findAll();
		return filteredOrganization;
	}
	
	// Creates a new Organization
	@PostMapping("api/pub/createOrganization")
	public Organization createOrganization(@RequestParam(required = false) String name,
										   @RequestParam(required = false) String type,
										   @RequestParam(required = false) String address,
										   @RequestParam(required = false) String phone,
										   @RequestParam(required = false) String email,
										   @RequestParam int keeperId ) {
		
		Organization savedOrganization = organizationService.save(name, type, address, phone, email, keeperId);
		return savedOrganization;
		
	}
	
	// Updates an existing Organization
	@PutMapping("api/pub/updateOrganization")
	public Organization updateOrganization(@RequestParam(required = false) String name,
										   @RequestParam(required = false) String type,
										   @RequestParam(required = false) String address,
										   @RequestParam(required = false) String phone,
										   @RequestParam(required = false) String email,
										   @RequestParam int keeperId,
										   @RequestParam int organizationId ) {
		
		Organization updatedOrganization = organizationService.update(organizationId, name, type, address, phone, email, organizationId);
		return updatedOrganization;
		
	}
	
	// Deletes an existing Organization
	@DeleteMapping("api/pub/deleteOrganization")
	public void deletedOrganization(@RequestParam int organizationId ) {
		
		organizationService.delete(organizationId);
    }
	
}
