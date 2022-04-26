package com.bookworm.oopbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

@RestController
public class SavedBooksController {
    @Autowired
    private SavedBooksRepository savedBooksRepository;
    @Autowired
    protected MongoTemplate mongoTemplate;

    @CrossOrigin (origins = "http://localhost:3000")
    @GetMapping("/api/saved-books/{uid}")
    public List <SavedBooks> getAllSavedBooks (@PathVariable String uid) {
        Query query = new Query ();
        query.addCriteria (Criteria.where("saved_by").is(uid));
        return mongoTemplate.find(query, SavedBooks.class);
    }

    @CrossOrigin (origins = "http://localhost:3000")
    @PostMapping("/api/saved-books")
    public SavedBooks createSavedBooks (@RequestBody SavedBooks savedBooks) {
        return savedBooksRepository.save(savedBooks);
    }

    @CrossOrigin (origins = "http://localhost:3000")
    @DeleteMapping ("/api/saved-books/{uid}/{user}")
    public List<SavedBooks> deleteSavedBooks (@PathVariable String uid, @PathVariable String user) {
        Query query= new Query ();
        query.addCriteria(Criteria.where("saved_by").is(user).andOperator(Criteria.where("_id").is(uid)));
        return mongoTemplate.findAllAndRemove(query, SavedBooks.class);
    }
}
