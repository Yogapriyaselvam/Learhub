import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  // 1. Check if user is logged in at all
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. Check if the user has the required role (e.g., ADMIN)
  if (allowedRole && userRole !== allowedRole) {
    // If they aren't the right role, redirect them to a safe place
    return <Navigate to="/student/home" replace />;
  }

  // 3. If everything is fine, show the page
  return children;
}