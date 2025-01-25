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

	// Returns all Journeys
	@GetMapping("pub/getAllJourney")
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
	@PostMapping("pub/createJourney")
	public ResponseEntity<Journey> createJourney(@RequestParam(required = false) String title,
	        @RequestParam @DateTimeFormat LocalDateTime startDate,
	        @RequestParam @DateTimeFormat LocalDateTime endDate,
	        @RequestParam(required = false) String annotations,
	        @RequestParam int keeperId) {
	   
	    Journey savedJourney = new Journey();
	    try {
	    	if(adminService.validateEmail(keeperService.getKeeper(keeperId).get().getEmail())) {
	    		throw new Error("L'email nom ha un formato idoneo.");
	    	}
			if(!journeyService.dateTimeCheck(startDate, endDate)) {
				throw new Error("Le date non sono valide.");
			}
				savedJourney = journeyService.save(title, annotations, startDate, endDate, keeperId);
				JourneyRequest journeyRequest = journeyRequestService.getKeeper(keeperId);
				if(journeyRequest != null) {
					journeyRequestService.deleteJourneyRequest(journeyRequest.getId());
				}
	    }catch (Exception e){
	    	e.printStackTrace();
	    	return ResponseEntity.badRequest().build();
	    }
			try {
				String object= "Conferma prenotazione: " + savedJourney.getKeeper().getFirstName() + " " + savedJourney.getKeeper().getLastName();
				String body= "La prenotazione è stata confermata";
				javaMailSenderService.sendMail(savedJourney.getKeeper().getEmail(), object, body); // Sends email with journey
        }catch(Exception e) {
        	e.printStackTrace();
			return ResponseEntity.internalServerError().build();
        }
	    return ResponseEntity.ok(savedJourney);
}
	
	@PostMapping("pub/createJourneyFromAdmin")
	// Creates a new journey from the admin interface
	public ResponseEntity<Journey> createJourneyFromAdmin(@RequestBody JourneyDto journeyDto){
		try {
			if(adminService.validateEmail(journeyDto.getKeeper().getEmail())){
				throw new Error("L'email non ha un formato idoneo.");
			}
			if(!journeyService.dateTimeCheck(journeyDto.getJourney().getStartDate(), journeyDto.getJourney().getEndDate())) {
				throw new Error("Le date non sono valide.");
			}
			Keeper newKeeper = keeperService.addKeeper(journeyDto.getKeeper());
			Group group = groupService.save(journeyDto.getGroup().getMinors(), journeyDto.getGroup().getAdults(), newKeeper.getId());
			Organization organization = organizationService.save(journeyDto.getOrganization().getName(), journeyDto.getOrganization().getType(), journeyDto.getOrganization().getAddress(), journeyDto.getOrganization().getPhone(), journeyDto.getOrganization().getEmail(), newKeeper.getId());
			newKeeper.setGroup(group);
			newKeeper.setOrganization(organization);
			journeyDto.getJourney().setKeeper(newKeeper);
		}catch (Exception e){
			return ResponseEntity.badRequest().build();
		}
			Journey journey;
			try {
				journey = journeyService.save(journeyDto.getJourney().getTitle(), journeyDto.getJourney().getAnnotations(), journeyDto.getJourney().getStartDate(), journeyDto.getJourney().getEndDate(), journeyDto.getJourney().getKeeper().getId());
				String object= "Richiesta prenotazione: " + journey.getKeeper().getFirstName() + " " + journey.getKeeper().getLastName();
				String body= "La richiesta è stata registrata";
				javaMailSenderService.sendMail(journeyDto.getKeeper().getEmail(), object, body); // Sends email with journey request
			}catch(Exception e) {
				e.printStackTrace();
				return ResponseEntity.internalServerError().build();
			}
			return ResponseEntity.ok(journey);
	}
	
	// Updates existing Journey

	@PutMapping("/api/pub/updateJourney")
	public ResponseEntity<Journey> updateJourney(@RequestBody JourneyDto journeyDto) {
		try {
			if (adminService.validateEmail(journeyDto.getKeeper().getEmail())) {
				throw new Error("L'email non ha un formato idoneo.");
			}
			if(!journeyService.dateTimeCheck(journeyDto.getJourney().getStartDate(), journeyDto.getJourney().getEndDate())) {
				throw new Error("Le date non sono valide.");
			}
			Journey journey;
			try {
				Keeper newKeeper = keeperService.updateKeeper(journeyDto.getKeeper().getId(), journeyDto.getKeeper());
				Group group = groupService.update(journeyDto.getGroup().getId(), journeyDto.getGroup().getMinors(), journeyDto.getGroup().getAdults(), newKeeper.getId());
				Organization organization = organizationService.update(journeyDto.getOrganization().getId(), journeyDto.getOrganization().getName(), journeyDto.getOrganization().getType(), journeyDto.getOrganization().getAddress(), journeyDto.getOrganization().getPhone(), journeyDto.getOrganization().getEmail(), newKeeper.getId());
				newKeeper.setGroup(group);
				newKeeper.setOrganization(organization);
				journeyDto.getJourney().setKeeper(newKeeper);
				journey = journeyService.update(journeyDto.getJourney().getId(), journeyDto.getJourney().getTitle(), journeyDto.getJourney().getAnnotations(), journeyDto.getJourney().getStartDate(), journeyDto.getJourney().getEndDate(), journeyDto.getJourney().getKeeper().getId());
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

	// Deletes existing Journey
	@DeleteMapping("pub/deleteJourney")
	public ResponseEntity<Boolean> deleteJourney(@RequestParam int journeyId) {
	try {
		if(!journeyService.delete(journeyId)) {
			throw new Exception("Richiesta non trovata.");
		}
		return ResponseEntity.ok(true);
	}catch(Exception e) {
		e.printStackTrace();
		return ResponseEntity.badRequest().body(false);
	}
	}
}

