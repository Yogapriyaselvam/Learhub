import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'STUDENT',
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' | 'error'
  const [loading, setLoading] = useState(false);

  const { saveUser } = useAuth();
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setMessage("");
  setMessageType("");

  try {
    const { data } = await register(form);

    // Show success message
    setMessage("Registration successful! Redirecting to Login...");
    setMessageType("success");

    // Redirect to Login page after 2 seconds
    setTimeout(() => {
      navigate("/login");
    }, 2000);

  } catch (err) {
    const errData = err.response?.data;

    const errorMessage =
      typeof errData === "string"
        ? errData
        : errData?.message || " Aleady Registration .";

    if (
      errorMessage.toLowerCase().includes("already") ||
      errorMessage.toLowerCase().includes("exist") ||
      err.response?.status === 409
    ) {
      // Already registered
      setMessage("Registration already exists. Please login.");
      setMessageType("success");
    } else {
      // Other errors
      setMessage(errorMessage);
      setMessageType("error");
    }
  } finally {
    setLoading(false);
  }
};

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid rgba(255,255,255,0.18)',
    borderRadius: 12,
    fontSize: 14,
    boxSizing: 'border-box',
    marginBottom: 12,
    outline: 'none',
    background: 'rgba(255,255,255,0.12)',
    color: '#fff',
    backdropFilter: 'blur(10px)',
  };

  const labelStyle = {
    fontSize: 13,
    fontWeight: 500,
    color: '#E5E7EB',
    display: 'block',
    marginBottom: 6,
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay} />
      <div style={styles.centerWrap}>
        <div style={styles.card}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: 40 }}>📚</span>
            <h2
              style={{
                margin: '8px 0 4px',
                fontWeight: 700,
                fontSize: 24,
                color: '#fff',
              }}
            >
              Create account
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                color: '#CBD5E1',
              }}
            >
              Start your learning journey
            </p>
          </div>

          {message && (
            <div
              style={messageType === 'success' ? styles.successBox : styles.errorBox}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label style={labelStyle}>Full Name</label>
            <input
              style={inputStyle}
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

            <label style={labelStyle}>Email</label>
            <input
              style={inputStyle}
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <label style={labelStyle}>Password</label>
            <input
              style={inputStyle}
              type="password"
              placeholder="Min 6 characters"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              minLength={6}
            />

            <label style={labelStyle}>I am a...</label>
            <select
              style={{ ...inputStyle, marginBottom: 16, height: '44px' }}
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="STUDENT">Student</option>
              <option value="INSTRUCTOR">Instructor</option>
            </select>

            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p style={styles.linkText}>
            Already have an account?{' '}
            <Link to="/login" style={styles.link}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    fontFamily: 'system-ui, sans-serif',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background:
      'linear-gradient(135deg, rgba(15,23,42,0.82), rgba(79,70,229,0.55))',
  },
  centerWrap: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 420,
    background: 'rgba(15,23,42,0.72)',
    backdropFilter: 'blur(18px)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: 24,
    padding: '2.5rem',
    color: '#fff',
    boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
  },
  errorBox: {
    background: 'rgba(254,226,226,0.15)',
    color: '#FCA5A5',
    padding: '10px 14px',
    borderRadius: 10,
    fontSize: 13,
    marginBottom: 12,
    border: '1px solid rgba(248,113,113,0.25)',
  },
  successBox: {
    background: 'rgba(16,185,129,0.15)',
    color: '#6EE7B7',
    padding: '10px 14px',
    borderRadius: 10,
    fontSize: 13,
    marginBottom: 12,
    border: '1px solid rgba(52,211,153,0.25)',
  },
  button: {
    width: '100%',
    background: 'linear-gradient(90deg, #6366F1, #8B5CF6)',
    color: '#fff',
    border: 'none',
    padding: '12px',
    borderRadius: 12,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 600,
    marginTop: 6,
    boxShadow: '0 10px 24px rgba(99,102,241,0.35)',
  },
  linkText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#CBD5E1',
    marginTop: '1rem',
  },
  link: {
    color: '#A78BFA',
    textDecoration: 'none',
  },
};