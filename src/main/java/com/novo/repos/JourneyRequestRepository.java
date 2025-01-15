package com.novo.repos;

import com.novo.entities.JourneyRequest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JourneyRequestRepository extends JpaRepository<JourneyRequest, Integer> {
	
	public JourneyRequest findByKeeperId(int keeperId);
	
}
