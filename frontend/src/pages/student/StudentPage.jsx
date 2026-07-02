import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getMyEnrollments, getPublicCourses, enrollCourse } from '../../services/api';

// ─── StudentHome ──────────────────────────────────────────────────────────────
export function StudentHome() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    getMyEnrollments().then(r => setEnrollments(r.data)).catch(() => {});
  }, []);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ background: 'linear-gradient(135deg, #4F46E5, #3730A3)', borderRadius: 16, padding: '3rem 2.5rem', color: '#fff', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: 36, fontWeight: 700, margin: '0 0 0.5rem' }}>Welcome back, {user.name.split(' ')[0]}! 👋</h1>
        <p style={{ margin: 0, opacity: 0.85 }}>Continue your learning journey</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: '2rem' }}>
        {[['📚', enrollments.length, 'Enrolled'],
          ['✅', '0', 'Completed'],
          ['🏆', '0', 'Certificates'],
          ['⏱️', '0h', 'Time Spent']
        ].map(([icon, val, label]) => (
          <div key={label} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
            <div style={{ fontSize: 24, marginBottom: 4 }}>{icon}</div>
            <p style={{ fontSize: 28, fontWeight: 700, color: '#4F46E5', margin: '0 0 4px' }}>{val}</p>
            <p style={{ fontSize: 12, color: '#9CA3AF', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</p>
          </div>
        ))}
      </div>
      <h2 style={{ fontWeight: 700, fontSize: 20, marginBottom: '1rem' }}>My Enrolled Courses</h2>
      {enrollments.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#9CA3AF', background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📭</div>
          <p>You haven't enrolled in any courses yet. Browse courses to get started!</p>
        </div>
      ) : enrollments.map(e => (
        <div key={e.id} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: '1.25rem', marginBottom: 12 }}>
          <h3 style={{ margin: '0 0 4px', fontWeight: 600 }}>{e.course?.title || 'Course'}</h3>
          <p style={{ margin: 0, fontSize: 13, color: '#9CA3AF' }}>Enrolled {new Date(e.enrolledAt).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}

// ─── CoursesPage ──────────────────────────────────────────────────────────────
export function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    getPublicCourses().then(r => setCourses(r.data));
    getMyEnrollments().then(r => setEnrolledIds(r.data.map(e => e.course?.id))).catch(() => {});
  }, []);

  const enroll = async (courseId) => {
    try {
      await enrollCourse(courseId);
      setEnrolledIds([...enrolledIds, courseId]);
      setMsg('Enrolled successfully! 🎉');
      setTimeout(() => setMsg(''), 3000);
    } catch (e) { setMsg(e.response?.data?.message || 'Error enrolling'); }
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontWeight: 700, fontSize: 28, marginBottom: '0.5rem' }}>All Courses</h1>
      <p style={{ color: '#9CA3AF', marginBottom: '1.5rem', fontSize: 14 }}>{courses.length} courses available</p>
      {msg && <div style={{ background: '#DCFCE7', color: '#16A34A', padding: '12px 16px', borderRadius: 8, marginBottom: '1rem', fontSize: 14 }}>{msg}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: '1.25rem' }}>
        {courses.map(c => {
          const isEnrolled = enrolledIds.includes(c.id);
          return (
            <div key={c.id} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, overflow: 'hidden' }}>
              <div style={{ padding: '1.5rem 1.5rem 0', textAlign: 'center', fontSize: 48 }}>📘</div>
              <div style={{ padding: '1.25rem' }}>
                <span style={{ background: '#EEF2FF', color: '#4F46E5', fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 20 }}>{c.categoryName || 'Course'}</span>
                <h3 style={{ fontWeight: 600, fontSize: 16, margin: '8px 0 4px' }}>{c.title}</h3>
                <p style={{ fontSize: 13, color: '#9CA3AF', margin: '0 0 8px' }}>{c.instructorName} · {c.durationWeeks}w · {c.lessonCount} lessons</p>
                <p style={{ fontSize: 13, color: '#4B5563', margin: '0 0 1rem', lineHeight: 1.5 }}>{c.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#9CA3AF', marginBottom: 12 }}>
                  <span>👥 {c.enrollmentCount} students</span>
                  <span>📝 {c.durationWeeks}w duration</span>
                </div>
                {isEnrolled
                  ? <button style={{ width: '100%', background: '#DCFCE7', color: '#16A34A', border: 'none', padding: '9px', borderRadius: 8, cursor: 'default', fontWeight: 500, fontSize: 14 }}>✅ Enrolled – Continue</button>
                  : <button onClick={() => enroll(c.id)} style={{ width: '100%', background: '#4F46E5', color: '#fff', border: 'none', padding: '9px', borderRadius: 8, cursor: 'pointer', fontWeight: 500, fontSize: 14 }}>Enroll Now</button>
                }
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── ProgressPage ─────────────────────────────────────────────────────────────
export function ProgressPage() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    getMyEnrollments().then(r => setEnrollments(r.data)).catch(() => {});
  }, []);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontWeight: 700, fontSize: 28, marginBottom: '1.5rem' }}>My Progress</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: '2rem' }}>
        {[['Total Enrolled', enrollments.length, '#4F46E5'],
          ['In Progress', enrollments.length, '#CA8A04'],
          ['Completed', 0, '#16A34A']
        ].map(([label, val, color]) => (
          <div key={label} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: '1.25rem', textAlign: 'center' }}>
            <p style={{ fontSize: 28, fontWeight: 700, color, margin: '0 0 4px' }}>{val}</p>
            <p style={{ fontSize: 12, color: '#9CA3AF', margin: 0, textTransform: 'uppercase' }}>{label}</p>
          </div>
        ))}
      </div>
      {enrollments.length === 0
        ? <div style={{ textAlign: 'center', padding: '3rem', color: '#9CA3AF' }}><div style={{ fontSize: 48, marginBottom: 16 }}>📭</div><p>No courses enrolled yet.</p></div>
        : enrollments.map(e => (
          <div key={e.id} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: '1.25rem', marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ margin: '0 0 4px', fontWeight: 600 }}>{e.course?.title}</h3>
                <p style={{ margin: 0, fontSize: 12, color: '#9CA3AF' }}>Enrolled: {new Date(e.enrolledAt).toLocaleDateString()}</p>
              </div>
              <span style={{ background: '#FEF9C3', color: '#CA8A04', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20 }}>In Progress</span>
            </div>
            <div style={{ marginTop: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#4B5563', marginBottom: 4 }}>
                <span>Progress</span><span>0%</span>
              </div>
              <div style={{ height: 6, background: '#F3F4F6', borderRadius: 4 }}>
                <div style={{ width: '0%', height: '100%', background: '#4F46E5', borderRadius: 4 }} />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}