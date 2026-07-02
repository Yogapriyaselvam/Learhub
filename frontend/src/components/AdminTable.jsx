// src/components/AdminTable.jsx (Reuse this for Users, Courses, etc)
export default function AdminTable({ title, columns, data, onAction }) {
  return (
    <div style={{ background: '#fff', padding: '20px', borderRadius: '12px' }}>
      <h2>{title}</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '2px solid #f1f5f9' }}>
            {columns.map(c => <th key={c} style={{ padding: '12px' }}>{c}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} style={{ borderBottom: '1px solid #f1f5f9' }}>
              {Object.values(row).map((val, j) => <td key={j} style={{ padding: '12px' }}>{val}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}