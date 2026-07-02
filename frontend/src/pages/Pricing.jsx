import { useNavigate } from 'react-router-dom';
import PageLayout from '../components/PageLayout';

export default function Pricing() {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: ['Access to 5 intro courses', 'Community forum access', 'Basic progress tracking'],
      highlight: false
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      features: ['Access to all courses', 'Certificates of completion', 'Progress dashboards', 'Priority support'],
      highlight: true
    },
    {
      name: 'Teams',
      price: '$99',
      period: '/month',
      features: ['Everything in Pro', 'Up to 10 seats', 'Team analytics', 'Dedicated account manager'],
      highlight: false
    }
  ];

  return (
    <PageLayout
      title="Simple, transparent pricing"
      subtitle="Start for free. Upgrade when you're ready to go all-in on your learning."
    >
      <div style={styles.grid}>
        {plans.map((plan) => (
          <div
            key={plan.name}
            style={{
              ...styles.card,
              ...(plan.highlight ? styles.cardHighlight : {})
            }}
          >
            {plan.highlight && <div style={styles.badge}>Most popular</div>}
            <h3 style={styles.planName}>{plan.name}</h3>
            <div style={styles.priceRow}>
              <span style={styles.price}>{plan.price}</span>
              <span style={styles.period}>{plan.period}</span>
            </div>
            <ul style={styles.featureList}>
              {plan.features.map((f) => (
                <li key={f} style={styles.featureItem}>✓ {f}</li>
              ))}
            </ul>
            <button
              onClick={() => navigate('/register')}
              style={plan.highlight ? styles.ctaBtnHighlight : styles.ctaBtn}
            >
              Get Started
            </button>
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
    gap: '1.5rem',
    alignItems: 'stretch'
  },
  card: {
    position: 'relative',
    padding: '2rem 1.75rem',
    background: 'rgba(255,255,255,0.06)',
    borderRadius: 20,
    border: '1px solid rgba(255,255,255,0.1)',
    backdropFilter: 'blur(12px)',
    display: 'flex',
    flexDirection: 'column'
  },
  cardHighlight: {
    background: 'rgba(139,92,246,0.14)',
    border: '1px solid rgba(167,139,250,0.5)',
    transform: 'scale(1.03)'
  },
  badge: {
    position: 'absolute',
    top: -12,
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'linear-gradient(90deg, #6366F1, #8B5CF6)',
    color: '#fff',
    fontSize: 11,
    fontWeight: 700,
    padding: '4px 12px',
    borderRadius: 999
  },
  planName: { margin: '0 0 12px', fontSize: 18, fontWeight: 700, color: '#fff' },
  priceRow: { display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: '1.5rem' },
  price: { fontSize: 34, fontWeight: 800, color: '#fff' },
  period: { fontSize: 13, color: '#94A3B8' },
  featureList: { listStyle: 'none', padding: 0, margin: '0 0 1.75rem', flex: 1 },
  featureItem: { fontSize: 13.5, color: '#CBD5E1', marginBottom: 10, lineHeight: 1.5 },
  ctaBtn: {
    background: 'rgba(255,255,255,0.08)',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.16)',
    padding: '10px 20px',
    borderRadius: 10,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 600
  },
  ctaBtnHighlight: {
    background: 'linear-gradient(90deg, #6366F1, #8B5CF6)',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: 10,
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 700,
    boxShadow: '0 12px 24px rgba(99,102,241,0.35)'
  }
};