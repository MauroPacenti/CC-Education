package com.novo.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "info_requests")
public class InfoRequest {

    @Id
    @Column(name = "id") // "id" column
    private int id;

    @Column(name = "email") // "email" column
    private String email;

    @Column(name = "title") // "title" column
    private String title;

    @Column(name = "content", columnDefinition = "TEXT") // "content" column
    private String content;
    
    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "status_id") // Foreign key for "status_id" column
    private Status status;
}
