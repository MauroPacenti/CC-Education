package com.novo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
	@GetMapping("pub/getAllGroup")
	public ResponseEntity <List<Group>> getAllGroup(){
		try {
			List<Group> filteredGroup = groupService.findALL();
			return ResponseEntity.ok(filteredGroup);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.noContent().build();
		}
	}
	
	// Updates an existing Group
	@PutMapping("pub/updateGroup")
	public ResponseEntity<Group> updateGroup(@RequestParam(required = false) int minors,
											 @RequestParam(required = false) int adults,
											 @RequestParam int keeperId,
											 @RequestParam int groupId) {
		try{
			Group updatedGroup = groupService.updateGroup(groupId, minors, adults, keeperId);
			return ResponseEntity.ok(updatedGroup);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().build();
		}
	}
}

	

