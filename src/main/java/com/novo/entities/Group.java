package com.novo.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;


@Entity
@Table(name = "`groups`")
public class Group {
	
	@Column(name = "id")
	@Id
	private int id;
	
	@Column(name = "minors")
	private int minors;
	
	@Column(name = "adults")
	private int adults;
	
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

	public int getMinors() {
		return minors;
	}

	public void setMinors(int minors) {
		this.minors = minors;
	}

	public int getAdults() {
		return adults;
	}

	public void setAdults(int adults) {
		this.adults = adults;
	}

	public Keeper getKeeper() {
		return keeper;
	}

	public void setKeeper(Keeper keeper) {
		this.keeper = keeper;
	}
}
