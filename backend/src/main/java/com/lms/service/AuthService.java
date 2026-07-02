package com.lms.service;

import com.lms.dto.AuthResponse;
import com.lms.dto.LoginRequest;
import com.lms.dto.RegisterRequest;
import com.lms.model.User;
import com.lms.repository.UserRepository;
import com.lms.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthResponse register(RegisterRequest req) {

        // Check whether the email is already registered
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User.Role role =
                "INSTRUCTOR".equalsIgnoreCase(req.getRole().toString())
                        ? User.Role.INSTRUCTOR
                        : User.Role.STUDENT;

        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setRole(role);

        // Instructor = Plain Text, Student = Encoded Password
        if (role == User.Role.INSTRUCTOR) {
            user.setPassword(req.getPassword());
        } else {
            user.setPassword(passwordEncoder.encode(req.getPassword()));
        }

        user = userRepository.save(user);

        String token = jwtUtils.generateToken(user.getEmail());

        // Return full user details
        return new AuthResponse(
                token,
                "Bearer",
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name()
        );
    }

    public AuthResponse login(LoginRequest req) {

        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("This email address is not registered."));
                        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
        throw new RuntimeException("Invalid email or password");
    }

        if (user.getRole() == User.Role.INSTRUCTOR) {

            if (!user.getPassword().equals(req.getPassword())) {
                throw new RuntimeException("Invalid password credentials");
            }

        } else {

           // Inside your login method
if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
    throw new RuntimeException("Invalid email or password");
}

        }

        String token = jwtUtils.generateToken(user.getEmail());

        return new AuthResponse(
                token,
                "Bearer",
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name()
        );
    }

    public boolean updatePassword(String email, String newPassword) {

        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isEmpty()) {
            return false;
        }

        User user = userOpt.get();

        if (user.getRole() == User.Role.INSTRUCTOR) {
            user.setPassword(newPassword);
        } else {
            user.setPassword(passwordEncoder.encode(newPassword));
        }

        userRepository.save(user);
        return true;
    }
}