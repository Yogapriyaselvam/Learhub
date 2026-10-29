package com.lms.repository;

import com.lms.model.UserCourseCompletion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserCourseCompletionRepository extends JpaRepository<UserCourseCompletion, Long> {
    Optional<UserCourseCompletion> findByUserIdAndCourseId(Long userId, Long courseId);
    List<UserCourseCompletion> findByUserId(Long userId);
}