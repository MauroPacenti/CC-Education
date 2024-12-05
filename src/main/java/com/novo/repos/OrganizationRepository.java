package com.novo.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.novo.entities.Organization;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Integer> {

	public List<Organization> findByName(String name);
	public List<Organization> findByType(String type);
	
	// Esegue una query dove conta il numero di keepers all'interno dell'organizzazione
	@Query("SELECT COUNT(DISTINCT o.keeper) FROM Organization o ")
	public int countByKeeper();
}
