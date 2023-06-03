package com.bookworm.oopbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class AccountController {
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    protected MongoTemplate mongoTemplate;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping ("/account/{account_uid}")
    public Account getAccount (@PathVariable String account_uid) {
        Query query = new Query();
        query.addCriteria(Criteria.where("uid").is(account_uid));
        return mongoTemplate.findOne(query,  Account.class);
    }

    @CrossOrigin (origins = "http://localhost:3000")
    @PostMapping ("/account")
    public Account createAccount (@RequestBody Account account) {
        return accountRepository.save(account);
    }

    @CrossOrigin (origins = "http://localhost:3000")
    @GetMapping ("/account/all")
    public List<Account> getAllAccounts () {
        return accountRepository.findAll();
    }

    @CrossOrigin (origins = "http://localhost:3000")
    @DeleteMapping ("/account/{account_uid}")
    public void deleteAccount (@PathVariable String account_uid) {
        accountRepository.deleteById(account_uid);
    }
}
