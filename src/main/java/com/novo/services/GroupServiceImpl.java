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
	
	// Returns all groups
	@Override
	public List<Group> findALL() {
		return groupRepo.findAll();
	}

	// Returns group by its id, if it doesn't find it, it returns null
	@Override
	public Group findById(int groupId) {
		return groupRepo.findById(groupId).orElse(null);
	}

	// Adds a group by requested parameters
	@Override
	public Group addGroup(int minors, int adults, int keeperId) {
	  // If the keeper is not found, it throws an exception.
	  Keeper keeper = keeperRepo.findById(keeperId).orElseThrow(() -> 
	      new IllegalArgumentException("Journey with ID " + keeperId + " not found.")
	   );
	  
	  Group group = new Group();
	  group.setAdults(adults);
	  group.setMinors(minors);
	  group.setKeeper(keeper);
	  groupRepo.save(group);
	  List<Group> newGroups = groupRepo.findAll();
	  return newGroups.get(newGroups.size() - 1);
	    
	}

	// Updates an existing Group by requested parameters
	@Override
	public Group updateGroup(int groupId, int minors, int adults, int keeperId) {
	     // If the keeper is not found, it throws an exception.
		 Keeper keeper = keeperRepo.findById(keeperId).orElseThrow(() -> 
	      new IllegalArgumentException("Journey with ID " + keeperId + " not found.")
	   );
		 
		 // If the group is not found, it throws an exception.
		 Group group = groupRepo.findById(groupId).orElseThrow(() -> 
	      new IllegalArgumentException("Group with ID " + groupId + " not found.")
	   );
	   
	   group.setAdults(adults);
	   group.setMinors(minors);
	   group.setKeeper(keeper);
	   groupRepo.save(group);
	   group = groupRepo.findById(groupId).orElse(null);
	   return group;
	   
	   }

	// Deletes an existing Group, if it does not exist, throws an exception
	@Override
	public boolean deleteGroup(int groupId) {
		if(groupRepo.existsById(groupId)) {
			groupRepo.deleteById(groupId);
			return true;
		} else {
			return false;
		}
	}

}
