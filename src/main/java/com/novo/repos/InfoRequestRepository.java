package com.novo.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.novo.entities.InfoRequest;

@Repository
public interface InfoRequestRepository extends JpaRepository<InfoRequest, Integer> {

    

}

