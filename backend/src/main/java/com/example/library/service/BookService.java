package com.example.library.service;

import com.example.library.dto.BookRequest;
import com.example.library.model.Book;
import com.example.library.repository.BookRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

/**
 * Service for book CRUD and search.
 */
@Service
public class BookService {
    private final BookRepository bookRepository;
    public BookService(BookRepository bookRepository) { this.bookRepository = bookRepository; }

    @Transactional
    public Book add(BookRequest req) {
        Book b = new Book();
        b.setTitle(req.getTitle());
        b.setAuthor(req.getAuthor());
        b.setStatus(Book.Status.AVAILABLE);
        return bookRepository.save(b);
    }

    public List<Book> all() { return bookRepository.findAll(); }
    public List<Book> search(String title) { return bookRepository.findByTitleContainingIgnoreCase(title); }
    public Book getById(Long id) { return bookRepository.findById(id).orElseThrow(); }

    @Transactional
    public Book save(Book b){ return bookRepository.save(b); }
}
