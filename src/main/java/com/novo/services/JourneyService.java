package com.novo.services;

import java.time.LocalDate;
import java.util.List;

import com.novo.entities.Journey;

public interface JourneyService {
	
	List<Journey> findALL();
	List<Journey> filteredJourney(String title, LocalDate startDate, LocalDate endDate);
	Journey findById(int JourneyId);
	Journey save(String title, String annotations, LocalDate startdate, LocalDate endDate, int keeperId);
	Journey update(int journeyId, String title, String annotations, LocalDate startdate, LocalDate endDate, int keeperId);
	boolean delete(int JourneyId);

}
