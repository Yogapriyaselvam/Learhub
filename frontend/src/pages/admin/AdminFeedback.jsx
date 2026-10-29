import { useState, useEffect } from 'react';
import { deleteFeedback, getFeedbacks } from '../../services/api';

export default function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getFeedbacks()
      .then((res) => {
        setFeedbacks(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch feedback");
        setLoading(false);
      });
  }, []);

  const handleRemove = async (id) => {
    try {
      await deleteFeedback(id);
      setFeedbacks(prev => prev.filter(f => f.id !== id));
    } catch (err) {
      console.error("Failed to remove feedback:", err);
    }
  };

  if (loading) return <div className="admin-page"><p>Loading feedback...</p></div>;
  if (error) return <div className="admin-page"><p>Error: {error}</p></div>;

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Feedback</h1>
        <p>Review student and instructor feedback.</p>
      </div>

      <div className="table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Message</th>
              <th>Rating</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((f) => (
              <tr key={f.id}>
                <td>{f.studentName}</td>
                <td>{f.comment}</td>
                <td>{'⭐'.repeat(f.rating)}</td>
                <td>
                  <button onClick={() => handleRemove(f.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}