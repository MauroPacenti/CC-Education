package com.novo.controllers;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.novo.entities.Group;
import com.novo.entities.Journey;
import com.novo.entities.Organization;
import com.novo.services.JavaMailSenderService;
import com.novo.services.JourneyService;

@RestController
public class JourneyController {

	@Autowired
	private JourneyService journeyService;
	
	@Autowired
	private JavaMailSenderService javaMailSenderService;

	// Returns all Journeys
	@GetMapping("/api/pub/getAllJourney")
	public List<Journey> getAllJourney(
			@RequestParam(required = false) String title,
	        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime startDate,
	        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime endDate) {
		
		List<Journey> listJourney = journeyService.filteredJourney(title, startDate, endDate);
		return listJourney;
	}
	
	// Creates a new Journey
	@PostMapping("/api/pub/createJourney")
	public ResponseEntity<Journey> createJourney(@RequestParam(required = false) String title,
	        @RequestParam @DateTimeFormat LocalDateTime startDate,
	        @RequestParam @DateTimeFormat LocalDateTime endDate,
	        @RequestParam(required = false) String annotations,
	        @RequestParam int keeperId) {
	   
	    Journey savedJourney;
	    try {
			savedJourney = journeyService.save(title, annotations, startDate, endDate, keeperId);
			String object= "Conferma prenotazione: " + savedJourney.getKeeper().getFirstName() + " " + savedJourney.getKeeper().getLastName();
			String body= "La prenotazione è stata confermata";
			javaMailSenderService.sendMail(savedJourney.getKeeper().getEmail(), object, body); // Sends email with journey
			return ResponseEntity.ok(savedJourney);
        }catch(Exception e) {
        	new Exception("Error to send email"); // Throws an exception if there is an error sending the email
			return ResponseEntity.badRequest().build();
        }

	}
	
	// Updates existing Journey
	@PutMapping("/api/pub/updateJourney")
	public Journey updateJourney(@RequestParam(required = false) String title,
		    @RequestParam int journeyId,
	        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime startDate,
	        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime endDate ,
	        @RequestParam(required = false) String annotations,
	        @RequestParam int keeperId) {
	   
	    Journey updatedJourney = journeyService.update(journeyId, title, annotations, startDate, endDate, keeperId);
	    
	    return updatedJourney;
	}
	
	// Deletes existing Journey
	@DeleteMapping("/api/pub/deleteJourney")
	public boolean deleteJourney(@RequestParam int journeyId) {
	   boolean deletedJourney = journeyService.delete(journeyId);
	    
	    return deletedJourney;
	}

}

