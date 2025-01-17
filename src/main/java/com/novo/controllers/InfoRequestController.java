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
    public ResponseEntity<List<InfoRequest>> getAllInfoRequest() {
        try {
            List<InfoRequest> listInfoRequest = infoRequestService.getInfoRequests();
            return ResponseEntity.ok(listInfoRequest);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.noContent().build();
        }
    }

    // Creates a new InfoRequest
    @PostMapping("/api/pub/createInfoRequest")
    public ResponseEntity<InfoRequest> createInfoRequest(@RequestParam String email,
                                         @RequestParam String title,
                                         @RequestParam String content) {
            InfoRequest savedInfoRequest = new InfoRequest();
        try {
            if(adminService.validateEmail(email)){
                throw new Error("L'email non ha un formato idoneo.");
            }
            savedInfoRequest.setEmail(email);
            savedInfoRequest.setTitle(title);
            savedInfoRequest.setContent(content);
            infoRequestService.addInfoRequest(savedInfoRequest);
        }catch(Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
        try {
            String object= "Richiesta informazioni: " + savedInfoRequest.getTitle();
            String body= "La richiesta è stata registrata";
            javaMailSenderService.sendMail(savedInfoRequest.getEmail(),object,body);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
            return ResponseEntity.ok(savedInfoRequest);
    }

    // Deletes existing InfoRequest
    @DeleteMapping("/api/pub/deleteInfoRequest")
    public ResponseEntity<Boolean> deleteInfoRequest(@RequestParam int infoRequestId) {
        try {
                if(!infoRequestService.deleteInfoRequest(infoRequestId)){
                    throw new Exception("Richiesta non trovata.");
                }
                return ResponseEntity.ok(true);
        } catch (Exception e) {
                e.printStackTrace();
                return ResponseEntity.badRequest().body(false);
        }
    }
}
