package com.bookworm.oopbackend;

import lombok.Data;
import org.apache.tomcat.jni.Local;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document("requests")
public class Requests {
    @Id
    private String uid;

    private String title;
    private LocalDateTime requestedAt;
    private String created_by;
    private boolean pending;
    private String created_by_uid;
    private String book_uid;
    private LocalDateTime returnDate;
    private String location;

    Requests (String title, String created_by, boolean pending, String created_by_uid, String book_uid, String location, LocalDateTime returnDate) {
        this.title = title;
        this.requestedAt = LocalDateTime.now();
        this.pending = pending;
        this.created_by = created_by;
        this.created_by_uid = created_by_uid;
        this.book_uid = book_uid;
        this.returnDate = returnDate;
        this.location = location;
    }
}