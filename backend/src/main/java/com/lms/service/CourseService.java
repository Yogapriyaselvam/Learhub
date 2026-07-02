package com.lms.service;

import com.lms.dto.*;
import com.lms.model.*;
import com.lms.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepo;
    private final CategoryRepository categoryRepo;
    private final UserRepository userRepo;
    private final EnrollmentRepository enrollmentRepo;
    private final LessonRepository lessonRepo;

    public List<CourseDTO> getAllPublished() {
        return courseRepo.findByIsPublishedTrue().stream()
                .map(this::toDTO).collect(Collectors.toList());
    }

    public List<CourseDTO> getByInstructor(Long instructorId) {
        return courseRepo.findByInstructorId(instructorId).stream()
                .map(this::toDTO).collect(Collectors.toList());
    }

    public List<CourseDTO> getAll() {
        return courseRepo.findAll().stream()
                .map(this::toDTO).collect(Collectors.toList());
    }

    public CourseDTO getById(Long id) {
        return toDTO(courseRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found")));
    }

    public CourseDTO create(CourseRequest req, Long instructorId) {
        User instructor = userRepo.findById(instructorId)
                .orElseThrow(() -> new RuntimeException("Instructor not found"));
        Category category = req.getCategoryId() != null
                ? categoryRepo.findById(req.getCategoryId()).orElse(null) : null;

        Course course = Course.builder()
                .title(req.getTitle())
                .description(req.getDescription())
                .thumbnailUrl(req.getThumbnailUrl())
                .durationWeeks(req.getDurationWeeks())
                .instructor(instructor)
                .category(category)
                .isPublished(req.getIsPublished())
                .build();
        return toDTO(courseRepo.save(course));
    }

    public CourseDTO update(Long id, CourseRequest req, Long instructorId) {
        Course course = courseRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        if (!course.getInstructor().getId().equals(instructorId)) {
            throw new RuntimeException("Not authorized to edit this course");
        }
        course.setTitle(req.getTitle());
        course.setDescription(req.getDescription());
        course.setThumbnailUrl(req.getThumbnailUrl());
        course.setDurationWeeks(req.getDurationWeeks());
        course.setIsPublished(req.getIsPublished());
        if (req.getCategoryId() != null) {
            course.setCategory(categoryRepo.findById(req.getCategoryId()).orElse(null));
        }
        return toDTO(courseRepo.save(course));
    }

    public void delete(Long id) {
        courseRepo.deleteById(id);
    }

    private CourseDTO toDTO(Course c) {
        int lessonCount = lessonRepo.findByCourseIdOrderByOrderIndex(c.getId()).size();
        int enrollCount = enrollmentRepo.findByCourseId(c.getId()).size();
        return CourseDTO.builder()
                .id(c.getId())
                .title(c.getTitle())
                .description(c.getDescription())
                .thumbnailUrl(c.getThumbnailUrl())
                .durationWeeks(c.getDurationWeeks())
                .instructorName(c.getInstructor() != null ? c.getInstructor().getName() : "")
                .instructorId(c.getInstructor() != null ? c.getInstructor().getId() : null)
                .categoryName(c.getCategory() != null ? c.getCategory().getName() : "")
                .isPublished(c.getIsPublished())
                .lessonCount(lessonCount)
                .enrollmentCount(enrollCount)
                .createdAt(c.getCreatedAt())
                .build();
    }
}