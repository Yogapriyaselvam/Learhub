package com.lms.service;

import com.lms.dto.QuizSubmitRequest;
import com.lms.model.*;
import com.lms.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final QuizRepository quizRepo;
    private final QuizAttemptRepository attemptRepo;
    private final UserRepository userRepo;

    public List<Quiz> getQuizzesByCourse(Long courseId) {
        return quizRepo.findByCourseId(courseId);
    }

    public Map<String, Object> submitQuiz(Long studentId, QuizSubmitRequest req) {
        Quiz quiz = quizRepo.findById(req.getQuizId())
                .orElseThrow(() -> new RuntimeException("Quiz not found"));
        User student = userRepo.findById(studentId).orElseThrow();

        int score = 0;
        List<QuizQuestion> questions = quiz.getQuestions();
        for (QuizQuestion q : questions) {
            String chosen = req.getAnswers().get(q.getId());
            if (q.getCorrectOption().equalsIgnoreCase(chosen)) score++;
        }

        QuizAttempt attempt = QuizAttempt.builder()
                .student(student).quiz(quiz)
                .score(score).total(questions.size())
                .build();
        attemptRepo.save(attempt);

        Map<String, Object> result = new HashMap<>();
        result.put("score", score);
        result.put("total", questions.size());
        result.put("percentage", questions.isEmpty() ? 0 : (score * 100 / questions.size()));
        return result;
    }

    public List<QuizAttempt> getStudentAttempts(Long studentId) {
        return attemptRepo.findByStudentId(studentId);
    }
}