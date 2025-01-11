package com.novo.controllers;

import com.novo.entities.InfoRequest;
import com.novo.services.InfoRequestService;
import com.novo.services.JavaMailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class InfoRequestController {
    @Autowired
    private InfoRequestService infoRequestService;
    
    @Autowired
    private JavaMailSenderService javaMailSenderService;

    // Returns all Infos
    @GetMapping("/api/pub/getAllInfoRequest")
    public List<InfoRequest> getAllInfoRequest() {
        List<InfoRequest> listInfoRequest = infoRequestService.getInfoRequests();
        return listInfoRequest;
    }

    // Creates a new InfoRequest
    @PostMapping("/api/pub/createInfoRequest")
    public InfoRequest createInfoRequest(@RequestParam String email,
                                         @RequestParam String title,
                                         @RequestParam String content) {

        InfoRequest savedInfoRequest = new InfoRequest();
        savedInfoRequest.setEmail(email);
        savedInfoRequest.setTitle(title);
        savedInfoRequest.setContent(content);
        infoRequestService.addInfoRequest(savedInfoRequest);
        
        try {
        	javaMailSenderService.sendMail(savedInfoRequest.getEmail(),savedInfoRequest.getTitle(),savedInfoRequest.getContent()); // Sends email with info request
        }catch(Exception e) {
        	new Exception("Error to send email"); // Throws an exception if there is an error sending the email
        }
        
        return savedInfoRequest;
    }

    // Updates existing InfoRequest
    @PutMapping("/api/pub/updateInfoRequest")
    public InfoRequest updateInfoRequest(@RequestParam int infoRequestId,
                                         @RequestParam int statusId) {

        InfoRequest updatedInfoRequest = new InfoRequest();
        infoRequestService.updateInfoRequest(infoRequestId, statusId);
        return updatedInfoRequest;
    }

    // Deletes existing InfoRequest
    @DeleteMapping("/api/pub/deleteInfoRequest")
    public boolean deleteInfoRequest(@RequestParam int infoRequestId) {
        return infoRequestService.deleteInfoRequest(infoRequestId);
    }
}
