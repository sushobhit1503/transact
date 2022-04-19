package com.bookworm.oopbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    @CrossOrigin (origins = "http://localhost:3000")
    @GetMapping ("/api/book")
    public List<Book> getAllBooks () {
        return bookRepository.findAll();
    }

    @CrossOrigin (origins = "http://localhost:3000")
    @PostMapping ("/api/book")
    public Book createBook (@RequestBody Book book) {
        return bookRepository.save(book);
    }
}
