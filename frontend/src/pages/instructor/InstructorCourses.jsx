import { useState, useEffect } from 'react';
import { getMyCourses, createCourse } from '../../services/api';

export default function InstructorCourses() {
  const [courses,   setCourses]   = useState([]);
  const [showForm,  setShowForm]  = useState(false);
  const [saving,    setSaving]    = useState(false);
  const [loading,   setLoading]   = useState(true);
  const [msg,       setMsg]       = useState({ text: '', type: '' });
  const [form,      setForm]      = useState({
    title: '', description: '', durationWeeks: '', isPublished: false,
  });

  useEffect(() => {
    getMyCourses()
      .then(r => setCourses(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const flash = (text, type = 'success') => {
    setMsg({ text, type });
    setTimeout(() => setMsg({ text: '', type: '' }), 3000);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return flash('Course title is required', 'error');
    setSaving(true);
    try {
      const { data } = await createCourse({
        ...form,
        durationWeeks: Number(form.durationWeeks) || 0,
      });
      setCourses(prev => [...prev, data]);
      setShowForm(false);
      setForm({ title: '', description: '', durationWeeks: '', isPublished: false });
      flash('Course created successfully! ✅');
    } catch (e) {
      flash(e.response?.data?.message || 'Failed to create course', 'error');
    } finally {
      setSaving(false);
    }
  };

  const input = {
    width: '100%', padding: '9px 12px',
    border: '1px solid #E5E7EB', borderRadius: 8,
    fontSize: 14, boxSizing: 'border-box',
    marginBottom: 12, outline: 'none',
  };
  const label = {
    fontSize: 13, fontWeight: 500,
    color: '#4B5563', display: 'block', marginBottom: 4,
  };

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1.5rem', fontFamily: 'system-ui, sans-serif' }}>

      {/* Page header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontWeight: 700, fontSize: 28, margin: '0 0 4px' }}>My Courses</h1>
          <p style={{ margin: 0, color: '#9CA3AF', fontSize: 14 }}>{courses.length} courses total</p>
        </div>
        <button
          onClick={() => setShowForm(v => !v)}
          style={{
            background: showForm ? '#F3F4F6' : '#059669',
            color: showForm ? '#4B5563' : '#fff',
            border: 'none', padding: '10px 20px',
            borderRadius: 8, cursor: 'pointer', fontWeight: 500,
          }}
        >
          {showForm ? '✕ Cancel' : '+ New Course'}
        </button>
      </div>

      {/* Flash */}
      {msg.text && (
        <div style={{
          padding: '12px 16px', borderRadius: 8, marginBottom: '1rem', fontSize: 14,
          background: msg.type === 'success' ? '#DCFCE7' : '#FEE2E2',
          color:      msg.type === 'success' ? '#16A34A' : '#DC2626',
        }}>
          {msg.text}
        </div>
      )}

      {/* Create form */}
      {showForm && (
        <div style={{
          background: '#fff', border: '1px solid #E5E7EB',
          borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem',
        }}>
          <h3 style={{ margin: '0 0 1rem', fontWeight: 600 }}>Create New Course</h3>
          <form onSubmit={handleCreate}>
            <label style={label}>Course Title *</label>
            <input
              style={input} placeholder="e.g. Advanced JavaScript"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              required
            />

            <label style={label}>Description</label>
            <textarea
              style={{ ...input, height: 80, resize: 'vertical' }}
              placeholder="What will students learn?"
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            />

            <label style={label}>Duration (weeks)</label>
            <input
              style={input} type="number" min="1" placeholder="8"
              value={form.durationWeeks}
              onChange={e => setForm(f => ({ ...f, durationWeeks: e.target.value }))}
            />

            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, color: '#4B5563', marginBottom: 16 }}>
              <input
                type="checkbox"
                checked={form.isPublished}
                onChange={e => setForm(f => ({ ...f, isPublished: e.target.checked }))}
              />
              Publish immediately (visible to students)
            </label>

            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type="submit" disabled={saving}
                style={{
                  background: '#059669', color: '#fff', border: 'none',
                  padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontWeight: 500,
                }}
              >
                {saving ? 'Creating...' : 'Create Course'}
              </button>
              <button
                type="button" onClick={() => setShowForm(false)}
                style={{
                  background: '#F3F4F6', color: '#4B5563', border: 'none',
                  padding: '10px 24px', borderRadius: 8, cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Courses table */}
      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, overflow: 'hidden' }}>
        {loading ? (
          <p style={{ padding: '2rem', color: '#9CA3AF', textAlign: 'center' }}>Loading...</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr>
                {['Course', 'Category', 'Lessons', 'Students', 'Duration', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '10px 14px',
                    background: '#F9FAFB', color: '#9CA3AF',
                    fontWeight: 600, fontSize: 12,
                    textTransform: 'uppercase', letterSpacing: '0.5px',
                    borderBottom: '1px solid #E5E7EB',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {courses.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: '#9CA3AF' }}>
                    No courses yet. Create your first course!
                  </td>
                </tr>
              ) : courses.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 600 }}>📘 {c.title}</td>
                  <td style={{ padding: '12px 14px', color: '#6B7280' }}>{c.categoryName || '—'}</td>
                  <td style={{ padding: '12px 14px' }}>{c.lessonCount}</td>
                  <td style={{ padding: '12px 14px' }}>{c.enrollmentCount}</td>
                  <td style={{ padding: '12px 14px' }}>{c.durationWeeks}w</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{
                      fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 20,
                      background: c.isPublished ? '#D1FAE5' : '#F3F4F6',
                      color:      c.isPublished ? '#059669' : '#6B7280',
                    }}>
                      {c.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <button style={{
                      background: '#EEF2FF', color: '#4F46E5', border: 'none',
                      padding: '4px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 12,
                    }}>
                      ✏️ Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}