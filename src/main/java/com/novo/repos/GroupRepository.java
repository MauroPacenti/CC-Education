package com.novo.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.novo.entities.Group;

public interface GroupRepository extends JpaRepository<Group, Integer> {
	
	    // Esegue una query dove conta il numero di keepers all'interno dell'organizzazione
		@Query("SELECT COUNT(DISTINCT o.keeper) FROM Organization o ")
		public int countByKeeper();
}
