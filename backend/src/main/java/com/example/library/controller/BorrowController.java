package com.example.library.controller;

import com.example.library.model.BorrowRecord;
import com.example.library.service.BorrowService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * REST endpoints: /api/borrow/...
 */
@RestController
@RequestMapping("/borrow")
public class BorrowController {
    private final BorrowService borrowService;

    public BorrowController(BorrowService borrowService) { this.borrowService = borrowService; }

    @PostMapping("/{userId}/{bookId}")
    public ResponseEntity<BorrowRecord> borrow(@PathVariable Long userId, @PathVariable Long bookId){
        return ResponseEntity.ok(borrowService.borrow(userId, bookId));
    }

    @PostMapping("/return/{bookId}")
    public ResponseEntity<BorrowRecord> returnBook(@PathVariable Long bookId){
        return ResponseEntity.ok(borrowService.returnBook(bookId));
    }

    @GetMapping("/open")
    public ResponseEntity<List<BorrowRecord>> open(){
        return ResponseEntity.ok(borrowService.openBorrows());
    }
}
