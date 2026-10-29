import { useEffect, useState } from 'react';
import API from '../../services/api';

export default function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [coursesRes, enrollmentsRes] = await Promise.all([
          API.get('/admin/courses'),
          API.get('/admin/enrollments')
        ]);
        setCourses(coursesRes.data || []);
        setEnrollments(enrollmentsRes.data || []);
      } catch (err) {
        setError('Failed to load courses or enrollments.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleApprove = async (id, isPublished) => {
    try {
      await API.put(`/admin/courses/${id}/publish`, { published: !isPublished });
      // Reload courses
      const coursesRes = await API.get('/admin/courses');
      setCourses(coursesRes.data || []);
    } catch (err) {
      alert("Failed to update publish status");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await API.delete(`/admin/courses/${id}`);
        setCourses(prev => prev.filter(c => c.id !== id));
      } catch (err) {
        alert("Failed to delete course");
      }
    }
  };

  if (loading) {
    return <div style={{ padding: 20, color: '#64748b' }}>Loading courses data…</div>;
  }

  if (error) {
    return <div style={{ padding: 20, color: '#dc2626' }}>{error}</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2>Course Management</h2>
      </div>

      <div style={{ display: 'grid', gap: '15px' }}>
        {courses.length === 0 ? (
          <p style={{ color: '#64748b' }}>No courses available in registry.</p>
        ) : (
          courses.map(course => {
            const courseEnrollments = enrollments.filter(e => {
              const eCourseId = e.course?.id || e.courseId;
              return Number(eCourseId) === Number(course.id);
            });
            const isPublished = course.isPublished || course.published;

            return (
              <div key={course.id} style={{ background: '#fff', padding: '20px', borderRadius: 12, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: 16, color: '#0f172a' }}>{course.title}</strong>
                    <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 13 }}>
                      Status: <span style={{ fontWeight: 600, color: isPublished ? '#059669' : '#d97706' }}>
                        {isPublished ? 'Published' : 'Draft / Pending'}
                      </span>
                      {course.durationWeeks ? ` | Duration: ${course.durationWeeks} weeks` : ''}
                      {course.categoryName ? ` | Category: ${course.categoryName}` : ''}
                      {course.instructorName ? ` | Instructor: ${course.instructorName}` : ''}
                    </p>
                  </div>
                  <div>
                    <button 
                      onClick={() => handleApprove(course.id, isPublished)}
                      style={{ 
                        marginRight: 10,
                        padding: '6px 12px',
                        borderRadius: 6,
                        border: '1px solid #e2e8f0',
                        background: '#f8fafc',
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: 12
                      }}
                    >
                      {isPublished ? 'Unpublish' : 'Publish'}
                    </button>
                    <button 
                      onClick={() => handleDelete(course.id)}
                      style={{ 
                        background: '#ef4444', 
                        color: '#fff', 
                        border: 'none', 
                        padding: '6px 12px',
                        borderRadius: 6,
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: 12
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div style={{ marginTop: 15, paddingTop: 15, borderTop: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <p style={{ margin: 0, color: '#334155', fontSize: 14 }}>
                      <strong>Enrolled Students ({courseEnrollments.length})</strong>
                    </p>
                    <span style={{ fontSize: 12, color: '#64748b' }}>
                      {courseEnrollments.length === 0 ? 'No enrollments yet' : `${courseEnrollments.length} student(s)`}
                    </span>
                  </div>

                  {courseEnrollments.length === 0 ? (
                    <p style={{ margin: 0, color: '#64748b', fontSize: 13, fontStyle: 'italic' }}>
                      No students are enrolled in this course yet.
                    </p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 4 }}>
                      {courseEnrollments.map((enroll, idx) => {
                        const studentName = enroll.student?.name || enroll.studentName || 'Unknown Student';
                        const courseName = enroll.course?.title || course.title || 'Unknown Course';
                        const studentEmail = enroll.student?.email || 'No email info';
                        const status = enroll.status || 'Active';

                        return (
                          <div
                            key={enroll.id || idx}
                            style={{
                              fontSize: 13,
                              color: '#475569',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: '8px 10px',
                              background: '#f8fafc',
                              borderRadius: 8,
                              border: '1px solid #e2e8f0'
                            }}
                          >
                            <div>
                              <div style={{ fontWeight: 700, color: '#0f172a' }}>{studentName}</div>
                              <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>
                                Course: {courseName}
                              </div>
                            </div>
                            <div style={{ fontSize: 12, color: '#4f46e5', fontWeight: 600 }}>
                              {studentEmail}
                            </div>
                            <span style={{ fontSize: 12, color: '#059669', fontWeight: 700 }}>
                              {status}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}