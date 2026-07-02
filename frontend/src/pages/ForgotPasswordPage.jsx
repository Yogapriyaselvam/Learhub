import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { resetPassword } from '../services/api';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      const payload = {
        email: email.trim(),
        newPassword: newPassword.trim(),
      };

      const { data } = await resetPassword(payload);
      setSuccessMsg(data?.message || 'Password updated successfully.');
      setEmail('');
      setNewPassword('');

      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 1500);
    } catch (err) {
      if (err.code === 'ERR_NETWORK') {
        setError('Cannot connect to backend. Make sure the server is running on the correct port.');
      } else {
        setError(
          err.response?.data?.message ||
          (typeof err.response?.data === 'string' ? err.response.data : err.message) ||
          'Failed to reset password.'
        );
      }
      console.error('Reset Password Error:', err);
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
    marginBottom: 14,
    outline: 'none',
    background: 'rgba(255,255,255,0.12)',
    color: '#fff',
    backdropFilter: 'blur(10px)',
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay} />
      <div style={styles.centerWrap}>
        <div style={styles.card}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: 40 }}>🔐</span>
            <h2 style={{ margin: '8px 0 4px', fontWeight: 700, fontSize: 24, color: '#fff' }}>
              Reset Password
            </h2>
            <p style={{ margin: 0, fontSize: 14, color: '#CBD5E1' }}>
              Enter your email and new password
            </p>
          </div>

          {error && <div style={styles.errorBox}>{error}</div>}
          {successMsg && <div style={styles.successBox}>{successMsg}</div>}

          <form onSubmit={handleResetSubmit}>
            <label style={{ fontSize: 13, color: '#E5E7EB', display: 'block', marginBottom: 6 }}>
              Email
            </label>
            <input
              style={inputStyle}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label style={{ fontSize: 13, color: '#E5E7EB', display: 'block', marginBottom: 6 }}>
              New Password
            </label>
            <input
              style={inputStyle}
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={4}
            />

            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? 'Updating Password...' : 'Update Password'}
            </button>
          </form>

          <p style={styles.linkText}>
            Remembered credentials? <Link to="/login" style={styles.link}>Back to Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    width: '100vw',
    backgroundImage: 'url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'system-ui, sans-serif',
    boxSizing: 'border-box',
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(15,23,42,0.85), rgba(79,70,229,0.6))',
    zIndex: 1,
  },
  centerWrap: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box',
  },
  card: {
    width: '100%',
    maxWidth: 460,
    background: 'rgba(15,23,42,0.75)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: 24,
    padding: '2.5rem',
    color: '#fff',
    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
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
    marginTop: '1.25rem',
  },
  link: {
    color: '#A78BFA',
    textDecoration: 'none',
    fontWeight: 500,
  },
};