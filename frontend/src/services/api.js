import axios from "axios";

// ==========================================
// Axios Configuration
// ==========================================
const API = axios.create({
  baseURL: "http://localhost:8082/api", // Change to 8082 only if your backend runs there
  headers: {
    "Content-Type": "application/json",
  },
});

// ==========================================
// Request Interceptor
// ==========================================
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ==========================================
// Response Interceptor
// ==========================================
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

// ==========================================
// AUTH
// ==========================================

export const register = (data) =>
  API.post("/auth/register", data);

export const login = (data) =>
  API.post("/auth/login", data);

export const resetPassword = (data) =>
  API.post("/auth/reset-password", data);

// ==========================================
// COURSES
// ==========================================

export const getPublicCourses = () =>
  API.get("/courses/public");

export const getCourseById = (id) =>
  API.get(`/courses/public/${id}`);

export const getCourseLessons = (courseId) =>
  API.get(`/courses/${courseId}/lessons`);

// ==========================================
// STUDENT
// ==========================================

export const enrollCourse = (courseId) =>
  API.post(`/student/enroll/${courseId}`);

export const getMyEnrollments = () =>
  API.get("/student/enrollments");

// ✅ Correct endpoint
export const dropEnrollment = (courseId) =>
  API.delete(`/student/enroll/${courseId}`);

export const submitQuiz = (data) =>
  API.post("/student/quiz/submit", data);

export const getQuizAttempts = () =>
  API.get("/student/quiz/attempts");

// ==========================================
// FEEDBACK
// ==========================================

export const submitFeedback = (data) =>
  API.post("/feedback", data);

export const getFeedbacks = () =>
  API.get("/feedback");

export const deleteFeedback = (id) =>
  API.delete(`/feedback/${id}`);

// ==========================================
// PROGRESS
// ==========================================

export const getAllProgress = () =>
  API.get("/progress/all");

export const getCourseProgress = (courseId) =>
  API.get(`/progress/course/${courseId}`);

export const markLessonComplete = (courseId, lessonId) =>
  API.post("/progress/lesson/complete", {
    courseId,
    lessonId,
  });

export const markCourseComplete = (courseId, score) =>
  API.post("/progress/course/complete", {
    courseId,
    score,
  });

// ==========================================
// INSTRUCTOR
// ==========================================

export const getMyCourses = () =>
  API.get("/instructor/courses");

export const createCourse = (data) =>
  API.post("/instructor/courses", data);

export const updateCourse = (id, data) =>
  API.put(`/instructor/courses/${id}`, data);

export const getCourseStudents = (id) =>
  API.get(`/instructor/courses/${id}/students`);

// ==========================================
// ADMIN
// ==========================================

export const getAllUsers = () =>
  API.get("/admin/users");

export const deleteUser = (id) =>
  API.delete(`/admin/users/${id}`);

export const getAdminCourses = () =>
  API.get("/admin/courses");

export const deleteAdminCourse = (id) =>
  API.delete(`/admin/courses/${id}`);

export const getAdminStats = () =>
  API.get("/admin/stats");

// ==========================================
// Backward Compatibility
// ==========================================

export const getAllCourses = getPublicCourses;
export const enrollInCourse = enrollCourse;


export default API;