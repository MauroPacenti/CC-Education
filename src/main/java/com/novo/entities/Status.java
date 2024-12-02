package com.novo.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "statuses")
public class Status {

    @Id
    @Column(name = "id") // "id" column
    private int id;

    @Column(name = "name") // "name" column
    private String name;

    // OneToMany relation with JourneyRequest
    @JsonBackReference
    @OneToMany(mappedBy = "status")
    private List<JourneyRequest> journeyRequests;

    // OneToMany relation with InfoRequest
    @JsonBackReference
    @OneToMany(mappedBy = "status")
    private List<InfoRequest> infoRequests;
}