package com.novo.entities;

import jakarta.persistence.*;
import java.util.Date;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
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
    private Date startAvailabilityDate;

    @Column(name = "end_availability_date") // "end_availability_date" column
    @Temporal(TemporalType.DATE)
    private Date endAvailabilityDate;

    @Column(name = "duration") // "duration" column
    private int duration;
  
    @JsonManagedReference
    @OneToOne(mappedBy = "journeyRequest")
    private Journey journey;
  
    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "status_id") // Foreign key for "status_id" column
    private Status status;
}
	
