package com.novo.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "`organizations`")
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
	
	@JsonBackReference
	@OneToOne
	@JoinColumn(name = "keeper_id", referencedColumnName = "id")
	private Keeper keeper;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Keeper getKeeper() {
		return keeper;
	}

	public void setKeeper(Keeper keeper) {
		this.keeper = keeper;
	}
}
