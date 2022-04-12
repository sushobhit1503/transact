package com.bookworm.oopbackend;

import lombok.Data;
import org.springframework.cglib.core.Local;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Data
@Document("transaction")
public class Transaction {
    @Id
    private String uid;
    private String payee;
    private String book_name;
    private LocalDateTime late_date;
    private int cost;
    private LocalDateTime createdAt;
    private String transaction_by;

    Transaction (String payee, String book_name, int cost, String transaction_by, LocalDateTime last_date ) {
        this.payee = payee;
        this.book_name = book_name;
        this.cost = cost;
        this.transaction_by = transaction_by;
        this.late_date = last_date;
        this.createdAt = LocalDateTime.now();
        this.transaction_by = transaction_by;
    }
}
