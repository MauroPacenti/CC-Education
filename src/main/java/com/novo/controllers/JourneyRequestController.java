package com.novo.controllers;

import com.novo.entities.*;
import com.novo.services.GroupService;
import com.novo.services.JavaMailSenderService;
import com.novo.services.JourneyRequestService;
import com.novo.services.KeeperService;
import com.novo.services.OrganizationService;
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
            Keeper newKeeper = keeperService.addKeeper(requestDto.getKeeper());
            Group group = groupService.save(requestDto.getGroup().getMinors(), requestDto.getGroup().getAdults(), newKeeper.getId());
            Organization organization = organizationService.save(requestDto.getOrganization().getName(), requestDto.getOrganization().getType(), requestDto.getOrganization().getAddress(), requestDto.getOrganization().getPhone(), requestDto.getOrganization().getEmail(), newKeeper.getId());
            newKeeper.setGroup(group);
            newKeeper.setOrganization(organization);
            requestDto.getJourneyRequest().setKeeper(newKeeper);
            JourneyRequest journeyRequest = journeyRequestService.addJourneyRequest(requestDto.getJourneyRequest());
            
            try {
            	String emailJourneyRequest = requestDto.getOrganization().getEmail();
            	String contentJourneyRequest = String.format("Hi,\n\nA new journey request it was created for the organization %s (%s).\n"
                        + "Details of journey request: \n\nThanks",
                        organization.getName(),
                        organization.getType(),
                        group.getAdults(),
                        group.getMinors(),
                        journeyRequest.getDuration(),
                        journeyRequest.getStartAvailabilityDate(),
                        journeyRequest.getEndAvailabilityDate()
                        );
            	String titleJourneyRequest = "New journey request created";
            	javaMailSenderService.sendMail(emailJourneyRequest, contentJourneyRequest, titleJourneyRequest); // Sends email with journey request
            }catch(Exception e) {
            	new Exception("Error to send email"); // Throws an exception if there is an error sending the email
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
