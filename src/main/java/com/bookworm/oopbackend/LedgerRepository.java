package com.bookworm.oopbackend;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface LedgerRepository extends MongoRepository <Ledger, String> {
}
