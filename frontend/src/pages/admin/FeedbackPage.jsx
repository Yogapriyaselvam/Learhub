import { useEffect, useState } from 'react';

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    // We use 'admin_feedback' globally so the Admin can see it regardless of who is logged in
    const saved = localStorage.getItem('admin_feedback');
    if (saved) {
      setFeedback(JSON.parse(saved));
    } else {
      const defaults = [
        { id: 1, studentName: 'Rio Sharma', courseTitle: 'React Masterclass', rating: 5, message: 'Loved the pacing.', date: '2026-06-29' },
      ];
      setFeedback(defaults);
      localStorage.setItem('admin_feedback', JSON.stringify(defaults));
    }
  }, []);

  const handleDelete = (id) => {
    const updated = feedback.filter((f) => f.id !== id);
    setFeedback(updated);
    localStorage.setItem('admin_feedback', JSON.stringify(updated));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Student Feedback</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '20px' }}>
        {feedback.map((f) => (
          <div key={f.id} style={{ background: '#fff', padding: '20px', borderRadius: 12, border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <strong>{f.studentName}</strong> 
                <div style={{ fontSize: '12px', color: '#64748b' }}>{f.courseTitle} · {f.date}</div>
                <div style={{ color: '#f59e0b' }}>{'★'.repeat(f.rating)}</div>
              </div>
              <button onClick={() => handleDelete(f.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '8px', borderRadius: 6 }}>Remove</button>
            </div>
            {/* Display message or comment */}
            <p style={{ marginTop: '10px' }}>{f.message || f.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}