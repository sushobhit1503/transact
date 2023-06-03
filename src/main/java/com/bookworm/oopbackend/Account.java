package com.bookworm.oopbackend;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document ("accounts")
public class Account {
    @Id
    private String uid;

    private String bankName;
    private String accountType;
    private LocalDateTime createdAt;

    public Account (String bankName, String accountType) {
        this.bankName = bankName;
        this.accountType = accountType;
        this.createdAt = LocalDateTime.now();
    }
}