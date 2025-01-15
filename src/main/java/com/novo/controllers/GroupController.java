package com.novo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.novo.entities.Group;
import com.novo.services.GroupService;

@RestController
@RequestMapping("/api")
public class GroupController {
	
	@Autowired
	private GroupService groupService;
	
	// Returns all Groups
	@GetMapping("/pub/getAllGroup")
	public ResponseEntity<List<Group>> getAllGroup(){
		List<Group> filteredGroup = groupService.findALL();
		if(filteredGroup.isEmpty()) {
			return ResponseEntity.badRequest().build();
		}else {
			return ResponseEntity.ok(filteredGroup);
		}
	}
	
	// Creates a new Group
	@PostMapping("/pub/createGroup")
	public ResponseEntity<Group> createGroup(@RequestParam(required = false) int minors,
							 @RequestParam(required = false) int adults,
							 @RequestParam int keeperId) {
		
		try {
			Group savedGroup = groupService.save(minors, adults, keeperId);
			return ResponseEntity.ok(savedGroup);
		}catch(Exception e){
			return ResponseEntity.badRequest().build();
		}
		
	}
	
	// Updates an existing Group
	@PutMapping("/pub/updateGroup")
	public ResponseEntity<Group> updateGroup(@RequestParam(required = false) int minors,
							 @RequestParam(required = false) int adults,
							 @RequestParam int keeperId,
							 @RequestParam int groupId) {
		
		try {
			Group updatedGroup = groupService.update(groupId, minors, adults, keeperId);
			return ResponseEntity.ok(updatedGroup);
		}catch(Exception e) {
			return ResponseEntity.badRequest().build();
		}
		
	}
}

	

