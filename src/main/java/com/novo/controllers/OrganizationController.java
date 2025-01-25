package com.novo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.novo.entities.Organization;
import com.novo.services.OrganizationService;

@RestController
@RequestMapping("/api")
public class OrganizationController {
	
	@Autowired
	private OrganizationService organizationService;
	
	// Returns all Organizations
	@GetMapping("pub/getAllOrganization")
	public ResponseEntity<List<Organization>> getAllOrganization(){
		try {
			List<Organization> filteredOrganization = organizationService.findAll();
			return ResponseEntity.ok(filteredOrganization);
		}catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.noContent().build();
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
			Organization updatedOrganization = organizationService.updateOrganization(organizationId, name, type, address, phone, email, organizationId);
			return ResponseEntity.ok(updatedOrganization);
		}catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().build();
		}
		
	}
	
}
