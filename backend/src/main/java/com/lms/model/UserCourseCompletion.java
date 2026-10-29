package com.lms.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(
    name = "user_course_completion",
    uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "course_id"})
)
public class UserCourseCompletion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "course_id", nullable = false)
    private Long courseId;

    @Column(nullable = false)
    private boolean completed;

    private Integer score;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;

    public UserCourseCompletion() {}

    public UserCourseCompletion(Long userId, Long courseId, boolean completed, Integer score) {
        this.userId = userId;
        this.courseId = courseId;
        this.completed = completed;
        this.score = score;
        this.completedAt = completed ? LocalDateTime.now() : null;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }

    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }

    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }

    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
}