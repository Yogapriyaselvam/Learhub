import { NavLink, Outlet, useNavigate } from 'react-router-dom';

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      localStorage.clear();
      navigate('/login', { replace: true });
    }
  };

  const adminLinks = [
    { label: "Dashboard", path: "dashboard" },
    { label: "Users", path: "users" },
    { label: "Courses", path: "courses" },
    { label: "Categories", path: "categories" },
    { label: "Enrollments", path: "enrollments" },
    { label: "Payments", path: "payments" },
    { label: "Reports", path: "reports" },
    { label: "Feedback", path: "feedback" },
    { label: "Settings", path: "settings" },
  ];

  const activeStyle = {
    backgroundColor: '#0f172a',
    borderLeft: '4px solid #38bdf8',
    color: '#fff'
  };

  const linkStyle = {
    display: 'block',
    padding: '12px',
    color: '#94a3b8',
    textDecoration: 'none',
    borderRadius: 8,
    marginBottom: 4
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui' }}>
      <aside
        style={{
          width: 250,
          background: '#0f172a',
          color: '#fff',
          padding: '2rem 1rem',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <h2 style={{ fontSize: '1.25rem', textAlign: 'center', marginBottom: '2rem' }}>
          LearnHub Admin
        </h2>

        <nav style={{ flex: 1 }}>
          {adminLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              style={({ isActive }) => ({
                ...linkStyle,
                ...(isActive ? activeStyle : {})
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          style={{
            marginTop: 'auto',
            padding: '12px',
            background: '#ef4444',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 600
          }}
        >
          Logout
        </button>
      </aside>

      <main style={{ flex: 1, padding: '2.5rem', background: '#f8fafc' }}>
        <Outlet />
      </main>
    </div>
  );
}