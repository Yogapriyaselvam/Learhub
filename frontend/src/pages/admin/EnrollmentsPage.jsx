import { useEffect, useState } from 'react';
import API from '../../services/api';

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadEnrollments = async () => {
      try {
        const res = await API.get('/admin/enrollments');
        const normalized = (res.data || []).map((item) => ({
          id: item.id,
          studentName: item.student?.name || item.studentName || 'Unknown student',
          courseTitle: item.course?.title || item.courseName || 'Unknown course',
          enrolledOn: item.enrolledAt || item.createdAt || item.enrollmentDate || '—',
          status: item.status || 'Active',
        }));
        setEnrollments(normalized);
      } catch (err) {
        setError('Unable to load enrollments right now.');
      } finally {
        setLoading(false);
      }
    };

    loadEnrollments();
  }, []);

  const filtered = statusFilter === 'all' ? enrollments : enrollments.filter((e) => e.status === statusFilter);

  const statusColor = (status) => {
    if (status === 'Active') return { bg: '#eef2ff', color: '#4f46e5' };
    if (status === 'Completed') return { bg: '#ecfdf5', color: '#059669' };
    return { bg: '#fef2f2', color: '#dc2626' };
  };

  if (loading) {
    return <div style={{ padding: 20, color: '#64748b' }}>Loading enrollments…</div>;
  }

  if (error) {
    return <div style={{ padding: 20, color: '#dc2626' }}>{error}</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
        <h1 style={{ margin: 0 }}>Enrollments</h1>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 13, fontWeight: 600, color: '#334155' }}
        >
          <option value="all">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Dropped">Dropped</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div style={{ background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 2px 4px rgba(0,0,0,0.1)', color: '#64748b' }}>
          No enrollments match this filter.
        </div>
      ) : (
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1.3fr 1fr', padding: '14px 20px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontSize: 12, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>
            <div>Student</div>
            <div>Course</div>
            <div>Enrolled On</div>
            <div>Status</div>
          </div>
          {filtered.map((e, idx) => {
            const sc = statusColor(e.status);
            return (
              <div
                key={e.id}
                style={{
                  display: 'grid', gridTemplateColumns: '2fr 2fr 1.3fr 1fr', alignItems: 'center',
                  padding: '16px 20px',
                  borderBottom: idx < filtered.length - 1 ? '1px solid #f1f5f9' : 'none'
                }}
              >
                <div style={{ fontWeight: 700 }}>{e.studentName}</div>
                <div style={{ fontSize: 14, color: '#334155' }}>{e.courseTitle}</div>
                <div style={{ fontSize: 13, color: '#64748b' }}>{e.enrolledOn}</div>
                <div>
                  <span style={{ background: sc.bg, color: sc.color, fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>
                    {e.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}