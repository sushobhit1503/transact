package com.bookworm.oopbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class LedgerController {

    @Autowired
    private LedgerRepository ledgerRepository;
    @Autowired
    private MongoTemplate mongoTemplate;

    @CrossOrigin (origins = "http://localhost:3000")
    @GetMapping ("/ledger/all")
    public List<Ledger> getAllLedgers () {
        return ledgerRepository.findAll();
    }

    @CrossOrigin (origins = "http://localhost:3000")
    @PostMapping ("/ledger")
    public Ledger createLedger (@RequestBody Ledger ledger) {
        return ledgerRepository.save(ledger);
    }

    @CrossOrigin (origins = "http://localhost:3000")
    @GetMapping ("/ledger/{uid}")
    public Ledger getLedgerDetails (@PathVariable String uid) {
        Query query = new Query ();
        query.addCriteria(Criteria.where("_id").is(uid));
        return mongoTemplate.findOne(query, Ledger.class);
    }

    @CrossOrigin (origins = "http://localhost:3000")
    @GetMapping ("/ledger/account/{uid}")
    public List<Ledger> getLedgerByAccount (@PathVariable String uid) {
        Query query = new Query ();
        query.addCriteria(Criteria.where("account").is(uid));
        return mongoTemplate.find(query, Ledger.class);
    }

    @CrossOrigin (origins = "http://localhost:3000")
    @PutMapping("/ledger/activate/{uid}")
    public Ledger activateLedger (@PathVariable String uid) {
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(uid));
        Ledger ledger = mongoTemplate.findOne(query, Ledger.class);
        ledger.setActive(true);
        return ledgerRepository.save(ledger);
    }

    @CrossOrigin (origins = "http://localhost:3000")
    @PutMapping("/ledger/deactivate/{uid}")
    public Ledger changeLedgerActivity (@PathVariable String uid) {
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(uid));
        Ledger ledger = mongoTemplate.findOne(query, Ledger.class);
        ledger.setActive(false);
        return ledgerRepository.save(ledger);
    }

}
