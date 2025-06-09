package com.sikhshan.restcontroller;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sikhshan.dto.LoginRequest;
import com.sikhshan.dto.LoginResponse;
import com.sikhshan.model.User;
import com.sikhshan.repository.UserRepository;
import com.sikhshan.service.JwtService;

@RestController
@RequestMapping("/api/users")
public class AuthenticationController {	 
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private JwtService jwtService;
	
	@PostMapping("/register")
    public User registerUser(@RequestBody User user) {
		String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt(12));
        user.setPassword(hashedPassword);
        user.setCreatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }
	
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
	    Optional<User> optionalUser = userRepository.findByEmail(loginRequest.getEmail());

	    if (optionalUser.isPresent()) {
	        User user = optionalUser.get();
	        boolean passwordMatch = BCrypt.checkpw(loginRequest.getPassword(), user.getPassword());

	        if (passwordMatch && user.getRole() == loginRequest.getRole()) {
	            String token = jwtService.generateToken(user.getEmail(), user.getRole().name());
	            return ResponseEntity.ok(Map.of(
	                "message", "Login successful",
	                "token", token,
	                "role", user.getRole().name()
	            ));
	        } else {
	            return ResponseEntity.status(401).body("Invalid credentials or role");
	        }
	    } else {
	        return ResponseEntity.status(401).body("User not found");
	    }
	}
}
