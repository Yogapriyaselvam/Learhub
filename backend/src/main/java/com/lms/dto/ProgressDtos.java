package com.lms.dto;

import java.util.List;

public class ProgressDtos {

    public static class LessonProgressRequest {
        public Long courseId;
        public String lessonId;
    }

    public static class CourseCompletionRequest {
        public Long courseId;
        public Integer score;
    }

    public static class LessonProgressDTO {
        public String lessonId;
        public boolean completed;

        public LessonProgressDTO(String lessonId, boolean completed) {
            this.lessonId = lessonId;
            this.completed = completed;
        }
    }

    public static class CourseProgressDTO {
        public Long courseId;
        public boolean courseCompleted;
        public Integer score;
        public List<String> completedLessonIds;

        public CourseProgressDTO(Long courseId, boolean courseCompleted, Integer score, List<String> completedLessonIds) {
            this.courseId = courseId;
            this.courseCompleted = courseCompleted;
            this.score = score;
            this.completedLessonIds = completedLessonIds;
        }
    }

    public static class CertificateRequest {
        public Long courseId;
    }
}