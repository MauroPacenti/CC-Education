package com.novo.controllers;

import com.novo.dtos.JourneyRequestDto;
import com.novo.entities.*;
import com.novo.repos.KeeperRepository;
import com.novo.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api")
public class JourneyRequestController {
    @Autowired
    private JourneyRequestService journeyRequestService;
    
    @Autowired
    private KeeperService keeperService;

    @Autowired
    private KeeperRepository keeperRepo;

    @Autowired
    private AdminService adminService;
    
    @Autowired
    private GroupService groupService;
    
    @Autowired
    private OrganizationService organizationService;
    
    @Autowired
    private JavaMailSenderService javaMailSenderService;

    // Returns all journeyRequests, or in case of an empty list, throws an exception
    @GetMapping("/auth/getAllJourneyRequest")
    public ResponseEntity<List<JourneyRequest>> getAllJourneyRequest() {
    	try {
    		List<JourneyRequest> listJourneyRequest = journeyRequestService.getJourneyRequests();
    		return ResponseEntity.ok(listJourneyRequest);
    	}catch(Exception e) {
    		e.printStackTrace();
    		return ResponseEntity.noContent().build();
    	}
    }

    // Creates a new journeyRequest
    @PostMapping("/pub/createJourneyRequest")
    public ResponseEntity<JourneyRequest> addJourneyRequest(@RequestBody JourneyRequestDto journeyRequestDto) {

        try {
        	// Validate email
            if(adminService.validateEmail(journeyRequestDto.getKeeper().getEmail())){
                throw new Error("L'email non ha un formato idoneo.");
            }
            // Validate date 
            if(!journeyRequestService.dateCheck(journeyRequestDto.getJourneyRequest().getStartAvailabilityDate(), journeyRequestDto.getJourneyRequest().getEndAvailabilityDate())) {
                throw new Error("Le date non sono valide.");
            }
            Keeper newKeeper = keeperService.addKeeper(journeyRequestDto.getKeeper());
            Group group = groupService.addGroup(journeyRequestDto.getGroup().getMinors(), journeyRequestDto.getGroup().getAdults(), newKeeper.getId());
            Organization organization = organizationService.addOrganization(journeyRequestDto.getOrganization().getName(), journeyRequestDto.getOrganization().getType(), journeyRequestDto.getOrganization().getAddress(), journeyRequestDto.getOrganization().getPhone(), journeyRequestDto.getOrganization().getEmail(), newKeeper.getId());
            newKeeper.setGroup(group);
            newKeeper.setOrganization(organization);
            journeyRequestDto.getJourneyRequest().setKeeper(newKeeper);
        }
            catch (Exception e){
            	return ResponseEntity.badRequest().build();
            }
            JourneyRequest journeyRequest;
            try {
            	// Result of the JourneyRequest, if error, generates an exception
                journeyRequest = journeyRequestService.addJourneyRequest(journeyRequestDto.getJourneyRequest());
                String object= "Richiesta prenotazione: " + journeyRequest.getKeeper().getFirstName() + " " + journeyRequest.getKeeper().getLastName();
                String body= "La richiesta è stata registrata";
            	javaMailSenderService.sendMail(journeyRequestDto.getKeeper().getEmail(), object, body); // Sends email with journey request
            }catch(Exception e) {
            	e.printStackTrace();
            	return ResponseEntity.internalServerError().build();
            }
            
            return ResponseEntity.ok(journeyRequest);
        }

    // Updates existing JourneyRequest
    @PutMapping("/auth/updateJourneyRequest")
    public ResponseEntity<JourneyRequest> updateJourneyRequest(@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startAvailabilityDate,
                                               @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endAvailabilityDate,
                                               @RequestParam(required = false) int duration,
                                               @RequestParam(required = false) int keeperId,
                                               @RequestParam int journeyRequestId) {
        // Validate date
        if(!journeyRequestService.dateCheck(startAvailabilityDate, endAvailabilityDate)){
            throw new Error("Le date non sono valide.");
        }
        JourneyRequest updatedJourneyRequest = new JourneyRequest();
        try {
            // Update the journeyRequest
        	updatedJourneyRequest.setId(journeyRequestId);
        	updatedJourneyRequest.setStartAvailabilityDate(startAvailabilityDate);
        	updatedJourneyRequest.setEndAvailabilityDate(endAvailabilityDate);
        	updatedJourneyRequest.setDuration(duration);
        	updatedJourneyRequest.setKeeper(keeperService.getKeeper(keeperId).get());
        	journeyRequestService.updateJourneyRequest(journeyRequestId, updatedJourneyRequest);
        	return ResponseEntity.ok(updatedJourneyRequest);
       }catch(Exception e) {
    	   e.printStackTrace();
    	   return ResponseEntity.badRequest().build();
       }
    }

    // Deletes existing journeyRequest, if no keeper is found, throws an exception
    @DeleteMapping("/auth/deleteJourneyRequest")
    public ResponseEntity<Boolean> deleteJourneyRequest(@RequestParam int keeperId) {
        try {
            Keeper keeper = keeperService.getKeeper(keeperId).get();
            keeperRepo.delete(keeper);
            return ResponseEntity.ok(true);
        }catch(Exception e) {
        	e.printStackTrace();
        	return ResponseEntity.badRequest().body(false);
        }
    }
}
