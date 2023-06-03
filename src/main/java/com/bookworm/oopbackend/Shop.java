package com.bookworm.oopbackend;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document("shops")
public class Shop {
    @Id
    private String uid;

    private String name;
    private String city;
    private LocalDateTime createdAt;

    public Shop (String name, String city) {
        this.name = name;
        this.createdAt = LocalDateTime.now();
        this.city = city;
    }
}