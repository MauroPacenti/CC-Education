package com.novo.entities;

import java.sql.Date;

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
@Table(name = "journeys")
public class Journey {
	
	@Column(name = "id")
	@Id
	private int id;
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "annotations")
	private String annotations;
	
	@Column(name = "start_date")
	private Date start_date;
	
	@Column(name = "end_date")
	private Date end_date;
	
	@OneToOne
	@JoinColumn(name = "journey_request_id", referencedColumnName = "id")
	private Journey_request journey_request_id;

}
