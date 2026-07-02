export default function AdminPayments() {
  const payments = [
    { user: 'Student A', course: 'React Basics', amount: '$49', status: 'Paid' },
    { user: 'Student B', course: 'Java Advanced', amount: '$79', status: 'Pending' }
  ];

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Payments</h1>
        <p>View payment transactions and statuses.</p>
      </div>

      <div className="table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Course</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, i) => (
              <tr key={i}>
                <td>{p.user}</td>
                <td>{p.course}</td>
                <td>{p.amount}</td>
                <td>{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}