package com.example.library.repository;

import com.example.library.model.BorrowRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/**
 * Repository interface for managing BorrowRecord entities.
 * Provides CRUD operations and custom query methods for BorrowRecords.
 *
 * Includes a method to find currently borrowed items (not yet returned).
 */
public interface BorrowRecordRepository extends JpaRepository<BorrowRecord, Long> {
    List<BorrowRecord> findByReturnDateIsNull();
}
