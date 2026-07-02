import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

export default function Course_Page() {
  const navigate = useNavigate();

  const courses = [
    ['💻', 'Full-Stack Web Development', '12 weeks · Beginner friendly', '$49/mo'],
    ['📈', 'Data Analysis with Python', '8 weeks · Intermediate', '$39/mo'],
    ['🎨', 'UI/UX Design Fundamentals', '6 weeks · Beginner friendly', '$29/mo'],
    ['🧠', 'Machine Learning Basics', '10 weeks · Intermediate', '$59/mo'],
    ['📱', 'Mobile App Development', '9 weeks · Intermediate', '$49/mo'],
    ['☁️', 'Cloud & DevOps Essentials', '7 weeks · Advanced', '$59/mo']
  ];

  return (
    <PageLayout
      title="Explore Courses"
      subtitle="Hands-on courses taught by working professionals. Pick a track and start learning today."
    >
      <div style={styles.grid}>
        {courses.map(([icon, title, meta, price]) => (
          <div key={title} style={styles.card} onClick={() => navigate('/register')}>
            <div style={styles.iconBox}>{icon}</div>
            <h3 style={styles.cardTitle}>{title}</h3>
            <p style={styles.cardMeta}>{meta}</p>
            <div style={styles.cardFooter}>
              <span style={styles.price}>{price}</span>
              <span style={styles.arrow}>›</span>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '1.25rem'
  },
  card: {
    padding: '1.5rem',
    background: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(12px)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, background 0.2s ease'
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: 'rgba(139,92,246,0.16)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginBottom: '1rem'
  },
  cardTitle: { margin: '0 0 6px', fontSize: 16, fontWeight: 700, color: '#fff' },
  cardMeta: { margin: '0 0 16px', fontSize: 13, color: '#94A3B8' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 14, fontWeight: 700, color: '#A78BFA' },
  arrow: { fontSize: 20, color: '#64748B' }
};