package com.bookworm.oopbackend;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document("payments")
public class Payment {
    @Id
    private String uid;

    private String paymentMethodName;
    private String account;
    private boolean isCredit;
    private LocalDateTime createdAt;

    public Payment (String paymentMethodName, String account, boolean isCredit) {
        this.paymentMethodName = paymentMethodName;
        this.account = account;
        this.isCredit = isCredit;
        this.createdAt = LocalDateTime.now();
    }
}