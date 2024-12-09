package com.novo.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.novo.entities.InfoRequest;

public interface InfoRequestRepository extends JpaRepository<InfoRequest, Integer> {

    List<InfoRequest> findByStatusId(int statusId);

    List<InfoRequest> findByEmail(String email);
    
    // Remove or comment this method if needed
    @Query("SELECT ir FROM InfoRequest ir WHERE ir.email LIKE %:email%")
    List<InfoRequest> searchByEmailLike(@Param("email") String email);

}

