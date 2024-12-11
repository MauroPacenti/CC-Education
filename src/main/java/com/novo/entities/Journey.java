package com.novo.entities;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;



@Entity
@Table(name = "`journeys`")
public class Journey {
	
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

	@JsonBackReference
	@OneToOne
	@JoinColumn(name = "journey_request_id", referencedColumnName = "id")
	private JourneyRequest journeyRequest;

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

	public JourneyRequest getJourneyRequest() {
		return journeyRequest;
	}

	public void setJourneyRequest(JourneyRequest journeyRequest) {
		this.journeyRequest = journeyRequest;
	}
	
	

}
