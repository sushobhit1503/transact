package com.bookworm.oopbackend;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
public class TransactionController {
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    protected MongoTemplate mongoTemplate;

    @CrossOrigin 
    @GetMapping ("/transaction/all")
    public List <Transaction> getAllTransactions () {
        return transactionRepository.findAll();
    }

    @CrossOrigin
    @GetMapping ("/transaction/account/{account_uid}")
    public List <Transaction> getTransactionsByAccount (@PathVariable String account_uid) {
        Query query = new Query ();
        query.addCriteria(Criteria.where("account").is(account_uid));
        return mongoTemplate.find(query, Transaction.class);
    }

    @CrossOrigin
    @GetMapping ("/transaction/ledger/{ledger_uid}")
    public List <Transaction> getTransactionsByLedger (@PathVariable String ledger_uid) {
        Query query = new Query ();
        query.addCriteria(Criteria.where("ledger").is(ledger_uid));
        return mongoTemplate.find(query, Transaction.class);
    }

    @CrossOrigin
    @GetMapping ("/transaction/method/{account_uid}/{method}")
    public List <Transaction> getTransactionsByPaymentMethod (@PathVariable String account_uid, @PathVariable String method) {
        Query query = new Query ();
        query.addCriteria(Criteria.where("account").is(account_uid).andOperator(Criteria.where("paymentMethod").is(method)));
        return mongoTemplate.find(query, Transaction.class);
    }

    @CrossOrigin
    @GetMapping ("/transaction/method/ledger/{ledger_uid}/{method}")
    public List <Transaction> getTransactionsByPaymentMethodByLedger (@PathVariable String ledger_uid, @PathVariable String method) {
        Query query = new Query ();
        query.addCriteria(Criteria.where("ledger").is(ledger_uid).andOperator(Criteria.where("paymentMethod").is(method)));
        return mongoTemplate.find(query, Transaction.class);
    }

    @CrossOrigin
    @GetMapping ("/transaction/credited/{account_uid}")
    public List <Transaction> getCreditedTransactionsByAccount (@PathVariable String account_uid) {
        Query query = new Query ();
        query.addCriteria(Criteria.where("account").is(account_uid).andOperator(Criteria.where("isCredit").is(true)));
        return mongoTemplate.find(query, Transaction.class);
    }

    @CrossOrigin
    @GetMapping ("/transaction/credited/ledger/{ledger_uid}")
    public List <Transaction> getCreditedTransactionsByLedger (@PathVariable String ledger_uid) {
        Query query = new Query ();
        query.addCriteria(Criteria.where("ledger").is(ledger_uid).andOperator(Criteria.where("isCredit").is(true)));
        return mongoTemplate.find(query, Transaction.class);
    }

    @CrossOrigin
    @GetMapping ("/transaction/category/{category}/{account_uid}/")
    public List <Transaction> getCategoryTransactionsByAccount (@PathVariable String category, @PathVariable String account_uid) {
        Query query = new Query ();
        query.addCriteria(Criteria.where("account").is(account_uid).andOperator(Criteria.where("category").is(category)));
        return mongoTemplate.find(query, Transaction.class);
    }

    @CrossOrigin
    @GetMapping ("/transaction/category/ledger/{category}/{ledger_uid}/")
    public List <Transaction> getCategoryTransactionsByLedger (@PathVariable String category, @PathVariable String ledger_uid) {
        Query query = new Query ();
        query.addCriteria(Criteria.where("ledger").is(ledger_uid).andOperator(Criteria.where("category").is(category)));
        return mongoTemplate.find(query, Transaction.class);
    }

    @CrossOrigin
    @GetMapping ("/transaction/date/{date}/{account_uid}/")
    public List <Transaction> getTransactionsDateByAccount (@PathVariable LocalDate date, @PathVariable String account_uid) {
        Query query = new Query ();
        query.addCriteria(Criteria.where("account").is(account_uid).andOperator(Criteria.where("date").is(date)));
        return mongoTemplate.find(query, Transaction.class);
    }

    @CrossOrigin
    @GetMapping ("/transaction/date/ledger/{date}/{ledger_uid}/")
    public List <Transaction> getTransactionsDateByLedger (@PathVariable LocalDate date, @PathVariable String ledger_uid) {
        Query query = new Query ();
        query.addCriteria(Criteria.where("ledger").is(ledger_uid).andOperator(Criteria.where("date").is(date)));
        return mongoTemplate.find(query, Transaction.class);
    }
    
    @CrossOrigin
    @PutMapping("/transaction/amount/{uid}/{amount}")
    public Transaction changeTransactionAmount (@PathVariable String uid, @PathVariable int amount) {
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(uid));
        Transaction transaction = mongoTemplate.findOne(query, Transaction.class);
        transaction.setAmount(amount);
        return transactionRepository.save(transaction);
    }

    @CrossOrigin
    @PostMapping("/transaction")
    public Transaction createTransaction (@RequestBody Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    @CrossOrigin
    @DeleteMapping ("/transaction/{transaction_uid}")
    public void deleteAccount (@PathVariable String transaction_uid) {
        transactionRepository.deleteById(transaction_uid);
    }


}
