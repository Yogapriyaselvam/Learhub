export default function AdminFeedback() {
  const feedbacks = [
    { user: 'Student A', message: 'Great course platform!', rating: 5 },
    { user: 'Instructor B', message: 'Need better course filters.', rating: 4 }
  ];

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
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((f, i) => (
              <tr key={i}>
                <td>{f.user}</td>
                <td>{f.message}</td>
                <td>{'⭐'.repeat(f.rating)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}