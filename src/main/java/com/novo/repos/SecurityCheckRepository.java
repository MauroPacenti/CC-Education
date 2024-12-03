package com.novo.repos;

import com.novo.entities.SecurityCheck;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SecurityCheckRepository extends JpaRepository<SecurityCheck, Integer> {
}
