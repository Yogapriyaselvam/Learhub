import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

export default function LandingPage() {
  const navigate = useNavigate();

  const heroRef = useRef(null);

  return (
    <div style={styles.page}>
      <style>{keyframes}</style>

      <div style={styles.bgGlow} />

      <span style={{ ...styles.star, ...styles.star1 }} />
      <span style={{ ...styles.star, ...styles.star2 }} />
      <span style={{ ...styles.star, ...styles.star3 }} />
      <span style={{ ...styles.star, ...styles.star4 }} />
      <span style={{ ...styles.star, ...styles.star5 }} />

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
          <button onClick={() => navigate('/login')} style={styles.loginBtn}>
            Login
          </button>
          <button onClick={() => navigate('/register')} style={styles.startBtn}>
            Get Started
          </button>
        </div>
      </nav>

      <div style={styles.hero} ref={heroRef}>
        <div style={styles.heroLeft}>
          <div style={styles.badge}>★ Trusted by 50K+ learners worldwide</div>

          <h1 style={styles.heading}>
            Learn without<br />
            <span style={styles.accent}>limits.</span>
          </h1>

          <p style={styles.subtitle}>
            World-class courses. Track progress.<br />
            Get certified. Build your future.
          </p>

          <button onClick={() => navigate('/register')} style={styles.ctaBtn}>
            Start Learning Free →
          </button>

          <div style={styles.socialProof}>
            <div style={styles.avatarStack}>
              <span style={{ ...styles.avatar, ...styles.avatar1 }}>🧑</span>
              <span style={{ ...styles.avatar, ...styles.avatar2 }}>👩</span>
              <span style={{ ...styles.avatar, ...styles.avatar3 }}>👨</span>
            </div>
            <div>
              <div style={styles.stars}>★★★★★</div>
              <div style={styles.reviewText}>4.9 (2K+ reviews)</div>
            </div>
          </div>
        </div>

        <div style={styles.heroRight}>
          <div style={styles.orbitRing} />
          <div style={styles.orbitRingInner} />

          <div style={styles.bookWrap}>
            <div style={styles.graduationCap}>🎓</div>
            <div style={styles.bookStack}>
              <div style={{ ...styles.bookLayer, background: 'linear-gradient(135deg, #4F46E5, #6366F1)' }} />
              <div style={{ ...styles.bookLayer, background: 'linear-gradient(135deg, #10B981, #059669)', top: 34 }} />
              <div style={{ ...styles.bookLayer, background: 'linear-gradient(135deg, #F59E0B, #D97706)', top: 68 }} />
              <div style={{ ...styles.bookLayer, background: 'linear-gradient(135deg, #4338CA, #312E81)', top: 102 }} />
            </div>
          </div>

          <div style={{ ...styles.floatIcon, ...styles.floatIcon1 }}>▶️</div>
          <div style={{ ...styles.floatIcon, ...styles.floatIcon2 }}>📊</div>
          <div style={{ ...styles.floatIcon, ...styles.floatIcon3 }}>👥</div>
        </div>
      </div>

      <div style={styles.featureGrid}>
        {[
          ['🎓', 'Expert Instructors', 'Learn from industry professionals with real-world experience.'],
          ['📊', 'Track Progress', 'Visual dashboards and insights to keep you on track.'],
          ['🏆', 'Earn Certificates', 'Showcase your skills and boost your career.']
        ].map(([icon, title, desc]) => (
          <div key={title} style={styles.featureCard} onClick={() => navigate('/register')}>
            <div style={styles.featureIconBox}>
              <span style={styles.featureIcon}>{icon}</span>
            </div>
            <div style={styles.featureText}>
              <h3 style={styles.featureTitle}>{title}</h3>
              <p style={styles.featureDesc}>{desc}</p>
            </div>
            <span style={styles.featureArrow}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const keyframes = `
@keyframes blink {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1.2); }
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes floatBook {
  0%, 100% { transform: translateY(0px) rotate(-2deg); }
  50% { transform: translateY(-14px) rotate(2deg); }
}
@keyframes spinSlow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes spinSlowReverse {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}
@keyframes floatIcon {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
`;

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
  star: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: '#fff',
    boxShadow: '0 0 12px rgba(255,255,255,0.9)',
    opacity: 0.85,
    animation: 'blink 1.8s infinite ease-in-out'
  },
  star1: { top: '12%', left: '10%', animationDelay: '0s' },
  star2: { top: '20%', left: '48%', animationDelay: '0.4s' },
  star3: { top: '32%', left: '16%', animationDelay: '0.8s' },
  star4: { top: '65%', left: '58%', animationDelay: '1.2s' },
  star5: { top: '48%', left: '90%', animationDelay: '1.6s' },

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
  logoMark: {
    width: 24,
    height: 24,
    position: 'relative',
    display: 'inline-block',
    flexShrink: 0
  },
  logoBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 6,
    borderRadius: 2
  },
  logoBar1: { top: 0, background: '#6366F1' },
  logoBar2: { top: 8, background: '#10B981' },
  logoBar3: { top: 16, background: '#F59E0B' },
  navLinks: {
    display: 'flex',
    gap: 28
  },
  navLink: {
    fontSize: 14,
    color: '#CBD5E1',
    cursor: 'pointer',
    fontWeight: 500
  },
  navActions: {
    display: 'flex',
    gap: 12
  },
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

  hero: {
    position: 'relative',
    zIndex: 2,
    maxWidth: 1180,
    margin: '0 auto',
    padding: '4.5rem 2.5rem 3rem',
    display: 'grid',
    gridTemplateColumns: '1.1fr 0.9fr',
    gap: '2rem',
    alignItems: 'center',
    animation: 'fadeUp 0.8s ease both'
  },

  heroLeft: {
    textAlign: 'left'
  },
  badge: {
    display: 'inline-block',
    background: 'rgba(139,92,246,0.16)',
    border: '1px solid rgba(167,139,250,0.35)',
    color: '#C4B5FD',
    fontSize: 13,
    fontWeight: 600,
    padding: '6px 14px',
    borderRadius: 999,
    marginBottom: '1.5rem'
  },
  heading: {
    fontSize: 'clamp(2.6rem, 5vw, 4rem)',
    fontWeight: 800,
    letterSpacing: '-2px',
    margin: '0 0 1rem',
    lineHeight: 1.1
  },
  accent: {
    color: '#A78BFA'
  },
  subtitle: {
    fontSize: 18,
    color: '#CBD5E1',
    margin: '0 0 2rem',
    lineHeight: 1.6
  },
  ctaBtn: {
    background: 'linear-gradient(90deg, #6366F1, #8B5CF6)',
    color: '#fff',
    border: 'none',
    padding: '14px 32px',
    borderRadius: 14,
    cursor: 'pointer',
    fontSize: 16,
    fontWeight: 700,
    boxShadow: '0 16px 32px rgba(99,102,241,0.35)',
    transition: 'transform 0.2s ease'
  },
  socialProof: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    marginTop: '2rem'
  },
  avatarStack: {
    display: 'flex'
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: '#312E81',
    border: '2px solid #0F172A',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16
  },
  avatar1: { marginLeft: 0, zIndex: 3 },
  avatar2: { marginLeft: -10, zIndex: 2 },
  avatar3: { marginLeft: -10, zIndex: 1 },
  stars: {
    color: '#FBBF24',
    fontSize: 13,
    letterSpacing: 1
  },
  reviewText: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2
  },

  heroRight: {
    position: 'relative',
    height: 380,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  orbitRing: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: '50%',
    border: '1.5px solid rgba(139,92,246,0.35)',
    animation: 'spinSlow 18s linear infinite'
  },
  orbitRingInner: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: '50%',
    border: '1px dashed rgba(99,102,241,0.3)',
    animation: 'spinSlowReverse 24s linear infinite'
  },
  bookWrap: {
    position: 'relative',
    width: 160,
    height: 200,
    animation: 'floatBook 4s ease-in-out infinite',
    zIndex: 2
  },
  graduationCap: {
    position: 'absolute',
    top: -10,
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: 60,
    filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))',
    zIndex: 3
  },
  bookStack: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 140
  },
  bookLayer: {
    position: 'absolute',
    width: '100%',
    height: 42,
    borderRadius: 8,
    boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.15)'
  },
  floatIcon: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 14,
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.16)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    animation: 'floatIcon 3s ease-in-out infinite'
  },
  floatIcon1: { top: 30, left: 10, animationDelay: '0s' },
  floatIcon2: { top: 40, right: 10, animationDelay: '0.6s' },
  floatIcon3: { bottom: 40, left: 0, animationDelay: '1.2s' },

  featureGrid: {
    position: 'relative',
    zIndex: 2,
    maxWidth: 1180,
    margin: '0 auto',
    padding: '0 2.5rem 4rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.25rem'
  },
  featureCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    padding: '1.25rem 1.4rem',
    background: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 12px 30px rgba(0,0,0,0.18)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, background 0.2s ease'
  },
  featureIconBox: {
    width: 44,
    height: 44,
    flexShrink: 0,
    borderRadius: 12,
    background: 'rgba(139,92,246,0.16)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  featureIcon: {
    fontSize: 20
  },
  featureText: {
    flex: 1
  },
  featureTitle: {
    margin: '0 0 4px',
    fontWeight: 700,
    fontSize: 14,
    color: '#fff'
  },
  featureDesc: {
    margin: 0,
    fontSize: 12.5,
    color: '#94A3B8',
    lineHeight: 1.5
  },
  featureArrow: {
    fontSize: 20,
    color: '#64748B'
  }
};