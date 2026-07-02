import { useEffect, useState } from 'react';

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('admin_payments');
    if (saved) {
      setPayments(JSON.parse(saved));
    } else {
      const defaults = [
        { id: 1, studentName: 'Rio Sharma', courseTitle: 'Advanced Machine Learning', amount: 49.99, date: '2026-06-27', status: 'Paid' },
        { id: 2, studentName: 'Karthik Rao', courseTitle: 'AWS Cloud Practitioner', amount: 29.99, date: '2026-06-22', status: 'Paid' },
        { id: 3, studentName: 'Ananya Iyer', courseTitle: 'Cybersecurity Fundamentals', amount: 39.99, date: '2026-06-18', status: 'Refunded' },
        { id: 4, studentName: 'Meera Nair', courseTitle: 'Premium UI/UX Bundle', amount: 59.99, date: '2026-06-10', status: 'Pending' },
      ];
      setPayments(defaults);
      localStorage.setItem('admin_payments', JSON.stringify(defaults));
    }
  }, []);

  const totalRevenue = payments.filter((p) => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);

  const statusColor = (status) => {
    if (status === 'Paid') return { bg: '#ecfdf5', color: '#059669' };
    if (status === 'Pending') return { bg: '#fffbeb', color: '#b45309' };
    return { bg: '#fef2f2', color: '#dc2626' };
  };

  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>Payments</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: 30 }}>
        <div style={{ background: '#fff', padding: '20px', borderRadius: 12, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h4 style={{ color: '#64748b', margin: 0 }}>Total Revenue (Paid)</h4>
          <p style={{ fontSize: 28, fontWeight: 800, margin: '10px 0 0' }}>${totalRevenue.toFixed(2)}</p>
        </div>
        <div style={{ background: '#fff', padding: '20px', borderRadius: 12, boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h4 style={{ color: '#64748b', margin: 0 }}>Total Transactions</h4>
          <p style={{ fontSize: 28, fontWeight: 800, margin: '10px 0 0' }}>{payments.length}</p>
        </div>
      </div>

      {payments.length === 0 ? (
        <div style={{ background: '#fff', padding: 20, borderRadius: 12, boxShadow: '0 2px 4px rgba(0,0,0,0.1)', color: '#64748b' }}>
          No payment records yet.
        </div>
      ) : (
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 4px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 2fr 1fr 1.2fr 1fr', padding: '14px 20px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', fontSize: 12, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>
            <div>Student</div>
            <div>Course</div>
            <div>Amount</div>
            <div>Date</div>
            <div>Status</div>
          </div>
          {payments.map((p, idx) => {
            const sc = statusColor(p.status);
            return (
              <div
                key={p.id}
                style={{
                  display: 'grid', gridTemplateColumns: '1.8fr 2fr 1fr 1.2fr 1fr', alignItems: 'center',
                  padding: '16px 20px',
                  borderBottom: idx < payments.length - 1 ? '1px solid #f1f5f9' : 'none'
                }}
              >
                <div style={{ fontWeight: 700 }}>{p.studentName}</div>
                <div style={{ fontSize: 14, color: '#334155' }}>{p.courseTitle}</div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>${p.amount.toFixed(2)}</div>
                <div style={{ fontSize: 13, color: '#64748b' }}>{p.date}</div>
                <div>
                  <span style={{ background: sc.bg, color: sc.color, fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999 }}>
                    {p.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}