package com.novo.controllers;

import com.novo.entities.*;
import com.novo.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
public class JourneyRequestController {
    @Autowired
    private JourneyRequestService journeyRequestService;
    
    @Autowired
    private KeeperService keeperService;

    @Autowired
    private AdminService adminService;
    
    @Autowired
    private GroupService groupService;
    
    @Autowired
    private OrganizationService organizationService;
    
    @Autowired
    private JavaMailSenderService javaMailSenderService;

    // Returns all Journeys
    @GetMapping("/api/pub/getAllJourneyRequest")
    public List<JourneyRequest> getAllJourneyRequest() {
        List<JourneyRequest> listJourneyRequest = journeyRequestService.getJourneyRequests();
        return listJourneyRequest;
    }

    // Creates a new JourneyRequest
    @PostMapping("/api/pub/createJourneyRequest")
    public ResponseEntity<JourneyRequest> addJourneyRequest(@RequestBody RequestDto requestDto) {

        try {
            if(adminService.validateEmail(requestDto.getKeeper().getEmail())){
                throw new Error("L'email non ha un formato idoneo.");
            }
            Keeper newKeeper = keeperService.addKeeper(requestDto.getKeeper());
            Group group = groupService.save(requestDto.getGroup().getMinors(), requestDto.getGroup().getAdults(), newKeeper.getId());
            Organization organization = organizationService.save(requestDto.getOrganization().getName(), requestDto.getOrganization().getType(), requestDto.getOrganization().getAddress(), requestDto.getOrganization().getPhone(), requestDto.getOrganization().getEmail(), newKeeper.getId());
            newKeeper.setGroup(group);
            newKeeper.setOrganization(organization);
            requestDto.getJourneyRequest().setKeeper(newKeeper);
            JourneyRequest journeyRequest;
            try {
                journeyRequest = journeyRequestService.addJourneyRequest(requestDto.getJourneyRequest());
                String object= "Richiesta prenotazione: " + journeyRequest.getKeeper().getFirstName() + " " + journeyRequest.getKeeper().getLastName();
                String body= "La richiesta è stata registrata";
            	javaMailSenderService.sendMail(requestDto.getKeeper().getEmail(), object, body); // Sends email with journey request
            }catch(Exception e) {
            	new Exception("Error to send email");
                return ResponseEntity.badRequest().build();
            }
            
            return ResponseEntity.ok(journeyRequest);
        }
        catch (Exception e){
            return ResponseEntity.badRequest().build();
        }
    }

    // Updates existing JourneyRequest
    @PutMapping("/api/pub/updateJourneyRequest")
    public JourneyRequest updateJourneyRequest(@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startAvailabilityDate,
                                               @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endAvailabilityDate,
                                               @RequestParam(required = false) int duration,
                                               @RequestParam(required = false) int keeperId,
                                               @RequestParam int journeyRequestId) {

        JourneyRequest updatedJourneyRequest = new JourneyRequest();
        updatedJourneyRequest.setId(journeyRequestId);
        updatedJourneyRequest.setStartAvailabilityDate(startAvailabilityDate);
        updatedJourneyRequest.setEndAvailabilityDate(endAvailabilityDate);
        updatedJourneyRequest.setDuration(duration);
        updatedJourneyRequest.setKeeper(keeperService.getKeeper(keeperId).get());
        journeyRequestService.updateJourneyRequest(journeyRequestId, updatedJourneyRequest);
        return updatedJourneyRequest;
    }

    // Deletes existing JourneyRequest
    @DeleteMapping("/api/pub/deleteJourneyRequest")
    public boolean deleteJourneyRequest(@RequestParam int journeyRequestId) {
        return journeyRequestService.deleteJourneyRequest(journeyRequestId);
    }
}
