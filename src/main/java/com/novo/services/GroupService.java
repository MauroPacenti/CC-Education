package com.novo.services;

import java.util.List;

import com.novo.entities.Group;

public interface GroupService {

	List<Group> findALL();
	Group findById(int groupId);
	Group save(int minors, int adults, int keeperId);
	Group update(int groupId, int minors, int adults, int keeperId);
	boolean delete(int groupId);
}
