package com.novo.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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
	        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
	        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
		
		List<Journey> listJourney = journeyService.filteredJourney(title, startDate, endDate);
		return listJourney;
	}
	
	// Creates a new Journey
	@PostMapping("/api/pub/createJourney")
	public Journey createJourney(@RequestParam(required = false) String title,
	        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
	        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate ,
	        @RequestParam(required = false) String annotations,
	        @RequestParam int keeperId) {
	   
	    Journey savedJourney = journeyService.save(title, annotations, startDate, endDate, keeperId);
	    try {
	    	Organization organization = new Organization();
	    	Group group = new Group();
        	String emailJourney = organization.getEmail();
        	String contentJourney = String.format("Hi,\n\nA new journey it was created for the organization %s (%s).\n"
                    + "Details of journey: \nThanks",
                    organization.getName(),
                    organization.getType(),
                    group.getAdults(),
                    group.getMinors(),
                    savedJourney.getStartDate(),
                    savedJourney.getEndDate(),
                    savedJourney.getAnnotations());
        	String titleJourney = savedJourney.getTitle();
        	javaMailSenderService.sendMail(emailJourney, contentJourney, titleJourney); // Sends email with journey
        }catch(Exception e) {
        	new Exception("Error to send email"); // Throws an exception if there is an error sending the email
        }
	    
	    return savedJourney;
	}
	
	// Updates existing Journey
	@PutMapping("/api/pub/updateJourney")
	public Journey updateJourney(@RequestParam(required = false) String title,
		    @RequestParam int journeyId,
	        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
	        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate ,
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

