package com.bookworm.oopbackend;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface RequestsRepository extends MongoRepository <Requests, String> {

}
