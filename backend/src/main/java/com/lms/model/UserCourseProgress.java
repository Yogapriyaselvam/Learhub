package com.lms.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(
    name = "user_course_progress",
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "course_id"})
    }
)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserCourseProgress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // User
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Course
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    // Learning progress (0 - 100)
    @Column(nullable = false)
    private Integer progress = 0;

    // Current lesson number
    @Column(name = "current_lesson", nullable = false)
    private Integer currentLesson = 1;

    // Course completed?
    @Column(nullable = false)
    private Boolean completed = false;

    // Last accessed time
    @Column(name = "last_accessed")
    private LocalDateTime lastAccessed = LocalDateTime.now();

    @PrePersist
    protected void onCreate() {
        lastAccessed = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        lastAccessed = LocalDateTime.now();
    }
}