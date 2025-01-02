package com.novo.repos;

import com.novo.entities.JourneyRequest;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface JourneyRequestRepository extends JpaRepository<JourneyRequest, Integer> {
	
}
