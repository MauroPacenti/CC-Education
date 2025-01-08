package com.novo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.novo.entities.Group;
import com.novo.entities.Keeper;
import com.novo.repos.GroupRepository;
import com.novo.repos.KeeperRepository;

@Service
public class GroupServiceImpl implements GroupService {

	@Autowired
	private GroupRepository groupRepo;
	
	@Autowired
	private KeeperRepository keeperRepo;
	
	@Override
	public List<Group> findALL() {
		return groupRepo.findAll(); // Returns all groups
	}

	// Returns group by its id
	@Override
	public Group findById(int groupId) {
		return groupRepo.findById(groupId).orElse(null);
	}

	// Saves a group by requested parameters
	@Override
	public Group save(int minors, int adults, int keeperId) {
	  Keeper keeper = keeperRepo.findById(keeperId).orElseThrow(() -> 
	      new IllegalArgumentException("Journey with ID " + keeperId + " not found.")
	   );
	  
	  Group group = new Group();
	  group.setAdults(adults);
	  group.setMinors(minors);
	  group.setKeeper(keeper);
	  
	  return groupRepo.save(group);
	    
	}

	// Updates an existing Group by requested parameters
	@Override
	public Group update(int groupId, int minors, int adults, int keeperId) {
		 Keeper keeper = keeperRepo.findById(keeperId).orElseThrow(() -> 
	      new IllegalArgumentException("Journey with ID " + keeperId + " not found.")
	   );
	   
		 Group group = groupRepo.findById(groupId).orElseThrow(() -> 
	      new IllegalArgumentException("Group with ID " + groupId + " not found.")
	   );
	   
	   group.setAdults(adults);
	   group.setMinors(minors);
	   group.setKeeper(keeper);
	   
	   return groupRepo.save(group);
	   
	   }

	// Deletes an existing Group
	@Override
	public boolean delete(int groupId) {
		if(groupRepo.existsById(groupId)) {
			groupRepo.deleteById(groupId);
			return true;
		} else {
			return false;
		}
	}

}
