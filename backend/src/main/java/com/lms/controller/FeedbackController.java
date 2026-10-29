package com.lms.controller;

import com.lms.model.Feedback;
import com.lms.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
@CrossOrigin(origins = "http://localhost:3000")
public class FeedbackController {

    @Autowired
    private FeedbackRepository feedbackRepository;

    // Student submits feedback
    @PostMapping
    public Feedback submitFeedback(@RequestBody Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    // Admin gets all feedback
    @GetMapping
    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }

    // Get only approved feedback
    @GetMapping("/approved")
    public List<Feedback> getApprovedFeedback() {
        return feedbackRepository.findByStatus("approved");
    }

    // Delete feedback
    @DeleteMapping("/{id}")
    public void deleteFeedback(@PathVariable Long id) {
        feedbackRepository.deleteById(id);
    }
}