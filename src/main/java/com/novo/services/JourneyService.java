package com.novo.services;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import com.novo.entities.Journey;

public interface JourneyService {
	
	List<Journey> findALL();
	List<Journey> findALLSorted(String sort, boolean desc);
	List<Journey> filterByParam(HashMap<String, String> filter, List<Journey> list);
	boolean checkHashNull(HashMap<String, String> filter);
	List<Journey> findByParam(String title, LocalDate startDate, LocalDate endDate, String sort, boolean desc);
	boolean containsIgnoreCase(String str, String check);
	int checkNull(String title, LocalDate startDate, LocalDate endDate);
	Journey findById(int JourneyId);

}
