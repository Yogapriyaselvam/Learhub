package com.lms.controller;

import com.lms.dto.QuizSubmitRequest;
import com.lms.model.*;
import com.lms.security.UserDetailsImpl;
import com.lms.service.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/student")
@RequiredArgsConstructor
public class EnrollmentController {

    private final EnrollmentService enrollmentService;
    private final QuizService quizService;

    /** Enroll in a course */
    @PostMapping("/enroll/{courseId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<Map<String, String>> enroll(
            @PathVariable Long courseId,
            @AuthenticationPrincipal UserDetailsImpl user) {
        enrollmentService.enroll(user.getId(), courseId);
        return ResponseEntity.ok(Map.of("message", "Enrolled successfully"));
    }

    /** Get my enrollments — ✅ Maps to clear flat layout without needing a separate DTO class file */
    @GetMapping("/enrollments")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<Map<String, Object>>> getMyEnrollments(
            @AuthenticationPrincipal UserDetailsImpl user) {
        
        List<Enrollment> enrollments = enrollmentService.getStudentEnrollments(user.getId());
        
        List<Map<String, Object>> responseList = enrollments.stream().map(e -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", e.getId());
            map.put("enrolledAt", e.getEnrolledAt());
            // Flatten the course property to avoid infinite serialization loops
            map.put("courseId", e.getCourse() != null ? e.getCourse().getId() : null);
            map.put("courseTitle", e.getCourse() != null ? e.getCourse().getTitle() : null);
            return map;
        }).toList();

        return ResponseEntity.ok(responseList);
    }

    /** Submit quiz */
    @PostMapping("/quiz/submit")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<Map<String, Object>> submitQuiz(
            @RequestBody QuizSubmitRequest req,
            @AuthenticationPrincipal UserDetailsImpl user) {
        return ResponseEntity.ok(quizService.submitQuiz(user.getId(), req));
    }

    /** Get quiz attempts */
    @GetMapping("/quiz/attempts")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<QuizAttempt>> getAttempts(
            @AuthenticationPrincipal UserDetailsImpl user) {
        return ResponseEntity.ok(quizService.getStudentAttempts(user.getId()));
    }
}