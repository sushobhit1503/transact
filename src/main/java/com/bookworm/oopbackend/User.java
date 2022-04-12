package com.bookworm.oopbackend;
import lombok.Data;
import org.apache.tomcat.jni.Local;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@Document ("user")
public class User {
    @Id
    private String uid;

    private String name;
    private String email;
    private String address;
    private String password;
    private String username;
    private long phone_number;
    private LocalDateTime createdAt;
    private int wallet;
    private boolean admin;

    public User (String name, String email, String address, String password, String username, long phone_number, int wallet, boolean admin) {
        this.name = name;
        this.email = email;
        this.address = address;
        this.password = password;
        this.username = username;
        this.phone_number = phone_number;
        this.createdAt = LocalDateTime.now();
        this.wallet = wallet;
        this.admin = admin;
    }
}