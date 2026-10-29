package com.lms.service;

import com.lms.dto.ProgressDtos.CourseProgressDTO;
import com.lms.dto.ProgressDtos.LessonProgressDTO;

import java.util.List;

public interface UserProgressService {
    LessonProgressDTO markLessonComplete(Long userId, Long courseId, String lessonId);
    CourseProgressDTO getCourseProgress(Long userId, Long courseId);
    List<CourseProgressDTO> getAllProgressForUser(Long userId);
    CourseProgressDTO markCourseComplete(Long userId, Long courseId, Integer score);
    void awardCertificate(Long userId, Long courseId);
}