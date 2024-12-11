package com.novo.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.novo.entities.Journey;
import com.novo.services.JourneyService;

@RestController
public class JourneyController {

	@Autowired
	private JourneyService service;
	
	@GetMapping("/api/pub/getJourney")
	public List<Journey> getJourney(
			@RequestParam(required = false) String title,
	        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
	        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
		
		List<Journey> list = service.filteredJourney(title, startDate, endDate);
		System.out.println(list);
		return list;
	}
}
