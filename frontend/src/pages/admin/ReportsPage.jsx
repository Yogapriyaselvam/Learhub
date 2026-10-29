import { useEffect, useState } from 'react';
import API from '../../services/api';

export default function ReportsPage() {
  const [stats, setStats] = useState({ totalUsers: 0, totalCourses: 0, totalEnrollments: 0, completionRate: 0 });
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const [statsRes, certsRes] = await Promise.all([
          API.get('/admin/stats'),
          API.get('/admin/certificates'),
        ]);

        const storedCerts = certsRes?.data || [];
        const totalEnrollments = statsRes?.data?.totalEnrollments || 0;
        const totalStudents = statsRes?.data?.totalStudents || 0;
        const totalCourses = statsRes?.data?.totalCourses || 0;
        const completionRate = totalEnrollments
          ? Math.round((storedCerts.length / totalEnrollments) * 100)
          : 0;

        setStats({
          totalUsers: totalStudents,
          totalCourses,
          totalEnrollments,
          completionRate,
        });
        setCertificates(storedCerts);
      } catch (err) {
        console.error('Failed to load reports', err);
      }
    };

    loadReports();
  }, []);

  return (
    <div>
      <h1 style={{ marginBottom: 30 }}>Certificates</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: 30 }}>
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Total Courses" value={stats.totalCourses} />
        <StatCard title="Total Enrollments" value={stats.totalEnrollments} />
        <StatCard title="Certificate Rate" value={`${stats.completionRate}%`} />
      </div>

      <div style={{ background: '#fff', padding: '20px', borderRadius: 12, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h4 style={{ margin: '0 0 12px' }}>Recipients</h4>
        {certificates.length === 0 ? (
          <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>No certificates have been awarded yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {certificates.map((item, index) => {
              const formatDate = (dateStr) => {
                if (!dateStr) return '';
                try {
                  const d = new Date(dateStr);
                  if (!isNaN(d.getTime())) {
                    return d.toLocaleDateString();
                  }
                } catch (e) {}
                return dateStr;
              };
              return (
                <div key={`${item.studentId || item.studentName || item.userId}-${index}`} style={{ border: '1px solid #E2E8F0', borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ fontWeight: 700, color: '#0F172A' }}>{item.studentName}</div>
                  <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>{item.courseTitle}</div>
                  <div style={{ fontSize: 12, color: '#4F46E5', marginTop: 4 }}>Awarded on {formatDate(item.earnedAt)}</div>
                </div>
              );
            })}
          </div>
        )}
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