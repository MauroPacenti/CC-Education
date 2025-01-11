package com.novo.controllers;

import com.novo.entities.InfoRequest;
import com.novo.services.AdminService;
import com.novo.services.InfoRequestService;
import com.novo.services.JavaMailSenderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class InfoRequestController {
    @Autowired
    private InfoRequestService infoRequestService;
    @Autowired
    private AdminService adminService;
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
    public ResponseEntity<InfoRequest> createInfoRequest(@RequestParam String email,
                                         @RequestParam String title,
                                         @RequestParam String content) {

        InfoRequest savedInfoRequest = new InfoRequest();
        if(adminService.validateEmail(email)){
            throw new Error("L'email non ha un formato idoneo.");
        }
        savedInfoRequest.setEmail(email);
        savedInfoRequest.setTitle(title);
        savedInfoRequest.setContent(content);

        try {
            infoRequestService.addInfoRequest(savedInfoRequest);
        	String object= "Richiesta informazioni: " + savedInfoRequest.getTitle();
            String body= "La richiesta è stata registrata";
            javaMailSenderService.sendMail(savedInfoRequest.getEmail(),object,body);
            return ResponseEntity.ok(savedInfoRequest);
        }catch(Exception e) {
        	new Exception("Error to send email");
            return ResponseEntity.badRequest().build();
        }
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
