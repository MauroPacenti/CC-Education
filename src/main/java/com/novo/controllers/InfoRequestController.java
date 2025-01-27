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
@RequestMapping("/api")
public class InfoRequestController {
    @Autowired
    private InfoRequestService infoRequestService;
    @Autowired
    private AdminService adminService;
    @Autowired
    private JavaMailSenderService javaMailSenderService;

    // Returns all infoRequests or, in case of an empty list, throws an exception
    @GetMapping("/auth/getAllInfoRequest")
    public ResponseEntity<List<InfoRequest>> getAllInfoRequest() {
        try {
            List<InfoRequest> listInfoRequest = infoRequestService.getInfoRequests();
            return ResponseEntity.ok(listInfoRequest);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.noContent().build();
        }
    }

    // Creates a new infoRequest
    @PostMapping("/pub/createInfoRequest")
    public ResponseEntity<InfoRequest> createInfoRequest(@RequestParam String email,
                                         @RequestParam String title,
                                         @RequestParam String content) {
    	
            InfoRequest savedInfoRequest = new InfoRequest();
        try {
        	// Validate email
            if(adminService.validateEmail(email)){
                throw new Error("L'email non ha un formato idoneo.");
            }
            // Set the info request, and if there is an error, throw an exception
            savedInfoRequest.setEmail(email);
            savedInfoRequest.setTitle(title);
            savedInfoRequest.setContent(content);
            infoRequestService.addInfoRequest(savedInfoRequest);
        }catch(Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
        try {
        	// Result of the infoRequest, if error, generates an exception
            String object= "Richiesta informazioni: " + savedInfoRequest.getTitle();
            String body= "La richiesta è stata registrata";
            javaMailSenderService.sendMail(savedInfoRequest.getEmail(),object,body);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
            return ResponseEntity.ok(savedInfoRequest);
    }

    // Deletes existing InfoRequest, if no request is found, throws an exception
    @DeleteMapping("/auth/deleteInfoRequest")
    public ResponseEntity<Boolean> deleteInfoRequest(@RequestParam int infoRequestId) {
        try {
             if(!infoRequestService.deleteInfoRequest(infoRequestId)){
                throw new Exception("Richiesta non trovata.");
             }
             	return ResponseEntity.ok(true);
        }catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.badRequest().body(false);
        }
    }
}
