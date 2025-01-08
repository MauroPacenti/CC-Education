package com.novo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.novo.entities.Group;
import com.novo.services.GroupService;

@RestController
public class GroupController {
	
	@Autowired
	private GroupService groupService;
	
	@GetMapping("api/pub/getAllGroup")
	public List<Group> getAllGroup(){
		List<Group> filteredGroup = groupService.findALL();
		return filteredGroup;
	}
	
	@PostMapping("api/pub/createGroup")
	public Group createGroup(@RequestParam(required = false) int minors,
							 @RequestParam(required = false) int adults,
							 @RequestParam int keeperId) {
		
		Group savedGroup = groupService.save(minors, adults, keeperId);
		return savedGroup;
		
	}
	
	@PutMapping("api/pub/updateGroup")
	public Group updateGroup(@RequestParam(required = false) int minors,
							 @RequestParam(required = false) int adults,
							 @RequestParam int keeperId,
							 @RequestParam int groupId) {
		
		Group updatedGroup = groupService.update(groupId, minors, adults, keeperId);
		return updatedGroup;
		
	}
	

	@DeleteMapping("api/pub/deleteGroup")
	public boolean deleteGroup(@RequestParam int groupId) {
		
		boolean deletedGroup = groupService.delete(groupId);
		return deletedGroup;
		
	}
}

	

