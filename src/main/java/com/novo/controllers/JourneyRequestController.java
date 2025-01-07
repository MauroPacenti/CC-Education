package com.novo.controllers;

import com.novo.entities.JourneyRequest;
import com.novo.services.JourneyRequestService;
import com.novo.services.KeeperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
public class JourneyRequestController {
    @Autowired
    private JourneyRequestService journeyRequestService;
    @Autowired
    private KeeperService keeperService;

    // Returns all Journeys
    @GetMapping("/api/pub/getAllJourneyRequest")
    public List<JourneyRequest> getAllJourneyRequest() {
        List<JourneyRequest> listJourneyRequest = journeyRequestService.getJourneyRequests();
        return listJourneyRequest;
    }

    // Creates a new JourneyRequest
    @GetMapping("/api/pub/createJourneyRequest")
    public JourneyRequest createJourneyRequest(@RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startAvailabilityDate,
                                               @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endAvailabilityDate,
                                               @RequestParam int duration,
                                               @RequestParam int keeperId) {

        JourneyRequest savedJourneyRequest = new JourneyRequest();
        savedJourneyRequest.setStartAvailabilityDate(startAvailabilityDate);
        savedJourneyRequest.setEndAvailabilityDate(endAvailabilityDate);
        savedJourneyRequest.setDuration(duration);
        savedJourneyRequest.setKeeper(keeperService.getKeeper(keeperId).get());
        journeyRequestService.addJourneyRequest(savedJourneyRequest);
        return savedJourneyRequest;
    }

    // Updates existing JourneyRequest
    @GetMapping("/api/pub/updateJourneyRequest")
    public JourneyRequest updateJourneyRequest(@RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startAvailabilityDate,
                                               @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endAvailabilityDate,
                                               @RequestParam(required = false) int duration,
                                               @RequestParam(required = false) int keeperId,
                                               @RequestParam int journeyRequestId) {

        JourneyRequest updatedJourneyRequest = new JourneyRequest();
        updatedJourneyRequest.setStartAvailabilityDate(startAvailabilityDate);
        updatedJourneyRequest.setEndAvailabilityDate(endAvailabilityDate);
        updatedJourneyRequest.setDuration(duration);
        updatedJourneyRequest.setKeeper(keeperService.getKeeper(keeperId).get());
        journeyRequestService.updateJourneyRequest(journeyRequestId, updatedJourneyRequest);
        return updatedJourneyRequest;
    }

    // Deletes existing JourneyRequest
    @GetMapping("/api/pub/deleteJourneyRequest")
    public boolean deleteJourneyRequest(@RequestParam int journeyRequestId) {
        return journeyRequestService.deleteJourneyRequest(journeyRequestId);
    }
}
