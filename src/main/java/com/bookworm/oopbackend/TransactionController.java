package com.bookworm.oopbackend;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TransactionController {
    @Autowired
    private TransactionRepository transactionRepository;

    @PostMapping("/api/transaction")
    public Transaction createTransaction (@RequestBody Transaction transaction) {
        return transactionRepository.save(transaction);
    }
}
