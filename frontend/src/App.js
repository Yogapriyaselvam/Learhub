import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import Course_Page from "./pages/Course_Page";
import Pricing from "./pages/Pricing";
import Instructor from "./pages/Instructor";

import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import RegisterPage from "./pages/RegisterPage";

import StudentHome from "./pages/student/StudentHome";
import StudentCoursesPage from "./pages/student/CoursesPage";
import ProgressPage from "./pages/student/ProgressPage";
import QuizPage from "./pages/student/QuizPage";

import InstructorHome from "./pages/instructor/InstructorHome";
import InstructorDashboard from "./pages/instructor/InstructorDashboard";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCourses from "./pages/admin/AdminCourses";
import CategoriesPage from "./pages/admin/CategoriesPage";
import EnrollmentsPage from "./pages/admin/EnrollmentsPage";
import PaymentsPage from "./pages/admin/PaymentsPage";
import ReportsPage from "./pages/admin/ReportsPage";
import FeedbackPage from "./pages/admin/FeedbackPage";
import SettingsPage from "./pages/admin/SettingsPage";

function AppContent() {
  const location = useLocation();

  // AboutPage / Course_Page / Pricing / Instructor each render their own
  // nav bar (via PageLayout), so the global Navbar is hidden on those routes
  // too — otherwise you'd see two navbars stacked on top of each other.
  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/about" ||
    location.pathname === "/courses" ||
    location.pathname === "/pricing" ||
    location.pathname === "/instructors";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/courses" element={<Course_Page />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/instructors" element={<Instructor />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/student/home" element={<StudentHome />} />
        <Route path="/student/courses" element={<StudentCoursesPage />} />
        <Route path="/student/progress" element={<ProgressPage />} />
        <Route path="/student/quiz" element={<QuizPage />} />

        <Route path="/instructor/home" element={<InstructorHome />} />
        <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="enrollments" element={<EnrollmentsPage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path="settings" element={<SettingsPage />} />

          <Route path="" element={<Navigate to="dashboard" replace />} />
        </Route>

        <Route path="/*" element={<AppContent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;