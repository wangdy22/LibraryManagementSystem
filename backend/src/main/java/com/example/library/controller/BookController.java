package com.example.library.controller;

import com.example.library.dto.BookRequest;
import com.example.library.model.Book;
import com.example.library.service.BookService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * REST endpoints: /api/books/...
 */
@RestController
@RequestMapping("/books")
public class BookController {
    private final BookService bookService;
    public BookController(BookService bookService) { this.bookService = bookService; }

    @PostMapping("/add")
    public ResponseEntity<Book> add(@Valid @RequestBody BookRequest req){
        return ResponseEntity.ok(bookService.add(req));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Book>> all(){
        return ResponseEntity.ok(bookService.all());
    }

    @GetMapping("/search")
    public ResponseEntity<List<Book>> search(@RequestParam String title){
        return ResponseEntity.ok(bookService.search(title));
    }
}
