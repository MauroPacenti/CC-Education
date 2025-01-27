package com.novo.services;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired; 
import org.springframework.stereotype.Service;

import com.novo.entities.Journey;
import com.novo.entities.Keeper;
import com.novo.repos.JourneyRepository;
import com.novo.repos.KeeperRepository;

@Service
public class JourneyServiceImpl implements JourneyService {

	@Autowired
	private JourneyRepository journeyRepo;
	
	@Autowired
	private KeeperRepository keeperRepo;
	
	// Returns all journeys 
	@Override
	public List<Journey> findALL() {
	    return journeyRepo.findAll(); 
	}
	
	// Returns journey filters
	@Override
	public List<Journey> filteredJourney(String title, LocalDateTime startDate, LocalDateTime endDate){
	    return journeyRepo.findAll()
			.stream()
			.filter(j -> {
			     // Ensure both dates are provided
				if(endDate != null && startDate != null) {
					return (j.getEndDate().isEqual(endDate)&& j.getStartDate().isEqual(startDate));
				}
				else {
					return true;
				}
			})
			.filter(j -> {
			     // Ensure title is provided
				if(title != null && !title.isEmpty()) {
					return j.getTitle().equals(title);
				}
				else {
					return true;
				}
			})
			.toList();
	}
	
    // Returns a journey by its ID, if it doesn't find it, it returns null
    @Override
    public Journey findById(int journeyId) {
        return journeyRepo.findById(journeyId).orElse(null);
    }
    
    // Saves Journey by requested parameters
    @Override
    public Journey addJourney(String title, String annotations, LocalDateTime startDate, LocalDateTime endDate, int keeperId) {
    	// Validate title
    	if (title == null || title.isEmpty()) {
            throw new IllegalArgumentException("Title cannot be null or empty");
        }
    	// Validate date
        if (startDate == null || endDate == null || startDate.isAfter(endDate)) {
            throw new IllegalArgumentException("Invalid date range: Start date must be before or equal to end date");
        }
        // If the keeper is not found, it throws an exception.
        Keeper keeper = keeperRepo.findById(keeperId).orElseThrow(() -> 
    	      new IllegalArgumentException("Journey with ID " + keeperId + " not found.")
    	);
        
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
    public Journey updateJourney(int journeyId, String title, String annotations, LocalDateTime startDate, LocalDateTime endDate, int keeperId) {
    	
  	    // If the journey is not found, it throws an exception.
    	Journey journey = journeyRepo.findById(journeyId).orElseThrow(() -> 
        	new IllegalArgumentException("Journey with ID " + journeyId + " not found.")
        );
  	    // If the keeper is not found, it throws an exception.
    	Keeper keeper = keeperRepo.findById(keeperId).orElseThrow(() -> 
	        new IllegalArgumentException("Journey with ID " + keeperId + " not found.")
    	);
    	// Ensure title is provided
    	if(title != null && !title.isEmpty()) {
    		journey.setTitle(title);
    	}
    	 // Ensure annotations is provided
    	if(annotations != null && !annotations.isEmpty()) {
        	journey.setAnnotations(annotations);
        }
    	 // Ensure startDate is provided
    	if(startDate != null) {
        	journey.setStartDate(startDate);
        }
    	 // Ensure endDate is provided
    	if(endDate != null) {
        	journey.setEndDate(endDate);
        }
    	 // Ensure keeper is provided
    	if(keeper != null) {
    		journey.setKeeper(keeper);
    	}
    	
    	return journeyRepo.save(journey);
    }
    
    // Delete Journey by its ID, if it doesn't find the id, return false
    @Override
    public boolean deleteJourney(int journeyId) {
    	if(journeyRepo.existsById(journeyId)) {
    		journeyRepo.deleteById(journeyId);
    		return true;
    	} else {
    		return false;
    	}
    }

	@Override
	public boolean dateTimeCheck(LocalDateTime startDate, LocalDateTime endDate) {
		// Ensure both dates are provided
		if (startDate == null || endDate == null) {
			return false;
		}

		// Get the current date-time
		LocalDateTime now = LocalDateTime.now();

		// Check if startDate is today or in the future
		if (startDate.isBefore(now)) {
			return false;
		}

		// Ensure endDate is after startDate
		if (!endDate.isAfter(startDate) && !startDate.isEqual(endDate)) {
			return false;
		}
		return true;
	}
}
 
