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
    @PutMapping("/shop/name/{uid}/{name}")
    public Shop changeShopName (@PathVariable String uid, @PathVariable String name) {
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(uid));
        Shop shop = mongoTemplate.findOne(query, Shop.class);
        shop.setName(name);
        return shopsRepository.save(shop);
    }

    @CrossOrigin
    @PutMapping("/shop/city/{uid}/{city}")
    public Shop changeCityName (@PathVariable String uid, @PathVariable String city) {
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(uid));
        Shop shop = mongoTemplate.findOne(query, Shop.class);
        shop.setCity(city);
        return shopsRepository.save(shop);
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
