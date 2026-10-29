import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

export default function Course_Page() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Each category holds its own list of courses.
  // Course fields: icon, title, meta, price, videos (number of video lessons)
  const categories = [
    {
      icon: '💻',
      name: 'Full-Stack Web Development',
      sub: 'HTML, CSS, JS, React, Node',
      courses: [
        { icon: '💻', title: 'Full-Stack Web Development', meta: '12 weeks · Beginner friendly', price: '$49/mo', videos: 48 },
        { icon: '🌐', title: 'React.js Complete Guide', meta: '10 weeks · Intermediate', price: '$45/mo', videos: 36 },
        { icon: '🟢', title: 'Node.js & Express Development', meta: '9 weeks · Intermediate', price: '$45/mo', videos: 32 },
      ],
    },
    {
      icon: '📈',
      name: 'Data Analysis with Python',
      sub: 'Python, Pandas, Visualization',
      courses: [
        { icon: '📈', title: 'Data Analysis with Python', meta: '8 weeks · Intermediate', price: '$39/mo', videos: 28 },
        { icon: '📊', title: 'NumPy & Pandas Masterclass', meta: '8 weeks · Intermediate', price: '$39/mo', videos: 26 },
        { icon: '📉', title: 'Data Visualization with Matplotlib', meta: '6 weeks · Beginner friendly', price: '$29/mo', videos: 20 },
      ],
    },
    {
      icon: '🎨',
      name: 'UI/UX Design Fundamentals',
      sub: 'Figma, Design Thinking, Prototyping',
      courses: [
        { icon: '🎨', title: 'UI/UX Design Fundamentals', meta: '6 weeks · Beginner friendly', price: '$29/mo', videos: 22 },
        { icon: '🖌️', title: 'UX Research & Design Thinking', meta: '8 weeks · Intermediate', price: '$35/mo', videos: 24 },
        { icon: '🧩', title: 'Adobe XD for UI Designers', meta: '6 weeks · Beginner friendly', price: '$29/mo', videos: 18 },
      ],
    },
    {
      icon: '🧠',
      name: 'Machine Learning Basics',
      sub: 'ML, TensorFlow, NLP',
      courses: [
        { icon: '🧠', title: 'Machine Learning Basics', meta: '10 weeks · Intermediate', price: '$59/mo', videos: 40 },
        { icon: '🔬', title: 'Deep Learning with TensorFlow', meta: '14 weeks · Advanced', price: '$69/mo', videos: 52 },
        { icon: '💬', title: 'Natural Language Processing (NLP)', meta: '10 weeks · Intermediate', price: '$59/mo', videos: 34 },
      ],
    },
    {
      icon: '📱',
      name: 'Mobile App Development',
      sub: 'Android, Flutter, React Native',
      courses: [
        { icon: '📱', title: 'Mobile App Development', meta: '9 weeks · Intermediate', price: '$49/mo', videos: 30 },
        { icon: '🐦', title: 'Flutter App Development', meta: '10 weeks · Intermediate', price: '$49/mo', videos: 34 },
        { icon: '⚛️', title: 'React Native Mobile Development', meta: '8 weeks · Intermediate', price: '$45/mo', videos: 28 },
      ],
    },
    {
      icon: '☁️',
      name: 'Cloud & DevOps Essentials',
      sub: 'AWS, Docker, Kubernetes',
      courses: [
        { icon: '☁️', title: 'Cloud & DevOps Essentials', meta: '7 weeks · Advanced', price: '$59/mo', videos: 26 },
        { icon: '🐳', title: 'Docker & Kubernetes Basics', meta: '8 weeks · Advanced', price: '$59/mo', videos: 30 },
        { icon: '🚀', title: 'AWS Cloud Practitioner', meta: '6 weeks · Beginner friendly', price: '$39/mo', videos: 22 },
      ],
    },
  ];

  const activeCourses = selectedCategory
    ? categories.find((c) => c.name === selectedCategory)?.courses || []
    : [];

  return (
    <PageLayout
      title={selectedCategory ? selectedCategory : 'Explore Courses'}
      subtitle={
        selectedCategory
          ? 'Browse the courses and video lessons available in this track.'
          : 'Hands-on courses taught by working professionals. Pick a track and start learning today.'
      }
    >
      {selectedCategory && (
        <button onClick={() => setSelectedCategory(null)} style={styles.backButton}>
          ← Back to All Categories
        </button>
      )}

      {!selectedCategory ? (
        <div style={styles.grid}>
          {categories.map((cat) => (
            <div
              key={cat.name}
              style={styles.card}
              onClick={() => setSelectedCategory(cat.name)}
            >
              <div style={styles.iconBox}>{cat.icon}</div>
              <h3 style={styles.cardTitle}>{cat.name}</h3>
              <p style={styles.cardMeta}>{cat.sub}</p>
              <div style={styles.cardFooter}>
                <span style={styles.price}>{cat.courses.length} courses</span>
                <span style={styles.arrow}>›</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={styles.grid}>
          {activeCourses.map((course) => (
            <div
              key={course.title}
              style={styles.card}
              onClick={() => navigate('/register')}
            >
              <div style={styles.iconBox}>{course.icon}</div>
              <h3 style={styles.cardTitle}>{course.title}</h3>
              <p style={styles.cardMeta}>{course.meta}</p>
              <p style={styles.videoMeta}>🎬 {course.videos} video lessons</p>
              <div style={styles.cardFooter}>
                <span style={styles.price}>{course.price}</span>
                <span style={styles.arrow}>›</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageLayout>
  );
}

const styles = {
  backButton: {
    background: 'none',
    border: 'none',
    color: '#A78BFA',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 14,
    marginBottom: '1.25rem',
    padding: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '1.25rem',
  },
  card: {
    padding: '1.5rem',
    background: 'rgba(255,255,255,0.06)',
    borderRadius: 16,
    border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(12px)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, background 0.2s ease',
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
    marginBottom: '1rem',
  },
  cardTitle: { margin: '0 0 6px', fontSize: 16, fontWeight: 700, color: '#fff' },
  cardMeta: { margin: '0 0 8px', fontSize: 13, color: '#94A3B8' },
  videoMeta: { margin: '0 0 16px', fontSize: 12, color: '#A78BFA', fontWeight: 600 },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: 14, fontWeight: 700, color: '#A78BFA' },
  arrow: { fontSize: 20, color: '#64748B' },
};