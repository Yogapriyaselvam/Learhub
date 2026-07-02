package com.lms.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class CourseRequest {
    @NotBlank(message = "Title is required")
    private String title;

    private String description;
    private String thumbnailUrl;
    private Integer durationWeeks;
    private Long categoryId;
    
    // ✅ FIXED: Changed falCse to false
    private Boolean isPublished = false; 
}