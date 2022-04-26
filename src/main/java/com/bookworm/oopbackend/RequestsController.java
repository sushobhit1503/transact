package com.bookworm.oopbackend;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class RequestsController {

    @Autowired
    private RequestsRepository requestsRepository;
    private BookRepository bookRepository;
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
    @GetMapping ("/api/all-requests")
    public List <Requests> Allrequests () {
        Query query = new Query();
        query.addCriteria(Criteria.where("pending").is(false));
        return mongoTemplate.find(query, Requests.class);
    }

    @CrossOrigin(origins = {"http://localhost:3000"})
    @GetMapping ("/api/all-requests/pending")
    public List <Requests> pendingRequests () {
        Query query = new Query();
        query.addCriteria(Criteria.where("pending").is(true));
        return mongoTemplate.find(query, Requests.class);
    }

//    @CrossOrigin (origins = "http://localhost:3000")
//    @PutMapping("/api/accept-requests/{book_uid}/{request_uid}")
//    public Requests acceptRequests (@PathVariable String book_uid, @PathVariable String request_uid) {
//        Query query = new Query();
//        query.addCriteria(Criteria.where("_id").is(request_uid));
//        Requests request = mongoTemplate.findOne(query, Requests.class);
//        request.setPending(false);
//
//        Query query1 = new Query();
//        query1.addCriteria(Criteria.where("_id").is(book_uid));
//        Book book = mongoTemplate.findOne(query1, Book.class);
//        book.setAvailable(false);
//        Book books = bookRepository.save(book);
//        return requestsRepository.save(request);
//    }

    @CrossOrigin (origins = "http://localhost:3000")
    @DeleteMapping("/api/delete-requests/{request_uid}")
    public Requests deleteRequests (@PathVariable String request_uid) {
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(request_uid));
        return mongoTemplate.findAndRemove(query, Requests.class);
    }

    @CrossOrigin(origins = {"http://localhost:3000"})
    @PostMapping ("/api/requests")
    public Requests createRequests (@RequestBody Requests requests) {
        return requestsRepository.save(requests);
    }
}
