import { useEffect, useState } from 'react';
import { deleteFeedback, getFeedbacks } from '../../services/api';

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadFeedback = async () => {
      try {
        const res = await getFeedbacks();
        const normalized = (res.data || []).map((item) => ({
          id: item.id,
          studentName: item.studentName || 'Unknown student',
          courseTitle: item.courseName || 'Unknown course',
          rating: item.rating || 0,
          message: item.comment || item.message || 'No comment provided',
          date: item.createdAt || item.submittedOn || '—',
        }));
        setFeedback(normalized);
      } catch (err) {
        setError('Unable to load feedback right now.');
      } finally {
        setLoading(false);
      }
    };

    loadFeedback();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteFeedback(id);
      setFeedback((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      setError('Unable to remove feedback right now.');
    }
  };

  if (loading) {
    return <div style={{ padding: '20px', color: '#64748b' }}>Loading feedback…</div>;
  }

  if (error) {
    return <div style={{ padding: '20px', color: '#dc2626' }}>{error}</div>;
  }

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
            <p style={{ marginTop: '10px' }}>{f.message || f.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}