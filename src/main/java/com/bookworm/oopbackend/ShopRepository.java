package com.bookworm.oopbackend;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ShopRepository extends MongoRepository <Shop, String> {

}
