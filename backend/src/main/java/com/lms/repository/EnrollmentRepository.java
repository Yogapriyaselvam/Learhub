package com.lms.repository;

import com.lms.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {

    // Get all enrollments of a student (with course details)
    @Query("SELECT e FROM Enrollment e LEFT JOIN FETCH e.course c LEFT JOIN FETCH e.student s WHERE s.id = :studentId")
    List<Enrollment> findByStudentId(@Param("studentId") Long studentId);

    @Query("SELECT e FROM Enrollment e LEFT JOIN FETCH e.course c LEFT JOIN FETCH e.student s")
    List<Enrollment> findAllWithDetails();

    // Get all enrollments for a course
    List<Enrollment> findByCourseId(Long courseId);

    // Find a specific enrollment by student and course
    Optional<Enrollment> findByStudentIdAndCourseId(Long studentId, Long courseId);

    // Check if a student is already enrolled in a course
    boolean existsByStudentIdAndCourseId(Long studentId, Long courseId);

    // Count enrollments for all courses of an instructor
    @Query("SELECT COUNT(e) FROM Enrollment e WHERE e.course.instructor.id = :instructorId")
    long countByInstructorId(@Param("instructorId") Long instructorId);
}