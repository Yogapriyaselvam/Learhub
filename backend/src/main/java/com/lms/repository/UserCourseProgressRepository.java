package com.lms.repository;

import com.lms.model.Course;
import com.lms.model.User;
import com.lms.model.UserCourseProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserCourseProgressRepository extends JpaRepository<UserCourseProgress, Long> {

    Optional<UserCourseProgress> findByUserAndCourse(User user, Course course);

    List<UserCourseProgress> findByUser(User user);

    boolean existsByUserAndCourse(User user, Course course);
}