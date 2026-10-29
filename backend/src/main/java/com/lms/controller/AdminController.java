package com.lms.controller;

import com.lms.dto.AdminStatsDTO;
import com.lms.dto.CourseDTO;
import com.lms.model.Course;
import com.lms.model.Enrollment;
import com.lms.model.User;
import com.lms.repository.CourseRepository;
import com.lms.repository.EnrollmentRepository;
import com.lms.repository.UserRepository;
import com.lms.repository.CertificateRepository;
import com.lms.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UserRepository userRepo;
    private final CourseRepository courseRepo;
    private final EnrollmentRepository enrollmentRepo;
    private final CertificateRepository certificateRepo;
    private final CourseService courseService;

    // ==========================
    // USER MANAGEMENT
    // ==========================

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepo.findAll());
    }

    @GetMapping("/users/role/{role}")
    public ResponseEntity<List<User>> getUsersByRole(@PathVariable String role) {

        User.Role userRole;

        try {
            userRole = User.Role.valueOf(role.toUpperCase());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(userRepo.findByRole(userRole));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {

        if (!userRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        userRepo.deleteById(id);

        return ResponseEntity.noContent().build();
    }

    // ==========================
    // COURSE MANAGEMENT
    // ==========================

    @GetMapping("/courses")
    public ResponseEntity<List<CourseDTO>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAll());
    }

    /**
     * Publish / Unpublish Course
     * Body Example:
     * {
     *   "published": true
     * }
     */
    @PutMapping("/courses/{id}/publish")
    public ResponseEntity<?> updatePublishStatus(
            @PathVariable Long id,
            @RequestBody Map<String, Boolean> body) {

        Course course = courseRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Boolean published = body.get("published");

        if (published == null) {
            return ResponseEntity.badRequest()
                    .body("published field is required.");
        }

        course.setIsPublished(published);

        courseRepo.save(course);

        return ResponseEntity.ok("Course updated successfully.");
    }

    // ==========================
    // DASHBOARD
    // ==========================

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {

        Map<String, Object> stats = new HashMap<>();

        stats.put("totalStudents", userRepo.findByRole(User.Role.STUDENT).size());
        stats.put("totalInstructors", userRepo.findByRole(User.Role.INSTRUCTOR).size());
        stats.put("totalCourses", courseRepo.count());
        stats.put("totalEnrollments", enrollmentRepo.count());

        return ResponseEntity.ok(stats);
    }

    @GetMapping("/dashboard")
    public ResponseEntity<AdminStatsDTO> getDashboard() {

        AdminStatsDTO dto = new AdminStatsDTO(
                userRepo.findByRole(User.Role.STUDENT).size(),
                userRepo.findByRole(User.Role.INSTRUCTOR).size(),
                courseRepo.count(),
                enrollmentRepo.count()
        );

        return ResponseEntity.ok(dto);
    }

    @GetMapping("/dashboard-stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {

        Map<String, Object> stats = new HashMap<>();

        stats.put("students", userRepo.findByRole(User.Role.STUDENT).size());
        stats.put("instructors", userRepo.findByRole(User.Role.INSTRUCTOR).size());
        stats.put("courses", courseRepo.count());
        stats.put("enrollments", enrollmentRepo.count());
        stats.put("revenue", 5400);

        return ResponseEntity.ok(stats);
    }

    // ==========================
    // ENROLLMENTS
    // ==========================

    @GetMapping("/enrollments")
    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public ResponseEntity<List<Map<String, Object>>> getAllEnrollments() {
        List<Enrollment> enrollments = enrollmentRepo.findAllWithDetails();
        List<Map<String, Object>> response = enrollments.stream().map(e -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", e.getId());
            map.put("enrolledAt", e.getEnrolledAt());
            map.put("student", e.getStudent() != null ? Map.of(
                    "id", e.getStudent().getId(),
                    "name", e.getStudent().getName(),
                    "email", e.getStudent().getEmail()
            ) : null);
            map.put("course", e.getCourse() != null ? Map.of(
                    "id", e.getCourse().getId(),
                    "title", e.getCourse().getTitle()
            ) : null);
            map.put("status", e.getCompletedAt() != null ? "Completed" : "Active");
            return map;
        }).toList();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/certificates")
    public ResponseEntity<List<com.lms.model.Certificate>> getAllCertificates() {
        return ResponseEntity.ok(certificateRepo.findAll());
    }

}