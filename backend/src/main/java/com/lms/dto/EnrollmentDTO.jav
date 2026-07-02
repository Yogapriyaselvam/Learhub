package com.lms.dto;

import lombok.*;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EnrollmentDTO {
    private Long id;
    private Long courseId;
    private String courseTitle;
    private LocalDateTime enrolledAt;
}