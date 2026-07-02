import { useEffect, useState } from 'react';

export default function ReportsPage() {
  const [stats, setStats] = useState({ totalUsers: 0, totalCourses: 0, totalEnrollments: 0, completionRate: 0 });

  useEffect(() => {
    const enrollments = JSON.parse(localStorage.getItem('admin_enrollments') || '[]');
    const categories = JSON.parse(localStorage.getItem('admin_categories') || '[]');
    const completed = enrollments.filter((e) => e.status === 'Completed').length;

    setStats({
      totalUsers: 128,
      totalCourses: categories.reduce((s, c) => s + (c.courseCount || 0), 0) || 45,
      totalEnrollments: enrollments.length || 312,
      completionRate: enrollments.length ? Math.round((completed / enrollments.length) * 100) : 68,
    });
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: 30 }}>Reports & Analytics</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: 30 }}>
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Total Courses" value={stats.totalCourses} />
        <StatCard title="Total Enrollments" value={stats.totalEnrollments} />
        <StatCard title="Completion Rate" value={`${stats.completionRate}%`} />
      </div>

      <div style={{ background: '#fff', padding: '20px', borderRadius: 12, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h4 style={{ margin: '0 0 10px' }}>Notes</h4>
        <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, margin: 0 }}>
          These figures are pulled from locally stored enrollment and category data as placeholders.
          Connect this page to your real reporting API endpoint (similar to getDashboardStats) to replace the mock numbers above.
        </p>
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