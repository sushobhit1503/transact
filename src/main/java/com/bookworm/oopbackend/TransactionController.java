package com.bookworm.oopbackend;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TransactionController {
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    protected MongoTemplate mongoTemplate;

    @CrossOrigin (origins = "http://localhost:3000")
    @GetMapping ("/api/transactions/credit/{user_uid}")
    public List <Transaction> getTransactions (@PathVariable String user_uid) {
        Query query = new Query ();
        query.addCriteria(Criteria.where("transaction_by").is(user_uid));
        return mongoTemplate.find(query, Transaction.class);
    }

    @CrossOrigin (origins = "http://localhost:3000")
    @GetMapping ("/api/transactions/debit/{user_uid}")
    public List <Transaction> getTransactionsDebit (@PathVariable String user_uid) {
        Query query = new Query ();
        query.addCriteria(Criteria.where("payee").is(user_uid));
        return mongoTemplate.find(query, Transaction.class);
    }

    @PostMapping("/api/transaction")
    public Transaction createTransaction (@RequestBody Transaction transaction) {
        return transactionRepository.save(transaction);
    }
}
