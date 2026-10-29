package com.lms.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
    name = "user_lesson_progress",
    uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "course_id", "lesson_id"})
)
public class UserLessonProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "course_id", nullable = false)
    private Long courseId;

    @Column(name = "lesson_id", nullable = false, length = 150)
    private String lessonId;

    @Column(nullable = false)
    private boolean completed;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    public UserLessonProgress() {}

    public UserLessonProgress(Long userId, Long courseId, String lessonId, boolean completed) {
        this.userId = userId;
        this.courseId = courseId;
        this.lessonId = lessonId;
        this.completed = completed;
        this.completedAt = completed ? LocalDateTime.now() : null;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }

    public String getLessonId() { return lessonId; }
    public void setLessonId(String lessonId) { this.lessonId = lessonId; }

    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }

    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
}