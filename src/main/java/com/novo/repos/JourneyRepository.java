package com.novo.repos;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.novo.entities.Journey;

@Repository
public interface JourneyRepository extends JpaRepository<Journey, Integer> {
	
	List<Journey> findByTitle(String title);
	@Query(value = "SELECT j.id " +
			"FROM Journey j " +
			"WHERE (j.startDate >= :startDate AND j.startDate <= :endDate) OR (j.endDate >= :startDate AND j.endDate <= :endDate)")
	List<Journey> findByDate(@Param("startDate") Date startDate, @Param("endDate") Date endDate);
}
