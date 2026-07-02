import { useLocation, useNavigate } from 'react-router-dom';
import { enrollCourse } from '../../services/api';

export default function PaymentPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const course = state?.course;

  if (!course) {
    useEffect(() => { navigate('/student/courses'); }, []);
    return null;
  }

  const handlePayNow = async () => {
    // 1. Simulate Payment Gateway
    const paymentConfirmed = window.confirm(`Proceed to pay $99.00 for ${course.title}?`);
    
    if (paymentConfirmed) {
      // 2. Perform actual enrollment after payment success
      try {
        await enrollCourse(course.id);
        alert("Payment Successful! You are now enrolled.");
        
        // 3. Update local storage to reflect enrollment
        const rawSaved = localStorage.getItem("student_mock_enrollments") || "[]";
        const baseList = JSON.parse(rawSaved);
        const updatedList = [...baseList, { ...course, courseId: course.id, enrolledAt: new Date().toLocaleDateString() }];
        localStorage.setItem("student_mock_enrollments", JSON.stringify(updatedList));
        
        navigate('/student/progress');
      } catch (err) {
        alert("Enrollment failed after payment.");
      }
    }
  };

  return (
    <div style={{ padding: '3rem', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
      <h1>Secure Checkout</h1>
      <div style={{ background: '#fff', padding: '2rem', borderRadius: 16, border: '1px solid #E5E7EB' }}>
        <h3>{course.title}</h3>
        <p>Premium Access: $99.00</p>
        <button 
          onClick={handlePayNow}
          style={{ width: '100%', padding: '12px', background: '#10B981', color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 800 }}
        >
          Pay with Card / UPI
        </button>
      </div>
    </div>
  );
}