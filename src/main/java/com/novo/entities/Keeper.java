package com.novo.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "`keepers`")
public class Keeper {
	
	@Id
	@Column(name = "id")
	private int id;
	
	@Column(name = "first_name")
	private String first_name;
	
	@Column(name = "last_name")
	private String last_name;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "cf")
	private String cf;
	
	@Column(name = "phone")
	private String phone;

	@JsonManagedReference
	@OneToOne(mappedBy = "keeper")
	private Group group;

}
