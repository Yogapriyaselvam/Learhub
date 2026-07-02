import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:8082/api/admin' });
API.interceptors.request.use(req => {
  req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return req;
});

export const getDashboardStats = () => API.get('/dashboard-stats');
export const getUsers = () => API.get('/users');
export const getCourses = () => API.get('/courses');
export const updateCourseStatus = (id, status) => API.put(`/courses/${id}/status`, { status });
export const deleteUser = (id) => API.delete(`/users/${id}`);