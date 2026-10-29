package com.lms.repository;

import com.lms.model.UserLessonProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserLessonProgressRepository extends JpaRepository<UserLessonProgress, Long> {
    List<UserLessonProgress> findByUserIdAndCourseId(Long userId, Long courseId);
    List<UserLessonProgress> findByUserId(Long userId);
    Optional<UserLessonProgress> findByUserIdAndCourseIdAndLessonId(Long userId, Long courseId, String lessonId);
}