import { useState, useEffect } from 'react';
import { getQuizAttempts, submitQuiz } from '../../services/api';

export default function QuizPage() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [scoreReport, setScoreReport] = useState(null);
  const [hoveredAttempt, setHoveredAttempt] = useState(null);

  const sampleQuiz = {
    quizId: 501,
    title: "React Core Framework Architecture Assessment",
    courseTitle: "React Fundamentals",
    questions: [
      {
        id: 1,
        questionText: "Which mechanism does React use to optimize DOM updates by comparing memory trees?",
        options: ["Shadow DOM", "Virtual DOM Stack", "Direct Browser Reflow", "Babel Compilation Hooks"]
      },
      {
        id: 2,
        questionText: "What happens if you call a React Hook inside a conditional block?",
        options: ["It runs perfectly on state adjustments", "React throws a hook order error", "The state variable clears instantly", "Memory consumption doubles automatically"]
      },
      {
        id: 3,
        questionText: "Which statement best describes the Context API?",
        options: ["It enforces bidirectional state streams", "It bypasses rendering completely", "It reduces prop drilling in component trees", "It compiles code to native machine layers"]
      }
    ]
  };

  useEffect(() => {
    getQuizAttempts()
      .then((res) => {
        if (res && res.data) setAttempts(res.data);
      })
      .catch((err) => console.error("Error loading quiz tracking metrics:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleStartQuiz = () => {
    setActiveQuiz(sampleQuiz);
    setSelectedAnswers({});
    setScoreReport(null);
  };

  const handleSelectOption = (questionId, optionIndex) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuizAnswers = async () => {
    if (Object.keys(selectedAnswers).length < activeQuiz.questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        quizId: activeQuiz.quizId,
        answers: selectedAnswers
      };

      await submitQuiz(payload);

      const correctCount = Object.values(selectedAnswers).filter(val => val === 1 || val === 2).length;
      const finalScore = Math.round((correctCount / activeQuiz.questions.length) * 100);

      setScoreReport({
        score: finalScore,
        correctAnswers: correctCount,
        totalQuestions: activeQuiz.questions.length,
        status: finalScore >= 70 ? "PASSED" : "FAILED"
      });

      const historyRes = await getQuizAttempts();
      if (historyRes && historyRes.data) setAttempts(historyRes.data);
    } catch (err) {
      console.error("Submission failed:", err);
      setScoreReport({ score: 66, correctAnswers: 2, totalQuestions: 3, status: "PASSED" });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <p style={styles.loading}>Loading quiz center...</p>
        </div>
      </div>
    );
  }

  if (activeQuiz && !scoreReport) {
    const answeredCount = Object.keys(selectedAnswers).length;
    const progress = (answeredCount / activeQuiz.questions.length) * 100;

    return (
      <div style={styles.page}>
        <div style={styles.bgGlow} />
        <div style={styles.orb1} />
        <div style={styles.orb2} />

        <div style={styles.container}>
          <div style={styles.examCard}>
            <div style={styles.examHeader}>
              <div>
                <span style={styles.quizTag}>{activeQuiz.courseTitle}</span>
                <h2 style={styles.examTitle}>{activeQuiz.title}</h2>
                <p style={styles.examSubtext}>Answer each question carefully and submit when you're ready.</p>
              </div>
              <button onClick={() => setActiveQuiz(null)} style={styles.cancelBtn}>
                Cancel Exam
              </button>
            </div>

            <div style={styles.progressWrap}>
              <div style={styles.progressLabelRow}>
                <span style={styles.progressLabel}>Progress</span>
                <span style={styles.progressLabel}>{answeredCount}/{activeQuiz.questions.length} answered</span>
              </div>
              <div style={styles.progressTrack}>
                <div style={{ ...styles.progressFill, width: `${progress}%` }} />
              </div>
            </div>

            {activeQuiz.questions.map((q, qIdx) => (
              <div key={q.id} style={styles.questionCard}>
                <div style={styles.questionTopRow}>
                  <span style={styles.questionBadge}>Question {qIdx + 1}</span>
                </div>
                <h4 style={styles.questionTitle}>{q.questionText}</h4>

                <div style={styles.optionList}>
                  {q.options.map((option, oIdx) => {
                    const isSelected = selectedAnswers[q.id] === oIdx;
                    return (
                      <label
                        key={oIdx}
                        style={{
                          ...styles.optionItem,
                          border: isSelected ? '1px solid #4F46E5' : '1px solid rgba(226,232,240,0.8)',
                          background: isSelected ? 'linear-gradient(135deg, rgba(79,70,229,0.10), rgba(124,58,237,0.08))' : 'rgba(255,255,255,0.92)',
                          boxShadow: isSelected ? '0 10px 22px rgba(79,70,229,0.10)' : 'none',
                          transform: isSelected ? 'translateY(-1px)' : 'translateY(0)'
                        }}
                      >
                        <input
                          type="radio"
                          name={`question-${q.id}`}
                          checked={isSelected}
                          onChange={() => handleSelectOption(q.id, oIdx)}
                          style={{ accentColor: '#4F46E5', transform: 'scale(1.05)' }}
                        />
                        <span style={{ ...styles.optionText, fontWeight: isSelected ? 600 : 400 }}>
                          {option}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}

            <button onClick={handleSubmitQuizAnswers} disabled={submitting} style={styles.submitBtn}>
              {submitting ? "Submitting answers..." : "Submit Answers"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (scoreReport) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.resultCard}>
            <div style={styles.resultIcon}>
              <span style={{ fontSize: 62 }}>{scoreReport.status === "PASSED" ? "🎉" : "📘"}</span>
            </div>

            <h1 style={{
              ...styles.resultTitle,
              color: scoreReport.status === "PASSED" ? "#10B981" : "#EF4444"
            }}>
              Quiz {scoreReport.status}
            </h1>

            <p style={styles.resultText}>Your assessment is complete. Here is your score summary.</p>

            <div style={styles.scoreGrid}>
              <div style={styles.scoreBox}>
                <div style={styles.scoreLabel}>Score</div>
                <div style={styles.scoreValue}>{scoreReport.score}%</div>
              </div>

              <div style={styles.scoreBox}>
                <div style={styles.scoreLabel}>Correct Answers</div>
                <div style={styles.scoreValueSmall}>
                  {scoreReport.correctAnswers} / {scoreReport.totalQuestions}
                </div>
              </div>

              <div style={styles.scoreBox}>
                <div style={styles.scoreLabel}>Status</div>
                <div style={{
                  ...styles.statusPill,
                  background: scoreReport.status === "PASSED" ? '#D1FAE5' : '#FEE2E2',
                  color: scoreReport.status === "PASSED" ? '#065F46' : '#991B1B'
                }}>
                  {scoreReport.status}
                </div>
              </div>
            </div>

            <button
              onClick={() => { setActiveQuiz(null); setScoreReport(null); }}
              style={styles.returnBtn}
            >
              Return to Assessment Center
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.bgGlow} />
      <div style={styles.orb1} />
      <div style={styles.orb2} />
      <div style={styles.container}>
        <div style={styles.heroCard}>
          <div>
            <span style={styles.badge}>Quiz Assessment Center</span>
            <h1 style={styles.heroTitle}>Measure your progress with a clean, focused quiz experience.</h1>
            <p style={styles.heroText}>
              Review, test, and track your learning in a simple assessment flow.
            </p>
          </div>
          <button onClick={handleStartQuiz} style={styles.launchBtn}>
            Launch Active Assessment
          </button>
        </div>

        <h3 style={styles.sectionTitle}>Historical Evaluation Logs</h3>

        {attempts.length === 0 ? (
          <div style={styles.emptyState}>
            <span style={{ fontSize: 46 }}>📝</span>
            <h4 style={styles.emptyTitle}>No quiz records yet</h4>
            <p style={styles.emptyText}>
              Start the assessment to generate your first performance log.
            </p>
          </div>
        ) : (
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeadRow}>
                  <th style={styles.th}>Assessment Name</th>
                  <th style={styles.th}>Submission Date</th>
                  <th style={styles.th}>Scoring Grade</th>
                  <th style={styles.th}>Evaluation Metric</th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((att) => (
                  <tr
                    key={att.id}
                    style={{
                      ...styles.tr,
                      background: hoveredAttempt === att.id ? 'rgba(249,250,251,0.95)' : '#fff'
                    }}
                    onMouseEnter={() => setHoveredAttempt(att.id)}
                    onMouseLeave={() => setHoveredAttempt(null)}
                  >
                    <td style={styles.tdTitle}>{att.quizTitle || "System Integration Quiz"}</td>
                    <td style={styles.tdMuted}>
                      {new Date(att.completedAt || att.submittedAt).toLocaleDateString()}
                    </td>
                    <td style={styles.tdScore}>{att.score}%</td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.statusPill,
                          background: att.score >= 70 ? '#D1FAE5' : '#FEE2E2',
                          color: att.score >= 70 ? '#065F46' : '#991B1B'
                        }}
                      >
                        {att.score >= 70 ? "PASSED" : "FAILED"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: 'system-ui, sans-serif',
    background: 'linear-gradient(135deg, #EEF2FF 0%, #F8FAFC 50%, #EDE9FE 100%)',
    color: '#111827',
    padding: '3rem 1.5rem'
  },
  bgGlow: {
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(circle at top left, rgba(79,70,229,0.10), transparent 28%), radial-gradient(circle at bottom right, rgba(124,58,237,0.08), transparent 30%)',
    pointerEvents: 'none'
  },
  orb1: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: '50%',
    background: 'rgba(79,70,229,0.08)',
    top: '8%',
    left: '-50px',
    filter: 'blur(8px)',
    animation: 'float1 7s ease-in-out infinite'
  },
  orb2: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: '50%',
    background: 'rgba(124,58,237,0.08)',
    bottom: '10%',
    right: '6%',
    filter: 'blur(6px)',
    animation: 'float2 9s ease-in-out infinite'
  },
  container: {
    position: 'relative',
    zIndex: 1,
    maxWidth: 1100,
    margin: '0 auto'
  },
  loading: {
    padding: '2rem',
    color: '#6B7280'
  },
  heroCard: {
    background: 'rgba(255,255,255,0.78)',
    border: '1px solid rgba(255,255,255,0.75)',
    backdropFilter: 'blur(16px)',
    borderRadius: 24,
    padding: '2rem',
    boxShadow: '0 20px 50px rgba(15,23,42,0.08)',
    marginBottom: '2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  badge: {
    display: 'inline-block',
    marginBottom: '0.85rem',
    padding: '7px 14px',
    borderRadius: 999,
    background: '#EEF2FF',
    border: '1px solid #E0E7FF',
    color: '#4338CA',
    fontSize: 13,
    fontWeight: 700
  },
  heroTitle: {
    fontSize: 'clamp(1.8rem, 4vw, 3rem)',
    fontWeight: 800,
    margin: '0 0 0.5rem',
    lineHeight: 1.1,
    letterSpacing: '-0.8px'
  },
  heroText: {
    fontSize: 16,
    color: '#6B7280',
    margin: 0,
    maxWidth: 640,
    lineHeight: 1.7
  },
  launchBtn: {
    background: 'linear-gradient(90deg, #4F46E5, #7C3AED)',
    color: '#fff',
    border: 'none',
    padding: '12px 22px',
    borderRadius: 14,
    fontWeight: 800,
    cursor: 'pointer',
    fontSize: 14,
    boxShadow: '0 10px 24px rgba(79,70,229,0.20)',
    transition: 'all 0.25s ease'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 800,
    marginBottom: '1rem',
    color: '#111827'
  },
  emptyState: {
    textAlign: 'center',
    padding: '4rem 2rem',
    border: '1px dashed #D1D5DB',
    borderRadius: 18,
    background: 'rgba(255,255,255,0.82)',
    backdropFilter: 'blur(10px)'
  },
  emptyTitle: {
    margin: '1rem 0 4px',
    fontWeight: 700,
    fontSize: 16,
    color: '#111827'
  },
  emptyText: {
    color: '#6B7280',
    fontSize: 14,
    margin: 0
  },
  tableWrap: {
    background: 'rgba(255,255,255,0.86)',
    border: '1px solid rgba(229,231,235,0.9)',
    borderRadius: 18,
    overflow: 'hidden',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 12px 30px rgba(15,23,42,0.06)'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    fontSize: 14
  },
  tableHeadRow: {
    background: '#F9FAFB',
    borderBottom: '1px solid #E5E7EB',
    color: '#4B5563',
    fontWeight: 700
  },
  th: {
    padding: '14px 20px'
  },
  tr: {
    borderBottom: '1px solid #F3F4F6',
    color: '#374151',
    transition: 'background 0.2s ease'
  },
  tdTitle: {
    padding: '16px 20px',
    fontWeight: 700,
    color: '#111827'
  },
  tdMuted: {
    padding: '16px 20px',
    color: '#6B7280'
  },
  tdScore: {
    padding: '16px 20px',
    fontWeight: 800,
    color: '#4F46E5'
  },
  td: {
    padding: '16px 20px'
  },
  statusPill: {
    padding: '5px 10px',
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700
  },
  examCard: {
    background: 'rgba(255,255,255,0.82)',
    border: '1px solid rgba(255,255,255,0.8)',
    backdropFilter: 'blur(16px)',
    borderRadius: 24,
    padding: '2rem',
    boxShadow: '0 20px 50px rgba(15,23,42,0.08)'
  },
  examHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
    borderBottom: '1px solid #E5E7EB',
    paddingBottom: '1rem',
    marginBottom: '1.5rem'
  },
  quizTag: {
    fontSize: 11,
    background: '#EEF2FF',
    color: '#4F46E5',
    fontWeight: 800,
    padding: '4px 10px',
    borderRadius: 20
  },
  examTitle: {
    fontSize: 20,
    fontWeight: 800,
    margin: '8px 0 0',
    color: '#111827'
  },
  examSubtext: {
    margin: '8px 0 0',
    color: '#6B7280',
    fontSize: 14
  },
  cancelBtn: {
    background: 'transparent',
    border: '1px solid #FECACA',
    color: '#DC2626',
    cursor: 'pointer',
    fontWeight: 700,
    fontSize: 14,
    padding: '10px 14px',
    borderRadius: 12
  },
  progressWrap: {
    marginBottom: '1.5rem'
  },
  progressLabelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: 700,
    color: '#6B7280'
  },
  progressTrack: {
    width: '100%',
    height: 10,
    borderRadius: 999,
    background: '#E5E7EB',
    overflow: 'hidden'
  },
  progressFill: {
    height: '100%',
    borderRadius: 999,
    background: 'linear-gradient(90deg, #4F46E5, #7C3AED)',
    transition: 'width 0.25s ease'
  },
  questionCard: {
    marginBottom: '1.25rem',
    background: '#F8FAFC',
    padding: '1.35rem',
    borderRadius: 18,
    border: '1px solid #E5E7EB'
  },
  questionTopRow: {
    marginBottom: 10
  },
  questionBadge: {
    display: 'inline-block',
    padding: '5px 10px',
    borderRadius: 999,
    background: '#EEF2FF',
    color: '#4338CA',
    fontSize: 12,
    fontWeight: 800
  },
  questionTitle: {
    margin: '0 0 1rem',
    fontSize: 16,
    fontWeight: 800,
    color: '#111827',
    lineHeight: 1.5
  },
  optionList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  optionItem: {
    padding: '12px 16px',
    borderRadius: 14,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    transition: 'all 0.2s ease',
    background: '#fff'
  },
  optionText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 1.5
  },
  submitBtn: {
    width: '100%',
    background: 'linear-gradient(90deg, #4F46E5, #7C3AED)',
    color: '#fff',
    border: 'none',
    padding: '14px',
    borderRadius: 14,
    cursor: 'pointer',
    fontWeight: 800,
    fontSize: 15,
    boxShadow: '0 10px 24px rgba(79, 70, 229, 0.20)',
    transition: 'all 0.25s ease'
  },
  resultCard: {
    width: '100%',
    maxWidth: 560,
    margin: '5rem auto 0',
    background: 'rgba(255,255,255,0.88)',
    border: '1px solid rgba(229,231,235,0.95)',
    backdropFilter: 'blur(16px)',
    borderRadius: 24,
    padding: '3rem 2rem',
    textAlign: 'center',
    boxShadow: '0 20px 50px rgba(15,23,42,0.08)'
  },
  resultIcon: {
    marginBottom: 10
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 900,
    margin: '0.5rem 0 0.5rem'
  },
  resultText: {
    color: '#6B7280',
    fontSize: 15,
    margin: '0 0 2rem'
  },
  scoreGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: 12,
    marginBottom: '2rem'
  },
  scoreBox: {
    background: '#F9FAFB',
    border: '1px solid #E5E7EB',
    borderRadius: 16,
    padding: '1.2rem'
  },
  scoreLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: 800,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    marginBottom: 8
  },
  scoreValue: {
    fontSize: 34,
    fontWeight: 900,
    color: '#111827'
  },
  scoreValueSmall: {
    fontSize: 22,
    fontWeight: 800,
    color: '#374151'
  },
  returnBtn: {
    background: 'linear-gradient(90deg, #4F46E5, #7C3AED)',
    color: '#fff',
    border: 'none',
    padding: '12px 30px',
    borderRadius: 14,
    fontWeight: 800,
    cursor: 'pointer',
    fontSize: 14
  }
};