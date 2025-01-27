package com.novo.repos;

import com.novo.entities.JourneyRequest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

// Repository for the journeyRequest using jpaRepository 
@Repository
public interface JourneyRequestRepository extends JpaRepository<JourneyRequest, Integer> {
	
	// Search for journeyRequest by keeper id
	public JourneyRequest findByKeeperId(int keeperId);
	
}
