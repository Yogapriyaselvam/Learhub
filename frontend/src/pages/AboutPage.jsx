import PageLayout from '../components/PageLayout';

export default function AboutPage() {
  const values = [
    ['🎯', 'Our Mission', 'Make world-class education accessible to anyone, anywhere, at a price that makes sense.'],
    ['🌍', 'Our Reach', 'Over 50,000 learners across 120+ countries have taken a LearnHub course.'],
    ['🤝', 'Our Promise', 'Every course is taught by a working professional, not just a career instructor.']
  ];

  return (
    <PageLayout
      title="About LearnHub"
      subtitle="We're building the learning platform we always wished existed — practical, affordable, and taught by people who actually do the work."
    >
      <div style={styles.grid}>
        {values.map(([icon, title, desc]) => (
          <div key={title} style={styles.card}>
            <div style={styles.iconBox}>{icon}</div>
            <h3 style={styles.cardTitle}>{title}</h3>
            <p style={styles.cardDesc}>{desc}</p>
          </div>
        ))}
      </div>

      <div style={styles.storyBlock}>
        <h2 style={styles.storyTitle}>Our story</h2>
        <p style={styles.storyText}>
          LearnHub started in 2021 as a side project between three former teachers who were frustrated
          that great instruction was locked behind expensive degrees. Today we work with hundreds of
          instructors to build courses that get people hired, promoted, or simply more confident in
          their craft.
        </p>
      </div>
    </PageLayout>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1.25rem',
    marginBottom: '3rem'
  },
  card: {
    padding: '1.5rem',
    background: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(12px)'
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
  cardDesc: { margin: 0, fontSize: 13.5, color: '#94A3B8', lineHeight: 1.6 },
  storyBlock: {
    padding: '2rem',
    background: 'rgba(255,255,255,0.04)',
    borderRadius: 20,
    border: '1px solid rgba(255,255,255,0.08)'
  },
  storyTitle: { margin: '0 0 12px', fontSize: 22, fontWeight: 700 },
  storyText: { margin: 0, fontSize: 15, color: '#CBD5E1', lineHeight: 1.7, maxWidth: 760 }
};