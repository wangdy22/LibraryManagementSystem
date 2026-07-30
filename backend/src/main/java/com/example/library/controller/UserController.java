package com.example.library.controller;

import com.example.library.dto.LoginRequest;
import com.example.library.dto.RegisterRequest;
import com.example.library.model.User;
import com.example.library.service.UserService;
import jakarta.validation.Valid;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST endpoints: /api/users/...
 */
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) { 
        this.userService = userService; 
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req) {
        try {
            User u = userService.register(req);
            return ResponseEntity.ok(new SimpleResponse("Registered", u.getId()));
        } catch (IllegalArgumentException e) {
        	// Prints the full exception message and stack trace to the console
        	e.printStackTrace();
            // Return HTTP 400 with the error message (e.g. "Email already registered")
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
    
    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
        try {
            User user = userService.login(req.getEmail(), req.getPassword());
            return ResponseEntity.ok(new SimpleResponse("Login successful", user.getId()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }

    // Simple DTO for consistent success responses
    record SimpleResponse(String message, Long id) {}

    // Simple DTO for error responses
    record ErrorResponse(String error) {}
}
