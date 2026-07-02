package com.lms.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AdminStatsDTO {
    private long totalStudents;
    private long totalInstructors;
    private long totalCourses;
    private long totalEnrollments;
}