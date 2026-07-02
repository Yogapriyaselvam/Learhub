package com.lms.controller;

import com.lms.model.UserCourseProgress;
import com.lms.service.UserCourseProgressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class UserCourseProgressController {

    private final UserCourseProgressService progressService;

    // Save or Update Progress
    @PostMapping("/save")
    public ResponseEntity<UserCourseProgress> saveProgress(
            @RequestParam Long userId,
            @RequestParam Long courseId,
            @RequestParam Integer progress,
            @RequestParam Integer currentLesson) {

        UserCourseProgress userProgress = progressService.saveProgress(
                userId,
                courseId,
                progress,
                currentLesson
        );

        return ResponseEntity.ok(userProgress);
    }

    // Get Progress for One Course
    @GetMapping("/{userId}/{courseId}")
    public ResponseEntity<UserCourseProgress> getProgress(
            @PathVariable Long userId,
            @PathVariable Long courseId) {

        UserCourseProgress progress =
                progressService.getProgress(userId, courseId);

        if (progress == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(progress);
    }

    // Get All Progress of a User
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserCourseProgress>> getUserProgress(
            @PathVariable Long userId) {

        return ResponseEntity.ok(progressService.getUserProgress(userId));
    }

    // Complete Course
    @PutMapping("/complete")
    public ResponseEntity<UserCourseProgress> completeCourse(
            @RequestParam Long userId,
            @RequestParam Long courseId) {

        return ResponseEntity.ok(
                progressService.completeCourse(userId, courseId)
        );
    }

    // Reset Progress
    @PutMapping("/reset")
    public ResponseEntity<String> resetProgress(
            @RequestParam Long userId,
            @RequestParam Long courseId) {

        progressService.resetProgress(userId, courseId);

        return ResponseEntity.ok("Progress Reset Successfully");
    }
}