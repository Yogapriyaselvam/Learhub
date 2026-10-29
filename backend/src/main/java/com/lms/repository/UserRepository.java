package com.lms.repository;

import com.lms.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // Find user by email (used for login)
    Optional<User> findByEmail(String email);

    // Check if email already exists
    boolean existsByEmail(String email);

    // Count users by role
    long countByRole(String role);

    // Get users by role
    List<User> findByRole(User.Role role);
}