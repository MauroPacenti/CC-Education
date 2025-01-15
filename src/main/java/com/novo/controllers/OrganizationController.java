package com.novo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.novo.entities.Organization;
import com.novo.repos.OrganizationRepository;
import com.novo.services.OrganizationService;

@RestController
@RequestMapping("/api")
public class OrganizationController {
	
	@Autowired
	private OrganizationService organizationService;
	
	@Autowired
	private OrganizationRepository organizationRepository;
	
	// Returns all Organizations
	@GetMapping("pub/getAllOrganization")
	public ResponseEntity<List<Organization>> getAllOrganization(){
		List<Organization> filteredOrganization = organizationService.findAll();
		if(filteredOrganization.isEmpty()) {
			return ResponseEntity.badRequest().build();
		}else {
			return ResponseEntity.ok(filteredOrganization);
		}
	}
	
	// Creates a new Organization
	@PostMapping("pub/createOrganization")
	public ResponseEntity<Organization> createOrganization(@RequestParam(required = false) String name,
										   @RequestParam(required = false) String type,
										   @RequestParam(required = false) String address,
										   @RequestParam(required = false) String phone,
										   @RequestParam(required = false) String email,
										   @RequestParam int keeperId ) {
		try {
			Organization savedOrganization = organizationService.save(name, type, address, phone, email, keeperId);
			return ResponseEntity.ok(savedOrganization);
		}catch(Exception e) {
			return ResponseEntity.badRequest().build();
		}
		
	}
	
	// Updates an existing Organization
	@PutMapping("pub/updateOrganization")
	public ResponseEntity<Organization> updateOrganization(@RequestParam(required = false) String name,
										   @RequestParam(required = false) String type,
										   @RequestParam(required = false) String address,
										   @RequestParam(required = false) String phone,
										   @RequestParam(required = false) String email,
										   @RequestParam int keeperId,
										   @RequestParam int organizationId ) {
		try {
			Organization updatedOrganization = organizationService.update(organizationId, name, type, address, phone, email, organizationId);
			return ResponseEntity.ok(updatedOrganization);
		}catch(Exception e) {
			return ResponseEntity.badRequest().build();
		}
			
	}
	
	// Deletes an existing Organization
	@DeleteMapping("pub/deleteOrganization")
	public ResponseEntity<String> deletedOrganization(@RequestParam int organizationId ) {
		
		try {
			Organization organization = organizationService.findById(organizationId);
			organizationRepository.delete(organization);
			return ResponseEntity.ok("deletion successful");
		}catch(Exception e) {
			return ResponseEntity.noContent().build();
		}
		
    }
	
}
