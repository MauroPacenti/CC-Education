package com.novo.services;


import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service;

import com.novo.entities.Journey;
import com.novo.entities.Keeper;
import com.novo.repos.JourneyRepository;

@Service
public class JourneyServiceImpl implements JourneyService {

	@Autowired
	private JourneyRepository journeyRepo;
	
	@Override
	public List<Journey> findALL() {
	    return journeyRepo.findAll(); // Returns all journeys 
	}
	
	// Returns journey filters
	@Override
	public List<Journey> filteredJourney(String title, LocalDate startDate, LocalDate endDate)
	{
	    return journeyRepo.findAll()
			.stream()
			.filter(j -> {
				if(endDate != null && startDate != null) {
					return (j.getEndDate().isEqual(endDate)&& j.getStartDate().isEqual(startDate));
				}
				else {
					return true;
				}
			})
			.filter(j -> {
				
				if(title != null && !title.isEmpty()) {
					return j.getTitle().equals(title);
				}
				else {
					return true;
				}
			})
			.toList();
	}
	
    // Returns a journey by its ID
    @Override
    public Journey findById(int journeyId) {
        return journeyRepo.findById(journeyId).orElse(null);
    }
    
    // Saves Journey by requested parameters
    @Override
    public Journey save(String title, String annotations, LocalDate startDate, LocalDate endDate, Keeper keeper) {
    	
    	if (title == null || title.isEmpty()) {
            throw new IllegalArgumentException("Title cannot be null or empty");
        }
        if (startDate == null || endDate == null || startDate.isAfter(endDate)) {
            throw new IllegalArgumentException("Invalid date range: Start date must be before or equal to end date");
        }
        
    	Journey journey = new Journey();
    	journey.setTitle(title);
    	journey.setAnnotations(annotations);
    	journey.setStartDate(startDate);
    	journey.setEndDate(endDate);
    	journey.setKeeper(keeper);
    	
    	return journeyRepo.save(journey);
    }
    
    // Updates existing Journey by requested parameters
    @Override
    public Journey update(int journeyId, String title, String annotations, LocalDate startDate, LocalDate endDate, Keeper keeper) {
    	
    	Journey journey = journeyRepo.findById(journeyId).orElseThrow(() -> 
        	new IllegalArgumentException("Journey with ID " + journeyId + " not found.")
        );

    	if(title != null && !title.isEmpty()) {
    		journey.setTitle(title);
    	}
    	if(annotations != null && !annotations.isEmpty()) {
        	journey.setAnnotations(annotations);
        }
    	if(startDate != null) {
        	journey.setStartDate(startDate);
        }
    	if(endDate != null) {
        	journey.setEndDate(endDate);
        }
    	if(keeper != null) {
    		journey.setKeeper(keeper);
    	}
    	
    	return journeyRepo.save(journey);
    }
    
    // Delete Journey by its ID
    @Override
    public boolean delete(int journeyId) {
    	if(journeyRepo.existsById(journeyId)) {
    		journeyRepo.deleteById(journeyId);
    		return true;
    	} else {
    		return false;
    	}
    }
}
 
