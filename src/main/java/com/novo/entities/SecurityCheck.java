package com.novo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "`security_check`")
public class SecurityCheck {
    @Id
    private int id;

    @Column(name = "old_email_code")
    private String oldEmailCode;

    @Column(name = "new_email_code")
    private String newEmailCode;
}
