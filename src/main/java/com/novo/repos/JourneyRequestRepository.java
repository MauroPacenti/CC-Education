package com.novo.repos;

import com.novo.entities.JourneyRequest;

import java.util.Date;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface JourneyRequestRepository extends JpaRepository<JourneyRequest, Integer> {
	
	@Query("SELECT jr FROM JourneyRequest jr WHERE jr.startAvailabilityDate >= :start AND jr.endAvailabilityDate <= :end")
    List<JourneyRequest> findByDateRange(@Param("start") Date start, @Param("end") Date end);
	
	@Query("SELECT jr FROM JourneyRequest jr WHERE jr.startAvailabilityDate >= :start")
	List<JourneyRequest> findByStartDate(@Param("start") Date start);
	
	@Query("SELECT jr FROM JourneyRequest jr WHERE jr.endAvailabilityDate <= :end")
    List<JourneyRequest> findByEndDate(@Param("end") Date end);

    List<JourneyRequest> findByKeeperId(Integer keeperId);

    List<JourneyRequest> findByStatusId(Integer statusId);
    
    // Remove or comment this method if needed
    @Modifying
    @Transactional
    @Query("UPDATE JourneyRequest jr SET jr.statusId = :statusId WHERE jr.id = :id")
    void updateStatus(@Param("id") Integer id, @Param("statusId") Integer statusId);
}
