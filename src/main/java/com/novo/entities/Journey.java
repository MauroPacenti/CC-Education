package com.novo.entities;

import java.time.LocalDate;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "`journeys`")
public class Journey {
	@Schema(hidden = true)
	@Column(name = "id")
	@Id
	private int id;
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "annotations")
	private String annotations;
	
	@Column(name = "start_date")
	private LocalDate startDate;
	
	@Column(name = "end_date")
	private LocalDate endDate;

	@Schema(hidden = true)
	@OneToOne
	@JoinColumn(name = "keeper_id", referencedColumnName = "id")
	private Keeper keeper;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getAnnotations() {
		return annotations;
	}

	public void setAnnotations(String annotations) {
		this.annotations = annotations;
	}

	public LocalDate getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}

	public LocalDate getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}

	public Keeper getKeeper() {
		return keeper;
	}

	public void setKeeper(Keeper keeper) {
		this.keeper = keeper;
	}
}
