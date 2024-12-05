package com.novo.repos;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.novo.entities.Journey;

@Repository
public interface JourneyRepository extends JpaRepository<Journey, Integer> {
	
	public List<Journey> findByTitle(String title);
	public List<Journey> findByStartDate(Date startDate);
	public List<Journey> findByEndDate(Date endDate);
	
	// Esegue una query dove conta il numero di journeyRequest all'interno di Journey
    @Query("SELECT COUNT(DISTINCT j.journeyRequest) FROM Journey j ")
	public int countByJourneyRequest();
}
