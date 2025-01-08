package com.novo.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.novo.entities.Status;

@Repository
public interface StatusRepository extends JpaRepository<Status, Integer> {
	
}