package com.bookworm.oopbackend;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface SavedBooksRepository extends MongoRepository <SavedBooks, String> {
}
