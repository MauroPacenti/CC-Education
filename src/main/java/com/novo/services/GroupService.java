package com.novo.services;

import java.util.List;

import com.novo.entities.Group;

public interface GroupService {

	List<Group> findALL();
	Group findById(int groupId);
	Group addGroup(int minors, int adults, int keeperId);
	Group updateGroup(int groupId, int minors, int adults, int keeperId);
	boolean deleteGroup(int groupId);
}
