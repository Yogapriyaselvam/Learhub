import { useState } from 'react';

export default function AdminCourses() {
  const [courses] = useState([
    { id: 1, title: 'React Masterclass', status: 'Pending Approval', price: 'Free', students: 42 }
  ]);

  const [expandedId, setExpandedId] = useState(null);

  const toggleCourse = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2>Course Management</h2>
        <button style={{ background: '#4f46e5', color: '#fff', padding: '10px 20px', borderRadius: 8, border: 'none' }}>
          + Add New Course
        </button>
      </div>

      <div style={{ display: 'grid', gap: '15px' }}>
        {courses.map(course => (
          <div key={course.id} style={{ background: '#fff', padding: '15px', borderRadius: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div
                onClick={() => toggleCourse(course.id)}
                style={{ cursor: 'pointer' }}
              >
                <strong>{course.title}</strong>
                <p style={{ margin: 0, color: '#64748b' }}>{course.status} | {course.price}</p>
              </div>
              <div>
                <button style={{ marginRight: 10 }}>Approve</button>
                <button style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '5px' }}>Delete</button>
              </div>
            </div>

            {expandedId === course.id && (
              <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px solid #e2e8f0' }}>
                <p style={{ margin: 0, color: '#334155' }}>
                  <strong>Course:</strong> {course.title}
                </p>
                <p style={{ margin: 0, color: '#334155' }}>
                  <strong>Enrolled Students:</strong> {course.students}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}