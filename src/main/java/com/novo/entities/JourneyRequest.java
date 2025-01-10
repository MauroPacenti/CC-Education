package com.novo.entities;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "journey_requests")
public class JourneyRequest {

    @Id
    @Column(name = "id") // "id" column
    private int id;

    @ManyToOne
    @JoinColumn(name = "keeper_id")
    private Keeper keeper; // Foreign key for "keeper_id" column

    @Column(name = "start_availability_date") // "start_availability_date" column 
    @Temporal(TemporalType.DATE)
    private LocalDate startAvailabilityDate;

    @Column(name = "end_availability_date") // "end_availability_date" column
    @Temporal(TemporalType.DATE)
    private LocalDate endAvailabilityDate;

    @Column(name = "duration") // "duration" column
    private int duration;

    @Schema(hidden = true)
    @ManyToOne
    @JoinColumn(name = "status_id") // Foreign key for "status_id" column
    private Status status;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Keeper getKeeper() {
        return keeper;
    }

    public void setKeeper(Keeper keeper) {
        this.keeper = keeper;
    }

    public LocalDate getStartAvailabilityDate() {
        return startAvailabilityDate;
    }

    public void setStartAvailabilityDate(LocalDate startAvailabilityDate) {
        this.startAvailabilityDate = startAvailabilityDate;
    }

    public LocalDate getEndAvailabilityDate() {
        return endAvailabilityDate;
    }

    public void setEndAvailabilityDate(LocalDate endAvailabilityDate) {
        this.endAvailabilityDate = endAvailabilityDate;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
	