import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function InstructorDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('my-courses'); 
  
  // Simulated State: This data would normally filter dynamically from the API based on the logged-in Instructor's ID
  const [myAssignedCourses, setMyAssignedCourses] = useState([
    { id: 1, title: "React.js Complete Guide", category: "🌐 Web Development", totalEnrolled: 5, status: "Active" },
    { id: 4, title: "Node.js & Express Development", category: "🌐 Web Development", totalEnrolled: 1, status: "Active" }
  ]);

  const [myStudentsRegistry, setMyStudentsRegistry] = useState([
    { id: 201, name: "Rio Student", email: "rio@learnhub.edu", courseTitle: "React.js Complete Guide", currentProgress: "95%", status: "Passed Exam" },
    { id: 205, name: "Alex Mercer", email: "alex@learnhub.edu", courseTitle: "Node.js & Express Development", currentProgress: "40%", status: "Learning" }
  ]);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 1.5rem', fontFamily: 'system-ui, sans-serif', background: '#FAFAFE', minHeight: '100vh' }}>
      
      {/* ─── INSTRUCTOR PRIVATE CONSOLE HEADER ─── */}
      <div style={{ background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)', padding: '2.5rem 3rem', borderRadius: '24px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
        <div>
          <span style={{ background: '#4F46E5', color: '#fff', fontSize: '10px', fontWeight: 800, padding: '4px 10px', borderRadius: 20, textTransform: 'uppercase' }}>Faculty Access Portal</span>
          <h1 style={{ fontWeight: 900, fontSize: 30, margin: '6px 0 0' }}>Welcome back, Instructor</h1>
          <p style={{ color: '#94A3B8', fontSize: 14, marginTop: '4px', margin: '4px 0 0' }}>Manage your assigned curriculum pathways, check student performance indicators, and sign certificates.</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 13, color: '#94A3B8' }}>Logged in as:</div>
          <strong style={{ color: '#10B981' }}>Authorized Instructor</strong>
        </div>
      </div>

      {/* ─── FACULTY WORKSPACE INTERACTIVE TABS ─── */}
      <div style={{ display: 'flex', gap: '12px', borderBottom: '2px solid #E2E8F0', marginBottom: '2.5rem' }}>
        <button 
          onClick={() => setActiveTab('my-courses')} 
          style={{ padding: '12px 20px', border: 'none', background: 'transparent', fontSize: 14, fontWeight: 700, color: activeTab === 'my-courses' ? '#4F46E5' : '#64748B', borderBottom: activeTab === 'my-courses' ? '3px solid #4F46E5' : '3px solid transparent', cursor: 'pointer' }}
        >
          📖 My Assigned Courses ({myAssignedCourses.length})
        </button>
        <button 
          onClick={() => setActiveTab('my-students')} 
          style={{ padding: '12px 20px', border: 'none', background: 'transparent', fontSize: 14, fontWeight: 700, color: activeTab === 'my-students' ? '#4F46E5' : '#64748B', borderBottom: activeTab === 'my-students' ? '3px solid #4F46E5' : '3px solid transparent', cursor: 'pointer' }}
        >
          👥 My Enrolled Students ({myStudentsRegistry.length})
        </button>
      </div>

      {/* ─── TAB VIEW 1: COURSES CARDS GRID ─── */}
      {activeTab === 'my-courses' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
          {myAssignedCourses.map((course) => (
            <div key={course.id} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.01)' }}>
              <div style={{ padding: '2rem', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', fontSize: '32px', textAlign: 'center' }}>📘</div>
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: 10, background: '#EEF2FF', color: '#4F46E5', fontWeight: 800, padding: '3px 8px', borderRadius: 20 }}>{course.category}</span>
                  <h3 style={{ fontWeight: 800, fontSize: 17, color: '#0F172A', marginTop: '8px', marginBottom: 0 }}>{course.title}</h3>
                </div>
                <div style={{ borderTop: '1px solid #F1F5F9', marginTop: '1.5rem', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#64748B' }}>
                  <span>Active Enrolments: <strong>{course.totalEnrolled} members</strong></span>
                  <span style={{ color: '#10B981', fontWeight: 700 }}>● {course.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── TAB VIEW 2: DETAILED STUDENT PERFORMANCE ROSTER ─── */}
      {activeTab === 'my-students' && (
        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.01)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#475569' }}>
                <th style={{ padding: '16px 20px', fontWeight: 700 }}>Student Name</th>
                <th style={{ padding: '16px 20px', fontWeight: 700 }}>Email Address</th>
                <th style={{ padding: '16px 20px', fontWeight: 700 }}>Assigned Course Track</th>
                <th style={{ padding: '16px 20px', fontWeight: 700 }}>Current Syllabus Progress</th>
                <th style={{ padding: '16px 20px', fontWeight: 700 }}>Grading Matrix Status</th>
              </tr>
            </thead>
            <tbody>
              {myStudentsRegistry.map((student) => (
                <tr key={student.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '16px 20px', fontWeight: 600, color: '#0F172A' }}>{student.name}</td>
                  <td style={{ padding: '16px 20px', color: '#64748B' }}>{student.email}</td>
                  <td style={{ padding: '16px 20px', fontWeight: 500, color: '#334155' }}>{student.courseTitle}</td>
                  <td style={{ padding: '16px 20px', fontWeight: 700, color: '#4F46E5' }}>{student.currentProgress}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{ fontSize: 11, fontWeight: 800, padding: '4px 10px', borderRadius: 20, background: student.status === 'Passed Exam' ? '#D1FAE5' : '#EEF2FF', color: student.status === 'Passed Exam' ? '#065F46' : '#4F46E5' }}>
                      {student.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}