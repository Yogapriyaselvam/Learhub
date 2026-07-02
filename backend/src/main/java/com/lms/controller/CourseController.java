package com.lms.controller;

import com.lms.dto.*;
import com.lms.security.UserDetailsImpl;
import com.lms.service.CourseService;
import com.lms.model.Course;
import com.lms.repository.CourseRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;
    private final CourseRepository courseRepository;

    @GetMapping("/api/courses/public")
    public ResponseEntity<List<CourseDTO>> getPublishedCourses() {
        return ResponseEntity.ok(courseService.getAllPublished());
    }

    @GetMapping("/api/courses/public/{id}")
    public ResponseEntity<CourseDTO> getCourse(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.getById(id));
    }

    @PostMapping("/api/instructor/courses")
    @PreAuthorize("hasRole('INSTRUCTOR') or hasRole('ADMIN')")
    public ResponseEntity<CourseDTO> createCourse(
            @Valid @RequestBody CourseRequest req,
            @AuthenticationPrincipal UserDetailsImpl user) {
        return ResponseEntity.ok(courseService.create(req, user.getId()));
    }

    @PutMapping("/api/instructor/courses/{id}")
    @PreAuthorize("hasRole('INSTRUCTOR') or hasRole('ADMIN')")
    public ResponseEntity<CourseDTO> updateCourse(
            @PathVariable Long id,
            @Valid @RequestBody CourseRequest req,
            @AuthenticationPrincipal UserDetailsImpl user) {
        return ResponseEntity.ok(courseService.update(id, req, user.getId()));
    }

    @GetMapping("/api/instructor/courses")
    @PreAuthorize("hasRole('INSTRUCTOR') or hasRole('ADMIN')")
    public ResponseEntity<List<CourseDTO>> getInstructorCourses(
            @AuthenticationPrincipal UserDetailsImpl user) {
        return ResponseEntity.ok(courseService.getByInstructor(user.getId()));
    }

    @DeleteMapping("/api/admin/courses/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteCourse(@PathVariable Long id) {
        courseService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/api/student/courses/{courseId}/lessons")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<List<Map<String, Object>>> getCourseLessons(@PathVariable Long courseId) {
        Course course = courseRepository.findById(courseId).orElse(null);

        if (course == null) {
            return ResponseEntity.ok(List.of());
        }

        try {
            List<Map<String, Object>> response = course.getLessons().stream().map(l -> {
                Map<String, Object> map = new HashMap<>();
                map.put("id", l.getId());
                map.put("title", l.getTitle());
                map.put("content", l.getContent());
                return map;
            }).collect(Collectors.toList());

            return ResponseEntity.ok(response);
        } catch (Exception exception) {
            return ResponseEntity.ok(List.of());
        }
    }
}