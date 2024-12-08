package com.novo.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.novo.entities.Journey;
import com.novo.repos.JourneyRepository;

@Service
public class JourneyServiceImpl implements JourneyService {

	@Autowired
	private JourneyRepository journeyRepo;
	
	@Override
	public List<Journey> findALL() {
	    return journeyRepo.findAll(); // Returns all journeys 
	}

	// Returns all journeys sorted by a specific field
	@Override
	public List<Journey> findALLSorted(String sort, boolean desc) {
	    
		// Defines direction sort  
	    Sort.Direction direction = desc ? Sort.Direction.DESC : Sort.Direction.ASC;

	    // Checks validate fields
	    if (!sort.equals("title") && !sort.equals("startDate") && !sort.equals("endDate")) {
	        throw new IllegalArgumentException("Invalid sorted field : " + sort);
	    }

	    // Returns ordered list
	    return journeyRepo.findAll(Sort.by(direction, sort));
	}


	// Returns journeys based on provided parameters
	@Override
	public List<Journey> filterByParam(HashMap<String, String> filters, List<Journey> list) {
		
	    // If there are not filters, returns whole list
	    if (checkHashNull(filters)) {
	        return list;
	    }

	    List<Journey> filteredList = new ArrayList<>(list);

	    // Filter by title
	    if (filters.get("title") != null && !filters.get("title").isEmpty()) {
	        filteredList = filteredList.stream()
	            .filter(journey -> containsIgnoreCase(journey.getTitle(), filters.get("title")))
	            .toList();
	    }

	    // Filter by startDate
	    if (filters.get("startDate") != null) {
	        try {
	            LocalDate startDateFilter = LocalDate.parse(filters.get("startDate"));
	            filteredList = filteredList.stream()
	                .filter(journey -> journey.getStartDate() != null && journey.getStartDate().equals(startDateFilter))
	                .toList();
	        } catch (Exception e) {
	            System.out.println("Invalid format: " + filters.get("startDate"));
	        }
	    }

	    // Filter by endDate
	    if (filters.get("endDate") != null) {
	        try {
	            LocalDate endDateFilter = LocalDate.parse(filters.get("endDate"));
	            filteredList = filteredList.stream()
	                .filter(journey -> journey.getEndDate() != null && journey.getEndDate().equals(endDateFilter))
	                .toList();
	        } catch (Exception e) {
	            System.out.println("Invalid format: " + filters.get("endDate"));
	        }
	    }

	    return filteredList; // Returns filtered list
	}


	// Checks if all values in the filter are null
	@Override
	public boolean checkHashNull(HashMap<String, String> filters) {
		   int count = 0;
	        for (String i : filters.keySet()) {
	            if(filters.get(i) == null)
	                count++;
	        }
	        return count == filters.size(); // Returns true if all values are null
	}

	// Returns the filtered cards based on the provided parameters
	@Override
	public List<Journey> findByParam(String title, LocalDate startDate, LocalDate endDate, String sort, boolean desc) {
		
	    // Applies sort if requested
	    Sort.Direction direction = desc ? Sort.Direction.DESC : Sort.Direction.ASC;
	    List<Journey> journeys = (sort != null)
	        ? journeyRepo.findAll(Sort.by(direction, sort))
	        : journeyRepo.findAll();

	    // Filters list based on the provided parameters
	    return journeys.stream()
	            .filter(journey -> title == null || containsIgnoreCase(journey.getTitle(), title))
	            .filter(journey -> startDate == null || (journey.getStartDate() != null && journey.getStartDate().equals(startDate)))
	            .filter(journey -> endDate == null || (journey.getEndDate() != null && journey.getEndDate().equals(endDate)))
	            .toList();
	}

	 // Checks if a string contains another string in a case-insensitive manner
	@Override
	public boolean containsIgnoreCase(String str, String check) {
	   if (check == null || check.length() == 0)
	       return true; // If the string to check is empty, return true
	   return str.toLowerCase().contains(check.toLowerCase()); // Returns true if it contains
	}

	// Checks how many parameters are not null
	@Override
    public int checkNull(String title, LocalDate startDate, LocalDate endDate) {
        int i = 0;
        if (title != null)
            i++;
        if (startDate != null)
            i++;
        if (endDate != null)
            i++;
        return i; // Returns the count of non-null parameters
    }
    
    // Returns a journey by its ID
    @Override
    public Journey findById(int journeyId) {
        return journeyRepo.findById(journeyId).orElse(null);
    }
}
