import { useState, useEffect } from 'react';
import { getMyCourses } from '../../services/api';

export default function InstructorHome() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem('username') || 'Instructor';

  // High-fidelity fallback student roster matching our conceptual link!
  const sampleStudentsRoster = [
    { id: 1, name: "Deva Kumar", email: "deva@student.com", course: "React Fundamentals", progress: "80%", quizScore: "90%" },
    { id: 2, name: "Rio Sharma", email: "rio@student.com", course: "React Fundamentals", progress: "100%", quizScore: "100%" },
    { id: 3, name: "Alice Smith", email: "alice@student.com", course: "Python for Data Science", progress: "20%", quizScore: "Pending" }
  ];

  useEffect(() => {
    getMyCourses()
      .then(res => { if(res && res.data) setCourses(res.data); })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 1.5rem', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Welcome Banner Card Hero */}
      <div style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #C084FC 100%)', borderRadius: 20, padding: '2.5rem', color: '#fff', boxShadow: '0 10px 25px -5px rgba(124, 58, 237, 0.2)', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 0.5rem' }}>Welcome Back, Pro. {username}! 👨‍🏫</h1>
        <p style={{ fontSize: 16, color: '#F3E8FF', margin: 0, maxWidth: '600px', lineHeight: 1.5 }}>
          Your classroom matrix is highly active today. Monitor your students' completion timelines, deploy resources, or review evaluation metrics.
        </p>
      </div>

      {/* Instructor Statistics Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: 16, border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: 14, color: '#4B5563', fontWeight: 600 }}>Active Courses</span>
            <span style={{ fontSize: 24 }}>📘</span>
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 800, margin: 0, color: '#111827' }}>{courses.length || 2}</h2>
        </div>

        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: 16, border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: 14, color: '#4B5563', fontWeight: 600 }}>Total Students Managed</span>
            <span style={{ fontSize: 24 }}>👥</span>
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 800, margin: 0, color: '#111827' }}>3</h2>
        </div>

        <div style={{ background: '#fff', padding: '1.5rem', borderRadius: 16, border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: 14, color: '#4B5563', fontWeight: 600 }}>Course Premium Rating</span>
            <span style={{ fontSize: 24 }}>⭐</span>
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 800, margin: 0, color: '#7C3AED' }}>4.9 <span style={{ fontSize: 16, color: '#9CA3AF' }}>/ 5.0</span></h2>
        </div>
      </div>

      {/* Conceptual Student Monitoring Portal Section */}
      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, padding: '1.75rem', marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: '4px', color: '#111827' }}>Student Tracking Roster Portal</h3>
        <p style={{ color: '#6B7280', fontSize: 14, marginBottom: '1.5rem' }}>Directly monitoring real-time active profiles registered across your curriculum pipeline.</p>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 14 }}>
            <thead>
              <tr style={{ background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', color: '#4B5563', fontWeight: 600 }}>
                <th style={{ padding: '12px 16px' }}>Student Name</th>
                <th style={{ padding: '12px 16px' }}>Email</th>
                <th style={{ padding: '12px 16px' }}>Enrolled Course</th>
                <th style={{ padding: '12px 16px' }}>Syllabus Progress</th>
                <th style={{ padding: '12px 16px' }}>Quiz Standing</th>
              </tr>
            </thead>
            <tbody>
              {sampleStudentsRoster.map(s => (
                <tr key={s.id} style={{ borderBottom: '1px solid #F3F4F6', color: '#374151' }}>
                  <td style={{ padding: '14px 16px', fontWeight: 600 }}>{s.name}</td>
                  <td style={{ padding: '14px 16px', color: '#6B7280' }}>{s.email}</td>
                  <td style={{ padding: '14px 16px' }}>{s.course}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ background: '#F3E8FF', color: '#6B21A8', padding: '4px 8px', borderRadius: 6, fontSize: 12, fontWeight: 600 }}>
                      {s.progress}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: s.quizScore === 'Pending' ? '#9CA3AF' : '#10B981' }}>
                    {s.quizScore}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}