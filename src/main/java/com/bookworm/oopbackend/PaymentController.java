package com.bookworm.oopbackend;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PaymentController {
    @Autowired
    private PaymentRepository paymentRepository;
    @Autowired
    protected MongoTemplate mongoTemplate;

    @CrossOrigin
    @GetMapping ("/payment")
    public List <Payment> getPaymentMethods () {
        return paymentRepository.findAll();
    }

    @CrossOrigin
    @PostMapping("/payment")
    public Payment createPaymentMethod (@RequestBody Payment payment) {
        return paymentRepository.save(payment);
    }

    @CrossOrigin
    @GetMapping("/payment/{payment_uid}")
    public Payment getEachPaymentMethod (@PathVariable String payment_uid) {
        Query query = new Query ();
        query.addCriteria(Criteria.where("_id").is(payment_uid));
        return mongoTemplate.findOne(query, Payment.class);
    }

    @CrossOrigin
    @GetMapping("/payment/credit")
    public List<Payment> getPaymentByCredit () {
        Query query = new Query ();
        query.addCriteria(Criteria.where("isCredit").is(true));
        return mongoTemplate.find(query, Payment.class);
    }

    @CrossOrigin
    @DeleteMapping ("/payment/{payment_uid}")
    public void deletePayment (@PathVariable String payment_uid) {
        paymentRepository.deleteById(payment_uid);
    }

}
