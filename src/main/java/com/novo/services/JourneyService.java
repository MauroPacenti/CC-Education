package com.novo.services;

import java.time.LocalDate;
import java.util.List;

import com.novo.entities.Journey;

public interface JourneyService {
	
	List<Journey> findALL();
	List<Journey> filteredJourney(String title, LocalDate startDate, LocalDate endDate);
	Journey findById(int JourneyId);

}
