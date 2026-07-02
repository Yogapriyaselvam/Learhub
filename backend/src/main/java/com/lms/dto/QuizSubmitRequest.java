// ── QuizSubmitRequest.java
package com.lms.dto;

import lombok.Data;
import java.util.Map;

@Data
public class QuizSubmitRequest {
    private Long quizId;
    // questionId -> chosen option ("A","B","C","D")
    private Map<Long, String> answers;
}