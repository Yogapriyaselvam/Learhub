// ── CourseDTO.java
package com.lms.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data @Builder @AllArgsConstructor @NoArgsConstructor
public class CourseDTO {
    private Long id;
    private String title;
    private String description;
    private String thumbnailUrl;
    private Integer durationWeeks;
    private String instructorName;
    private Long instructorId;
    private String categoryName;
    private Boolean isPublished;
    private int lessonCount;
    private int enrollmentCount;
    private LocalDateTime createdAt;
}