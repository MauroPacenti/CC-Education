package com.novo.controllers;

import java.time.LocalDateTime;
import java.util.List;

import com.novo.dtos.JourneyDto;
import com.novo.entities.*;
import com.novo.services.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/api")
public class JourneyController {

	@Autowired
	private JourneyService journeyService;
	
	@Autowired
	private JavaMailSenderService javaMailSenderService;
	
	@Autowired 
	private JourneyRequestService journeyRequestService;

	@Autowired
	private AdminService adminService;

	@Autowired
	private KeeperService keeperService;

	@Autowired
	private GroupService groupService;

	@Autowired
	private OrganizationService organizationService;

	// Returns all Journeys
	@GetMapping("/pub/getAllJourney")
	public ResponseEntity<List<Journey>> getAllJourney(
			@RequestParam(required = false) String title,
	        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime startDate,
	        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime endDate) {
		
		List<Journey> filteredJourney = journeyService.filteredJourney(title, startDate, endDate);
		if(filteredJourney.isEmpty()) {
			return ResponseEntity.badRequest().build();
		}else {
			return ResponseEntity.ok(filteredJourney);
		}
	}
	
	// Creates a new Journey
	@PostMapping("/pub/createJourney")
	public ResponseEntity<Journey> createJourney(@RequestParam(required = false) String title,
	        @RequestParam @DateTimeFormat LocalDateTime startDate,
	        @RequestParam @DateTimeFormat LocalDateTime endDate,
	        @RequestParam(required = false) String annotations,
	        @RequestParam int keeperId) {
	   
	    Journey savedJourney;
	    try {
			savedJourney = journeyService.save(title, annotations, startDate, endDate, keeperId);
			JourneyRequest journeyRequest = journeyRequestService.getKeeperId(keeperId);
			if(journeyRequest != null){
				journeyRequestService.deleteJourneyRequest(journeyRequest.getId());
			}
			String object= "Conferma prenotazione: " + savedJourney.getKeeper().getFirstName() + " " + savedJourney.getKeeper().getLastName();
			String body= "La prenotazione è stata confermata";
			javaMailSenderService.sendMail(savedJourney.getKeeper().getEmail(), object, body); // Sends email with journey
			return ResponseEntity.ok(savedJourney);
        }catch(Exception e) {
        	new Exception("Error to send email"); // Throws an exception if there is an error sending the email
			return ResponseEntity.badRequest().build();
        }

	}

	@PostMapping("/api/pub/createJourneyFromAdmin")
	// Creates a new journey from the admin interface
	public ResponseEntity<Journey> createJourneyFromAdmin(@RequestBody JourneyDto journeyDto){
		try {
			if(adminService.validateEmail(journeyDto.getKeeper().getEmail())){
				throw new Error("L'email non ha un formato idoneo.");
			}
			Keeper newKeeper = keeperService.addKeeper(journeyDto.getKeeper());
			Group group = groupService.save(journeyDto.getGroup().getMinors(), journeyDto.getGroup().getAdults(), newKeeper.getId());
			Organization organization = organizationService.save(journeyDto.getOrganization().getName(), journeyDto.getOrganization().getType(), journeyDto.getOrganization().getAddress(), journeyDto.getOrganization().getPhone(), journeyDto.getOrganization().getEmail(), newKeeper.getId());
			newKeeper.setGroup(group);
			newKeeper.setOrganization(organization);
			journeyDto.getJourney().setKeeper(newKeeper);
			Journey journey;
			try {
				journey = journeyService.save(journeyDto.getJourney().getTitle(), journeyDto.getJourney().getAnnotations(), journeyDto.getJourney().getStartDate(), journeyDto.getJourney().getEndDate(), journeyDto.getJourney().getKeeper().getId());
				String object= "Richiesta prenotazione: " + journey.getKeeper().getFirstName() + " " + journey.getKeeper().getLastName();
				String body= "La richiesta è stata registrata";
				javaMailSenderService.sendMail(journeyDto.getKeeper().getEmail(), object, body); // Sends email with journey request
			}catch(Exception e) {
				new Exception("Error to send email");
				return ResponseEntity.badRequest().build();
			}

			return ResponseEntity.ok(journey);
		}
		catch (Exception e){
			return ResponseEntity.badRequest().build();
		}
	}
	
	// Updates existing Journey
	@PutMapping("/pub/updateJourney")
	public ResponseEntity<Journey> updateJourney(@RequestParam(required = false) String title,
		    @RequestParam int journeyId,
	        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime startDate,
	        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime endDate ,
	        @RequestParam(required = false) String annotations,
	        @RequestParam int keeperId) {
	   try {
		   Journey journeyUpdated = journeyService.update(journeyId, title, annotations, startDate, endDate, keeperId);
		   return ResponseEntity.ok(journeyUpdated);
	   }catch(Exception e) {
		   return ResponseEntity.badRequest().build();
	   }
	}
	
	// Deletes existing Journey
	@DeleteMapping("/pub/deleteJourney")
	public ResponseEntity<Boolean> deleteJourney(@RequestParam int journeyId) {
	  
		try {
			boolean deletedJourney = journeyService.delete(journeyId);
			return ResponseEntity.ok(deletedJourney);
		}catch(Exception e) {
			return ResponseEntity.noContent().build();
		}
	    
	   
	}

}

