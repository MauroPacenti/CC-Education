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

    // Returns all Infos
    @GetMapping("pub/getAllInfoRequest")
    public ResponseEntity<List<InfoRequest>> getAllInfoRequest() {
        List<InfoRequest> filteredInfoRequest = infoRequestService.getInfoRequests();
        if(filteredInfoRequest.isEmpty()) {
        	return ResponseEntity.badRequest().build();
        }else {
        	return ResponseEntity.ok(filteredInfoRequest);
        }
    }

    // Creates a new InfoRequest
    @PostMapping("pub/createInfoRequest")
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
    @PutMapping("/pub/updateInfoRequest")
    public ResponseEntity<InfoRequest> updateInfoRequest(@RequestParam int infoRequestId,
                                         @RequestParam int statusId) {

    	try {
	        InfoRequest updatedInfoRequest = new InfoRequest();
	        infoRequestService.updateInfoRequest(infoRequestId, statusId);
	        return ResponseEntity.ok(updatedInfoRequest);
    	}catch(Exception e) {
    		return ResponseEntity.badRequest().build();
    	}
    }

    // Deletes existing InfoRequest
    @DeleteMapping("/pub/deleteInfoRequest")
    public ResponseEntity<Boolean> deleteInfoRequest(@RequestParam int infoRequestId) {
        try {
    		boolean deleteInfoRequest = infoRequestService.deleteInfoRequest(infoRequestId);
    		return ResponseEntity.ok(deleteInfoRequest);
    	}catch(Exception e) {
    		return ResponseEntity.noContent().build();
    	}
    }
}
