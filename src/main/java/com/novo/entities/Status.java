package com.novo.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "statuses")
public class Status {

    @Id
    @Column(name = "id") // "id" column
    private int id;

    @Column(name = "name") // "name" column
    private String name;

//    // OneToMany relation with JourneyRequest
//    @JsonBackReference
//    @OneToMany(mappedBy = "status")
//    private List<JourneyRequest> journeyRequests;
//
//    // OneToMany relation with InfoRequest
//    @JsonBackReference
//    @OneToMany(mappedBy = "status")
//    private List<InfoRequest> infoRequests;

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

//    public List<JourneyRequest> getJourneyRequests() {
//        return journeyRequests;
//    }
//
//    public void setJourneyRequests(List<JourneyRequest> journeyRequests) {
//        this.journeyRequests = journeyRequests;
//    }
//
//    public List<InfoRequest> getInfoRequests() {
//        return infoRequests;
//    }
//
//    public void setInfoRequests(List<InfoRequest> infoRequests) {
//        this.infoRequests = infoRequests;
//    }
}