import { useState, useEffect } from 'react';
import { getMyEnrollments, getQuizAttempts, getAllProgress } from '../../services/api';

// ─── Keyframe injection (runs once) ────────────────────────────────────────
const injectKeyframes = () => {
  if (document.getElementById('sh-keyframes')) return;
  const style = document.createElement('style');
  style.id = 'sh-keyframes';
  style.textContent = `
    @keyframes sh-rise {
      from { opacity: 0; transform: translateY(22px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes sh-pop {
      0%   { opacity: 0; transform: scale(0.88); }
      60%  { transform: scale(1.04); }
      100% { opacity: 1; transform: scale(1); }
    }
    @keyframes sh-slide {
      from { opacity: 0; transform: translateX(-18px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes sh-pulse-ring {
      0%   { box-shadow: 0 0 0 0 rgba(99,102,241,0.35); }
      70%  { box-shadow: 0 0 0 10px rgba(99,102,241,0); }
      100% { box-shadow: 0 0 0 0 rgba(99,102,241,0); }
    }
    .sh-card-hover {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    .sh-card-hover:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 24px rgba(79,70,229,0.12);
    }
    .sh-btn-primary {
      transition: background 0.15s ease, transform 0.1s ease;
    }
    .sh-btn-primary:hover {
      background: #4338CA !important;
      transform: translateY(-1px);
    }
    .sh-btn-primary:active { transform: scale(0.97); }
    .sh-btn-secondary {
      transition: background 0.15s ease;
    }
    .sh-btn-secondary:hover { background: #E5E7EB !important; }
  `;
  document.head.appendChild(style);
};

// ─── Stat card meta ────────────────────────────────────────────────────────
const CARDS = (enrollCount, quizCount) => [
  {
    label: 'Active courses',
    value: enrollCount,
    icon: '🚀',
    accent: '#4F46E5',
    bg: '#EEF2FF',
    delay: '0.05s',
  },
  {
    label: 'Quizzes completed',
    value: quizCount,
    icon: '🎯',
    accent: '#0891B2',
    bg: '#ECFEFF',
    delay: '0.15s',
  },
  {
    label: 'Learning status',
    value: 'Advanced Scholar',
    icon: '🎖️',
    accent: '#7C3AED',
    bg: '#F5F3FF',
    isText: true,
    delay: '0.25s',
  },
];

export default function StudentHome() {
  const [enrollCount, setEnrollCount] = useState(0);
  const [quizCount, setQuizCount] = useState(0);
  const username = localStorage.getItem('username') || 'Student';

  useEffect(() => {
    injectKeyframes();

    const loadDashboardStats = async () => {
      try {
        const [enrollRes, quizRes, progressRes] = await Promise.all([
          getMyEnrollments(),
          getQuizAttempts(),
          getAllProgress().catch(() => ({ data: [] })),
        ]);

        const myEnrollments = Array.isArray(enrollRes?.data) ? enrollRes.data : [];
        const currentUserId = localStorage.getItem('userId') || localStorage.getItem('id') || '';
        
        const studentEnrollments = currentUserId
          ? myEnrollments.filter((item) => String(item.studentId || item.userId || item.user_id || '') === String(currentUserId))
          : myEnrollments;

        const completedCourseIds = new Set();
        if (progressRes && Array.isArray(progressRes.data)) {
          progressRes.data.forEach((p) => {
            if (p.courseCompleted || p.completed) {
              completedCourseIds.add(Number(p.courseId));
            }
          });
        }

        const droppedMap = JSON.parse(localStorage.getItem("dropped_enrollment_ids") || "[]").map(Number);

        const activeCourses = studentEnrollments.filter((item) => {
          const cid = Number(item.courseId || item.id);
          return !droppedMap.includes(cid) && !completedCourseIds.has(cid);
        });

        setEnrollCount(activeCourses.length);

        if (quizRes?.data) {
          setQuizCount(quizRes.data.length);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadDashboardStats();
  }, []);

  return (
    <div style={{
      maxWidth: 1100,
      margin: '0 auto',
      padding: '2.5rem 1.5rem',
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>

      {/* ── HERO BANNER ── */}
      <div style={{
        position: 'relative',
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: '2rem',
        background: '#0F172A',
        padding: '2.5rem 2.5rem 2rem',
        animation: 'sh-rise 0.5s ease both',
      }}>
        {/* decorative rings */}
        <div style={{
          position: 'absolute', top: -60, right: -60,
          width: 260, height: 260, borderRadius: '50%',
          border: '40px solid rgba(99,102,241,0.12)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: 20, right: 80,
          width: 140, height: 140, borderRadius: '50%',
          border: '24px solid rgba(139,92,246,0.1)',
          pointerEvents: 'none',
        }} />

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(99,102,241,0.2)',
          border: '1px solid rgba(99,102,241,0.35)',
          borderRadius: 999, padding: '4px 14px',
          marginBottom: '1rem',
          animation: 'sh-slide 0.45s ease both',
        }}>
          <span style={{ fontSize: 13 }}>📘</span>
          <span style={{ fontSize: 12, fontWeight: 600, color: '#A5B4FC', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            Student Dashboard
          </span>
        </div>

        <h1 style={{
          fontSize: 34, fontWeight: 800, color: '#fff',
          margin: '0 0 0.5rem', letterSpacing: '-0.02em', lineHeight: 1.15,
          animation: 'sh-rise 0.5s 0.1s ease both',
        }}>
          Welcome back, {username}! 👋
        </h1>

        <p style={{
          fontSize: 15, color: '#94A3B8',
          margin: 0, maxWidth: 560, lineHeight: 1.7,
          animation: 'sh-rise 0.5s 0.18s ease both',
        }}>
          Pick up where you left off, check your progress, and keep moving forward today.
        </p>
      </div>

      {/* ── STAT CARDS ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem',
      }}>
        {CARDS(enrollCount, quizCount).map((card) => (
          <div
            key={card.label}
            className="sh-card-hover"
            style={{
              background: '#fff',
              borderRadius: 18,
              border: '1px solid #F1F5F9',
              padding: '1.4rem',
              animation: `sh-pop 0.45s ${card.delay} ease both`,
            }}
          >
            {/* icon bubble */}
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: card.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, marginBottom: '1rem',
            }}>
              {card.icon}
            </div>
            <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {card.label}
            </p>
            {card.isText ? (
              <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: card.accent }}>
                {card.value}
              </p>
            ) : (
              <p style={{ margin: 0, fontSize: 36, fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>
                {card.value}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* ── BOTTOM ROW ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem' }}>

        {/* Announcements */}
        <div style={{
          background: '#fff',
          borderRadius: 18,
          border: '1px solid #F1F5F9',
          padding: '1.75rem',
          animation: 'sh-rise 0.5s 0.3s ease both',
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: '1.25rem', color: '#0F172A', letterSpacing: '-0.01em' }}>
            Announcements
          </h3>

          {/* announcement 1 */}
          <div style={{
            padding: '14px 16px',
            background: '#F8FAFF',
            borderRadius: 12,
            marginBottom: '0.875rem',
            borderLeft: '3px solid #4F46E5',
            borderRadius: '0 12px 12px 0',
            animation: 'sh-slide 0.4s 0.35s ease both',
          }}>
            <h4 style={{ margin: '0 0 5px', fontSize: 13, fontWeight: 700, color: '#1E1B4B' }}>Platform update</h4>
            <p style={{ margin: 0, fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>
              Your learning dashboard is running smoothly with the latest improvements.
            </p>
          </div>

          {/* announcement 2 */}
          <div style={{
            padding: '14px 16px',
            background: '#F0FDF8',
            borderRadius: '0 12px 12px 0',
            borderLeft: '3px solid #10B981',
            animation: 'sh-slide 0.4s 0.42s ease both',
          }}>
            <h4 style={{ margin: '0 0 5px', fontSize: 13, fontWeight: 700, color: '#064E3B' }}>Quiz reminder</h4>
            <p style={{ margin: 0, fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>
              New quiz submissions are open in the quiz section.
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          background: '#fff',
          borderRadius: 18,
          border: '1px solid #F1F5F9',
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          animation: 'sh-rise 0.5s 0.38s ease both',
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: '1.25rem', color: '#0F172A', letterSpacing: '-0.01em' }}>
            Quick actions
          </h3>

          <a
            href="/student/courses"
            className="sh-btn-primary"
            style={{
              textDecoration: 'none',
              background: '#4F46E5',
              color: '#fff',
              padding: '13px 16px',
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 600,
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              animation: 'sh-pulse-ring 2s 1s ease infinite',
            }}
          >
            <span>Browse courses</span>
            <span style={{ fontSize: 18, opacity: 0.85 }}>→</span>
          </a>

          <a
            href="/student/progress"
            className="sh-btn-secondary"
            style={{
              textDecoration: 'none',
              background: '#F8FAFF',
              color: '#374151',
              padding: '13px 16px',
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>View progress</span>
            <span style={{ fontSize: 18, opacity: 0.5 }}>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}