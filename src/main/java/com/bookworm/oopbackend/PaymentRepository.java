package com.bookworm.oopbackend;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface PaymentRepository extends MongoRepository <Payment, String>  {
}
