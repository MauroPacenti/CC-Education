package com.novo.services;


import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired; 
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
}
