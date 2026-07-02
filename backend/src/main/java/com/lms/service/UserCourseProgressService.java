package com.lms.service;

import com.lms.model.Course;
import com.lms.model.User;
import com.lms.model.UserCourseProgress;
import com.lms.repository.CourseRepository;
import com.lms.repository.UserCourseProgressRepository;
import com.lms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserCourseProgressService {

    private final UserCourseProgressRepository progressRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    // Save or Update Progress
    public UserCourseProgress saveProgress(Long userId,
                                           Long courseId,
                                           Integer progress,
                                           Integer currentLesson) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Optional<UserCourseProgress> existing =
                progressRepository.findByUserAndCourse(user, course);

        UserCourseProgress userProgress;

        if (existing.isPresent()) {

            userProgress = existing.get();

            userProgress.setProgress(progress);
            userProgress.setCurrentLesson(currentLesson);
            userProgress.setCompleted(progress >= 100);

        } else {

            userProgress = new UserCourseProgress();

            userProgress.setUser(user);
            userProgress.setCourse(course);
            userProgress.setProgress(progress);
            userProgress.setCurrentLesson(currentLesson);
            userProgress.setCompleted(progress >= 100);
        }

        return progressRepository.save(userProgress);
    }

    // Get Progress for One Course
    public UserCourseProgress getProgress(Long userId, Long courseId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        return progressRepository.findByUserAndCourse(user, course)
                .orElse(null);
    }

    // Get All Progress for a User
    public List<UserCourseProgress> getUserProgress(Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return progressRepository.findByUser(user);
    }

    // Mark Course as Completed
    public UserCourseProgress completeCourse(Long userId, Long courseId) {

        UserCourseProgress progress = getProgress(userId, courseId);

        if (progress == null) {
            throw new RuntimeException("Progress not found");
        }

        progress.setProgress(100);
        progress.setCurrentLesson(progress.getCurrentLesson());
        progress.setCompleted(true);

        return progressRepository.save(progress);
    }

    // Reset Progress
    public void resetProgress(Long userId, Long courseId) {

        UserCourseProgress progress = getProgress(userId, courseId);

        if (progress != null) {

            progress.setProgress(0);
            progress.setCurrentLesson(1);
            progress.setCompleted(false);

            progressRepository.save(progress);
        }
    }
}