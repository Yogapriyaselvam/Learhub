import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/api';
import { useAuth } from '../context/AuthContext';

const styles = {
  page: {
    minHeight: '100vh',
    width: '100vw',
    backgroundImage:
      'url(https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'system-ui, sans-serif',
    boxSizing: 'border-box'
  },
  overlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(15,23,42,0.85), rgba(79,70,229,0.6))',
    zIndex: 1
  },
  centerWrap: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    boxSizing: 'border-box'
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
    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 14
  },
  label: {
    fontSize: 13,
    color: '#E5E7EB',
    display: 'block',
    marginBottom: 6
  },
  errorBox: {
    background: 'rgba(254,226,226,0.15)',
    color: '#FCA5A5',
    padding: '10px 14px',
    borderRadius: 10,
    fontSize: 13,
    marginBottom: 12,
    border: '1px solid rgba(248,113,113,0.25)'
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
    boxShadow: '0 10px 24px rgba(99,102,241,0.35)'
  },
  linkText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#CBD5E1',
    marginTop: '1.25rem',
    marginBottom: '0.5rem'
  },
  link: { color: '#A78BFA', textDecoration: 'none', fontWeight: 500 },
  dividerContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '20px 0',
    width: '100%'
  },
  dividerLine: { flex: 1, height: '1px', background: 'rgba(255,255,255,0.15)' },
  dividerText: { padding: '0 12px', fontSize: 13, color: '#9CA3AF' },
  socialButtonFull: {
    width: '100%',
    background: '#fff',
    color: '#1F2937',
    border: '1px solid #D1D5DB',
    borderRadius: 12,
    padding: '11px',
    fontSize: 14,
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    cursor: 'pointer',
    marginBottom: '12px'
  },
  socialRow: {
    display: 'flex',
    gap: '12px',
    width: '100%'
  },
  socialButtonHalf: {
    flex: 1,
    background: '#fff',
    color: '#1F2937',
    border: '1px solid #D1D5DB',
    borderRadius: 12,
    padding: '11px',
    fontSize: 14,
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    cursor: 'pointer'
  }
};

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { saveUser } = useAuth();
  const navigate = useNavigate();

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid rgba(255,255,255,0.18)',
    borderRadius: 12,
    fontSize: 14,
    boxSizing: 'border-box',
    outline: 'none',
    background: 'rgba(255,255,255,0.12)',
    color: '#fff',
    backdropFilter: 'blur(10px)'
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await login({
        email: form.email.trim(),
        password: form.password
      });

      if (!data || !data.token) {
        setError('Login failed. No token returned from server.');
        return;
      }

      const user = {
        id: data.id,
        name: data.name,
        email: data.email,
        role: String(data.role || '').toUpperCase()
      };

      saveUser(user, data.token);
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.name || '');
      localStorage.setItem('role', user.role);

      if (user.role === 'ADMIN') {
        navigate('/admin/dashboard', { replace: true });
      } else if (user.role === 'INSTRUCTOR') {
        navigate('/instructor/home', { replace: true });
      } else {
        navigate('/student/home', { replace: true });
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        (typeof err.response?.data === 'string'
          ? err.response.data
          : 'Invalid email or password');
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log('Social login:', provider);
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay} />
      <div style={styles.centerWrap}>
        <div style={styles.card}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: 40 }}>📚</span>
            <h2 style={{ margin: '8px 0 4px', fontWeight: 700, fontSize: 24, color: '#fff' }}>
              Welcome back
            </h2>
            <p style={{ margin: 0, fontSize: 14, color: '#CBD5E1' }}>
              Sign in to continue learning
            </p>
          </div>

          {error && <div style={styles.errorBox}>{error}</div>}

          <form onSubmit={handleLoginSubmit}>
            <div style={styles.fieldGroup}>
              <label style={styles.label} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                style={inputStyle}
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div style={styles.fieldGroup}>
              <label style={styles.label} htmlFor="password">
                Password
              </label>
              <input
                id="password"
                style={inputStyle}
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            <div style={{ textAlign: 'right', marginBottom: '14px' }}>
              <Link
                to="/forgot-password"
                style={{ fontSize: 12, color: '#A78BFA', textDecoration: 'none', fontWeight: 500 }}
              >
                Forgot Password?
              </Link>
            </div>

            <button type="submit" disabled={loading} style={styles.button}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p style={styles.linkText}>
            Don't have an account?{' '}
            <Link to="/register" style={styles.link}>
              Register
            </Link>
          </p>

          <div style={styles.dividerContainer}>
            <div style={styles.dividerLine} />
            <span style={styles.dividerText}>or</span>
            <div style={styles.dividerLine} />
          </div>

          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
            style={styles.socialButtonFull}
          >
            <img
              src="https://unpkg.com/simple-icons@v9/icons/google.svg"
              alt="Google"
              style={{ width: 16, height: 16 }}
            />
            Continue with Google
          </button>

          <div style={styles.socialRow}>
            <button
              type="button"
              onClick={() => handleSocialLogin('linkedin')}
              style={styles.socialButtonHalf}
            >
              <img
                src="https://unpkg.com/simple-icons@v9/icons/linkedin.svg"
                alt="LinkedIn"
                style={{ width: 16, height: 16, filter: 'invert(1)' }}
              />
              LinkedIn
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('github')}
              style={styles.socialButtonHalf}
            >
              <img
                src="https://unpkg.com/simple-icons@v9/icons/github.svg"
                alt="GitHub"
                style={{ width: 16, height: 16, filter: 'invert(1)' }}
              />
              GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}