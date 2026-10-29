package com.lms.controller;

import com.lms.dto.ProgressDtos.*;
import com.lms.security.UserDetailsImpl;
import com.lms.service.UserProgressService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/progress")
public class UserProgressController {

    private final UserProgressService progressService;

    public UserProgressController(UserProgressService progressService) {
        this.progressService = progressService;
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<CourseProgressDTO>> getAllProgress(@AuthenticationPrincipal UserDetailsImpl user) {
        return ResponseEntity.ok(progressService.getAllProgressForUser(user.getId()));
    }

    @GetMapping("/course/{courseId}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<CourseProgressDTO> getCourseProgress(@PathVariable Long courseId, @AuthenticationPrincipal UserDetailsImpl user) {
        return ResponseEntity.ok(progressService.getCourseProgress(user.getId(), courseId));
    }

    @PostMapping("/lesson/complete")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<LessonProgressDTO> markLessonComplete(@RequestBody LessonProgressRequest req, @AuthenticationPrincipal UserDetailsImpl user) {
        return ResponseEntity.ok(progressService.markLessonComplete(user.getId(), req.courseId, req.lessonId));
    }

    @PostMapping("/course/complete")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<CourseProgressDTO> markCourseComplete(@RequestBody CourseCompletionRequest req, @AuthenticationPrincipal UserDetailsImpl user) {
        return ResponseEntity.ok(progressService.markCourseComplete(user.getId(), req.courseId, req.score));
    }

    @PostMapping("/certificate")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<Void> awardCertificate(@RequestBody CertificateRequest req, @AuthenticationPrincipal UserDetailsImpl user) {
        progressService.awardCertificate(user.getId(), req.courseId);
        return ResponseEntity.ok().build();
    }
}