package com.bookworm.oopbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SavedBooksController {
    @Autowired
    private SavedBooksRepository savedBooksRepository;

    @PostMapping("/api/saved-books")
    public SavedBooks createSavedBooks (@RequestBody SavedBooks savedBooks) {
        return savedBooksRepository.save(savedBooks);
    }
}
