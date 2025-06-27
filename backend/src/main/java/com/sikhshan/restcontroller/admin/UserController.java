package com.sikhshan.restcontroller.admin;

import java.time.LocalDateTime;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sikhshan.model.User;
import com.sikhshan.repository.UserRepository;

@RestController
@RequestMapping("/api/admin/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        // Check if user with the same email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("User with this email already exists");
        }

        // Hash the password
        String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt(12));
        user.setPassword(hashedPassword);
        user.setCreatedAt(LocalDateTime.now());

        // Save the user
        User savedUser = userRepository.save(user);

        // Return the saved user or a success message
        return ResponseEntity.ok(savedUser);
    }
}