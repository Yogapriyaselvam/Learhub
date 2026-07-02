import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyEnrollments, getCourseLessons, dropEnrollment, submitQuiz } from '../../services/api';

// ══════════════════════════════════════════════════════
// COURSE IMAGE MAP — exact image per course title
// ══════════════════════════════════════════════════════
const courseImageMap = {
  "Java Programming Masterclass": "https://images.unsplash.com/photo-1588239034647-25783cbfcfc1?auto=format&fit=crop&w=600&q=80",
  "Python Programming Essentials": "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=600&q=80",
  "C++ Programming Fundamentals": "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=600&q=80",
  "JavaScript Programming Bootcamp": "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=600&q=80",
  "Data Structures & Algorithms in Java": "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=600&q=80",

  "HTML5 & CSS3 Fundamentals": "https://images.unsplash.com/photo-1621839673705-6617adf9e890?auto=format&fit=crop&w=600&q=80",
  "Modern JavaScript (ES6+)": "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?auto=format&fit=crop&w=600&q=80",
  "React.js Complete Guide": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80",
  "React Fundamentals": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80",
  "Node.js & Express Development": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
  "Node.js & Express": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
  "Spring Boot Backend Development": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80",

  "Android App Development with Java": "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=600&q=80",
  "Android App Development with Kotlin": "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=600&q=80",
  "Flutter App Development": "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=600&q=80",
  "React Native Mobile Development": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80",
  "Mobile UI Design & Firebase Integration": "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=600&q=80",

  "Introduction to Artificial Intelligence": "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=600&q=80",
  "Machine Learning Fundamentals": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80",
  "Deep Learning with TensorFlow": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=80",
  "Natural Language Processing (NLP)": "https://images.unsplash.com/photo-1655720828018-edd2daec9349?auto=format&fit=crop&w=600&q=80",
  "Computer Vision using OpenCV": "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?auto=format&fit=crop&w=600&q=80",

  "Python for Data Science": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
  "NumPy & Pandas Masterclass": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80",
  "Data Visualization with Matplotlib": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
  "Statistics for Data Science": "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?auto=format&fit=crop&w=600&q=80",
  "Data Analysis & Business Intelligence": "https://images.unsplash.com/photo-1599658880436-c61792e70672?auto=format&fit=crop&w=600&q=80",

  "AWS Cloud Practitioner": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
  "Microsoft Azure Fundamentals": "https://images.unsplash.com/photo-1642132652859-3ef5a1048fd1?auto=format&fit=crop&w=600&q=80",
  "Google Cloud Platform Essentials": "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?auto=format&fit=crop&w=600&q=80",
  "Docker & Kubernetes Basics": "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=600&q=80",
  "Cloud DevOps Fundamentals": "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=600&q=80",

  "Cyber Security Fundamentals": "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=600&q=80",
  "Ethical Hacking Essentials": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
  "Network Security": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80",
  "Web Application Security": "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=600&q=80",
  "Penetration Testing with Kali Linux": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",

  "MySQL Database Development": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=600&q=80",
  "PostgreSQL Fundamentals": "https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?auto=format&fit=crop&w=600&q=80",
  "MongoDB for Beginners": "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=600&q=80",
  "SQL Queries & Database Design": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
  "Database Administration & Optimization": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",

  "UI Design Fundamentals": "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80",
  "UX Research & Design Thinking": "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=600&q=80",
  "UI/UX Design Principles": "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?auto=format&fit=crop&w=600&q=80",
  "Adobe XD for UI Designers": "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80",
  "Responsive Web & Mobile Design": "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=600&q=80",

  "Digital Marketing Fundamentals": "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=600&q=80",
  "Search Engine Optimization (SEO)": "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?auto=format&fit=crop&w=600&q=80",
  "Social Media Marketing": "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=600&q=80",
  "Google Ads & PPC Campaigns": "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&w=600&q=80",
  "Email Marketing & Content Strategy": "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=600&q=80",

  "Project Management Professional Basics": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
  "Entrepreneurship & Startup Fundamentals": "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=600&q=80",
  "Business Analytics": "https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&w=600&q=80",
  "Leadership & Team Management": "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
  "Agile & Scrum Methodologies": "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80",

  "Spoken English Masterclass": "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=600&q=80",
  "Professional Business Communication": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
  "Public Speaking & Presentation Skills": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80",
  "Interview Preparation & HR Skills": "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?auto=format&fit=crop&w=600&q=80",
  "Resume Writing & Career Development": "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=600&q=80",

  "☕ Java Full Stack Development": "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?auto=format&fit=crop&w=600&q=80",
  "🌐 MERN Stack Development": "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&w=600&q=80",
  "🌐 MEAN Stack Development": "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80",
  "🤖 AI & Machine Learning with Python": "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=600&q=80",
  "📊 Data Science & Analytics Bootcamp": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80",
  "☁️ AWS Cloud Engineer Career Path": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
  "🛡️ Cyber Security Professional": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
  "📱 Flutter Full Stack Mobile Development": "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=600&q=80",
  "💼 Software Testing & Automation (Selenium)": "https://images.unsplash.com/photo-1516321165247-4aa89a48be55?auto=format&fit=crop&w=600&q=80",
  "📈 DevOps with Docker & Kubernetes": "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=600&q=80",
};

// ══════════════════════════════════════════════════════
// FALLBACK IMAGE PER CATEGORY — keyed to match detectCategory()'s
// return values ("programming", "web", "mobile", ...) so a course
// title that isn't in courseImageMap still gets a real photo instead
// of an emoji placeholder.
// ══════════════════════════════════════════════════════
const categoryFallbackImageMap = {
  programming: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80",
  web: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=600&q=80",
  mobile: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80",
  ai: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=600&q=80",
  datascience: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
  cloud: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80",
  security: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=600&q=80",
  database: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
  design: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80",
  marketing: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=600&q=80",
  business: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
  communication: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80",
  testing: "https://images.unsplash.com/photo-1516321165247-4aa89a48be55?auto=format&fit=crop&w=600&q=80",
};

const DEFAULT_COURSE_IMAGE = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80";

export default function ProgressPage() {
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [lessonsLoading, setLessonsLoading] = useState(false);

  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState('video');
  const [completedLessons, setCompletedLessons] = useState({});
  const [courseCompletionStatus, setCourseCompletionStatus] = useState({});
  const [showCertModal, setShowCertModal] = useState(false);
  const [certCourseTitle, setCertCourseTitle] = useState('');

  const [currentViewMode, setCurrentViewMode] = useState('dashboard');
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittingQuiz, setSubmittingQuiz] = useState(false);
  const [scoreReport, setScoreReport] = useState(null);
  const [activeQuizQuestions, setActiveQuizQuestions] = useState([]);

  const [showRoadmapModal, setShowRoadmapModal] = useState(false);
  const [roadmapData, setRoadmapData] = useState(null);
  const [videoErrorMap, setVideoErrorMap] = useState({});

  // ── Feedback state ──────────────────────────────────────────
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackCourseTitle, setFeedbackCourseTitle] = useState('');
  const [feedbackRating, setFeedbackRating] = useState(5);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackSubmittedFor, setFeedbackSubmittedFor] = useState({});

  // ── Multi-video playlist state ──────────────────────────────
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  // Appends autoplay params so the lesson video starts playing the moment it loads,
  // matching the old <video autoPlay muted> behavior (YouTube requires mute=1 for
  // autoplay to be allowed by the browser without a user click).
  const getAutoplayEmbedUrl = (embedUrl) => {
    if (!embedUrl) return embedUrl;
    return `${embedUrl}?autoplay=1&mute=1&rel=0&modestbranding=1&playsinline=1`;
  };

  // Fallback "open on YouTube" link, in case a specific video has embedding disabled
  const getWatchUrl = (embedUrl) => {
    if (!embedUrl) return embedUrl;
    return embedUrl.replace('/embed/', '/watch?v=');
  };

  useEffect(() => {
    const savedCompletion = localStorage.getItem("completed_courses_registry");
    if (savedCompletion) setCourseCompletionStatus(JSON.parse(savedCompletion));

    const savedLessons = localStorage.getItem("completed_lessons_map");
    if (savedLessons) setCompletedLessons(JSON.parse(savedLessons));

    const savedFeedbackSubmitted = localStorage.getItem("submitted_feedback_courses");
    if (savedFeedbackSubmitted) setFeedbackSubmittedFor(JSON.parse(savedFeedbackSubmitted));
  }, []);

  const ProgressBar = ({ percent = 0, height = 8, showLabel = true }) => {
    const pct = Math.max(0, Math.min(100, percent));
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, height, background: '#E2E8F0', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ width: `${pct}%`, height: '100%', background: 'linear-gradient(90deg, #4F46E5, #10B981)', transition: 'width 360ms ease' }} />
        </div>
        {showLabel && <div style={{ minWidth: 48, fontSize: 12, color: '#475569', fontWeight: 700, textAlign: 'right' }}>{pct}%</div>}
      </div>
    );
  };

  const detectCategory = (courseTitle = "") => {
    const t = courseTitle.toLowerCase();
    if (t.includes("java") || t.includes("python") || t.includes("c++") || t.includes("javascript") || t.includes("data structures") || t.includes("algorithm")) return "programming";
    if (t.includes("html") || t.includes("css") || t.includes("react") || t.includes("node") || t.includes("spring") || t.includes("web development") || t.includes("mern") || t.includes("mean")) return "web";
    if (t.includes("android") || t.includes("flutter") || t.includes("kotlin") || t.includes("mobile") || t.includes("react native")) return "mobile";
    if (t.includes("artificial intelligence") || t.includes("machine learning") || t.includes("deep learning") || t.includes("nlp") || t.includes("computer vision") || t.includes(" ai ") || t.startsWith("ai")) return "ai";
    if (t.includes("data science") || t.includes("pandas") || t.includes("numpy") || t.includes("matplotlib") || t.includes("statistics") || t.includes("business intelligence")) return "datascience";
    if (t.includes("aws") || t.includes("azure") || t.includes("google cloud") || t.includes("docker") || t.includes("kubernetes") || t.includes("devops") || t.includes("cloud")) return "cloud";
    if (t.includes("cyber") || t.includes("hacking") || t.includes("network security") || t.includes("penetration") || t.includes("web application security")) return "security";
    if (t.includes("mysql") || t.includes("postgres") || t.includes("mongodb") || t.includes("sql") || t.includes("database")) return "database";
    if (t.includes("ui") || t.includes("ux") || t.includes("adobe xd") || t.includes("figma") || t.includes("responsive")) return "design";
    if (t.includes("marketing") || t.includes("seo") || t.includes("social media") || t.includes("google ads") || t.includes("email marketing")) return "marketing";
    if (t.includes("project management") || t.includes("entrepreneur") || t.includes("business analytics") || t.includes("leadership") || t.includes("agile") || t.includes("scrum")) return "business";
    if (t.includes("english") || t.includes("communication") || t.includes("public speaking") || t.includes("interview") || t.includes("resume")) return "communication";
    if (t.includes("testing") || t.includes("selenium")) return "testing";
    return "general";
  };

  // ── Resolves the actual course image: exact title match first,
  //     then a category-based photo, then a generic default. No emoji. ──
  const getFallbackImage = (category) => {
    return categoryFallbackImageMap[category] || DEFAULT_COURSE_IMAGE;
  };

  const getCourseImage = (courseTitle = "") => {
    if (courseImageMap[courseTitle]) return courseImageMap[courseTitle];
    return getFallbackImage(detectCategory(courseTitle));
  };

  // ── Category video/notes bank — videos now carry real YouTube embed links ──
  // Using /embed/ URLs so they can be dropped straight into an <iframe>.
  const categoryContentBank = {
    programming: {
      poster: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
      videos: [
        { title: "Variables, Data Types & Operators", url: "https://www.youtube.com/embed/W6NZfCO5SIk" },
        { title: "Control Flow: Loops & Conditionals", url: "https://www.youtube.com/embed/IsG4Xd6LlsM" },
        { title: "Functions & Scope", url: "https://www.youtube.com/embed/N8ap4k_1QEQ" },
        { title: "Object-Oriented Building Blocks", url: "https://www.youtube.com/embed/PFmuCDHHpwk" },
        { title: "Error Handling & Debugging", url: "https://www.youtube.com/embed/cFTFtuEQ-10" }
      ],
      notes: ["Memory Management Basics", "Data Structures Overview", "Algorithm Complexity (Big-O)", "Recursion Patterns", "Best Coding Practices"]
    },
    web: {
      poster: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=900&q=80",
      videos: [
        { title: "HTML & Semantic Structure", url: "https://www.youtube.com/embed/qz0aGYrrlhU" },
        { title: "CSS Layout & Flexbox/Grid", url: "https://www.youtube.com/embed/JJSoEo8JSnc" },
        { title: "JavaScript DOM Manipulation", url: "https://www.youtube.com/embed/0ik6X4DJKCc" },
        { title: "Component-Based UI Building", url: "https://www.youtube.com/embed/bMknfKXIFA8" },
        { title: "API Integration & Fetch", url: "https://www.youtube.com/embed/cuEtnrL9-H0" }
      ],
      notes: ["Responsive Design Notes", "State Management Concepts", "Routing & Navigation", "Performance Optimization", "Deployment Checklist"]
    },
    mobile: {
      poster: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80",
      videos: [
        { title: "App Architecture Overview", url: "https://www.youtube.com/embed/VPvVD8t02U8" },
        { title: "Building Layouts & Widgets", url: "https://www.youtube.com/embed/x0uinJvhNxI" },
        { title: "Navigation Between Screens", url: "https://www.youtube.com/embed/R2D6P4h6W5I" },
        { title: "Working with Device APIs", url: "https://www.youtube.com/embed/1ukSR1GRtMU" },
        { title: "State & Data Persistence", url: "https://www.youtube.com/embed/d_m5csmrf7I" }
      ],
      notes: ["UI/UX for Mobile Notes", "Lifecycle Management", "Permissions & Security", "Testing on Devices", "Publishing to App Stores"]
    },
    ai: {
      poster: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=900&q=80",
      videos: [
        { title: "Introduction to AI Concepts", url: "https://www.youtube.com/embed/JMUxmLyrhSk" },
        { title: "Supervised vs Unsupervised Learning", url: "https://www.youtube.com/embed/7eh4d6sabA0" },
        { title: "Neural Network Basics", url: "https://www.youtube.com/embed/aircAruvnKk" },
        { title: "Model Training Workflow", url: "https://www.youtube.com/embed/uqomO_BZ44g" },
        { title: "Evaluating Model Performance", url: "https://www.youtube.com/embed/85dtiMz9tSo" }
      ],
      notes: ["Data Preprocessing Notes", "Feature Engineering", "Overfitting & Regularization", "Common AI Frameworks", "Ethical AI Considerations"]
    },
    datascience: {
      poster: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
      videos: [
        { title: "Data Cleaning Techniques", url: "https://www.youtube.com/embed/vmEHCJofslg" },
        { title: "Exploratory Data Analysis", url: "https://www.youtube.com/embed/xi0vhXFPegw" },
        { title: "Working with DataFrames", url: "https://www.youtube.com/embed/vmEHCJofslg" },
        { title: "Visualizing Data Trends", url: "https://www.youtube.com/embed/3Xc3CA655Y4" },
        { title: "Statistical Hypothesis Testing", url: "https://www.youtube.com/embed/0oc49DyA3hU" }
      ],
      notes: ["Descriptive Statistics Notes", "Correlation vs Causation", "Handling Missing Data", "Reporting Insights Clearly", "Data Storytelling"]
    },
    cloud: {
      poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
      videos: [
        { title: "Cloud Computing Fundamentals", url: "https://www.youtube.com/embed/M988_fsOSWo" },
        { title: "Compute & Storage Services", url: "https://www.youtube.com/embed/NKEFWyqJ5XA" },
        { title: "Networking in the Cloud", url: "https://www.youtube.com/embed/2LaAJq1lB1Q" },
        { title: "Containers & Orchestration", url: "https://www.youtube.com/embed/X48VuDVv0do" },
        { title: "CI/CD Pipelines", url: "https://www.youtube.com/embed/scEDHsr3APg" }
      ],
      notes: ["Identity & Access Management", "Cost Optimization Notes", "High Availability Design", "Monitoring & Logging", "Cloud Security Basics"]
    },
    security: {
      poster: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=900&q=80",
      videos: [
        { title: "Security Fundamentals", url: "https://www.youtube.com/embed/inWWhr5tnEA" },
        { title: "Common Attack Vectors", url: "https://www.youtube.com/embed/2TofunAI6fU" },
        { title: "Network Defense Techniques", url: "https://www.youtube.com/embed/qiQR5rTSshw" },
        { title: "Web Application Vulnerabilities", url: "https://www.youtube.com/embed/3Kq1MIfTWCE" },
        { title: "Ethical Hacking Methodology", url: "https://www.youtube.com/embed/3Kq1MIfTWCE" }
      ],
      notes: ["Cryptography Basics", "Access Control Models", "Incident Response Notes", "Security Auditing", "Compliance & Standards"]
    },
    database: {
      poster: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=900&q=80",
      videos: [
        { title: "Relational Database Basics", url: "https://www.youtube.com/embed/HXV3zeQKqGY" },
        { title: "Writing Effective Queries", url: "https://www.youtube.com/embed/7S_tz1z_5bA" },
        { title: "Joins & Relationships", url: "https://www.youtube.com/embed/9yeOJ0ZMUYw" },
        { title: "Indexing for Performance", url: "https://www.youtube.com/embed/ztHopE5Wnpc" },
        { title: "Transactions & ACID", url: "https://www.youtube.com/embed/GAe5oB742dw" }
      ],
      notes: ["Database Normalization Notes", "Schema Design Principles", "Backup & Recovery", "NoSQL vs SQL", "Query Optimization Tips"]
    },
    design: {
      poster: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=900&q=80",
      videos: [
        { title: "Design Principles & Theory", url: "https://www.youtube.com/embed/c9Wg6Cb_YlU" },
        { title: "Wireframing Basics", url: "https://www.youtube.com/embed/qpH7-KFWZRI" },
        { title: "Prototyping Interactions", url: "https://www.youtube.com/embed/FTFaQWZBqQ8" },
        { title: "Color & Typography", url: "https://www.youtube.com/embed/Qj1FK8n7WgY" },
        { title: "Usability Testing", url: "https://www.youtube.com/embed/3Mjo0q0A0Z4" }
      ],
      notes: ["User Research Notes", "Accessibility Guidelines", "Design Systems", "Handoff to Developers", "Mobile-First Design"]
    },
    marketing: {
      poster: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=900&q=80",
      videos: [
        { title: "Marketing Funnel Basics", url: "https://www.youtube.com/embed/nU-IIXBWlS4" },
        { title: "Content Strategy Planning", url: "https://www.youtube.com/embed/4Ap7yl4X8Zo" },
        { title: "Search Engine Optimization", url: "https://www.youtube.com/embed/DvwS7cV9GmQ" },
        { title: "Paid Advertising Basics", url: "https://www.youtube.com/embed/FjJvP6kJ8N4" },
        { title: "Analytics & Tracking", url: "https://www.youtube.com/embed/2V4aQJjHjv8" }
      ],
      notes: ["Audience Segmentation Notes", "Brand Positioning", "Email Campaign Structure", "Social Media Strategy", "Conversion Rate Optimization"]
    },
    business: {
      poster: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
      videos: [
        { title: "Project Planning Basics", url: "https://www.youtube.com/embed/7-LgA4jJ4nI" },
        { title: "Stakeholder Management", url: "https://www.youtube.com/embed/QM4h5H9Jf0k" },
        { title: "Agile & Scrum Workflow", url: "https://www.youtube.com/embed/9TycLR0TqFA" },
        { title: "Risk Management", url: "https://www.youtube.com/embed/4mN2Dk6YgQ8" },
        { title: "Leadership Fundamentals", url: "https://www.youtube.com/embed/1p3K-hxQ0L8" }
      ],
      notes: ["Business Model Notes", "KPI Tracking", "Team Communication", "Budgeting Basics", "Decision-Making Frameworks"]
    },
    communication: {
      poster: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=900&q=80",
      videos: [
        { title: "Clear Verbal Communication", url: "https://www.youtube.com/embed/HAnw168huqA" },
        { title: "Body Language Basics", url: "https://www.youtube.com/embed/Ks-_Mh1QhMc" },
        { title: "Structuring a Presentation", url: "https://www.youtube.com/embed/Unzc731iCUY" },
        { title: "Handling Q&A Confidently", url: "https://www.youtube.com/embed/UhA8D2D4KqE" },
        { title: "Interview Communication Skills", url: "https://www.youtube.com/embed/6Pa0vWfJQ0Q" }
      ],
      notes: ["Professional Email Notes", "Active Listening Tips", "Persuasive Writing", "Conflict Resolution", "Networking Etiquette"]
    },
    testing: {
      poster: "https://images.unsplash.com/photo-1516321165247-4aa89a48be55?auto=format&fit=crop&w=900&q=80",
      videos: [
        { title: "Testing Fundamentals", url: "https://www.youtube.com/embed/7A7cQl6jVnY" },
        { title: "Writing Test Cases", url: "https://www.youtube.com/embed/UzkuOACmBpA" },
        { title: "Automation Basics", url: "https://www.youtube.com/embed/Fr8L4K4CjJ8" },
        { title: "Selenium WebDriver Intro", url: "https://www.youtube.com/embed/Fr8L4K4CjJ8" },
        { title: "Continuous Testing in CI/CD", url: "https://www.youtube.com/embed/scEDHsr3APg" }
      ],
      notes: ["Test Planning Notes", "Bug Reporting Standards", "Regression Testing", "Performance Testing Basics", "Test Coverage Strategy"]
    },
    general: {
      poster: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
      videos: [
        { title: "Course Orientation", url: "https://www.youtube.com/embed/HAnw168huqA" },
        { title: "Core Concept Walkthrough", url: "https://www.youtube.com/embed/7-LgA4jJ4nI" },
        { title: "Practical Application", url: "https://www.youtube.com/embed/9TycLR0TqFA" },
        { title: "Hands-on Exercise", url: "https://www.youtube.com/embed/UzkuOACmBpA" },
        { title: "Wrap-up & Next Steps", url: "https://www.youtube.com/embed/1p3K-hxQ0L8" }
      ],
      notes: ["Key Terminology Notes", "Common Pitfalls", "Reference Checklist", "Case Study Review", "Summary & Resources"]
    }
  };

  // Categories where a "build it / test it / code it" metaphor makes sense,
  // vs. categories where the topic is a soft/practical skill (email writing,
  // presenting, marketing, etc.) and needs plain, human wording instead.
  const TECHNICAL_CATEGORIES = ['programming', 'web', 'mobile', 'ai', 'datascience', 'cloud', 'security', 'database', 'testing'];

  // ── Builds the standardized 6-section note structure, tied to the topic
  //     and to the video the learner just watched ──
  //     📘 Topic Overview / 🎯 Learning Objectives / 📖 Explanation /
  //     💡 Example / 📝 Key Points / ⚠ Common Mistakes
  const buildStructuredNote = (topic, courseTitle, relatedVideoTitle, category) => {
    const t = topic.toLowerCase();
    const isTechnical = TECHNICAL_CATEGORIES.includes(category);

    return {
      heading: `${topic} in ${courseTitle}`,
      topicOverview: `A simple introduction to ${t}: what it is, why it shows up in ${courseTitle}, and how it fits in right after the "${relatedVideoTitle}" video you just watched.`,
      objectives: [
        `Understand what ${t} means and why it matters here.`,
        `Learn how ${t} works step by step.`,
        `Apply ${t} in a small, real example.`
      ],
      explanation: isTechnical
        ? `In plain terms, ${t} is a core building block of ${courseTitle}. Instead of memorizing the definition, focus on the "why": it exists to solve a specific problem you'll keep running into as you build real projects. Once you can explain ${t} in your own words, you're ready to see it in action below.`
        : `In plain terms, ${t} is a practical skill you'll keep using throughout ${courseTitle}. Rather than memorizing a definition, focus on the situations where you'd actually reach for it in everyday work or conversation. Once you can explain ${t} in your own words, you're ready to see it in action below.`,
      example: isTechnical
        ? `Imagine you're working on a small ${courseTitle} project. You need to use ${t} to move from "it should work" to "it actually works" — walk through the related video's demo again if you want to see this applied line by line.`
        : `Imagine you're in a real situation where ${courseTitle} skills matter — a workplace conversation, an email, or a presentation. Using ${t} well here is what separates an average attempt from a confident one — walk through the related video's demo again if you want to see this modeled step by step.`,
      keyPoints: [
        `Why ${t} matters for this specific track.`,
        `How ${t} connects to the "${relatedVideoTitle}" video.`,
        `How this concept links to the next module ahead.`
      ],
      commonMistakes: isTechnical
        ? [
            `Skipping the "why" and jumping straight to syntax or steps.`,
            `Not testing ${t} with a small example before moving on.`
          ]
        : [
            `Skipping the "why" and just copying a template without understanding it.`,
            `Not practicing ${t} out loud or in writing before using it for real.`
          ]
    };
  };

  // Turns any course title into a short, stable numeric fingerprint so we can
  // build lesson ids that are unique per course even when courseId is missing.
  const hashCourseTitle = (title = "") => {
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
      hash = (hash * 31 + title.charCodeAt(i)) % 100000;
    }
    return hash;
  };

  // ── Generates 10 lessons: 5 video lessons (real YouTube embeds) + 5 note lessons ──
  // Lesson ids are namespaced per course (courseId + title hash) so completing
  // lessons in one course never marks lessons "done" in a different course.
  const generateTenSyllabusLessons = (courseTitle, courseId) => {
    const category = detectCategory(courseTitle);
    const bank = categoryContentBank[category];
    const lessons = [];
    const courseKey = `${courseId != null ? courseId : 'x'}-${hashCourseTitle(courseTitle)}`;

    for (let i = 0; i < 5; i++) {
      // Video lesson — carries a `videos` playlist array of { url, label }
      const videoEntry = bank.videos[i];
      const lessonVideos = [{ url: videoEntry.url, label: videoEntry.title }];

      lessons.push({
        id: `${courseKey}-${i * 2 + 1}`,
        title: `Lesson ${i * 2 + 1}: ${videoEntry.title}`,
        type: 'video',
        duration: `${lessonVideos.length} video${lessonVideos.length > 1 ? 's' : ''}`,
        poster: bank.poster,
        videos: lessonVideos   // ← array of { url, label }
      });

      // Note lesson — structured per the standard note template, tied to the video above
      lessons.push({
        id: `${courseKey}-${i * 2 + 2}`,
        title: `Lesson ${i * 2 + 2}: ${bank.notes[i]}`,
        type: 'note',
        duration: '8 mins read',
        noteData: buildStructuredNote(bank.notes[i], courseTitle, videoEntry.title, category)
      });
    }
    return lessons;
  };

  // ── Each category now has its OWN 10 unique questions (no repeats/cycling) ──
  const categoryQuestionBank = {
    programming: [
      { stem: "What is the time complexity of binary search on a sorted array?", options: ["O(n)", "O(log n)", "O(n^2)", "O(1)"], correctIndex: 1 },
      { stem: "Which keyword is used to define a constant value in most C-style languages?", options: ["var", "let", "const", "static"], correctIndex: 2 },
      { stem: "What does OOP stand for?", options: ["Object-Oriented Programming", "Open Output Process", "Ordered Operation Pipeline", "Optional Object Parsing"], correctIndex: 0 },
      { stem: "Which data structure uses FIFO (First In First Out) ordering?", options: ["Stack", "Queue", "Tree", "Graph"], correctIndex: 1 },
      { stem: "What does a 'null pointer exception' typically indicate?", options: ["Out of memory", "Accessing a reference that points to nothing", "Infinite loop", "Syntax error"], correctIndex: 1 },
      { stem: "Which of the following is typically immutable once created in many languages?", options: ["Array", "String", "List", "Object"], correctIndex: 1 },
      { stem: "What is 'recursion'?", options: ["A loop with no end", "A function calling itself", "A type of array", "A syntax error"], correctIndex: 1 },
      { stem: "Which loop structure checks its condition after executing the loop body at least once?", options: ["for loop", "while loop", "do-while loop", "foreach loop"], correctIndex: 2 },
      { stem: "What does 'compiling' code mean?", options: ["Running it in a browser", "Translating source code into machine-executable code", "Deleting unused variables", "Formatting the code style"], correctIndex: 1 },
      { stem: "Which symbol typically starts a single-line comment in C-style languages?", options: ["#", "//", "<!--", "**"], correctIndex: 1 }
    ],
    web: [
      { stem: "Which HTML tag is used to link an external CSS file?", options: ["<style>", "<script>", "<link>", "<css>"], correctIndex: 2 },
      { stem: "What does the Virtual DOM help React do?", options: ["Style components", "Efficiently update the real DOM", "Compile JavaScript", "Manage cookies"], correctIndex: 1 },
      { stem: "Which CSS property is used for flexible box layouts?", options: ["display: flex", "position: absolute", "float: left", "overflow: hidden"], correctIndex: 0 },
      { stem: "What HTTP method is typically used to fetch data without side effects?", options: ["POST", "DELETE", "GET", "PUT"], correctIndex: 2 },
      { stem: "In React, what is used to manage component-level state?", options: ["useEffect", "useState", "useRef", "useMemo"], correctIndex: 1 },
      { stem: "Which CSS unit is relative to the root element's font size?", options: ["px", "rem", "vh", "pt"], correctIndex: 1 },
      { stem: "What does JSON stand for?", options: ["JavaScript Object Notation", "Java Standard Object Network", "JavaScript Ordered Node", "Just Simple Object Notation"], correctIndex: 0 },
      { stem: "Which HTTP status code indicates a successful request?", options: ["404", "500", "200", "301"], correctIndex: 2 },
      { stem: "What is the purpose of 'props' in React?", options: ["Store global CSS", "Pass data from parent to child components", "Manage routing", "Compile JSX"], correctIndex: 1 },
      { stem: "Which tag is used to create a hyperlink in HTML?", options: ["<link>", "<a>", "<href>", "<nav>"], correctIndex: 1 }
    ],
    mobile: [
      { stem: "Which language is primarily used for native Android development today?", options: ["Swift", "Kotlin", "Objective-C", "Dart"], correctIndex: 1 },
      { stem: "What does Flutter use as its single codebase language?", options: ["Java", "Dart", "Kotlin", "JavaScript"], correctIndex: 1 },
      { stem: "Which lifecycle method is called when an Android Activity becomes visible?", options: ["onDestroy()", "onStart()", "onPause()", "onStop()"], correctIndex: 1 },
      { stem: "What is used in React Native to bridge JavaScript with native modules?", options: ["The Bridge", "Webpack", "Redux", "Babel"], correctIndex: 0 },
      { stem: "What should you request from the user before accessing the camera?", options: ["A subscription", "Permission", "A login token", "Nothing"], correctIndex: 1 },
      { stem: "What file format is used to package an Android app for distribution?", options: [".exe", ".apk", ".ipa", ".dmg"], correctIndex: 1 },
      { stem: "In Flutter, what is a 'Widget'?", options: ["A database table", "A basic building block of the UI", "A backend server", "A testing tool"], correctIndex: 1 },
      { stem: "What tool is commonly used to test Android apps on a virtual device?", options: ["Emulator", "Compiler", "Linker", "Debugger console only"], correctIndex: 0 },
      { stem: "What does 'responsive layout' mean in mobile development?", options: ["Fixed layout regardless of screen size", "Layout that adapts to different screen sizes", "A layout with animations only", "A backend concept"], correctIndex: 1 },
      { stem: "Which state management approach is commonly used in React Native?", options: ["Redux", "SQL joins", "CSS Grid", "XML parsing"], correctIndex: 0 }
    ],
    ai: [
      { stem: "Which type of learning uses labeled training data?", options: ["Unsupervised Learning", "Supervised Learning", "Reinforcement Learning", "Clustering"], correctIndex: 1 },
      { stem: "What does 'overfitting' mean in machine learning?", options: ["Model performs well on new data", "Model memorizes training data but fails on new data", "Model trains too fast", "Model has too few parameters"], correctIndex: 1 },
      { stem: "Which algorithm is commonly used for classification tasks?", options: ["Linear Regression", "K-Means", "Logistic Regression", "PCA"], correctIndex: 2 },
      { stem: "What is a neural network's 'activation function' used for?", options: ["Storing data", "Introducing non-linearity", "Compressing images", "Sorting arrays"], correctIndex: 1 },
      { stem: "What does NLP stand for?", options: ["Natural Language Processing", "Neural Logic Pathways", "Numeric Linear Programming", "Node Layer Protocol"], correctIndex: 0 },
      { stem: "What is 'reinforcement learning'?", options: ["Learning from labeled data only", "Learning through rewards and penalties from actions", "Learning without any data", "A type of database query"], correctIndex: 1 },
      { stem: "What is a 'dataset' in machine learning?", options: ["A programming language", "A collection of data used to train/test models", "A type of neural network", "A cloud server"], correctIndex: 1 },
      { stem: "What does 'training' a model mean?", options: ["Deleting old data", "Adjusting model parameters using data", "Compiling the code", "Designing the UI"], correctIndex: 1 },
      { stem: "Which of these is an example of a computer vision task?", options: ["Sentiment analysis", "Image classification", "Speech-to-text", "Text translation"], correctIndex: 1 },
      { stem: "What is a 'confusion matrix' used for?", options: ["Styling charts", "Evaluating classification model performance", "Managing databases", "Writing SQL queries"], correctIndex: 1 }
    ],
    datascience: [
      { stem: "Which Python library is primarily used for dataframes?", options: ["NumPy", "Pandas", "Matplotlib", "Flask"], correctIndex: 1 },
      { stem: "What does a high correlation coefficient (close to 1) indicate?", options: ["No relationship", "Strong positive relationship", "Strong negative relationship", "Random data"], correctIndex: 1 },
      { stem: "Which chart is best for showing distribution of a single variable?", options: ["Histogram", "Pie chart", "Scatter plot", "Line chart"], correctIndex: 0 },
      { stem: "What is the median of a dataset?", options: ["The average value", "The most frequent value", "The middle value when sorted", "The range of values"], correctIndex: 2 },
      { stem: "What is a common technique for handling missing data?", options: ["Ignoring all data", "Imputation", "Deleting the dataset", "Renaming columns"], correctIndex: 1 },
      { stem: "What is 'data wrangling'?", options: ["Deleting all data", "Cleaning and transforming raw data for analysis", "Encrypting data", "Visualizing final reports only"], correctIndex: 1 },
      { stem: "Which of these best describes an 'outlier'?", options: ["The most frequent value", "A data point significantly different from others", "The average value", "A missing value"], correctIndex: 1 },
      { stem: "What does 'standard deviation' measure?", options: ["The middle value", "The spread of data around the mean", "The total count of data", "The maximum value only"], correctIndex: 1 },
      { stem: "Which library is commonly used for numerical computing in Python?", options: ["NumPy", "Django", "Flask", "React"], correctIndex: 0 },
      { stem: "What is 'feature engineering'?", options: ["Designing hardware chips", "Creating new input variables to improve model performance", "Writing test cases", "Managing servers"], correctIndex: 1 }
    ],
    cloud: [
      { stem: "What does IAM stand for in cloud platforms?", options: ["Internet Access Module", "Identity and Access Management", "Integrated Application Manager", "Infrastructure as a Module"], correctIndex: 1 },
      { stem: "What is the main benefit of containerization (e.g. Docker)?", options: ["Slower deployments", "Consistent environments across systems", "Larger file sizes", "No need for code"], correctIndex: 1 },
      { stem: "What does Kubernetes primarily manage?", options: ["Database backups", "Container orchestration", "Email servers", "DNS records"], correctIndex: 1 },
      { stem: "Which of these is a core benefit of cloud computing?", options: ["Fixed hardware costs", "On-demand scalability", "No internet required", "Manual server provisioning only"], correctIndex: 1 },
      { stem: "What is a CI/CD pipeline used for?", options: ["Manual code reviews only", "Automating build, test, and deployment", "Designing UI", "Managing payroll"], correctIndex: 1 },
      { stem: "What does 'scalability' mean in cloud computing?", options: ["Fixed resource allocation", "Ability to increase or decrease resources based on demand", "Only vertical scaling is possible", "Manual server replacement"], correctIndex: 1 },
      { stem: "What is a 'load balancer' used for?", options: ["Encrypting data", "Distributing incoming traffic across multiple servers", "Writing code", "Managing databases only"], correctIndex: 1 },
      { stem: "Which of these is a common cloud deployment model?", options: ["Public cloud", "Private garage", "Local disk only", "Offline server"], correctIndex: 0 },
      { stem: "What does 'serverless computing' mean?", options: ["No servers exist anywhere", "Developers don't manage the underlying servers directly", "Only used for static websites", "A deprecated technology"], correctIndex: 1 },
      { stem: "What is the purpose of 'auto-scaling'?", options: ["Manually adding servers", "Automatically adjusting resources based on load", "Deleting old backups", "Formatting storage"], correctIndex: 1 }
    ],
    security: [
      { stem: "What does SQL Injection exploit?", options: ["Weak passwords", "Unsanitized user input in database queries", "Slow internet", "Outdated browsers"], correctIndex: 1 },
      { stem: "What is the purpose of a firewall?", options: ["Speed up the network", "Filter and control network traffic", "Store passwords", "Compress files"], correctIndex: 1 },
      { stem: "What does 'phishing' refer to?", options: ["A type of encryption", "Tricking users into revealing sensitive information", "A firewall rule", "A backup strategy"], correctIndex: 1 },
      { stem: "What does HTTPS provide that HTTP does not?", options: ["Faster loading", "Encrypted communication", "Better SEO ranking", "Smaller file sizes"], correctIndex: 1 },
      { stem: "What is penetration testing used for?", options: ["Marketing analysis", "Finding security vulnerabilities through simulated attacks", "Writing documentation", "UI testing"], correctIndex: 1 },
      { stem: "What does 'two-factor authentication' add to security?", options: ["Nothing extra", "An additional verification step beyond password", "A faster login", "A backup password only"], correctIndex: 1 },
      { stem: "What is 'malware'?", options: ["A software update", "Malicious software designed to harm systems", "A firewall rule", "A type of encryption"], correctIndex: 1 },
      { stem: "What does 'encryption' do to data?", options: ["Deletes it permanently", "Converts it into unreadable form without a key", "Compresses it", "Backs it up automatically"], correctIndex: 1 },
      { stem: "What is a 'DDoS attack'?", options: ["A type of encryption", "Overwhelming a system with traffic to disrupt service", "A password recovery method", "A firewall configuration"], correctIndex: 1 },
      { stem: "What is the principle of 'least privilege'?", options: ["Giving all users admin access", "Granting users only the access they need", "Removing all access", "Sharing passwords openly"], correctIndex: 1 }
    ],
    database: [
      { stem: "What does SQL stand for?", options: ["Structured Query Language", "Simple Query Logic", "System Query List", "Standard Query Layer"], correctIndex: 0 },
      { stem: "Which type of JOIN returns only matching rows from both tables?", options: ["LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "FULL OUTER JOIN"], correctIndex: 2 },
      { stem: "What is the purpose of a primary key?", options: ["Style the table", "Uniquely identify each row", "Encrypt data", "Speed up the network"], correctIndex: 1 },
      { stem: "What does 'normalization' aim to reduce?", options: ["Query speed", "Data redundancy", "Number of tables", "Number of users"], correctIndex: 1 },
      { stem: "Which database type is MongoDB an example of?", options: ["Relational", "Document-based NoSQL", "Graph database", "Columnar"], correctIndex: 1 },
      { stem: "What is a 'foreign key' used for?", options: ["Encrypting a table", "Linking one table to another", "Styling a table", "Deleting rows automatically"], correctIndex: 1 },
      { stem: "What does ACID stand for in database transactions?", options: ["Atomicity, Consistency, Isolation, Durability", "Access, Control, Identity, Data", "Analysis, Compression, Indexing, Duplication", "Automatic, Consistent, Isolated, Direct"], correctIndex: 0 },
      { stem: "What is an 'index' used for in a database?", options: ["Storing backups", "Speeding up data retrieval", "Encrypting records", "Formatting tables"], correctIndex: 1 },
      { stem: "What is a 'schema' in database terms?", options: ["A backup copy", "The structure/organization of a database", "A type of query", "A user password"], correctIndex: 1 },
      { stem: "Which of these is a NoSQL database?", options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle DB"], correctIndex: 2 }
    ],
    design: [
      { stem: "What is a 'wireframe' used for in design?", options: ["Final visual polish", "Low-fidelity layout structure planning", "Writing backend code", "Database design"], correctIndex: 1 },
      { stem: "What does UX stand for?", options: ["User Experience", "Universal Export", "User Extension", "Unified Xerox"], correctIndex: 0 },
      { stem: "Why is color contrast important in design?", options: ["It looks trendy", "It improves accessibility and readability", "It reduces file size", "It speeds up loading"], correctIndex: 1 },
      { stem: "What is a 'design system'?", options: ["A single icon set", "A reusable set of components and standards", "A database schema", "A marketing plan"], correctIndex: 1 },
      { stem: "What is the purpose of usability testing?", options: ["To test server load", "To observe real users interacting with a design", "To test database queries", "To check SEO"], correctIndex: 1 },
      { stem: "What is a 'mockup' in design?", options: ["A finished coded product", "A visual representation close to the final design", "A database schema", "A type of testing"], correctIndex: 1 },
      { stem: "What does 'visual hierarchy' help achieve?", options: ["Random placement of elements", "Guiding the viewer's eye to what's important first", "Faster page loading", "Better database performance"], correctIndex: 1 },
      { stem: "What is 'white space' in design?", options: ["Wasted, unusable area", "Empty space that improves clarity and focus", "A color palette", "A font style"], correctIndex: 1 },
      { stem: "What is the purpose of a 'style guide'?", options: ["To slow down development", "To ensure visual consistency across a product", "To manage servers", "To write backend code"], correctIndex: 1 },
      { stem: "What does 'prototyping' allow designers to do?", options: ["Skip testing entirely", "Simulate interactions before development", "Write final production code", "Manage databases"], correctIndex: 1 }
    ],
    marketing: [
      { stem: "What does SEO stand for?", options: ["Search Engine Optimization", "Site Export Operations", "Social Engagement Overview", "Sales Efficiency Output"], correctIndex: 0 },
      { stem: "What is a 'conversion rate'?", options: ["Number of page views", "Percentage of users completing a desired action", "Number of social shares", "Email open rate only"], correctIndex: 1 },
      { stem: "What is the purpose of A/B testing in marketing?", options: ["To test server speed", "To compare two versions and see which performs better", "To audit finances", "To design logos"], correctIndex: 1 },
      { stem: "What does CTR stand for?", options: ["Click Through Rate", "Cost To Run", "Customer Tracking Report", "Content Transfer Ratio"], correctIndex: 0 },
      { stem: "Which channel is most associated with PPC advertising?", options: ["Organic search results", "Google Ads", "Direct mail", "Cold calling"], correctIndex: 1 },
      { stem: "What is a 'call to action' (CTA)?", options: ["A random image", "A prompt encouraging users to take a specific action", "A type of firewall", "A database query"], correctIndex: 1 },
      { stem: "What does 'organic reach' mean on social media?", options: ["Reach gained through paid ads only", "Reach gained without paid promotion", "Reach limited to one country", "A type of email format"], correctIndex: 1 },
      { stem: "What is 'customer segmentation'?", options: ["Deleting inactive customers", "Dividing a customer base into distinct groups", "Merging all customers into one group", "A type of database backup"], correctIndex: 1 },
      { stem: "What does 'ROI' stand for in marketing?", options: ["Rate of Interest", "Return on Investment", "Reach of Impressions", "Ratio of Increase"], correctIndex: 1 },
      { stem: "What is 'content marketing' primarily focused on?", options: ["Direct cold calling", "Creating valuable content to attract an audience", "Only paid advertisements", "Only email spam"], correctIndex: 1 }
    ],
    business: [
      { stem: "In Agile, what is a 'sprint'?", options: ["A final product release", "A fixed time-boxed iteration of work", "A type of meeting only", "A budget report"], correctIndex: 1 },
      { stem: "What does a 'stakeholder' refer to in project management?", options: ["Only the CEO", "Anyone with an interest in the project's outcome", "Only customers", "Only developers"], correctIndex: 1 },
      { stem: "What is the main goal of risk management?", options: ["Eliminate all risk", "Identify and mitigate potential risks", "Increase project cost", "Avoid planning"], correctIndex: 1 },
      { stem: "Who typically facilitates Scrum ceremonies?", options: ["Product Owner", "Scrum Master", "CEO", "Client"], correctIndex: 1 },
      { stem: "What is a KPI used for?", options: ["Writing code", "Measuring performance against objectives", "Designing logos", "Managing servers"], correctIndex: 1 },
      { stem: "What is a 'milestone' in project management?", options: ["A daily task", "A significant point or event in a project timeline", "A type of budget report", "A software bug"], correctIndex: 1 },
      { stem: "What does 'scope creep' refer to?", options: ["A project finishing early", "Uncontrolled expansion of project scope", "A type of risk mitigation", "A budget surplus"], correctIndex: 1 },
      { stem: "What is the purpose of a SWOT analysis?", options: ["To design a logo", "To evaluate Strengths, Weaknesses, Opportunities, and Threats", "To write code", "To manage servers"], correctIndex: 1 },
      { stem: "In Agile, what is a 'backlog'?", options: ["A list of completed tasks only", "A prioritized list of work to be done", "A type of financial report", "A server log file"], correctIndex: 1 },
      { stem: "What does 'delegation' mean in leadership?", options: ["Doing all tasks yourself", "Assigning responsibility and authority to others", "Ignoring team input", "Avoiding decision-making"], correctIndex: 1 }
    ],
    communication: [
      { stem: "What is 'active listening'?", options: ["Waiting for your turn to speak", "Fully concentrating and engaging with the speaker", "Interrupting to clarify", "Reading while listening"], correctIndex: 1 },
      { stem: "In a professional email, what is most important to keep?", options: ["Long paragraphs", "Clarity and conciseness", "Slang and jokes", "Multiple unrelated topics"], correctIndex: 1 },
      { stem: "What helps reduce public speaking anxiety?", options: ["Avoiding preparation", "Practicing and knowing your material well", "Speaking very fast", "Ignoring the audience"], correctIndex: 1 },
      { stem: "In an interview, what is the STAR method used for?", options: ["Negotiating salary", "Structuring behavioral answers", "Writing a resume", "Scheduling meetings"], correctIndex: 1 },
      { stem: "What is the best approach to resolving workplace conflict?", options: ["Avoid it entirely", "Open, respectful dialogue", "Escalate immediately", "Ignore the other party"], correctIndex: 1 },
      { stem: "What is 'nonverbal communication'?", options: ["Only written communication", "Communication through body language, tone, and gestures", "Communication over the phone only", "A type of formal email"], correctIndex: 1 },
      { stem: "What is the purpose of an 'elevator pitch'?", options: ["A long detailed report", "A brief, persuasive summary of an idea", "A type of resume format", "A meeting agenda"], correctIndex: 1 },
      { stem: "What does 'empathy' involve in communication?", options: ["Ignoring others' feelings", "Understanding and sharing another person's feelings", "Speaking louder than others", "Avoiding eye contact"], correctIndex: 1 },
      { stem: "What is a key element of a strong resume?", options: ["Irrelevant personal details", "Clear, relevant, and quantifiable achievements", "Long unstructured paragraphs", "No contact information"], correctIndex: 1 },
      { stem: "What helps build rapport in networking?", options: ["Talking only about yourself", "Genuine interest and active listening", "Avoiding follow-up", "Ignoring the other person's name"], correctIndex: 1 }
    ],
    testing: [
      { stem: "What is the purpose of a test case?", options: ["To slow down development", "To verify a specific piece of functionality works as expected", "To write documentation", "To design UI"], correctIndex: 1 },
      { stem: "What does Selenium primarily automate?", options: ["Database backups", "Web browser interactions for testing", "Email marketing", "Server provisioning"], correctIndex: 1 },
      { stem: "What is 'regression testing'?", options: ["Testing only new features", "Re-testing existing features after changes to ensure nothing broke", "Testing server hardware", "Testing UI colors only"], correctIndex: 1 },
      { stem: "What is the difference between manual and automated testing?", options: ["No difference", "Automated testing uses scripts to run tests without manual effort", "Manual testing is always faster", "Automated testing requires no setup"], correctIndex: 1 },
      { stem: "Why integrate testing into a CI/CD pipeline?", options: ["To skip testing", "To catch issues early and automatically", "To slow releases down", "To replace developers"], correctIndex: 1 },
      { stem: "What is 'unit testing'?", options: ["Testing the entire system at once", "Testing individual components in isolation", "Testing only the UI", "Testing hardware only"], correctIndex: 1 },
      { stem: "What is a 'bug' in software testing?", options: ["A planned feature", "An error or flaw causing incorrect behavior", "A type of test case", "A successful test result"], correctIndex: 1 },
      { stem: "What does 'test coverage' measure?", options: ["Server uptime", "The extent to which code is tested", "Number of developers on a team", "Database size"], correctIndex: 1 },
      { stem: "What is 'exploratory testing'?", options: ["Following a strict predefined script only", "Simultaneously learning, designing, and executing tests", "Testing only automated scripts", "Testing hardware components"], correctIndex: 1 },
      { stem: "Why is 'regression testing' important after a code change?", options: ["It's not important", "To ensure existing functionality still works correctly", "To slow down releases", "To replace manual testers entirely"], correctIndex: 1 }
    ],
    general: [
      { stem: "What is the first step in approaching a new course module?", options: ["Skip the introduction", "Understand the core objective", "Jump to the exam", "Ignore the syllabus"], correctIndex: 1 },
      { stem: "Why are hands-on exercises important in learning?", options: ["They are optional filler", "They reinforce concepts through practice", "They replace the need to understand theory", "They are only for advanced learners"], correctIndex: 1 },
      { stem: "What should you do if you don't understand a concept?", options: ["Skip it permanently", "Review the material again or ask for help", "Guess on the exam", "Ignore it"], correctIndex: 1 },
      { stem: "What is the benefit of reviewing a case study?", options: ["It wastes time", "It shows real-world application of concepts", "It replaces the lessons", "It has no value"], correctIndex: 1 },
      { stem: "Why summarize key takeaways at the end of a lesson?", options: ["To make the lesson longer", "To reinforce and retain the most important points", "It's not necessary", "Only for beginners"], correctIndex: 1 },
      { stem: "What is the benefit of setting clear learning goals?", options: ["It has no benefit", "It provides direction and helps measure progress", "It makes learning harder", "It's only for teachers"], correctIndex: 1 },
      { stem: "Why is consistent practice important in skill-building?", options: ["It's not necessary", "It reinforces learning and builds mastery over time", "It only matters for beginners", "It replaces the need to understand theory"], correctIndex: 1 },
      { stem: "What is the value of peer discussion while learning?", options: ["It wastes time", "It exposes you to different perspectives and reinforces understanding", "It has no value", "It should be avoided"], correctIndex: 1 },
      { stem: "Why review earlier lessons before an exam?", options: ["It's unnecessary", "It reinforces retention and identifies weak areas", "It only helps advanced learners", "It replaces the need to study"], correctIndex: 1 },
      { stem: "What is the purpose of self-assessment during a course?", options: ["To waste time", "To track your own understanding and identify gaps", "It's only for the instructor", "It's not useful"], correctIndex: 1 }
    ]
  };

  // Each course now gets exactly 10 unique questions from its own category — no duplicates.
  const generateQuizQuestions = (courseTitle) => {
    const category = detectCategory(courseTitle);
    const bank = categoryQuestionBank[category];
    return bank.map((q, i) => ({ id: i + 1, questionText: q.stem, options: q.options, correctIndex: q.correctIndex }));
  };

  const getRoadmapData = (courseTitle) => {
    const title = (courseTitle || "").toLowerCase();
    if (title.includes("java") || title.includes("programming") || title.includes("c++") || title.includes("stack")) {
      return {
        title: courseTitle, icon: "💻", targetProfile: "Enterprise Software & Core Engineer",
        steps: [
          "Phase 1: Language Syntax Essentials — Mastering variable scopes, explicit data type configurations, and functional loops.",
          "Phase 2: Object-Oriented Frameworks — Imposing strict class structures, inheritance trees, abstraction boundaries, and interface definitions.",
          "Phase 3: Data Structuring — Operating array records, linear lists, double linked pointers, tree node sorting, and Big-O passes.",
          "Phase 4: Optimization & Memory Diagnostics — Monitoring memory leaks, pointer boundaries, heap sizes, and trace debugging.",
          "Phase 5: Production Build Deployment — Compiling binaries cleanly, running unit assertions, and outputting server system packages."
        ]
      };
    }
    return {
      title: courseTitle, icon: "🎯", targetProfile: "Specialized Industry Track Expert",
      steps: [
        "Phase 1: Core System Foundations — Unpacking basic terms, running operational configurations, and setting framework boundaries.",
        "Phase 2: Intermediate Data Management — Managing variables data grids, isolating parameters, and mapping out business workflows.",
        "Phase 3: Advanced Pipeline Execution — Structuring algorithmic rules, troubleshooting data anomalies, and resolving platform issues.",
        "Phase 4: Visual Dashboard Analytics — Building complete tracking panels, coordinating report summaries, and verifying metrics.",
        "Phase 5: Professional Final Handoff — Packaging production deliverables, passing compliance checks, and locking certification criteria."
      ]
    };
  };

  useEffect(() => {
    loadDashboardEnrollments();
    injectPrintStyles();
    injectLmsFonts();
  }, []);

  const loadDashboardEnrollments = () => {
    setLoading(true);
    getMyEnrollments()
      .then((res) => {
        const cachedSaved = localStorage.getItem("student_mock_enrollments");
        let activeBaseList = [];
        if (cachedSaved) {
          activeBaseList = JSON.parse(cachedSaved);
        } else if (res && res.data && res.data.length > 0) {
          activeBaseList = res.data.map(item => ({
            ...item,
            courseId: item.courseId || item.course_id || item.id,
            courseTitle: item.courseTitle || item.title
          }));
        }
        const droppedMap = JSON.parse(localStorage.getItem("dropped_enrollment_ids") || "[]");
        const verifiedActive = activeBaseList.map(item => ({
          ...item,
          courseId: item.courseId || item.id,
          courseTitle: item.courseTitle || item.title
        })).filter(item => !droppedMap.includes(Number(item.courseId)));
        setEnrollments(verifiedActive);
        localStorage.setItem("student_mock_enrollments", JSON.stringify(verifiedActive));
      })
      .catch(() => fallbackToLocalStorageCache())
      .finally(() => setLoading(false));
  };

  const fallbackToLocalStorageCache = () => {
    const savedTracks = localStorage.getItem("student_mock_enrollments");
    if (savedTracks) {
      const droppedMap = JSON.parse(localStorage.getItem("dropped_enrollment_ids") || "[]");
      const filteredCache = JSON.parse(savedTracks).map(item => ({
        ...item,
        courseId: item.courseId || item.id,
        courseTitle: item.courseTitle || item.title
      })).filter(item => !droppedMap.includes(Number(item.courseId)));
      setEnrollments(filteredCache);
    } else {
      setEnrollments([]);
      localStorage.setItem("student_mock_enrollments", JSON.stringify([]));
    }
  };

  const injectLmsFonts = () => {
    if (document.getElementById("lms-font-link")) return;
    const link = document.createElement("link");
    link.id = "lms-font-link";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600&display=swap";
    document.head.appendChild(link);
  };

  const injectPrintStyles = () => {
    if (document.getElementById("cert-print-rules")) return;
    const style = document.createElement("style");
    style.id = "cert-print-rules";
    style.innerHTML = `@media print { body * { visibility: hidden; } #printable-certificate-frame, #printable-certificate-frame * { visibility: visible; } #printable-certificate-frame { position: absolute; left: 0; top: 0; width: 100%; border: none !important; } .no-print { display: none !important; } }`;
    document.head.appendChild(style);
  };

  // All courses (including former "Bonus/Premium" ones) are unlocked — no payment gate.
  const handleOpenWorkspace = async (course) => {
    setSelectedCourse(course);
    setLessonsLoading(true);
    setScoreReport(null);
    setActiveVideoIndex(0);
    setCurrentViewMode('workspace');
    try {
      await getCourseLessons(course.courseId);
      const mockLessons = generateTenSyllabusLessons(course.courseTitle, course.courseId);
      setLessons(mockLessons);
      setActiveLesson(mockLessons[0]);
      setActiveWorkspaceTab(mockLessons[0].type === 'video' ? 'video' : 'notes');
    } finally {
      setLessonsLoading(false);
    }
  };

  const handleMarkAsComplete = (currentIdx) => {
    const currentLesson = lessons[currentIdx];
    setCompletedLessons(prev => {
      const updated = { ...prev, [currentLesson.id]: true };
      localStorage.setItem("completed_lessons_map", JSON.stringify(updated));
      return updated;
    });
    if (currentIdx < lessons.length - 1) {
      const nextLesson = lessons[currentIdx + 1];
      setActiveLesson(nextLesson);
      setActiveVideoIndex(0);
      setActiveWorkspaceTab(nextLesson.type === 'video' ? 'video' : 'notes');
    }
  };

  const handleSelectOption = (questionId, optionIndex) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const startExam = () => {
    setActiveQuizQuestions(generateQuizQuestions(selectedCourse?.courseTitle));
    setSelectedAnswers({});
    setScoreReport(null);
    setCurrentViewMode('exam');
  };

  const handleSubmitEmbeddedQuiz = async () => {
    setSubmittingQuiz(true);
    const correctCount = activeQuizQuestions.reduce((count, q) => {
      return selectedAnswers[q.id] === q.correctIndex ? count + 1 : count;
    }, 0);
    const finalScoreValue = Math.round((correctCount / activeQuizQuestions.length) * 100);
    const passesSyllabusRules = finalScoreValue >= 70;
    try { await submitQuiz({ quizId: 501, answers: selectedAnswers }); } catch (err) {}
    setScoreReport({ score: finalScoreValue, correctAnswers: correctCount, totalQuestions: activeQuizQuestions.length, status: passesSyllabusRules ? "PASSED" : "FAILED" });
    if (passesSyllabusRules) {
      const updatedStatus = { ...courseCompletionStatus, [selectedCourse.courseId]: true };
      setCourseCompletionStatus(updatedStatus);
      localStorage.setItem("completed_courses_registry", JSON.stringify(updatedStatus));
    }
    setSubmittingQuiz(false);
  };

  const handleDropCourse = async (e, enrollmentId) => {
    e.stopPropagation();
    const targeted = enrollments.find(item => Number(item.id) === Number(enrollmentId));
    if (window.confirm("Are you certain you want to drop this course track?")) {
      if (targeted) {
        const currentDropped = JSON.parse(localStorage.getItem("dropped_enrollment_ids") || "[]");
        if (!currentDropped.includes(Number(targeted.courseId))) {
          currentDropped.push(Number(targeted.courseId));
          localStorage.setItem("dropped_enrollment_ids", JSON.stringify(currentDropped));
        }
      }
      try { await dropEnrollment(enrollmentId); } catch (err) {}
      setEnrollments((prevList) => {
        const updated = prevList.filter(item => Number(item.id) !== Number(enrollmentId));
        localStorage.setItem("student_mock_enrollments", JSON.stringify(updated));
        return updated;
      });
      setSelectedCourse(null);
      setCurrentViewMode('dashboard');
    }
  };

  const triggerCertificateAward = (title) => {
    setCertCourseTitle(title);
    setShowCertModal(true);
  };

  const openRoadmapGuideOverlay = (e, courseTitle) => {
    e.stopPropagation();
    setRoadmapData(getRoadmapData(courseTitle));
    setShowRoadmapModal(true);
  };

  // ── Feedback: open modal, submit to admin ────────────────────
  const openFeedbackModal = (e, courseTitle) => {
    e.stopPropagation();
    setFeedbackCourseTitle(courseTitle);
    setFeedbackRating(5);
    setFeedbackMessage('');
    setShowFeedbackModal(true);
  };

  const submitFeedback = () => {
    if (!feedbackMessage.trim()) {
      alert("Please write a bit of feedback before submitting.");
      return;
    }

    // Push into the same localStorage key the Admin > Feedback page reads from
    const existingFeedback = JSON.parse(localStorage.getItem("admin_feedback") || "[]");
    const newFeedbackEntry = {
      id: Date.now(),
      studentName: localStorage.getItem('username') || "Student",
      courseTitle: feedbackCourseTitle,
      rating: feedbackRating,
      message: feedbackMessage.trim(),
      submittedOn: new Date().toISOString().slice(0, 10)
    };
    existingFeedback.push(newFeedbackEntry);
    localStorage.setItem("admin_feedback", JSON.stringify(existingFeedback));

    // Track that feedback was already given for this course so the button
    // doesn't keep inviting duplicate submissions
    const updatedSubmitted = { ...feedbackSubmittedFor, [feedbackCourseTitle]: true };
    setFeedbackSubmittedFor(updatedSubmitted);
    localStorage.setItem("submitted_feedback_courses", JSON.stringify(updatedSubmitted));

    setShowFeedbackModal(false);
    alert("Thanks! Your feedback has been sent to the admin.");
  };

  const completedCount = lessons.filter(l => completedLessons[l.id]).length;

  if (loading) return <p style={{ padding: '2rem', color: '#9CA3AF', fontFamily: 'system-ui', textAlign: 'center' }}>Synchronizing your enrolled paths...</p>;

  // ══════════════════════════════════════════════════════
  // WORKSPACE VIEW
  // ══════════════════════════════════════════════════════
  if (currentViewMode === 'workspace' && selectedCourse && activeLesson) {
    const isCourseFinished = courseCompletionStatus[selectedCourse.courseId] === true;
    const progressPercent = isCourseFinished ? 100 : Math.round((completedCount / lessons.length) * 100) || 0;
    const currentLessonIdx = lessons.findIndex(l => l.id === activeLesson.id);
    const currentVideos = activeLesson.type === 'video' ? activeLesson.videos : [];
    const currentVideo = currentVideos[activeVideoIndex] || null;

    return (
      <div style={{ display: 'flex', height: 'calc(100vh - 65px)', fontFamily: 'system-ui, sans-serif', background: 'linear-gradient(180deg, #F8FAFC 0%, #EEF2FF 100%)' }}>

        {/* ── LEFT SIDEBAR: lesson list ── */}
        <div style={{ width: '320px', borderRight: '1px solid #E2E8F0', background: '#fff', display: 'flex', flexDirection: 'column', boxShadow: '8px 0 30px rgba(15, 23, 42, 0.04)', flexShrink: 0 }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #E2E8F0', background: 'linear-gradient(135deg, #F8FAFC 0%, #EEF2FF 100%)' }}>
            <button onClick={() => setCurrentViewMode('dashboard')} style={{ background: 'none', border: 'none', color: '#4F46E5', cursor: 'pointer', fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, padding: 0, marginBottom: '0.75rem' }}>
              ← Return to Main Dashboard
            </button>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: '0 0 0.75rem', lineHeight: 1.3 }}>{selectedCourse.courseTitle}</h2>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B', display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span>Modules Mastered</span>
              <span>{progressPercent}% ({completedCount}/10)</span>
            </div>
            <ProgressBar percent={progressPercent} />
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 0.75rem' }}>
            {lessons.map((lesson, index) => {
              const isCurrent = activeLesson.id === lesson.id;
              const isDone = completedLessons[lesson.id] || isCourseFinished;
              const isLocked = index > 0 && !completedLessons[lessons[index - 1].id] && !isCourseFinished;

              return (
                <div
                  key={lesson.id}
                  onClick={() => {
                    if (!isLocked) {
                      setActiveLesson(lesson);
                      setActiveVideoIndex(0);
                      setActiveWorkspaceTab(lesson.type === 'video' ? 'video' : 'notes');
                    }
                  }}
                  style={{
                    padding: '11px 13px', borderRadius: 14, marginBottom: '7px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    cursor: isLocked ? 'not-allowed' : 'pointer',
                    background: isCurrent ? 'linear-gradient(135deg, #EEF2FF 0%, #F5F3FF 100%)' : '#fff',
                    border: isCurrent ? '1px solid #C7D2FE' : '1px solid #E2E8F0',
                    opacity: isLocked ? 0.45 : 1,
                    boxShadow: isCurrent ? '0 8px 20px rgba(79,70,229,0.08)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 14 }}>
                      {isLocked ? '🔒' : lesson.type === 'video' ? '📺' : '📝'}
                    </span>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: isCurrent ? 700 : 500, color: isCurrent ? '#4F46E5' : '#334155', lineHeight: 1.3 }}>{lesson.title}</div>
                      <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{lesson.duration}</div>
                    </div>
                  </div>
                  {isDone && <span style={{ color: '#10B981', fontWeight: 800, fontSize: 14 }}>✓</span>}
                </div>
              );
            })}

            {(completedCount === lessons.length || isCourseFinished) && (
              <button onClick={startExam} style={{ width: '100%', padding: '14px', borderRadius: 12, marginTop: '16px', cursor: 'pointer', border: '1px dashed #10B981', background: '#F0FDF4', color: '#15803D', fontWeight: 800, fontSize: 13 }}>
                🎓 Launch Final Exam (10 Qs)
              </button>
            )}
          </div>
        </div>

        {/* ── MAIN CONTENT AREA ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fff', overflowY: 'auto' }}>

          {/* Tab bar */}
          <div style={{ borderBottom: '1px solid #E2E8F0', padding: '0.85rem 2rem', display: 'flex', gap: '0.75rem', background: '#fff', flexShrink: 0 }}>
            <button
              onClick={() => setActiveWorkspaceTab('video')}
              disabled={activeLesson.type !== 'video'}
              style={{ padding: '8px 16px', borderRadius: '10px', border: 'none', background: activeWorkspaceTab === 'video' ? '#0F172A' : '#F8FAFC', color: activeWorkspaceTab === 'video' ? '#fff' : '#64748B', fontWeight: 700, fontSize: 13, cursor: activeLesson.type === 'video' ? 'pointer' : 'not-allowed', opacity: activeLesson.type === 'video' ? 1 : 0.4 }}
            >
              📺 Video Lab
            </button>
            <button
              onClick={() => setActiveWorkspaceTab('notes')}
              disabled={activeLesson.type !== 'note'}
              style={{ padding: '8px 16px', borderRadius: '10px', border: 'none', background: activeWorkspaceTab === 'notes' ? '#0F172A' : '#F8FAFC', color: activeWorkspaceTab === 'notes' ? '#fff' : '#64748B', fontWeight: 700, fontSize: 13, cursor: activeLesson.type === 'note' ? 'pointer' : 'not-allowed', opacity: activeLesson.type === 'note' ? 1 : 0.4 }}
            >
              📝 Lecture Notes
            </button>
          </div>

          <div style={{ padding: '2rem 2.5rem', maxWidth: '900px', width: '100%' }}>
            <h1 style={{ fontFamily: "'Poppins', system-ui, sans-serif", fontSize: 23, fontWeight: 800, color: '#0F172A', marginBottom: '1.5rem' }}>{activeLesson.title}</h1>

            {/* ── VIDEO TAB ── */}
            {activeWorkspaceTab === 'video' && activeLesson.type === 'video' && (
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>

                {/* Main video player */}
                <div style={{ flex: 1 }}>
                  <div style={{ borderRadius: 18, overflow: 'hidden', background: '#000', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.12)' }}>
                    {videoErrorMap[`${activeLesson.id}-${activeVideoIndex}`] ? (
                      <div style={{ height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', flexDirection: 'column', gap: 8 }}>
                        <span style={{ fontSize: 32 }}>🎬</span>
                        <span style={{ fontSize: 13 }}>Video temporarily unavailable.</span>
                        <button
                          onClick={() => setVideoErrorMap(prev => ({ ...prev, [`${activeLesson.id}-${activeVideoIndex}`]: false }))}
                          style={{ marginTop: 4, background: '#1E293B', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontSize: 12, fontWeight: 700 }}
                        >
                          Try Again
                        </button>
                      </div>
                    ) : (
                      <iframe
                        key={`${activeLesson.id}-${activeVideoIndex}`}
                        width="100%"
                        height="480"
                        src={getAutoplayEmbedUrl(currentVideo?.url)}
                        title={currentVideo?.label}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        style={{ width: '100%', display: 'block', minHeight: 280, border: 'none' }}
                        onError={() => setVideoErrorMap(prev => ({ ...prev, [`${activeLesson.id}-${activeVideoIndex}`]: true }))}
                      />
                    )}
                  </div>

                  {/* Fallback link in case this specific video has embedding disabled */}
                  <div style={{ textAlign: 'right', marginTop: 6 }}>
                    <a href={getWatchUrl(currentVideo?.url)} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: '#4F46E5', fontWeight: 700, textDecoration: 'none' }}>
                      Not playing? Watch on YouTube ↗
                    </a>
                  </div>

                  {/* Current video label + navigation arrows */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem', padding: '0.75rem 1rem', background: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0' }}>
                    <button
                      onClick={() => { setActiveVideoIndex(i => Math.max(0, i - 1)); setVideoErrorMap(p => ({ ...p, [`${activeLesson.id}-${activeVideoIndex}`]: false })); }}
                      disabled={activeVideoIndex === 0}
                      style={{ background: activeVideoIndex === 0 ? '#E2E8F0' : '#4F46E5', color: activeVideoIndex === 0 ? '#94A3B8' : '#fff', border: 'none', borderRadius: 8, padding: '7px 14px', fontWeight: 700, fontSize: 13, cursor: activeVideoIndex === 0 ? 'not-allowed' : 'pointer' }}
                    >
                      ← Prev
                    </button>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#1E293B' }}>{currentVideo?.label}</div>
                      <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>Video {activeVideoIndex + 1} of {currentVideos.length}</div>
                    </div>
                    <button
                      onClick={() => { setActiveVideoIndex(i => Math.min(currentVideos.length - 1, i + 1)); setVideoErrorMap(p => ({ ...p, [`${activeLesson.id}-${activeVideoIndex}`]: false })); }}
                      disabled={activeVideoIndex === currentVideos.length - 1}
                      style={{ background: activeVideoIndex === currentVideos.length - 1 ? '#E2E8F0' : '#4F46E5', color: activeVideoIndex === currentVideos.length - 1 ? '#94A3B8' : '#fff', border: 'none', borderRadius: 8, padding: '7px 14px', fontWeight: 700, fontSize: 13, cursor: activeVideoIndex === currentVideos.length - 1 ? 'not-allowed' : 'pointer' }}
                    >
                      Next →
                    </button>
                  </div>
                </div>

                {/* ── Playlist sidebar ── */}
                <div style={{ width: '220px', flexShrink: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
                    📋 Lesson Playlist
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {currentVideos.map((vid, idx) => {
                      const isActive = idx === activeVideoIndex;
                      const hasError = videoErrorMap[`${activeLesson.id}-${idx}`];
                      return (
                        <div
                          key={idx}
                          onClick={() => { setActiveVideoIndex(idx); setVideoErrorMap(p => ({ ...p, [`${activeLesson.id}-${idx}`]: false })); }}
                          style={{
                            padding: '10px 12px', borderRadius: 12, cursor: 'pointer',
                            background: isActive ? 'linear-gradient(135deg, #EEF2FF, #F5F3FF)' : '#F8FAFC',
                            border: isActive ? '1.5px solid #C7D2FE' : '1px solid #E2E8F0',
                            transition: 'all 0.15s'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{
                              width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                              background: isActive ? '#4F46E5' : '#E2E8F0',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: 11, fontWeight: 800, color: isActive ? '#fff' : '#64748B'
                            }}>
                              {isActive ? '▶' : idx + 1}
                            </div>
                            <div>
                              <div style={{ fontSize: 12, fontWeight: isActive ? 700 : 500, color: isActive ? '#4F46E5' : '#334155', lineHeight: 1.3 }}>
                                {vid.label}
                              </div>
                              {hasError && <div style={{ fontSize: 10, color: '#EF4444', marginTop: 2 }}>⚠ Load error</div>}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Progress within this lesson */}
                  <div style={{ marginTop: '1rem', padding: '10px 12px', background: '#F0FDF4', borderRadius: 12, border: '1px solid #BBF7D0' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#15803D', marginBottom: 6 }}>Videos watched</div>
                    <div style={{ display: 'flex', gap: 4 }}>
                      {currentVideos.map((_, idx) => (
                        <div key={idx} style={{ flex: 1, height: 5, borderRadius: 99, background: idx <= activeVideoIndex ? '#10B981' : '#D1FAE5' }} />
                      ))}
                    </div>
                    <div style={{ fontSize: 11, color: '#15803D', marginTop: 5, fontWeight: 600 }}>
                      {activeVideoIndex + 1} / {currentVideos.length} completed
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── NOTES TAB ── */}
            {activeWorkspaceTab === 'notes' && activeLesson.type === 'note' && (() => {
              const nd = activeLesson.noteData;
              const HEADING_FONT = "'Poppins', system-ui, sans-serif";
              const BODY_FONT = "'Inter', system-ui, sans-serif";

              const NoteCard = ({ icon, title, accent, tint, children }) => (
                <div style={{
                  marginBottom: '1.1rem',
                  background: tint,
                  borderLeft: `5px solid ${accent}`,
                  borderRadius: 14,
                  padding: '1.25rem 1.4rem',
                  boxShadow: '0 2px 8px rgba(15,23,42,0.04)'
                }}>
                  <h4 style={{
                    fontFamily: HEADING_FONT, fontSize: 14, fontWeight: 700, color: accent,
                    textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 0.75rem',
                    display: 'flex', alignItems: 'center', gap: 8
                  }}>
                    <span style={{ fontSize: 18 }}>{icon}</span>{title}
                  </h4>
                  {children}
                </div>
              );

              return (
                <div style={{ background: '#fff', padding: '2rem 2.25rem', borderRadius: 20, border: '1px solid #E2E8F0', boxShadow: '0 4px 16px rgba(15,23,42,0.03)' }}>
                  <h2 style={{ fontFamily: HEADING_FONT, fontSize: 22, fontWeight: 800, color: '#0F172A', margin: '0 0 1.5rem', lineHeight: 1.3 }}>
                    {nd.heading}
                  </h2>

                  <NoteCard icon="📘" title="Topic Overview" accent="#4F46E5" tint="#EEF2FF">
                    <p style={{ fontFamily: BODY_FONT, fontSize: 15, fontWeight: 500, color: '#334155', lineHeight: 1.75, margin: 0 }}>{nd.topicOverview}</p>
                  </NoteCard>

                  <NoteCard icon="🎯" title="Learning Objectives" accent="#7C3AED" tint="#F5F3FF">
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {nd.objectives.map((obj, idx) => (
                        <li key={idx} style={{ fontFamily: BODY_FONT, fontSize: 15, fontWeight: 600, color: '#1E293B', lineHeight: 1.6, display: 'flex', gap: 10 }}>
                          <span style={{ color: '#10B981', fontWeight: 800 }}>✔</span>{obj}
                        </li>
                      ))}
                    </ul>
                  </NoteCard>

                  <NoteCard icon="📖" title="Explanation" accent="#2563EB" tint="#EFF6FF">
                    <p style={{ fontFamily: BODY_FONT, fontSize: 15, fontWeight: 500, color: '#334155', lineHeight: 1.75, margin: 0 }}>{nd.explanation}</p>
                  </NoteCard>

                  <NoteCard icon="💡" title="Example" accent="#D97706" tint="#FFFBEB">
                    <p style={{ fontFamily: BODY_FONT, fontSize: 15, fontWeight: 600, color: '#78350F', lineHeight: 1.7, margin: 0 }}>{nd.example}</p>
                  </NoteCard>

                  <NoteCard icon="📝" title="Key Points" accent="#0891B2" tint="#ECFEFF">
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {nd.keyPoints.map((point, idx) => (
                        <li key={idx} style={{ fontFamily: BODY_FONT, fontSize: 15, fontWeight: 600, color: '#1E293B', lineHeight: 1.6, display: 'flex', gap: 8 }}>
                          <span style={{ color: '#0891B2' }}>•</span>{point}
                        </li>
                      ))}
                    </ul>
                  </NoteCard>

                  <NoteCard icon="⚠" title="Common Mistakes" accent="#DC2626" tint="#FEF2F2">
                    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {nd.commonMistakes.map((mistake, idx) => (
                        <li key={idx} style={{ fontFamily: BODY_FONT, fontSize: 15, fontWeight: 600, color: '#991B1B', lineHeight: 1.6, display: 'flex', gap: 8 }}>
                          <span>•</span>{mistake}
                        </li>
                      ))}
                    </ul>
                  </NoteCard>
                </div>
              );
            })()}

            <button
              onClick={() => handleMarkAsComplete(currentLessonIdx)}
              style={{ marginTop: '2rem', background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: 12, cursor: 'pointer', fontWeight: 800, boxShadow: '0 10px 20px rgba(79,70,229,0.2)', fontSize: 14 }}
            >
              Complete Module & Next →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════
  // EXAM VIEW
  // ══════════════════════════════════════════════════════
  if (currentViewMode === 'exam' && selectedCourse) {
    return (
      <div style={{ background: 'linear-gradient(180deg, #F4F6FA 0%, #EEF2FF 100%)', minHeight: '100vh', padding: '4rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ maxWidth: '780px', width: '100%', background: '#fff', borderRadius: '32px', padding: '3.5rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.08)', border: '1px solid #EAEFF5' }}>
          {!scoreReport ? (
            <div style={{ textAlign: 'left' }}>
              <h1 style={{ fontSize: 26, fontWeight: 850, color: '#0F172A', margin: '0 0 6px' }}>{selectedCourse.courseTitle} Final Examination</h1>
              <p style={{ color: '#64748B', fontSize: 14, marginBottom: '2.5rem' }}>Complete all 10 questions below. You need 70% or higher to earn your certificate. Selecting an answer will instantly show if it's correct (green) or incorrect (red).</p>
              {activeQuizQuestions.map((q, qIdx) => {
                const selectedIdx = selectedAnswers[q.id];
                const hasAnswered = selectedIdx !== undefined;
                return (
                  <div key={q.id} style={{ marginBottom: '2rem', background: '#F8FAFC', padding: '1.5rem', borderRadius: 16, border: '1px solid #E2E8F0' }}>
                    <h4 style={{ margin: '0 0 1rem', fontSize: 15, fontWeight: 700, color: '#1E293B' }}>Question {qIdx + 1}: {q.questionText}</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {q.options.map((opt, oIdx) => {
                        const isSelected = selectedIdx === oIdx;
                        const isCorrectOption = oIdx === q.correctIndex;

                        // Instant feedback colors: once an answer is picked for this question,
                        // the chosen option turns green if correct, red if wrong.
                        let borderColor = '#E2E8F0';
                        let bgColor = '#fff';
                        let textColor = '#334155';

                        if (isSelected) {
                          if (isCorrectOption) {
                            borderColor = '#10B981';
                            bgColor = '#ECFDF5';
                            textColor = '#065F46';
                          } else {
                            borderColor = '#EF4444';
                            bgColor = '#FEF2F2';
                            textColor = '#991B1B';
                          }
                        } else if (hasAnswered && isCorrectOption) {
                          // Reveal the correct answer subtly once the user has answered wrong
                          borderColor = '#10B981';
                          bgColor = '#F0FDF4';
                        }

                        return (
                          <label
                            key={oIdx}
                            style={{
                              padding: '12px 14px', borderRadius: 10,
                              border: isSelected ? `2px solid ${borderColor}` : `1px solid ${borderColor}`,
                              background: bgColor, cursor: 'pointer',
                              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                              transition: 'all 0.15s'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <input
                                type="radio"
                                name={`embed-q-${q.id}`}
                                checked={isSelected}
                                onChange={() => handleSelectOption(q.id, oIdx)}
                                style={{ accentColor: isSelected ? borderColor : '#4F46E5' }}
                              />
                              <span style={{ fontSize: 13, color: textColor, fontWeight: isSelected ? 700 : 400 }}>{opt}</span>
                            </div>
                            {isSelected && (
                              <span style={{ fontSize: 12, fontWeight: 800, color: isCorrectOption ? '#10B981' : '#EF4444' }}>
                                {isCorrectOption ? '✓ Correct' : '✕ Incorrect'}
                              </span>
                            )}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              <button onClick={handleSubmitEmbeddedQuiz} disabled={submittingQuiz} style={{ width: '100%', background: 'linear-gradient(135deg, #10B981, #059669)', color: '#fff', padding: '14px', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: 15, cursor: 'pointer' }}>
                {submittingQuiz ? "Grading your answers..." : "Submit Examination Sheet ✓"}
              </button>
            </div>
          ) : scoreReport.status === "PASSED" ? (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '96px', height: '96px', background: '#E6F4EA', borderRadius: '50%', color: '#137333', fontSize: '44px', marginBottom: '1.5rem' }}>🏆</div>
              <span style={{ textTransform: 'uppercase', letterSpacing: '1.5px', background: '#E0E7FF', color: '#4F46E5', fontSize: '11px', fontWeight: 800, padding: '5px 12px', borderRadius: '20px', display: 'inline-block', marginBottom: '8px' }}>Course Graduated</span>
              <h2 style={{ fontSize: 32, fontWeight: 900, color: '#0F172A', margin: '0 0 8px', letterSpacing: '-0.5px' }}>Graduation Passed!</h2>
              <p style={{ color: '#64748B', fontSize: 14, marginBottom: '2rem' }}>You scored {scoreReport.score}% ({scoreReport.correctAnswers}/{scoreReport.totalQuestions} correct).</p>
              <button onClick={() => { triggerCertificateAward(selectedCourse.courseTitle); setCurrentViewMode('dashboard'); }} style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: 12, fontWeight: 800, cursor: 'pointer' }}>
                🎓 View Certificate
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '1rem 0' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '96px', height: '96px', background: '#FEE2E2', borderRadius: '50%', color: '#991B1B', fontSize: '44px', marginBottom: '1.5rem' }}>📘</div>
              <span style={{ textTransform: 'uppercase', letterSpacing: '1.5px', background: '#FEE2E2', color: '#991B1B', fontSize: '11px', fontWeight: 800, padding: '5px 12px', borderRadius: '20px', display: 'inline-block', marginBottom: '8px' }}>Not Yet Passed</span>
              <h2 style={{ fontSize: 32, fontWeight: 900, color: '#0F172A', margin: '0 0 8px', letterSpacing: '-0.5px' }}>You scored {scoreReport.score}%</h2>
              <p style={{ color: '#64748B', fontSize: 14, marginBottom: '2rem' }}>You got {scoreReport.correctAnswers}/{scoreReport.totalQuestions} correct. You need at least 70% to earn the certificate. Review the lessons and try again.</p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button onClick={startExam} style={{ background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: 12, fontWeight: 800, cursor: 'pointer' }}>
                  🔁 Retake Exam
                </button>
                <button onClick={() => setCurrentViewMode('workspace')} style={{ background: '#fff', color: '#4F46E5', border: '1px solid #C7D2FE', padding: '12px 28px', borderRadius: 12, fontWeight: 800, cursor: 'pointer' }}>
                  Review Lessons
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════
  // DASHBOARD VIEW
  // ══════════════════════════════════════════════════════
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '3rem 1.5rem', fontFamily: 'system-ui, sans-serif', background: 'linear-gradient(180deg, #FAFAFE 0%, #F8FAFC 100%)', minHeight: '100vh' }}>
      <div style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #2563EB 100%)', padding: '2.5rem 3rem', borderRadius: '28px', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', boxShadow: '0 18px 35px rgba(79,70,229,0.18)' }}>
        <div>
          <h1 style={{ fontWeight: 900, fontSize: 32, margin: 0 }}>My Learning Central</h1>
          <p style={{ color: '#E0E7FF', fontSize: 15, marginTop: '4px' }}>Track active course milestones, study parameters, and roadmap guidance.</p>
        </div>
      </div>

      {enrollments.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 2rem', background: '#fff', border: '1px dashed #E2E8F0', borderRadius: 20 }}>
          <span style={{ fontSize: 44 }}>🎯</span>
          <h3 style={{ color: '#64748B', marginTop: '1rem', fontWeight: 700 }}>No Active Enrollments Present</h3>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
          {enrollments.map((e) => {
            const isCourseFinished = courseCompletionStatus[e.courseId] === true;
            const courseLessonsForProgress = generateTenSyllabusLessons(e.courseTitle, e.courseId);
            const doneLessonsForCourse = courseLessonsForProgress.filter(l => completedLessons[l.id]).length;
            const cardProgressPct = isCourseFinished
              ? 100
              : Math.round((doneLessonsForCourse / courseLessonsForProgress.length) * 100) || 0;

            // Resolve the real course image (exact map → category fallback → default),
            // preferring any image already attached to the enrollment record itself.
            const resolvedCourseImage = e.courseImage || getCourseImage(e.courseTitle);

            return (
              <div key={e.id} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 24, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 25px rgba(15,23,42,0.05)' }}>
                <div style={{ height: 140, overflow: 'hidden', background: isCourseFinished ? 'linear-gradient(135deg, #D1FAE5, #ECFDF5)' : 'linear-gradient(135deg, #EEF2FF, #E0E7FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 52 }}>
                  <img
                    src={resolvedCourseImage}
                    alt={e.courseTitle}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={(ev) => {
                      // If even the resolved image fails to load, drop to the generic
                      // category default instead of showing an emoji placeholder.
                      const safeFallback = getFallbackImage(detectCategory(e.courseTitle));
                      if (ev.target.src !== safeFallback) {
                        ev.target.src = safeFallback;
                      }
                    }}
                  />
                </div>

                <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontWeight: 800, fontSize: 18, color: '#0F172A', margin: 0 }}>{e.courseTitle}</h3>
                    <p style={{ fontSize: 12, color: '#94A3B8', marginTop: '4px', marginBottom: '1rem' }}>Enrolled Track Profile Matrix</p>
                    <ProgressBar percent={cardProgressPct} />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: 12 }}>
                    <button onClick={(event) => openRoadmapGuideOverlay(event, e.courseTitle)} style={{ width: '100%', background: '#FFFBEB', color: '#B45309', border: '1px solid #FDE68A', padding: '11px', borderRadius: 10, cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>
                      🎯 View Career Goal Roadmap
                    </button>

                    {isCourseFinished ? (
                      <>
                        <button onClick={() => triggerCertificateAward(e.courseTitle)} style={{ width: '100%', background: '#10B981', color: '#fff', border: 'none', padding: '13px', borderRadius: 12, fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
                          🎓 View & Download PDF Certificate
                        </button>
                        <button
                          onClick={(event) => openFeedbackModal(event, e.courseTitle)}
                          disabled={feedbackSubmittedFor[e.courseTitle]}
                          style={{
                            width: '100%',
                            background: feedbackSubmittedFor[e.courseTitle] ? '#F1F5F9' : '#EEF2FF',
                            color: feedbackSubmittedFor[e.courseTitle] ? '#94A3B8' : '#4F46E5',
                            border: feedbackSubmittedFor[e.courseTitle] ? '1px solid #E2E8F0' : '1px solid #C7D2FE',
                            padding: '12px',
                            borderRadius: 12,
                            fontWeight: 700,
                            fontSize: 13,
                            cursor: feedbackSubmittedFor[e.courseTitle] ? 'not-allowed' : 'pointer'
                          }}
                        >
                          {feedbackSubmittedFor[e.courseTitle] ? '✓ Feedback Submitted' : '💬 Give Feedback'}
                        </button>
                      </>
                    ) : (
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => handleOpenWorkspace(e)} style={{ flex: 2, background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', color: '#fff', border: 'none', padding: '12px', borderRadius: 12, cursor: 'pointer', fontWeight: 700, fontSize: 13 }}>
                          Start Learning →
                        </button>
                        <button onClick={(event) => handleDropCourse(event, e.id)} style={{ flex: 1, background: '#fff', color: '#EF4444', border: '1px solid #FCA5A5', padding: '12px', borderRadius: 12, cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                          Drop
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Roadmap Modal ── */}
      {showRoadmapModal && roadmapData && (() => {
        const PHASE_ACCENTS = ['#4F46E5', '#7C3AED', '#DB2777', '#D97706', '#059669'];
        // Split "Phase N: Title — Description" into a bold headline + a description line
        const parseStep = (stepText) => {
          const dashIdx = stepText.indexOf('—');
          const headline = dashIdx > -1 ? stepText.slice(0, dashIdx).trim() : stepText;
          const description = dashIdx > -1 ? stepText.slice(dashIdx + 1).trim() : '';
          return { headline, description };
        };

        return (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '2rem' }}>
            <div style={{ background: '#fff', borderRadius: 28, width: '640px', maxWidth: '100%', maxHeight: '88vh', overflow: 'hidden', boxShadow: '0 30px 60px -12px rgba(15,23,42,0.35)', display: 'flex', flexDirection: 'column' }}>

              {/* Gradient header */}
              <div style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 55%, #DB2777 100%)', padding: '2.25rem 2.25rem 2rem', color: '#fff', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
                <div style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
                <div style={{ position: 'absolute', bottom: -60, left: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                <div style={{ position: 'relative', display: 'flex', gap: '16px', alignItems: 'center' }}>
                  <div style={{ width: 60, height: 60, borderRadius: 18, background: 'rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, flexShrink: 0, border: '1px solid rgba(255,255,255,0.3)' }}>
                    {roadmapData.icon}
                  </div>
                  <div>
                    <span style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.85)' }}>Career Goal Roadmap</span>
                    <h3 style={{ fontSize: 22, fontWeight: 800, margin: '2px 0 6px', lineHeight: 1.25 }}>{roadmapData.title}</h3>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.16)', padding: '5px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>
                      💼 {roadmapData.targetProfile}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline body */}
              <div style={{ padding: '2rem 2.25rem', overflowY: 'auto' }}>
                <div style={{ position: 'relative', paddingLeft: 8 }}>
                  {/* connecting vertical line */}
                  <div style={{ position: 'absolute', left: 27, top: 8, bottom: 8, width: 2, background: 'linear-gradient(180deg, #E2E8F0, #EEF2FF)' }} />

                  {roadmapData.steps.map((stepText, idx) => {
                    const accent = PHASE_ACCENTS[idx % PHASE_ACCENTS.length];
                    const { headline, description } = parseStep(stepText);
                    const isLast = idx === roadmapData.steps.length - 1;
                    return (
                      <div key={idx} style={{ display: 'flex', gap: '16px', marginBottom: isLast ? 0 : '1.5rem', position: 'relative' }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                          background: `linear-gradient(135deg, ${accent}, ${accent}CC)`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#fff', fontWeight: 800, fontSize: 14,
                          boxShadow: `0 6px 14px ${accent}55`, zIndex: 1, border: '3px solid #fff'
                        }}>
                          {idx + 1}
                        </div>
                        <div style={{ flex: 1, background: '#F8FAFC', borderRadius: 14, padding: '14px 18px', border: '1px solid #EEF2F7', borderLeft: `3px solid ${accent}` }}>
                          <div style={{ fontSize: 13.5, fontWeight: 800, color: '#0F172A', marginBottom: description ? 4 : 0, lineHeight: 1.4 }}>
                            {headline}
                          </div>
                          {description && (
                            <div style={{ fontSize: 12.5, color: '#64748B', lineHeight: 1.55 }}>
                              {description}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div style={{ padding: '1.25rem 2.25rem', borderTop: '1px solid #F1F5F9', flexShrink: 0 }}>
                <button onClick={() => setShowRoadmapModal(false)} style={{ width: '100%', background: 'linear-gradient(135deg, #0F172A, #1E293B)', color: '#fff', border: 'none', padding: '13px', borderRadius: 12, cursor: 'pointer', fontWeight: 700, fontSize: 14 }}>
                  Close Roadmap Guide
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Feedback Modal ── */}
      {showFeedbackModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
          <div style={{ background: '#fff', borderRadius: 24, width: '480px', padding: '2.5rem' }}>
            <h3 style={{ fontSize: 19, fontWeight: 800, color: '#0F172A', margin: '0 0 6px' }}>Feedback for {feedbackCourseTitle}</h3>
            <p style={{ color: '#64748B', fontSize: 13, margin: '0 0 1.25rem' }}>Your feedback will be sent to the admin dashboard.</p>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#334155', display: 'block', marginBottom: 6 }}>Rating</label>
              <div style={{ display: 'flex', gap: 6 }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <span
                    key={star}
                    onClick={() => setFeedbackRating(star)}
                    style={{ fontSize: 26, cursor: 'pointer', color: star <= feedbackRating ? '#F59E0B' : '#E2E8F0' }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: '#334155', display: 'block', marginBottom: 6 }}>Your Feedback</label>
              <textarea
                value={feedbackMessage}
                onChange={(ev) => setFeedbackMessage(ev.target.value)}
                rows={4}
                placeholder="What did you think of this course?"
                style={{ width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 13, fontFamily: 'system-ui', resize: 'vertical', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={submitFeedback} style={{ flex: 1, background: 'linear-gradient(135deg, #4F46E5, #7C3AED)', color: '#fff', border: 'none', padding: '12px', borderRadius: 12, fontWeight: 800, cursor: 'pointer' }}>
                Submit Feedback
              </button>
              <button onClick={() => setShowFeedbackModal(false)} style={{ flex: 1, background: '#fff', color: '#334155', border: '1px solid #E2E8F0', padding: '12px', borderRadius: 12, fontWeight: 700, cursor: 'pointer' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Certificate Modal ── */}
      {showCertModal && (
        <div id="cert-modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(4px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 99999 }}>
          <div className="no-print" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
            <button onClick={() => window.print()} style={{ background: '#10B981', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontFamily: 'system-ui', fontSize: 13 }}>
              🖨️ Print / Save as PDF
            </button>
            <button onClick={() => setShowCertModal(false)} style={{ background: '#1E293B', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontFamily: 'system-ui', fontSize: 13 }}>
              Close Preview
            </button>
          </div>
          <div id="printable-certificate-frame" style={{ background: '#FFFDF6', border: '16px double #D4AF37', borderRadius: 8, padding: '4.5rem 4rem', width: '720px', textAlign: 'center', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', fontFamily: 'Georgia, serif' }}>
            <div style={{ position: 'absolute', top: 20, left: 20, right: 20, bottom: 20, border: '2px solid #D4AF37', opacity: 0.3, pointerEvents: 'none' }} />
            <span style={{ fontSize: 56, display: 'block', marginBottom: '1rem' }}>📜</span>
            <h2 style={{ letterSpacing: '2px', fontWeight: 400, margin: '0 0 1rem', color: '#1E293B', fontSize: 24 }}>LEARNHUB ACADEMY CERTIFICATE</h2>
            <p style={{ fontStyle: 'italic', color: '#64748B', fontSize: 14, margin: '0 0 2rem' }}>This document records and certifies that on this day</p>
            <h1 style={{ fontSize: 36, fontWeight: 700, color: '#4F46E5', fontFamily: 'system-ui, sans-serif', borderBottom: '2px solid #E2E8F0', display: 'inline-block', paddingBottom: '6px', marginBottom: '1.75rem', textTransform: 'capitalize' }}>
              {localStorage.getItem('username') || "Rio"}
            </h1>
            <p style={{ color: '#475569', fontSize: 15, lineHeight: 1.7, maxWidth: '550px', margin: '0 auto 2.5rem', fontFamily: 'system-ui' }}>
              successfully completed all 10 alternate lesson modules, assignments checkpoints, and 10 core questions of the specialized examination curriculum for:
            </p>
            <h3 style={{ fontSize: 23, fontWeight: 800, color: '#0F172A', fontFamily: 'system-ui', marginBottom: '4.5rem', letterSpacing: '-0.5px' }}>{certCourseTitle}</h3>
          </div>
        </div>
      )}
    </div>
  );
}