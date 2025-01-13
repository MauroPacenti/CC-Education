package com.novo.entities;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;

@Entity
@Table(name = "statuses")
public class Status {
    @Schema(hidden = true)
    @Id
    @Column(name = "id") // "id" column
    private int id;

    @Column(name = "name") // "name" column
    private String name;

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

}