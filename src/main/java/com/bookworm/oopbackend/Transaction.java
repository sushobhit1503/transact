package com.bookworm.oopbackend;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Data
@Document("transactions")
public class Transaction {
    @Id
    private String uid;
    
    private String itemName;
    private String shopName;
    private int amount;
    private String ledger;
    private String account;
    private String paymentMethod;
    private LocalDateTime createdAt;
    private LocalDate date;
    private String category;
    private boolean credit;
    private String creditPerson;
    private boolean lent;

    public Transaction (String itemName, String shopName, int amount, String ledger, String account,String paymentMethod, LocalDate date, String category, boolean credit, boolean lent, String creditPerson) {
        this.itemName = itemName;
        this.shopName = shopName;
        this.amount = amount;
        this.ledger = ledger;
        this.account = account;
        this.createdAt = LocalDateTime.now();
        this.paymentMethod = paymentMethod;
        this.date = date;
        this.category = category;
        this.credit = credit;
        this.creditPerson = creditPerson;
        this.lent = lent;
    }
}
