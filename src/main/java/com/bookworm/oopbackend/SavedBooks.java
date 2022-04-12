package com.bookworm.oopbackend;

import lombok.Data;
import org.apache.tomcat.jni.Local;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document ("savedbooks")
public class SavedBooks {
    @Id
    private String uid;

    private String title;
    private String author_name;
    private String posted_by_uid;
    private LocalDateTime savedAt;
    private boolean available;
    private String book_uid;
    private String saved_by;

    SavedBooks (String title, String author_name, String posted_by_uid, boolean available, String book_uid, String saved_by) {
        this.title = title;
        this.author_name = author_name;
        this.posted_by_uid = posted_by_uid;
        this.savedAt = LocalDateTime.now();
        this.available = available;
        this.book_uid = book_uid;
        this.saved_by = saved_by;
    }
}
