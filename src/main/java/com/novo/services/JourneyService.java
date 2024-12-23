package com.novo.services;

import java.time.LocalDate;
import java.util.List;

import com.novo.entities.Journey;
import com.novo.entities.Keeper;

public interface JourneyService {
	
	List<Journey> findALL();
	List<Journey> filteredJourney(String title, LocalDate startDate, LocalDate endDate);
	Journey findById(int JourneyId);
	Journey save(String title, String annotations, LocalDate startdate, LocalDate endDate, Keeper keeper);
	Journey update(int journeyId, String title, String annotations, LocalDate startdate, LocalDate endDate, Keeper keeper);
	boolean delete(int JourneyId);

}
