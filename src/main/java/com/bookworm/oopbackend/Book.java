package com.bookworm.oopbackend;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document("book")
public class Book {
    @Id
    private String uid;

    private String title;
    private String author_name;
    private String publisher;
    private String posted_student_uid;
    private String year;
    private LocalDateTime createdAt;
    private boolean available;
    private String edition;

    Book (String title, String author_name, String publisher, String posted_student_uid, String year, boolean available, String edition) {
        this.title = title;
        this.author_name = author_name;
        this.publisher = publisher;
        this.posted_student_uid = posted_student_uid;
        this.year = year;
        this.createdAt = LocalDateTime.now();
        this.available = available;
        this.edition = edition;
    }

}