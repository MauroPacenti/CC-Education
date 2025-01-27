package com.novo.controllers;

import java.time.LocalDateTime;
import java.util.List;

import com.novo.dtos.JourneyDto;
import com.novo.entities.*;
import com.novo.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class JourneyController {

	@Autowired
	private JourneyService journeyService;
	
	@Autowired
	private JavaMailSenderService javaMailSenderService;

	@Autowired
	private AdminService adminService;

	@Autowired
	private KeeperService keeperService;

	@Autowired
	private GroupService groupService;

	@Autowired
	private OrganizationService organizationService;
	
	@Autowired
	private JourneyRequestService journeyRequestService;

	// Returns all Journeys, or in case of an empty list, throws an exception
	@GetMapping("/auth/getAllJourney")
	public ResponseEntity<List<Journey>> getAllJourney(
			@RequestParam(required = false) String title,
	        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime startDate,
	        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime endDate) {
		
		try {
			List<Journey> filteredJourney = journeyService.filteredJourney(title, startDate, endDate);
			return ResponseEntity.ok(filteredJourney);
		}catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.noContent().build();
		}
	}
	
	// Creates a new Journey
	@PostMapping("/auth/createJourney")
	public ResponseEntity<Journey> createJourney(@RequestParam(required = false) String title,
	        @RequestParam @DateTimeFormat LocalDateTime startDate,
	        @RequestParam @DateTimeFormat LocalDateTime endDate,
	        @RequestParam(required = false) String annotations,
	        @RequestParam int keeperId) {
	   
	    Journey savedJourney = new Journey();
	    try {
	    	// Validate email
	    	if(adminService.validateEmail(keeperService.getKeeper(keeperId).get().getEmail())) {
	    		throw new Error("L'email nom ha un formato idoneo.");
	    	}
	    	// Validate date
			if(!journeyService.dateTimeCheck(startDate, endDate)) {
				throw new Error("Le date non sono valide.");
			}
				savedJourney = journeyService.addJourney(title, annotations, startDate, endDate, keeperId);
				// Delete journeyRequest after journey is created
				JourneyRequest journeyRequest = journeyRequestService.getKeeper(keeperId);
				if(journeyRequest != null) {
					journeyRequestService.deleteJourneyRequest(journeyRequest.getId());
				}
	    }catch (Exception e){
	    	e.printStackTrace();
	    	return ResponseEntity.badRequest().build();
	    }
			try {
				// Sending the journey via email, in case of error, generates an exception
				String object= "Conferma prenotazione: " + savedJourney.getKeeper().getFirstName() + " " + savedJourney.getKeeper().getLastName();
				String body= "Gentile " + savedJourney.getKeeper().getFirstName() + " " + savedJourney.getKeeper().getLastName()
						+ ",<br>" +
						"La sua prenotazione è stata confermata" +
						"<h3>Dettagli</h3>"
						+ savedJourney.details();
				javaMailSenderService.sendMail(savedJourney.getKeeper().getEmail(), object, body); // Sends email with journey
        }catch(Exception e) {
        	e.printStackTrace();
			return ResponseEntity.internalServerError().build();
        }
	    return ResponseEntity.ok(savedJourney);
}
	// Creates a new Journey from the admin interface
	@PostMapping("/auth/createJourneyFromAdmin")
	public ResponseEntity<Journey> createJourneyFromAdmin(@RequestBody JourneyDto journeyDto){
		try {
			// Validate email
			if(adminService.validateEmail(journeyDto.getKeeper().getEmail())){
				throw new Error("L'email non ha un formato idoneo.");
			}
			// Validate date
			if(!journeyService.dateTimeCheck(journeyDto.getJourney().getStartDate(), journeyDto.getJourney().getEndDate())) {
				throw new Error("Le date non sono valide.");
			}
			Keeper newKeeper = keeperService.addKeeper(journeyDto.getKeeper());
			Group group = groupService.addGroup(journeyDto.getGroup().getMinors(), journeyDto.getGroup().getAdults(), newKeeper.getId());
			Organization organization = organizationService.addOrganization(journeyDto.getOrganization().getName(), journeyDto.getOrganization().getType(), journeyDto.getOrganization().getAddress(), journeyDto.getOrganization().getPhone(), journeyDto.getOrganization().getEmail(), newKeeper.getId());
			newKeeper.setGroup(group);
			newKeeper.setOrganization(organization);
			journeyDto.getJourney().setKeeper(newKeeper);
		}catch (Exception e){
			return ResponseEntity.badRequest().build();
		}
			Journey journey;
			try {
				// Sending the Journey via email, in case of error, generates an exception
				journey = journeyService.addJourney(journeyDto.getJourney().getTitle(), journeyDto.getJourney().getAnnotations(), journeyDto.getJourney().getStartDate(), journeyDto.getJourney().getEndDate(), journeyDto.getJourney().getKeeper().getId());
				String object= "Richiesta prenotazione: " + journey.getKeeper().getFirstName() + " " + journey.getKeeper().getLastName();
				String body= "Gentile " + journeyDto.getKeeper().getFirstName() + " " + journeyDto.getKeeper().getLastName()
						+ ",<br>" +
						"La sua prenotazione è stata confermata" +
						"<h3>Dettagli</h3>"
						+ journeyDto.getJourney().details();
				javaMailSenderService.sendMail(journeyDto.getKeeper().getEmail(), object, body); // Sends email with journey request
			}catch(Exception e) {
				e.printStackTrace();
				return ResponseEntity.internalServerError().build();
			}
			return ResponseEntity.ok(journey);
	}
	
	// Updates existing Journey, in case of error, generates an exception
    @PutMapping("/auth/updateJourney")
	public ResponseEntity<Journey> updateJourney(@RequestBody JourneyDto journeyDto) {
		try {
			// Validate email
			if (adminService.validateEmail(journeyDto.getKeeper().getEmail())) {
				throw new Error("L'email non ha un formato idoneo.");
			}
			// Validate date
			if(!journeyService.dateTimeCheck(journeyDto.getJourney().getStartDate(), journeyDto.getJourney().getEndDate())) {
				throw new Error("Le date non sono valide.");
			}
			Journey journey;
			try {
				// Update the journey
				Keeper newKeeper = keeperService.updateKeeper(journeyDto.getKeeper().getId(), journeyDto.getKeeper());
				Group group = groupService.updateGroup(journeyDto.getGroup().getId(), journeyDto.getGroup().getMinors(), journeyDto.getGroup().getAdults(), newKeeper.getId());
				Organization organization = organizationService.updateOrganization(journeyDto.getOrganization().getId(), journeyDto.getOrganization().getName(), journeyDto.getOrganization().getType(), journeyDto.getOrganization().getAddress(), journeyDto.getOrganization().getPhone(), journeyDto.getOrganization().getEmail(), newKeeper.getId());
				newKeeper.setGroup(group);
				newKeeper.setOrganization(organization);
				journeyDto.getJourney().setKeeper(newKeeper);
				journey = journeyService.updateJourney(journeyDto.getJourney().getId(), journeyDto.getJourney().getTitle(), journeyDto.getJourney().getAnnotations(), journeyDto.getJourney().getStartDate(), journeyDto.getJourney().getEndDate(), journeyDto.getJourney().getKeeper().getId());
			} catch (Exception e) {
				e.printStackTrace();
				return ResponseEntity.badRequest().build();
			}

			return ResponseEntity.ok(journey);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().build();
		}
	}

	// Deletes existing Journey, if no request is found, throws an exception
	@DeleteMapping("/auth/deleteJourney")
	public ResponseEntity<Boolean> deleteJourney(@RequestParam int journeyId) {
	try {
		if(!journeyService.deleteJourney(journeyId)) {
			throw new Exception("Richiesta non trovata.");
		}
		return ResponseEntity.ok(true);
	}catch(Exception e) {
		e.printStackTrace();
		return ResponseEntity.badRequest().body(false);
	}
	}
}

