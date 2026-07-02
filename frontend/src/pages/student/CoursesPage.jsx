import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPublicCourses, enrollCourse } from "../../services/api";

export default function CoursesPage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentEnrollments, setCurrentEnrollments] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categoriesDefinition = [
    { name: "💻 Programming", label: "Programming", icon: "💻", sub: "Java, Python, C++, JavaScript, DSA" },
    { name: "🌐 Web Development", label: "Web Development", icon: "🌐", sub: "HTML/CSS, JS, React, Node, Spring Boot" },
    { name: "📱 Mobile Development", label: "Mobile Development", icon: "📱", sub: "Android, Flutter, React Native, UI" },
    { name: "🤖 Artificial Intelligence", label: "Artificial Intelligence", icon: "🤖", sub: "Intro, Machine Learning, TensorFlow, NLP" },
    { name: "📊 Data Science", label: "Data Science", icon: "📊", sub: "Python, Pandas, Visualizations, Statistics" },
    { name: "☁️ Cloud Computing", label: "Cloud Computing", icon: "☁️", sub: "AWS, Azure, GCP, Docker, DevOps" },
    { name: "🛡️ Cyber Security", label: "Cyber Security", icon: "🛡️", sub: "Hacking, Network, Web Security, Kali" },
    { name: "🗄️ Database", label: "Database", icon: "🗄️", sub: "MySQL, PostgreSQL, MongoDB, SQL Design" },
    { name: "🎨 UI/UX Design", label: "UI/UX Design", icon: "🎨", sub: "Figma, Adobe XD, Responsive Layouts" },
    { name: "📈 Digital Marketing", label: "Digital Marketing", icon: "📈", sub: "SEO, Social Media, Google Ads, Email" },
    { name: "💼 Business", label: "Business", icon: "💼", sub: "PMP, Startups, Analytics, Agile Scrum" },
    { name: "🗣️ Communication Skills", label: "Communication Skills", icon: "🗣️", sub: "English, Public Speaking, Interviews" },
    { name: "⭐ Bonus (Premium Courses)", label: "Premium Bonus Tracks", icon: "⭐", sub: "Full Stack, DevOps, Automation Testing" },
  ];

  const courseImageByTitle = {
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

  const getFallbackImage = (category) => {
    const fallbacks = {
      "💻 Programming": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=600&q=80",
      "🌐 Web Development": "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=600&q=80",
      "📱 Mobile Development": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80",
      "🤖 Artificial Intelligence": "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=600&q=80",
      "📊 Data Science": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
      "☁️ Cloud Computing": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80",
      "🛡️ Cyber Security": "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=600&q=80",
      "🗄️ Database": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80",
      "🎨 UI/UX Design": "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80",
      "📈 Digital Marketing": "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=600&q=80",
      "💼 Business": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
      "🗣️ Communication Skills": "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80",
      "⭐ Bonus (Premium Courses)": "https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&w=600&q=80",
    };
    return fallbacks[category] || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80";
  };

  const mapDatabaseToCategory = (categoryId, title) => {
    const id = Number(categoryId);
    const lowerTitle = (title || "").toLowerCase();

    if (id === 1 || lowerTitle.includes("java") || lowerTitle.includes("programming") || lowerTitle.includes("c++")) {
      return { category: "💻 Programming", desc: "Master system logic across robust compilers.", weeks: 12 };
    }

    if (id === 2 || lowerTitle.includes("react") || lowerTitle.includes("web") || lowerTitle.includes("javascript") || lowerTitle.includes("node")) {
      return { category: "🌐 Web Development", desc: "Build highly interactive web structures using full-stack tech.", weeks: 8 };
    }

    return { category: "💻 Programming", desc: "Comprehensive engineering curriculum.", weeks: 8 };
  };

  const getStaticVarietyCatalog = () => [
    { id: 6, title: "Java Programming Masterclass", instructor: "Dr. Mike", weeks: 12, category: "💻 Programming", desc: "Master core compilation paths, data models, exception structures, and multithreading abstractions." },
    { id: 7, title: "Python Programming Essentials", instructor: "Prof. Sarah", weeks: 8, category: "💻 Programming", desc: "Understand loops, dictionary operations, file handling, and dynamic memory processing constructs." },
    { id: 8, title: "C++ Programming Fundamentals", instructor: "Alex Mercer", weeks: 10, category: "💻 Programming", desc: "Deep dive into pointers, raw memory blocks management, assembly bindings, and execution structures." },
    { id: 9, title: "JavaScript Programming Bootcamp", instructor: "Prof. Sarah", weeks: 8, category: "💻 Programming", desc: "Master execution threads, event loops, context tracking blocks, asynchronous callbacks, and closures." },
    { id: 10, title: "Data Structures & Algorithms in Java", instructor: "Dr. Mike", weeks: 12, category: "💻 Programming", desc: "Construct multi-dimensional graph searches, binary indexing node operations, and big-O optimization matrices." },

    { id: 11, title: "HTML5 & CSS3 Fundamentals", instructor: "Prof. Sarah", weeks: 6, category: "🌐 Web Development", desc: "Understand layout styling sheets, responsive grid frameworks, web DOM trees, and typography alignment models." },
    { id: 12, title: "Modern JavaScript (ES6+)", instructor: "Prof. Sarah", weeks: 8, category: "🌐 Web Development", desc: "Advanced array transformations, destructured variable pipelines, async modules, and prototype chains." },
    { id: 1, title: "React.js Complete Guide", instructor: "Prof. Sarah", weeks: 10, category: "🌐 Web Development", desc: "Master single-page architecture setups using virtual DOM comparisons, hook states, and state broadcasting." },
    { id: 4, title: "Node.js & Express Development", instructor: "Dr. Mike", weeks: 9, category: "🌐 Web Development", desc: "Construct asynchronous REST api microservices routers, cluster processes, and interceptor middleware layers." },
    { id: 5, title: "Spring Boot Backend Development", instructor: "Dr. Mike", weeks: 12, category: "🌐 Web Development", desc: "Implement transactional database integrations, secure dependency injector filters, and Hibernate structures." },

    { id: 13, title: "Android App Development with Java", instructor: "Alex Mercer", weeks: 12, category: "📱 Mobile Development", desc: "Build native UI layout patterns, integrate background system modules, and control resource threads." },
    { id: 14, title: "Android App Development with Kotlin", instructor: "Alex Mercer", weeks: 10, category: "📱 Mobile Development", desc: "Leverage standard coroutine processes, state descriptors, and functional layout targets in Kotlin." },
    { id: 15, title: "Flutter App Development", instructor: "Alex Mercer", weeks: 10, category: "📱 Mobile Development", desc: "Compile cross-platform native systems using single Dart code bases and customizable UI grids." },
    { id: 16, title: "React Native Mobile Development", instructor: "Prof. Sarah", weeks: 8, category: "📱 Mobile Development", desc: "Bridge standard web hooks mechanisms directly over to mobile interface runtime ecosystems." },
    { id: 17, title: "Mobile UI Design & Firebase Integration", instructor: "Alex Mercer", weeks: 8, category: "📱 Mobile Development", desc: "Wire real-time database endpoints, cloud messaging models, and modern asset layout styles." },

    { id: 18, title: "Introduction to Artificial Intelligence", instructor: "Dr. Rachel", weeks: 8, category: "🤖 Artificial Intelligence", desc: "Trace heuristic algorithm decisions, predictive graph structures, and multi-agent systems optimization maps." },
    { id: 19, title: "Machine Learning Fundamentals", instructor: "Dr. Rachel", weeks: 12, category: "🤖 Artificial Intelligence", desc: "Implement regression optimization criteria, multi-label classifications, and automated data processing loops." },
    { id: 20, title: "Deep Learning with TensorFlow", instructor: "Dr. Rachel", weeks: 14, category: "🤖 Artificial Intelligence", desc: "Configure dense convolutional tracking dimensions, backpropagation passes, and tensor data frames." },
    { id: 21, title: "Natural Language Processing (NLP)", instructor: "Dr. Rachel", weeks: 10, category: "🤖 Artificial Intelligence", desc: "Design word vector weights models, contextual attention maps, and textual transformer sequence nodes." },
    { id: 22, title: "Computer Vision using OpenCV", instructor: "Dr. Rachel", weeks: 12, category: "🤖 Artificial Intelligence", desc: "Extract frame pixel feature patterns, apply threshold matrices transformations, and map video contours." },

    { id: 2, title: "Python for Data Science", instructor: "Dr. Mike", weeks: 10, category: "📊 Data Science", desc: "Leverage advanced analytical mathematical operators, clean data errors, and orchestrate datasets." },
    { id: 23, title: "NumPy & Pandas Masterclass", instructor: "Dr. Mike", weeks: 8, category: "📊 Data Science", desc: "Perform vector transformations across multi-dimensional arrays, aggregate dataframes, and join datasets." },
    { id: 24, title: "Data Visualization with Matplotlib", instructor: "Dr. Mike", weeks: 6, category: "📊 Data Science", desc: "Render rich operational charts, distribution curves maps, and geometric telemetry graphs." },
    { id: 25, title: "Statistics for Data Science", instructor: "Dr. Mike", weeks: 10, category: "📊 Data Science", desc: "Analyze probability, compute multi-variable test validations, and resolve data anomalies." },
    { id: 26, title: "Data Analysis & Business Intelligence", instructor: "Dr. Mike", weeks: 8, category: "📊 Data Science", desc: "Formulate business data intelligence layers and construct clear execution reports." },

    { id: 27, title: "AWS Cloud Practitioner", instructor: "Architect Evans", weeks: 6, category: "☁️ Cloud Computing", desc: "Isolate VPC network subnets, deploy secure serverless nodes, and setup identity access management masks." },
    { id: 28, title: "Microsoft Azure Fundamentals", instructor: "Architect Evans", weeks: 6, category: "☁️ Cloud Computing", desc: "Manage tenant resource profiles, handle enterprise system replication layers, and manage persistent drives." },
    { id: 29, title: "Google Cloud Platform Essentials", instructor: "Architect Evans", weeks: 8, category: "☁️ Cloud Computing", desc: "Scale global infrastructure compute containers, configure load balancers, and manage cloud clusters." },
    { id: 30, title: "Docker & Kubernetes Basics", instructor: "Architect Evans", weeks: 8, category: "☁️ Cloud Computing", desc: "Orchestrate distributed microservice containers, manage ingress traffic routing paths, and handle cluster loads." },
    { id: 31, title: "Cloud DevOps Fundamentals", instructor: "Architect Evans", weeks: 10, category: "☁️ Cloud Computing", desc: "Automate code verification checkpoints, construct deployment scripts, and manage live operational nodes." },

    { id: 32, title: "Cyber Security Fundamentals", instructor: "Sec Specialist Cole", weeks: 8, category: "🛡️ Cyber Security", desc: "Trace packet traffic states, establish authentication walls, and minimize access vulnerabilities." },
    { id: 33, title: "Ethical Hacking Essentials", instructor: "Sec Specialist Cole", weeks: 12, category: "🛡️ Cyber Security", desc: "Audit server connection metrics, isolate network configuration leaks, and run exploit loops safely." },
    { id: 34, title: "Network Security", instructor: "Sec Specialist Cole", weeks: 10, category: "🛡️ Cyber Security", desc: "Configure routing firewall logic matrices, intercept anomalies, and maintain connection privacy protocols." },
    { id: 35, title: "Web Application Security", instructor: "Sec Specialist Cole", weeks: 10, category: "🛡️ Cyber Security", desc: "Defend endpoints from cross-site injection attacks and manage secure authentication keys blocks." },
    { id: 36, title: "Penetration Testing with Kali Linux", instructor: "Sec Specialist Cole", weeks: 12, category: "🛡️ Cyber Security", desc: "Launch authorized framework diagnostics, map vulnerabilities, and test system defenses under Kali modules." },

    { id: 37, title: "MySQL Database Development", instructor: "Database Admin Cruz", weeks: 8, category: "🗄️ Database", desc: "Design scalable SQL query joins, map relational database schemas, and create structural indexing patterns." },
    { id: 38, title: "PostgreSQL Fundamentals", instructor: "Database Admin Cruz", weeks: 8, category: "🗄️ Database", desc: "Configure transaction levels, optimize query procedures, and handle advanced database extensions." },
    { id: 39, title: "MongoDB for Beginners", instructor: "Database Admin Cruz", weeks: 6, category: "🗄️ Database", desc: "Design flexible JSON document catalogs, group dataset metrics, and shard data collections horizontally." },
    { id: 40, title: "SQL Queries & Database Design", instructor: "Database Admin Cruz", weeks: 8, category: "🗄️ Database", desc: "Normalize big-data structures, prevent data duplicate redundancies, and enforce strict table integrity rules." },
    { id: 41, title: "Database Administration & Optimization", instructor: "Database Admin Cruz", weeks: 10, category: "🗄️ Database", desc: "Profile resource workloads, isolate table lock conflicts, and schedule automated hot backups safely." },

    { id: 42, title: "UI Design Fundamentals", instructor: "Prof. Sarah", weeks: 6, category: "🎨 UI/UX Design", desc: "Structure proportional layout grid columns, apply matching palettes themes, and maintain style guides." },
    { id: 43, title: "UX Research & Design Thinking", instructor: "Prof. Sarah", weeks: 8, category: "🎨 UI/UX Design", desc: "Deploy quantitative empathy research loops, document tracking maps, and evaluate interaction flows." },
    { id: 3, title: "UI/UX Design Principles", instructor: "Prof. Sarah", weeks: 6, category: "🎨 UI/UX Design", desc: "Design thinking, wireframing, and Figma Layout tools." },
    { id: 44, title: "Adobe XD for UI Designers", instructor: "Prof. Sarah", weeks: 6, category: "🎨 UI/UX Design", desc: "Build functional interface motion mockups, capture transition loops states, and execute style wireframes." },
    { id: 45, title: "Responsive Web & Mobile Design", instructor: "Prof. Sarah", weeks: 8, category: "🎨 UI/UX Design", desc: "Design layouts that scale smoothly across mobile portrait dimensions and large desktop displays." },

    { id: 46, title: "Digital Marketing Fundamentals", instructor: "Growth Specialist Ana", weeks: 8, category: "📈 Digital Marketing", desc: "Structure high-conversion audience funnels, monitor user acquisition, and evaluate growth patterns." },
    { id: 47, title: "Search Engine Optimization (SEO)", instructor: "Growth Specialist Ana", weeks: 8, category: "📈 Digital Marketing", desc: "Audit site index crawling properties, insert clean metadata tokens, and rank higher on search engines." },
    { id: 48, title: "Social Media Marketing", instructor: "Growth Specialist Ana", weeks: 6, category: "📈 Digital Marketing", desc: "Organize ad campaign schedules, isolate targeted demographic groups, and build brand recognition." },
    { id: 49, title: "Google Ads & PPC Campaigns", instructor: "Growth Specialist Ana", weeks: 8, category: "📈 Digital Marketing", desc: "Analyze keyword bidding models, optimize budget allocations, and reduce cost-per-click metrics." },
    { id: 50, title: "Email Marketing & Content Strategy", instructor: "Growth Specialist Ana", weeks: 8, category: "📈 Digital Marketing", desc: "Deploy targeted campaign scripts, organize automation newsletters triggers, and trace customer clicks." },

    { id: 51, title: "Project Management Professional Basics", instructor: "Director Thomas", weeks: 10, category: "💼 Business", desc: "Manage project paths milestones, identify task bottlenecks early, and control cost variables." },
    { id: 52, title: "Entrepreneurship & Startup Fundamentals", instructor: "Director Thomas", weeks: 8, category: "💼 Business", desc: "Formulate strategic business models, align market positions, and optimize corporate resource streams." },
    { id: 53, title: "Business Analytics", instructor: "Director Thomas", weeks: 10, category: "💼 Business", desc: "Evaluate operational performance indicators, interpret market charts data, and write business projections." },
    { id: 54, title: "Leadership & Team Management", instructor: "Director Thomas", weeks: 6, category: "💼 Business", desc: "Coordinate agile engineering squads, resolve task disputes, and streamline company operations." },
    { id: 55, title: "Agile & Scrum Methodologies", instructor: "Director Thomas", weeks: 8, category: "💼 Business", desc: "Run quick product development updates, handle sprint planning boards, and maintain clear product requirements." },

    { id: 56, title: "Spoken English Masterclass", instructor: "Coach Clara", weeks: 6, category: "🗣️ Communication Skills", desc: "Refine verbal communication, choose the right professional vocabulary, and speak clearly in any setting." },
    { id: 57, title: "Professional Business Communication", instructor: "Coach Clara", weeks: 8, category: "🗣️ Communication Skills", desc: "Write clear business emails, communicate effectively with teams, and master executive report structures." },
    { id: 58, title: "Public Speaking & Presentation Skills", instructor: "Coach Clara", weeks: 6, category: "🗣️ Communication Skills", desc: "Conquer speech anxiety, engage your audience, and build clear, professional slides." },
    { id: 59, title: "Interview Preparation & HR Skills", instructor: "Coach Clara", weeks: 8, category: "🗣️ Communication Skills", desc: "Master behavioral interview structures, showcase technical architectures clearly, and handle negotiations." },
    { id: 60, title: "Resume Writing & Career Development", instructor: "Coach Clara", weeks: 4, category: "🗣️ Communication Skills", desc: "Highlight your technical projects, write clean impact statements, and optimize your portfolio profiles." },

    { id: 61, title: "☕ Java Full Stack Development", instructor: "Dr. Mike", weeks: 16, category: "⭐ Bonus (Premium Courses)", desc: "Comprehensive enterprise training mapping advanced Java algorithms directly to responsive frontend React layout trees." },
    { id: 62, title: "🌐 MERN Stack Development", instructor: "Prof. Sarah", weeks: 14, category: "⭐ Bonus (Premium Courses)", desc: "Build full-stack applications from scratch using MongoDB document sharding, Express, React, and Node servers." },
    { id: 63, title: "🌐 MEAN Stack Development", instructor: "Prof. Sarah", weeks: 14, category: "⭐ Bonus (Premium Courses)", desc: "Orchestrate large scale responsive software models using Angular templates backed by Express.js API routers." },
    { id: 64, title: "🤖 AI & Machine Learning with Python", instructor: "Dr. Rachel", weeks: 16, category: "⭐ Bonus (Premium Courses)", desc: "Train automated predictive networks pipelines, neural layouts, and continuous machine learning integrations." },
    { id: 65, title: "📊 Data Science & Analytics Bootcamp", instructor: "Dr. Mike", weeks: 12, category: "⭐ Bonus (Premium Courses)", desc: "Process big data streams safely, configure clean data ingestion models, and build analytical data charts." },
    { id: 66, title: "☁️ AWS Cloud Engineer Career Path", instructor: "Architect Evans", weeks: 14, category: "⭐ Bonus (Premium Courses)", desc: "Architect secure enterprise infrastructures inside multi-region AWS cloud subnets automatically." },
    { id: 67, title: "🛡️ Cyber Security Professional", instructor: "Sec Specialist Cole", weeks: 16, category: "⭐ Bonus (Premium Courses)", desc: "Harden application defenses, deploy monitoring systems, and pass comprehensive network vulnerability sweeps." },
    { id: 68, title: "📱 Flutter Full Stack Mobile Development", instructor: "Alex Mercer", weeks: 12, category: "⭐ Bonus (Premium Courses)", desc: "Build cross-platform mobile solutions linked to cloud computing endpoints, real-time servers, and state managers." },
    { id: 69, title: "💼 Software Testing & Automation (Selenium)", instructor: "Director Thomas", weeks: 10, category: "⭐ Bonus (Premium Courses)", desc: "Write reliable UI automation tests scripts, verify response codes, and test system functions using Selenium pipelines." },
    { id: 70, title: "📈 DevOps with Docker & Kubernetes", instructor: "Architect Evans", weeks: 12, category: "⭐ Bonus (Premium Courses)", desc: "Deploy scalable production code clusters, configure container instances, and manage release loops." },
  ];

  useEffect(() => {
    const loadSavedEnrollments = () => {
      try {
        const saved = localStorage.getItem("student_mock_enrollments") || localStorage.getItem("studentmockenrollments");
        const droppedRaw = localStorage.getItem("dropped_enrollment_ids") || localStorage.getItem("droppedenrollmentids");
        const parsedSaved = saved ? JSON.parse(saved) : [];
        const droppedMap = droppedRaw ? JSON.parse(droppedRaw) : [];
        setCurrentEnrollments(parsedSaved.filter((item) => !droppedMap.includes(Number(item.courseId))));
      } catch (err) {
        console.error("Failed to load enrollments", err);
        setCurrentEnrollments([]);
      }
    };

    const loadCourses = async () => {
      try {
        setLoading(true);
        const res = await getPublicCourses();

        if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
          const mapped = res.data.map((course) => {
            const fallback = mapDatabaseToCategory(course.category_id || course.categoryid, course.title);
            return {
              ...course,
              category: course.category || fallback.category,
              instructor: course.instructor || "Lead Professor",
              weeks: course.duration_weeks || course.durationweeks || fallback.weeks || 8,
              desc: course.description || fallback.desc || "",
              students: course.students || 15,
            };
          });

          const staticCatalog = getStaticVarietyCatalog();
          const fullCatalog = [
            ...mapped,
            ...staticCatalog.filter((sc) => !mapped.some((m) => Number(m.id) === Number(sc.id))),
          ];
          setCourses(fullCatalog);
        } else {
          setCourses(getStaticVarietyCatalog());
        }
      } catch (err) {
        console.error("Failed to fetch courses", err);
        setCourses(getStaticVarietyCatalog());
      } finally {
        setLoading(false);
      }
    };

    loadSavedEnrollments();
    loadCourses();
  }, []);

  const processEnrollment = async (course) => {
    try {
      try {
        await enrollCourse(course.id);
      } catch (err) {
        console.error("Enrollment error:", err);
      }

      const currentDropped = JSON.parse(localStorage.getItem("dropped_enrollment_ids") || "[]");
      const filteredDropped = currentDropped.filter((id) => Number(id) !== Number(course.id));
      localStorage.setItem("dropped_enrollment_ids", JSON.stringify(filteredDropped));

      const newEnrollmentItem = {
        id: course.id,
        courseId: Number(course.id),
        courseTitle: course.title,
        enrolledAt: new Date().toLocaleDateString(),
      };

      const rawSaved = localStorage.getItem("student_mock_enrollments");
      let baseList = rawSaved ? JSON.parse(rawSaved) : [];
      baseList = baseList.filter((item) => Number(item.courseId) !== Number(course.id));

      const updatedList = [...baseList, newEnrollmentItem];
      localStorage.setItem("student_mock_enrollments", JSON.stringify(updatedList));
      setCurrentEnrollments(updatedList);

      navigate("/student/progress");
    } catch (err) {
      console.error("Failed to save enrollment locally", err);
    }
  };

  const handleEnrollClick = async (course) => {
    await processEnrollment(course);
  };

  if (loading) {
    return (
      <p style={{ padding: "2rem", color: "#9CA3AF", fontFamily: "system-ui" }}>
        Loading platform catalogs...
      </p>
    );
  }

  const filteredCourses = selectedCategory
    ? courses.filter((c) => c.category === selectedCategory)
    : [];

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 1.5rem", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ marginBottom: "2.5rem" }}>
        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory(null)}
            style={{
              background: "none",
              border: "none",
              color: "#4F46E5",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 14,
              marginBottom: "0.5rem",
              padding: 0,
            }}
          >
            ← Back to All Categories
          </button>
        )}

        <h1 style={{ fontWeight: 800, fontSize: 32, color: "#111827", margin: "0 0 6px" }}>
          {selectedCategory ? `${selectedCategory} Streams` : "Explore Categories"}
        </h1>

        <p style={{ color: "#6B7280", fontSize: 15, margin: 0 }}>
          {selectedCategory
            ? `Select from our specialized variety of courses in ${selectedCategory}.`
            : "Pick a core track field to view available course variants."}
        </p>
      </div>

      {!selectedCategory ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {categoriesDefinition.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedCategory(cat.name)}
              style={{
                background: "#fff",
                border: "1px solid #E5E7EB",
                borderRadius: 16,
                padding: "1.75rem",
                cursor: "pointer",
                transition: "all 0.2s",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = "#4F46E5";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "#E5E7EB";
              }}
            >
              <div style={{ fontSize: 36, marginBottom: "1rem" }}>{cat.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: "0 0 6px" }}>
                {cat.label}
              </h3>
              <p style={{ fontSize: 13, color: "#6B7280", margin: 0, lineHeight: 1.4 }}>
                {cat.sub}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "2rem",
          }}
        >
          {filteredCourses.map((course) => {
            const isEnrolledCurrently = currentEnrollments.some(
              (item) => Number(item.courseId) === Number(course.id)
            );
            const imageSrc = courseImageByTitle[course.title] || getFallbackImage(course.category);

            return (
              <div
                key={course.id}
                style={{
                  background: "#fff",
                  border: "1px solid #E5E7EB",
                  borderRadius: 16,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)",
                }}
              >
                <div style={{ height: 180, overflow: "hidden", background: "#EEF2FF" }}>
                  <img
                    src={imageSrc}
                    alt={course.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const parent = e.currentTarget.parentNode;
                      if (parent) {
                        parent.style.background = "linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)";
                        parent.innerHTML = `<div style="height:100%;display:flex;align-items:center;justify-content:center;font-size:48px;color:white">${(course.category || "Course").split(" ")[0]}</div>`;
                      }
                    }}
                  />
                </div>

                <div style={{ padding: "1.5rem 1.5rem 0" }}>
                  <span
                    style={{
                      fontSize: 11,
                      background: "#EEF2FF",
                      color: "#4F46E5",
                      fontWeight: 700,
                      padding: "4px 10px",
                      borderRadius: 20,
                      display: "inline-block",
                      marginBottom: 10,
                    }}
                  >
                    {course.category}
                  </span>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>
                    {course.title}
                  </h3>
                  <p style={{ fontSize: 13, color: "#9CA3AF", margin: "0 0 12px" }}>
                    {course.instructor} · {course.weeks}w
                  </p>
                  <p style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.5, margin: "0 0 1.5rem", minHeight: 63 }}>
                    {course.desc}
                  </p>
                </div>

                <div style={{ padding: "0 1.5rem 1.5rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 12,
                      color: "#6B7280",
                      borderTop: "1px solid #F3F4F6",
                      paddingTop: 12,
                      marginBottom: 14,
                    }}
                  >
                    <span>{course.students || 15} students</span>
                    <span>{course.weeks || 8} weeks</span>
                  </div>

                  {isEnrolledCurrently ? (
                    <button
                      onClick={() => navigate("/student/progress")}
                      style={{
                        width: "100%",
                        background: "#E6F4EA",
                        color: "#137333",
                        border: "none",
                        padding: 12,
                        borderRadius: 10,
                        fontWeight: 700,
                        fontSize: 14,
                        cursor: "pointer",
                      }}
                    >
                      Enrolled · Continue
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEnrollClick(course)}
                      style={{
                        width: "100%",
                        background: "#4F46E5",
                        color: "#fff",
                        border: "none",
                        padding: 12,
                        borderRadius: 10,
                        fontWeight: 700,
                        fontSize: 14,
                        cursor: "pointer",
                      }}
                    >
                      Enroll Now
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}