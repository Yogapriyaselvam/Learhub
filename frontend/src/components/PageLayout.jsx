import { useNavigate } from 'react-router-dom';

/**
 * Shared shell for every non-landing page (About, Courses, Pricing, Instructors).
 * Keeps the same dark/purple theme as LandingPage and gives every page:
 *   - the top nav (logo + links + login/get started)
 *   - a "Back to Dashboard" button that routes to "/"
 *   - the page title + subtitle
 * Pass your page content as children.
 */
export default function PageLayout({ title, subtitle, children }) {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.bgGlow} />

      {/* ── NAV (same as landing page) ── */}
      <nav style={styles.nav}>
        <span style={styles.brand} onClick={() => navigate('/')}>
          <span style={styles.logoMark}>
            <span style={{ ...styles.logoBar, ...styles.logoBar1 }} />
            <span style={{ ...styles.logoBar, ...styles.logoBar2 }} />
            <span style={{ ...styles.logoBar, ...styles.logoBar3 }} />
          </span>
          LearnHub
        </span>

        <div style={styles.navLinks}>
          <span style={styles.navLink} onClick={() => navigate('/courses')}>Courses</span>
          <span style={styles.navLink} onClick={() => navigate('/instructors')}>Instructors</span>
          <span style={styles.navLink} onClick={() => navigate('/pricing')}>Pricing</span>
          <span style={styles.navLink} onClick={() => navigate('/about')}>About us</span>
        </div>

        <div style={styles.navActions}>
          <button onClick={() => navigate('/login')} style={styles.loginBtn}>Login</button>
          <button onClick={() => navigate('/register')} style={styles.startBtn}>Get Started</button>
        </div>
      </nav>

      {/* ── BACK TO DASHBOARD ── */}
      <div style={styles.backRow}>
        <button onClick={() => navigate('/')} style={styles.backBtn}>
          ← Back to Dashboard
        </button>
      </div>

      {/* ── PAGE HEADER ── */}
      <div style={styles.header}>
        <h1 style={styles.heading}>{title}</h1>
        {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
      </div>

      {/* ── PAGE CONTENT ── */}
      <div style={styles.content}>{children}</div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: 'system-ui, sans-serif',
    background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 45%, #312E81 100%)',
    color: '#fff'
  },
  bgGlow: {
    position: 'absolute',
    inset: 0,
    background:
      'radial-gradient(circle at top left, rgba(99,102,241,0.28), transparent 30%), radial-gradient(circle at bottom right, rgba(168,85,247,0.22), transparent 28%)',
    pointerEvents: 'none'
  },
  nav: {
    position: 'relative',
    zIndex: 2,
    padding: '1rem 2.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(10px)',
    background: 'rgba(15,23,42,0.25)'
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontWeight: 700,
    fontSize: 20,
    color: '#fff',
    cursor: 'pointer'
  },
  logoMark: { width: 24, height: 24, position: 'relative', display: 'inline-block', flexShrink: 0 },
  logoBar: { position: 'absolute', left: 0, right: 0, height: 6, borderRadius: 2 },
  logoBar1: { top: 0, background: '#6366F1' },
  logoBar2: { top: 8, background: '#10B981' },
  logoBar3: { top: 16, background: '#F59E0B' },
  navLinks: { display: 'flex', gap: 28 },
  navLink: { fontSize: 14, color: '#CBD5E1', cursor: 'pointer', fontWeight: 500 },
  navActions: { display: 'flex', gap: 12 },
  loginBtn: {
    background: 'rgba(255,255,255,0.08)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.16)',
    padding: '8px 20px',
    borderRadius: 10,
    cursor: 'pointer',
    fontSize: 14
  },
  startBtn: {
    background: 'linear-gradient(90deg, #6366F1, #8B5CF6)',
    color: '#fff',
    border: 'none',
    padding: '8px 20px',
    borderRadius: 10,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 600
  },
  backRow: {
    position: 'relative',
    zIndex: 2,
    maxWidth: 1180,
    margin: '0 auto',
    padding: '1.5rem 2.5rem 0'
  },
  backBtn: {
    background: 'rgba(255,255,255,0.08)',
    color: '#CBD5E1',
    border: '1px solid rgba(255,255,255,0.16)',
    padding: '8px 16px',
    borderRadius: 10,
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 600
  },
  header: {
    position: 'relative',
    zIndex: 2,
    maxWidth: 1180,
    margin: '0 auto',
    padding: '2rem 2.5rem 1rem',
    textAlign: 'left'
  },
  heading: {
    fontSize: 'clamp(2rem, 4vw, 3rem)',
    fontWeight: 800,
    letterSpacing: '-1px',
    margin: '0 0 0.75rem'
  },
  subtitle: {
    fontSize: 16,
    color: '#CBD5E1',
    margin: 0,
    lineHeight: 1.6,
    maxWidth: 640
  },
  content: {
    position: 'relative',
    zIndex: 2,
    maxWidth: 1180,
    margin: '0 auto',
    padding: '1.5rem 2.5rem 4rem'
  }
};