package com.bookworm.oopbackend;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document("ledgers")
public class Ledger {
    @Id
    private String uid;

    private String name;
    private String purpose;
    private String account;
    private LocalDateTime createdAt;
    private boolean active;

    public Ledger (String name, String purpose, String account, boolean active) {
        this.name = name;
        this.purpose = purpose;
        this.account = account;
        this.active = active;
        this.createdAt = LocalDateTime.now();
    }
}