import { useEffect, useState } from 'react';
import { getDashboardStats } from '../../services/adminService';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    students: 0,
    instructors: 0,
    courses: 0,
    enrollments: 0,
    revenue: 0
  });

  useEffect(() => {
    getDashboardStats()
      .then(res => setStats(res.data))
      .catch(err => console.error("Failed to fetch stats", err));
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: 30 }}>Overview</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        <StatCard title="Total Students" value={stats.students} />
        <StatCard title="Total Instructors" value={stats.instructors} />
        <StatCard title="Total Courses" value={stats.courses} />
        <StatCard title="Total Enrollments" value={stats.enrollments} />
        <StatCard title="Revenue" value={`$${stats.revenue}`} />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div style={{
      background: '#fff',
      padding: '20px',
      borderRadius: 12,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      flex: 1
    }}>
      <h4 style={{ color: '#64748b', margin: 0 }}>{title}</h4>
      <p style={{ fontSize: 28, fontWeight: 800, margin: '10px 0 0' }}>{value}</p>
    </div>
  );
}
