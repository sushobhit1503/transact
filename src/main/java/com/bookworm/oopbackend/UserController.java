package com.bookworm.oopbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    protected MongoTemplate mongoTemplate;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping ("/user/auth/{user_uid}")
    public User getUser (@PathVariable String user_uid) {
        Query query = new Query();
        query.addCriteria(Criteria.where("uid").is(user_uid));
        return mongoTemplate.findOne(query, User.class);
    }

    @GetMapping ("/user/auth/get-name/{uid}")
    public User getUserName (@PathVariable String uid) {
        Query query = new Query ();
        query.addCriteria(Criteria.where("_id").is(uid));
        return mongoTemplate.findOne(query, User.class);
    }

    @CrossOrigin (origins = "http://localhost:3000")
    @GetMapping ("/user/{username}")
    public User getPassword (@PathVariable String username) {
        Query query = new Query ();
        query.addCriteria(Criteria.where("username").is(username));
        return mongoTemplate.findOne(query, User.class);
    }

    @GetMapping ("/user/auth/{username}/{password}")
    public User loginUser (@PathVariable String username, @PathVariable String password) {
        Query query = new Query ();
        query.addCriteria(Criteria.where("username").is(username).andOperator(Criteria.where("password").is(password)));
        return mongoTemplate.findOne(query, User.class);
    }

    @CrossOrigin (origins = "http://localhost:3000")
    @PostMapping ("/user/auth")
    public User createUser (@RequestBody User user) {
        return userRepository.save(user);
    }

    @CrossOrigin (origins = "http://localhost:3000")
    @GetMapping ("/all-user/auth")
    public List<User> getAllUser () {
        return userRepository.findAll();
    }

    @CrossOrigin (origins = "http://localhost:3000")
    @PutMapping ("/user/auth/changeName/{uid}")
    public User changeName (@PathVariable String uid, @RequestBody String newName) {
        Query query= new Query ();
        query.addCriteria(Criteria.where("_id").is(uid));
        User user = mongoTemplate.findOne(query, User.class);
        user.setName(newName);
        return userRepository.save(user);
    }

    @CrossOrigin (origins = "http://localhost:3000")
    @PutMapping ("/user/auth/changeAddress/{uid}")
    public User changeAddress (@PathVariable String uid, @RequestBody String newAddress) {
        Query query= new Query ();
        query.addCriteria(Criteria.where("_id").is(uid));
        User user = mongoTemplate.findOne(query, User.class);
        user.setAddress(newAddress);
        return userRepository.save(user);
    }

    @PutMapping ("/user/auth/changeNumber/{uid}")
    public User changeNumber (@PathVariable String uid, @RequestBody long newNumber) {
        Query query= new Query ();
        query.addCriteria(Criteria.where("_id").is(uid));
        User user = mongoTemplate.findOne(query, User.class);
        user.setPhone_number(newNumber);
        return userRepository.save(user);
    }

    @CrossOrigin (origins = "http://localhost:3000")
    @PutMapping ("/user/auth/change-password/{uid}")
    public User resetPassword (@PathVariable String uid, @RequestBody String newpassword) {
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(uid));
        User user = mongoTemplate.findOne(query, User.class);
        user.setPassword(newpassword);
        return userRepository.save(user);
    }

    @CrossOrigin (origins = "http://localhost:3000")
    @PutMapping ("/user/auth/add-money/{uid}")
    public User resetPassword (@PathVariable String uid, @RequestBody int amount) {
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(uid));
        User user = mongoTemplate.findOne(query, User.class);
        user.setWallet(amount);
        return userRepository.save(user);
    }

    @CrossOrigin (origins = "http://localhost:3000")
    @DeleteMapping ("/api/delete-user/{uid}/{name}")
    public void deleteUser (@PathVariable String uid, @PathVariable String name) {
        Query query = new Query();
        userRepository.deleteById(uid);
        query.addCriteria(Criteria.where("saved_by").is(uid));
        mongoTemplate.findAllAndRemove(query, SavedBooks.class);
        Query query1 = new Query();
        query1.addCriteria(Criteria.where("posted_student_uid").is(uid));
        mongoTemplate.findAllAndRemove(query, Book.class);
    }
}
