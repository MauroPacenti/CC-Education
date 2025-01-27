package com.novo.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.novo.entities.Organization;

// Repository for the organization using jpaRepository
@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Integer> {

	// Filter by names
	public List<Organization> findByName(String name); 
	
	// Filter by type
	public List<Organization> findByType(String type);
	
	// Executes a query that counts the number of keepers within the organization
	@Query("SELECT COUNT(DISTINCT o.keeper) FROM Organization o ")
	public int countByKeeper();
}
