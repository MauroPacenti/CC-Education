package com.novo.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.novo.entities.Journey;
import com.novo.entities.Keeper;
import com.novo.services.JourneyService;

@RestController
public class JourneyController {

	@Autowired
	private JourneyService journeyService;

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
	@GetMapping("/api/pub/createJourney")
	public Journey createJourney(@RequestParam(required = false) String title,
	        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
	        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate ,
	        @RequestParam(required = false) String annotations,
	        @RequestParam Keeper keeper) {
	   
	    Journey savedJourney = journeyService.save(title, annotations, startDate, endDate, keeper);
	    
	    return savedJourney;
	}
	
	// Updates existing Journey
	@GetMapping("/api/pub/updateJourney")
	public Journey updateJourney(@RequestParam(required = false) String title,
		    @RequestParam int journeyId,
	        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
	        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate ,
	        @RequestParam(required = false) String annotations,
	        @RequestParam Keeper keeper) {
	   
	    Journey updatedJourney = journeyService.update(journeyId, title, annotations, startDate, endDate, keeper);
	    
	    return updatedJourney;
	}
	
	// Deletes existing Journey
	@GetMapping("/api/pub/deleteJourney")
	public boolean deleteJourney(@RequestParam int journeyId) {
	   boolean deletedJourney = journeyService.delete(journeyId);
	    
	    return deletedJourney;
	}

}

