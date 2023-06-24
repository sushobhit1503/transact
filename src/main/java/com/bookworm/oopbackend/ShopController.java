package com.bookworm.oopbackend;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ShopController {

    @Autowired
    private ShopRepository shopsRepository;
    @Autowired
    protected MongoTemplate mongoTemplate;

    @CrossOrigin
    @GetMapping ("/shops")
    public List <Shop> getAllShops () {
        return shopsRepository.findAll();
    }

    @CrossOrigin 
    @GetMapping("/shop/{shop_uid}")
    public Shop getEachShop (@PathVariable String shop_uid) {
        Query query = new Query ();
        query.addCriteria(Criteria.where("_id").is(shop_uid));
        return mongoTemplate.findOne(query, Shop.class);
    }

    @CrossOrigin 
    @DeleteMapping("/shop/{shop_uid}")
    public Shop deleteShop (@PathVariable String shop_uid) {
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(shop_uid));
        return mongoTemplate.findAndRemove(query, Shop.class);
    }

    @CrossOrigin
    @PostMapping ("/shops")
    public Shop createShop (@RequestBody Shop shops) {
        return shopsRepository.save(shops);
    }
}
