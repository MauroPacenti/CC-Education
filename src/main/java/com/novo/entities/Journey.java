package com.novo.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

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
	private LocalDateTime startDate;
	
	@Column(name = "end_date")
	private LocalDateTime endDate;

	@Schema(hidden = true)
	@OneToOne
	@JoinColumn(name = "keeper_id", referencedColumnName = "id")
	private Keeper keeper;

	public String details() {
		return "<table border='1' cellspacing='0' cellpadding='5'>" +
				"<tr><th colspan='2'>Dettagli</th></tr>" +
				"<tr><td><b>Titolo</b></td><td>" + this.title + "</td></tr>" +
				"<tr><td><b>Responsabile</b></td><td>" + this.keeper.getFirstName() + " " + this.keeper.getLastName() + "</td></tr>" +
				"<tr><td><b>Gruppo</b></td><td>Minori: " + this.keeper.getGroup().getMinors() +
				", Adulti: " + this.keeper.getGroup().getAdults() + "</td></tr>" +
				"<tr><td><b>Organizzazione</b></td><td>" + this.keeper.getOrganization().getName() + "</td></tr>" +
				"<tr><td><b>Data Inizio</b></td><td>" + this.startDate + "</td></tr>" +
				"<tr><td><b>Data Fine</b></td><td>" + this.endDate + "</td></tr>" +
				"<tr><td><b>Annotazioni</b></td><td>" + this.annotations + "</td></tr>" +
				"</table>";
	}

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

	public LocalDateTime getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDateTime startDate) {
		this.startDate = startDate;
	}

	public LocalDateTime getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDateTime endDate) {
		this.endDate = endDate;
	}

	public Keeper getKeeper() {
		return keeper;
	}

	public void setKeeper(Keeper keeper) {
		this.keeper = keeper;
	}
}
