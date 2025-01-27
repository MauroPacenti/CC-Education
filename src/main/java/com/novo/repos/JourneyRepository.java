package com.novo.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.novo.entities.Journey;

// Repository for the journey using jpaRepository
@Repository
public interface JourneyRepository extends JpaRepository<Journey, Integer> { 

}
