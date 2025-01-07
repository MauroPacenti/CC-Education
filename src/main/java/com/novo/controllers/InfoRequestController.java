package com.novo.controllers;

import com.novo.entities.InfoRequest;
import com.novo.services.InfoRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
public class InfoRequestController {
    @Autowired
    private InfoRequestService infoRequestService;

    // Returns all Infos
    @GetMapping("/api/pub/getAllInfoRequest")
    public List<InfoRequest> getAllInfoRequest() {
        List<InfoRequest> listInfoRequest = infoRequestService.getInfoRequests();
        return listInfoRequest;
    }

    // Creates a new InfoRequest
    @GetMapping("/api/pub/createInfoRequest")
    public InfoRequest createInfoRequest(@RequestParam String email,
                                         @RequestParam String title,
                                         @RequestParam String content) {

        InfoRequest savedInfoRequest = new InfoRequest();
        savedInfoRequest.setEmail(email);
        savedInfoRequest.setTitle(title);
        savedInfoRequest.setContent(content);
        infoRequestService.addInfoRequest(savedInfoRequest);
        return savedInfoRequest;
    }

    // Updates existing InfoRequest
    @GetMapping("/api/pub/updateInfoRequest")
    public InfoRequest updateInfoRequest(@RequestParam int infoRequestId,
                                         @RequestParam(required = false) int statusIdD) {

        InfoRequest updatedInfoRequest = new InfoRequest();
        updatedInfoRequest.setStartAvailabilityDate(startAvailabilityDate);
        updatedInfoRequest.setEndAvailabilityDate(endAvailabilityDate);
        updatedInfoRequest.setDuration(duration);
        updatedInfoRequest.setKeeper(keeperService.getKeeper(keeperId).get());
        infoRequestService.updateInfoRequest(infoRequestId, updatedInfoRequest);
        return updatedInfoRequest;
    }

    // Deletes existing InfoRequest
    @GetMapping("/api/pub/deleteInfoRequest")
    public boolean deleteInfoRequest(@RequestParam int infoRequestId) {
        return infoRequestService.deleteInfoRequest(infoRequestId);
    }
}
