import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Replace with your actual backend endpoint
    axios.get('http://localhost:8082/api/admin/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setUsers(res.data));
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: '20px' }}>User Management</h2>
      <table style={{ width: '100%', background: '#fff', borderRadius: 8, borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
            <th style={{ padding: '12px' }}>Name</th>
            <th style={{ padding: '12px' }}>Email</th>
            <th style={{ padding: '12px' }}>Role</th>
            
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}>{user.name}</td>
              <td style={{ padding: '12px' }}>{user.email}</td>
              <td style={{ padding: '12px' }}>{user.role}</td>
              <td style={{ padding: '12px' }}>
             
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}