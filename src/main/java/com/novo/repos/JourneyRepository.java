package com.novo.repos;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.novo.entities.Journey;

@Repository
public interface JourneyRepository extends JpaRepository<Journey, Integer> { 

}
