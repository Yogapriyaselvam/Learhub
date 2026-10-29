package com.lms.service;

import com.lms.dto.ProgressDtos.CourseProgressDTO;
import com.lms.dto.ProgressDtos.LessonProgressDTO;
import com.lms.model.*;
import com.lms.repository.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class UserProgressServiceImpl implements UserProgressService {

    private final UserLessonProgressRepository lessonRepo;
    private final UserCourseCompletionRepository completionRepo;
    private final CertificateRepository certificateRepo;
    private final UserRepository userRepo;
    private final CourseRepository courseRepo;

    public UserProgressServiceImpl(UserLessonProgressRepository lessonRepo,
                                   UserCourseCompletionRepository completionRepo,
                                   CertificateRepository certificateRepo,
                                   UserRepository userRepo,
                                   CourseRepository courseRepo) {
        this.lessonRepo = lessonRepo;
        this.completionRepo = completionRepo;
        this.certificateRepo = certificateRepo;
        this.userRepo = userRepo;
        this.courseRepo = courseRepo;
    }

    @Override
    public LessonProgressDTO markLessonComplete(Long userId, Long courseId, String lessonId) {
        UserLessonProgress progress = lessonRepo
                .findByUserIdAndCourseIdAndLessonId(userId, courseId, lessonId)
                .orElseGet(() -> new UserLessonProgress(userId, courseId, lessonId, false));

        progress.setCompleted(true);
        progress.setCompletedAt(LocalDateTime.now());
        lessonRepo.save(progress);

        return new LessonProgressDTO(lessonId, true);
    }

    @Override
    public CourseProgressDTO getCourseProgress(Long userId, Long courseId) {
        List<String> completedLessonIds = lessonRepo.findByUserIdAndCourseId(userId, courseId)
                .stream()
                .filter(UserLessonProgress::isCompleted)
                .map(UserLessonProgress::getLessonId)
                .collect(Collectors.toList());

        var completionOpt = completionRepo.findByUserIdAndCourseId(userId, courseId);
        boolean courseCompleted = completionOpt.map(UserCourseCompletion::isCompleted).orElse(false);
        Integer score = completionOpt.map(UserCourseCompletion::getScore).orElse(null);

        return new CourseProgressDTO(courseId, courseCompleted, score, completedLessonIds);
    }

    @Override
    public List<CourseProgressDTO> getAllProgressForUser(Long userId) {
        Map<Long, List<UserLessonProgress>> lessonsByCourse = lessonRepo.findByUserId(userId)
                .stream()
                .filter(UserLessonProgress::isCompleted)
                .collect(Collectors.groupingBy(UserLessonProgress::getCourseId));

        Map<Long, UserCourseCompletion> completionsByCourse = completionRepo.findByUserId(userId)
                .stream()
                .collect(Collectors.toMap(UserCourseCompletion::getCourseId, c -> c));

        return Stream.concat(lessonsByCourse.keySet().stream(), completionsByCourse.keySet().stream())
                .distinct()
                .map(courseId -> {
                    List<String> completedLessonIds = lessonsByCourse.getOrDefault(courseId, List.of())
                            .stream()
                            .map(UserLessonProgress::getLessonId)
                            .collect(Collectors.toList());

                    UserCourseCompletion completion = completionsByCourse.get(courseId);
                    boolean courseCompleted = completion != null && completion.isCompleted();
                    Integer score = completion != null ? completion.getScore() : null;

                    return new CourseProgressDTO(courseId, courseCompleted, score, completedLessonIds);
                })
                .collect(Collectors.toList());
    }

    @Override
    public CourseProgressDTO markCourseComplete(Long userId, Long courseId, Integer score) {
        UserCourseCompletion completion = completionRepo
                .findByUserIdAndCourseId(userId, courseId)
                .orElseGet(() -> new UserCourseCompletion(userId, courseId, false, null));

        completion.setCompleted(true);
        completion.setScore(score);
        completion.setCompletedAt(LocalDateTime.now());
        completionRepo.save(completion);

        return getCourseProgress(userId, courseId);
    }

    @Override
    public void awardCertificate(Long userId, Long courseId) {
        if (certificateRepo.findByUserIdAndCourseId(userId, courseId).isPresent()) {
            return;
        }

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Course course = courseRepo.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Certificate certificate = new Certificate(userId, courseId, user.getName(), course.getTitle());
        certificateRepo.save(certificate);
    }
}