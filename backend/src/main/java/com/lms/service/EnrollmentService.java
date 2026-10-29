package com.lms.service;

import com.lms.model.Course;
import com.lms.model.Enrollment;
import com.lms.model.User;
import com.lms.repository.CourseRepository;
import com.lms.repository.EnrollmentRepository;
import com.lms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepo;
    private final CourseRepository courseRepo;
    private final UserRepository userRepo;

    // Enroll student into course
    public Enrollment enroll(Long studentId, Long courseId) {

        if (enrollmentRepo.existsByStudentIdAndCourseId(studentId, courseId)) {
            throw new RuntimeException("Already enrolled in this course");
        }

        User student = userRepo.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Course course = courseRepo.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(student);
        enrollment.setCourse(course);

        return enrollmentRepo.save(enrollment);
    }

    // Drop course
    public void drop(Long studentId, Long courseId) {

        Enrollment enrollment = enrollmentRepo.findByStudentIdAndCourseId(studentId, courseId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        enrollmentRepo.delete(enrollment);
    }

    // Get all courses of a student
    public List<Enrollment> getStudentEnrollments(Long studentId) {
        return enrollmentRepo.findByStudentId(studentId);
    }

    // Get all students of a course
    public List<Enrollment> getCourseEnrollments(Long courseId) {
        return enrollmentRepo.findByCourseId(courseId);
    }

    // Check enrollment
    public boolean isEnrolled(Long studentId, Long courseId) {
        return enrollmentRepo.existsByStudentIdAndCourseId(studentId, courseId);
    }
}