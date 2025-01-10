package com.novo.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.novo.Interfaces.Searchable;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;


@Entity
@Table(name = "`keepers`")
public class Keeper implements Searchable {
	@Schema(hidden = true)
	@Id
	@Column(name = "id")
	private int id;
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "cf")
	private String cf;
	
	@Column(name = "phone")
	private String phone;

	@Schema(hidden = true)
	@OneToOne(mappedBy = "keeper", cascade = CascadeType.ALL)
	private Group group;

	@Schema(hidden = true)
	@OneToOne(mappedBy = "keeper", cascade = CascadeType.ALL)
	private Organization organization;


	public Organization getOrganization() {
		return organization;
	}

	public void setOrganization(Organization organization) {
		this.organization = organization;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String first_name) {
		this.firstName = first_name;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String last_name) {
		this.lastName = last_name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getCf() {
		return cf;
	}

	public void setCf(String cf) {
		this.cf = cf;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Group getGroup() {
		return group;
	}

	public void setGroup(Group group) {
		this.group = group;
	}

	@Override
	public boolean search(String word) {
        return (this.email.contains(word)
				|| this.cf.contains(word)
				|| this.firstName.contains(word)
				|| this.lastName.contains(word)
				|| this.organization.getName().contains(word));
    }
}
