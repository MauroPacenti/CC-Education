package com.novo.repos;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.novo.entities.InfoRequest;

@Repository
public interface InfoRequestRepository extends JpaRepository<InfoRequest, Integer> {

    

}

