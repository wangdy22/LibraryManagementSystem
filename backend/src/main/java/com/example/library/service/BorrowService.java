package com.example.library.service;

import com.example.library.model.Book;
import com.example.library.model.BorrowRecord;
import com.example.library.model.User;
import com.example.library.repository.BookRepository;
import com.example.library.repository.BorrowRecordRepository;
import com.example.library.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.List;

/**
 * Service handling borrow/return operations.
 */
@Service
public class BorrowService {
    private final BorrowRecordRepository borrowRecordRepository;
    private final BookRepository bookRepository;
    private final UserRepository userRepository;

    public BorrowService(BorrowRecordRepository borrowRecordRepository, BookRepository bookRepository, UserRepository userRepository) {
        this.borrowRecordRepository = borrowRecordRepository;
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public BorrowRecord borrow(Long userId, Long bookId) {
        User user = userRepository.findById(userId).orElseThrow();
        Book book = bookRepository.findById(bookId).orElseThrow();
        if (book.getStatus() == Book.Status.BORROWED) {
            throw new IllegalStateException("Book already borrowed");
        }
        book.setStatus(Book.Status.BORROWED);
        bookRepository.save(book);

        BorrowRecord br = new BorrowRecord();
        br.setUser(user);
        br.setBook(book);
        br.setBorrowDate(LocalDate.now());
        // Simple 14-day loan window for demo
        br.setDueDate(LocalDate.now().plusDays(14));
        return borrowRecordRepository.save(br);
    }

    @Transactional
    public BorrowRecord returnBook(Long bookId) {
        Book book = bookRepository.findById(bookId).orElseThrow();
        List<BorrowRecord> records = borrowRecordRepository.findByReturnDateIsNull();
        BorrowRecord open = records.stream().filter(r -> r.getBook().getId().equals(bookId)).findFirst().orElseThrow();
        open.setReturnDate(LocalDate.now());
        borrowRecordRepository.save(open);

        book.setStatus(Book.Status.AVAILABLE);
        bookRepository.save(book);
        return open;
    }

    public List<BorrowRecord> openBorrows() {
        return borrowRecordRepository.findByReturnDateIsNull();
    }
}
