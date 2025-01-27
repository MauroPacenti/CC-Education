package com.novo.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.novo.entities.Group;

// Repository for the group using jpaRepository
@Repository
public interface GroupRepository extends JpaRepository<Group, Integer> {
}
