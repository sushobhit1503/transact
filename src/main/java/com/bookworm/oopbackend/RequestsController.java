package com.bookworm.oopbackend;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RequestsController {

    @Autowired
    private RequestsRepository requestsRepository;
    @Autowired
    protected MongoTemplate mongoTemplate;

    @CrossOrigin(origins = {"http://localhost:3000"})
    @GetMapping ("/api/pending-requests/{user_uid}")
    public List <Requests> pendingRequests (@PathVariable String user_uid) {
        Query query = new Query(Criteria.where("created_by_uid").is(user_uid).andOperator(Criteria.where("pending").is(true)));
        return mongoTemplate.find(query, Requests.class);
    }

    @CrossOrigin(origins = {"http://localhost:3000"})
    @GetMapping ("/api/requests/{user_uid}")
    public List <Requests> requests (@PathVariable String user_uid) {
        Query query = new Query(Criteria.where("created_by_uid").is(user_uid).andOperator(Criteria.where("pending").is(false)));
        return mongoTemplate.find(query, Requests.class);
    }

    @CrossOrigin(origins = {"http://localhost:3000"})
    @PostMapping ("/api/requests")
    public Requests createRequests (@RequestBody Requests requests) {
        return requestsRepository.save(requests);
    }
}
