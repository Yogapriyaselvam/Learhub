import PageLayout from '../components/PageLayout';

export default function Instructor() {
  const instructors = [
    ['🧑‍💻', 'Ava Chen', 'Senior Software Engineer, ex-Meta', 'Full-Stack Web Development'],
    ['👩‍🔬', 'Priya Nair', 'Lead Data Scientist, Spotify', 'Data Analysis with Python'],
    ['👨‍🎨', 'Diego Ramirez', 'Product Design Lead, Figma', 'UI/UX Design Fundamentals'],
    ['🧑‍🚀', 'Sam Osei', 'ML Researcher, DeepMind alum', 'Machine Learning Basics']
  ];

  return (
    <PageLayout
      title="Learn from people who've done the work"
      subtitle="Every LearnHub instructor is a working professional in their field, not a full-time trainer."
    >
      <div style={styles.grid}>
        {instructors.map(([avatar, name, role, course]) => (
          <div key={name} style={styles.card}>
            <div style={styles.avatar}>{avatar}</div>
            <h3 style={styles.name}>{name}</h3>
            <p style={styles.role}>{role}</p>
            <div style={styles.courseTag}>Teaches: {course}</div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1.25rem'
  },
  card: {
    padding: '1.75rem 1.5rem',
    background: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(12px)',
    textAlign: 'center'
  },
  avatar: {
    width: 64,
    height: 64,
    margin: '0 auto 1rem',
    borderRadius: '50%',
    background: '#312E81',
    border: '2px solid rgba(255,255,255,0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 28
  },
  name: { margin: '0 0 4px', fontSize: 16, fontWeight: 700, color: '#fff' },
  role: { margin: '0 0 14px', fontSize: 12.5, color: '#94A3B8', lineHeight: 1.5 },
  courseTag: {
    display: 'inline-block',
    fontSize: 11.5,
    fontWeight: 600,
    color: '#C4B5FD',
    background: 'rgba(139,92,246,0.16)',
    border: '1px solid rgba(167,139,250,0.35)',
    padding: '5px 12px',
    borderRadius: 999
  }
};