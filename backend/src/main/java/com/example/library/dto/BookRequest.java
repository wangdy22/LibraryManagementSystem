package com.example.library.dto;

import jakarta.validation.constraints.NotBlank;

/**
 * DTO for creating a new Book.
 */
public class BookRequest {
    @NotBlank(message = "Title is required")
    private String title;
    @NotBlank(message = "Author is required")
    private String author;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }
}
