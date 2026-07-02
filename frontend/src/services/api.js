import axios from "axios";

// ==========================================
// Axios Configuration
// ==========================================
const API = axios.create({
  baseURL: "http://localhost:8082/api",
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
   axios.post('http://localhost:8082/api/auth/reset-password', data);

export const getPublicCourses = () =>
  API.get("/courses/public");

export const getCourseById = (id) =>
  API.get(`/courses/public/${id}`);

// ==========================================
// STUDENT
// ==========================================
export const enrollCourse = (id) =>
  API.post(`/student/enroll/${id}`);

export const getMyEnrollments = () =>
  API.get("/student/enrollments");

export const submitQuiz = (data) =>
  API.post("/student/quiz/submit", data);

export const getQuizAttempts = () =>
  API.get("/student/quiz/attempts");

export const getCourseLessons = (courseId) =>
  API.get(`/student/courses/${courseId}/lessons`);

export const dropEnrollment = (enrollmentId) =>
  API.delete(`/student/enrollments/${enrollmentId}`);

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
// BACKWARD COMPATIBILITY
// ==========================================
export const getAllCourses = getPublicCourses;

export const enrollInCourse = enrollCourse;

// ==========================================

export default API;