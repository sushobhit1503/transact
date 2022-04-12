package com.bookworm.oopbackend;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RequestsController {
    @Autowired
    private RequestsRepository requestsRepository;

    @PostMapping ("/api/requests")
    public Requests createRequests (@RequestBody Requests requests) {
        return requestsRepository.save(requests);
    }
}
