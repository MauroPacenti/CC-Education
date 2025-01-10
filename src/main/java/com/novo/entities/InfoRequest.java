package com.novo.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;


@Entity
@Table(name = "info_requests")
public class InfoRequest {
    @Schema(hidden = true)
    @Id
    @Column(name = "id") // "id" column
    private int id;

    @Column(name = "email") // "email" column
    private String email;

    @Column(name = "title") // "title" column
    private String title;

    @Column(name = "content", columnDefinition = "TEXT") // "content" column
    private String content;

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
