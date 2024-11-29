package com.novo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "organizations")
public class Organization {

	@Id
	@Column(name = "id")
    private int id;
	
	@Column(name = "name")
    private String name;
	
	@Column(name = "type")
    private String type;
	
	@Column(name = "address")
    private String address;
	
	@Column(name = "phone")
    private String phone;
	
	@Column(name = "email")
    private String email;
	
	@OneToOne
	@JoinColumn(name = "keeper_id", referencedColumnName = "id")
	private Keeper keeper_id;
	
}
