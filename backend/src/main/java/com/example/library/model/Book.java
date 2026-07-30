package com.example.library.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

/**
 * Book entity with a simple status enum (AVAILABLE/BORROWED).
 */
@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Author is required")
    private String author;

    @Enumerated(EnumType.STRING)
    private Status status = Status.AVAILABLE;

    public enum Status { AVAILABLE, BORROWED }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
}
