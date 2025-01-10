package com.novo.entities;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "`security_check`")
public class SecurityCheck {
    @Schema(hidden = true)
    @Id
    private int id;

    @Column(name = "old_email_code")
    private String oldEmailCode;

    @Column(name = "new_email_code")
    private String newEmailCode;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getOldEmailCode() {
        return oldEmailCode;
    }

    public void setOldEmailCode(String oldEmailCode) {
        this.oldEmailCode = oldEmailCode;
    }

    public String getNewEmailCode() {
        return newEmailCode;
    }

    public void setNewEmailCode(String newEmailCode) {
        this.newEmailCode = newEmailCode;
    }
}
