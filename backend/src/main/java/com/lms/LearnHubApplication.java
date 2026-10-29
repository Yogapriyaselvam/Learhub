package com.lms;

import com.lms.model.*;
import com.lms.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class LearnHubApplication {
    public static void main(String[] args) {
        SpringApplication.run(LearnHubApplication.class, args);
    }

    @Bean
    public CommandLineRunner initData(UserRepository userRepo, CourseRepository courseRepo, QuizRepository quizRepo, CategoryRepository categoryRepo, PasswordEncoder encoder) {
        return args -> {
            System.out.println("=== Initializing / Checking DB Users ===");
            userRepo.findAll().forEach(u -> {
                System.out.println("User: " + u.getName() + " | Email: " + u.getEmail() + " | Role: " + u.getRole());
            });

            // Ensure admin exists
            if (userRepo.findByEmail("admin@learnhub.com").isEmpty()) {
                User admin = new User();
                admin.setName("Admin User");
                admin.setEmail("admin@learnhub.com");
                admin.setPassword(encoder.encode("admin123"));
                admin.setRole(User.Role.ADMIN);
                userRepo.save(admin);
                System.out.println("Created admin user: admin@learnhub.com / admin123");
            }

            // Let's create categories
            String[] catNames = {
                "💻 Programming", "🌐 Web Development", "📱 Mobile Development",
                "🤖 Artificial Intelligence", "📊 Data Science", "☁️ Cloud Computing",
                "🛡️ Cyber Security", "🗄️ Database", "🎨 UI/UX Design",
                "📈 Digital Marketing", "💼 Business", "🗣️ Communication Skills",
                "⭐ Bonus (Premium Courses)"
            };
            java.util.Map<String, Category> catMap = new java.util.HashMap<>();
            for (String cn : catNames) {
                Category cat = categoryRepo.findAll().stream()
                        .filter(c -> c.getName().equals(cn))
                        .findFirst()
                        .orElse(null);
                if (cat == null) {
                    cat = new Category();
                    cat.setName(cn);
                    cat = categoryRepo.save(cat);
                }
                catMap.put(cn, cat);
            }

            // Let's create instructors
            String[] instNames = {
                "Dr. Mike", "Prof. Sarah", "Alex Mercer", "Dr. Rachel",
                "Architect Evans", "Sec Specialist Cole", "Database Admin Cruz",
                "Growth Specialist Ana", "Director Thomas", "Coach Clara"
            };
            java.util.Map<String, User> instMap = new java.util.HashMap<>();
            for (String in : instNames) {
                User inst = userRepo.findByEmail(in.toLowerCase().replace(" ", "").replace(".", "") + "@instructor.com")
                    .stream().findFirst().orElse(null);
                if (inst == null) {
                    inst = new User();
                    inst.setName(in);
                    inst.setEmail(in.toLowerCase().replace(" ", "").replace(".", "") + "@instructor.com");
                    inst.setPassword(encoder.encode("instructor123"));
                    inst.setRole(User.Role.INSTRUCTOR);
                    inst = userRepo.save(inst);
                }
                instMap.put(in, inst);
            }

            // Course structure: Title, Description, Weeks, Category, Instructor
            String[][] coursesToSeed = {
                {"React Fundamentals", "Learn the core concepts of React.", "8", "🌐 Web Development", "Prof. Sarah"},
                {"Java Programming Masterclass", "Master core compilation paths, data models, exception structures, and multithreading abstractions.", "12", "💻 Programming", "Dr. Mike"},
                {"Python Programming Essentials", "Understand loops, dictionary operations, file handling, and dynamic memory processing constructs.", "8", "💻 Programming", "Prof. Sarah"},
                {"C++ Programming Fundamentals", "Deep dive into pointers, raw memory blocks management, assembly bindings, and execution structures.", "10", "💻 Programming", "Alex Mercer"},
                {"JavaScript Programming Bootcamp", "Master execution threads, event loops, context tracking blocks, asynchronous callbacks, and closures.", "8", "💻 Programming", "Prof. Sarah"},
                {"Data Structures & Algorithms in Java", "Construct multi-dimensional graph searches, binary indexing node operations, and big-O optimization matrices.", "12", "💻 Programming", "Dr. Mike"},
                {"HTML5 & CSS3 Fundamentals", "Understand layout styling sheets, responsive grid frameworks, web DOM trees, and typography alignment models.", "6", "🌐 Web Development", "Prof. Sarah"},
                {"Modern JavaScript (ES6+)", "Advanced array transformations, destructured variable pipelines, async modules, and prototype chains.", "8", "🌐 Web Development", "Prof. Sarah"},
                {"React.js Complete Guide", "Master single-page architecture setups using virtual DOM comparisons, hook states, and state broadcasting.", "10", "🌐 Web Development", "Prof. Sarah"},
                {"Node.js & Express Development", "Construct asynchronous REST api microservices routers, cluster processes, and interceptor middleware layers.", "9", "🌐 Web Development", "Dr. Mike"},
                {"Spring Boot Backend Development", "Implement transactional database integrations, secure dependency injector filters, and Hibernate structures.", "12", "🌐 Web Development", "Dr. Mike"},
                {"Android App Development with Java", "Build native UI layout patterns, integrate background system modules, and control resource threads.", "12", "📱 Mobile Development", "Alex Mercer"},
                {"Android App Development with Kotlin", "Leverage standard coroutine processes, state descriptors, and functional layout targets in Kotlin.", "10", "📱 Mobile Development", "Alex Mercer"},
                {"Flutter App Development", "Compile cross-platform native systems using single Dart code bases and customizable UI grids.", "10", "📱 Mobile Development", "Alex Mercer"},
                {"React Native Mobile Development", "Bridge standard web hooks mechanisms directly over to mobile interface runtime ecosystems.", "8", "📱 Mobile Development", "Prof. Sarah"},
                {"Mobile UI Design & Firebase Integration", "Wire real-time database endpoints, cloud messaging models, and modern asset layout styles.", "8", "📱 Mobile Development", "Alex Mercer"},
                {"Introduction to Artificial Intelligence", "Trace heuristic algorithm decisions, predictive graph structures, and multi-agent systems optimization maps.", "8", "🤖 Artificial Intelligence", "Dr. Rachel"},
                {"Machine Learning Fundamentals", "Implement regression optimization criteria, multi-label classifications, and automated data processing loops.", "12", "🤖 Artificial Intelligence", "Dr. Rachel"},
                {"Deep Learning with TensorFlow", "Configure dense convolutional tracking dimensions, backpropagation passes, and tensor data frames.", "14", "🤖 Artificial Intelligence", "Dr. Rachel"},
                {"Natural Language Processing (NLP)", "Design word vector weights models, contextual attention maps, and textual transformer sequence nodes.", "10", "🤖 Artificial Intelligence", "Dr. Rachel"},
                {"Computer Vision using OpenCV", "Extract frame pixel feature patterns, apply threshold matrices transformations, and map video contours.", "12", "🤖 Artificial Intelligence", "Dr. Rachel"},
                {"Python for Data Science", "Leverage advanced analytical mathematical operators, clean data errors, and orchestrate datasets.", "10", "📊 Data Science", "Dr. Mike"},
                {"NumPy & Pandas Masterclass", "Perform vector transformations across multi-dimensional arrays, aggregate dataframes, and join datasets.", "8", "📊 Data Science", "Dr. Mike"},
                {"Data Visualization with Matplotlib", "Render rich operational charts, distribution curves maps, and geometric telemetry graphs.", "6", "📊 Data Science", "Dr. Mike"},
                {"Statistics for Data Science", "Analyze probability, compute multi-variable test validations, and resolve data anomalies.", "10", "📊 Data Science", "Dr. Mike"},
                {"Data Analysis & Business Intelligence", "Formulate business data intelligence layers and construct clear execution reports.", "8", "📊 Data Science", "Dr. Mike"},
                {"AWS Cloud Practitioner", "Isolate VPC network subnets, deploy secure serverless nodes, and setup identity access management masks.", "6", "☁️ Cloud Computing", "Architect Evans"},
                {"Microsoft Azure Fundamentals", "Manage tenant resource profiles, handle enterprise system replication layers, and manage persistent drives.", "6", "☁️ Cloud Computing", "Architect Evans"},
                {"Google Cloud Platform Essentials", "Scale global infrastructure compute containers, configure load balancers, and manage cloud clusters.", "8", "☁️ Cloud Computing", "Architect Evans"},
                {"Docker & Kubernetes Basics", "Orchestrate distributed microservice containers, manage ingress traffic routing paths, and handle cluster loads.", "8", "☁️ Cloud Computing", "Architect Evans"},
                {"Cloud DevOps Fundamentals", "Automate code verification checkpoints, construct deployment scripts, and manage live operational nodes.", "10", "☁️ Cloud Computing", "Architect Evans"},
                {"Cyber Security Fundamentals", "Trace packet traffic states, establish authentication walls, and minimize access vulnerabilities.", "8", "🛡️ Cyber Security", "Sec Specialist Cole"},
                {"Ethical Hacking Essentials", "Audit server connection metrics, isolate network configuration leaks, and run exploit loops safely.", "12", "🛡️ Cyber Security", "Sec Specialist Cole"},
                {"Network Security", "Configure routing firewall logic matrices, intercept anomalies, and maintain connection privacy protocols.", "10", "🛡️ Cyber Security", "Sec Specialist Cole"},
                {"Web Application Security", "Defend endpoints from cross-site injection attacks and manage secure authentication keys blocks.", "10", "🛡️ Cyber Security", "Sec Specialist Cole"},
                {"Penetration Testing with Kali Linux", "Launch authorized framework diagnostics, map vulnerabilities, and test system defenses under Kali modules.", "12", "🛡️ Cyber Security", "Sec Specialist Cole"},
                {"MySQL Database Development", "Design scalable SQL query joins, map relational database schemas, and create structural indexing patterns.", "8", "🗄️ Database", "Database Admin Cruz"},
                {"PostgreSQL Fundamentals", "Configure transaction levels, optimize query procedures, and handle advanced database extensions.", "8", "🗄️ Database", "Database Admin Cruz"},
                {"MongoDB for Beginners", "Design flexible JSON document catalogs, group dataset metrics, and shard data collections horizontally.", "6", "🗄️ Database", "Database Admin Cruz"},
                {"SQL Queries & Database Design", "Normalize big-data structures, prevent data duplicate redundancies, and enforce strict table integrity rules.", "8", "🗄️ Database", "Database Admin Cruz"},
                {"Database Administration & Optimization", "Profile resource workloads, isolate table lock conflicts, and schedule automated hot backups safely.", "10", "🗄️ Database", "Database Admin Cruz"},
                {"UI Design Fundamentals", "Structure proportional layout grid columns, apply matching palettes themes, and maintain style guides.", "6", "🎨 UI/UX Design", "Prof. Sarah"},
                {"UX Research & Design Thinking", "Deploy quantitative empathy research loops, document tracking maps, and evaluate interaction flows.", "8", "🎨 UI/UX Design", "Prof. Sarah"},
                {"UI/UX Design Principles", "Design thinking, wireframing, and Figma Layout tools.", "6", "🎨 UI/UX Design", "Prof. Sarah"},
                {"Adobe XD for UI Designers", "Build functional interface motion mockups, capture transition loops states, and execute style wireframes.", "6", "🎨 UI/UX Design", "Prof. Sarah"},
                {"Responsive Web & Mobile Design", "Design layouts that scale smoothly across mobile portrait dimensions and large desktop displays.", "8", "🎨 UI/UX Design", "Prof. Sarah"},
                {"Digital Marketing Fundamentals", "Structure high-conversion audience funnels, monitor user acquisition, and evaluate growth patterns.", "8", "📈 Digital Marketing", "Growth Specialist Ana"},
                {"Search Engine Optimization (SEO)", "Audit site index crawling properties, insert clean metadata tokens, and rank higher on search engines.", "8", "📈 Digital Marketing", "Growth Specialist Ana"},
                {"Social Media Marketing", "Organize ad campaign schedules, isolate targeted demographic groups, and build brand recognition.", "6", "📈 Digital Marketing", "Growth Specialist Ana"},
                {"Google Ads & PPC Campaigns", "Analyze keyword bidding models, optimize budget allocations, and reduce cost-per-click metrics.", "8", "📈 Digital Marketing", "Growth Specialist Ana"},
                {"Email Marketing & Content Strategy", "Deploy targeted campaign scripts, organize automation newsletters triggers, and trace customer clicks.", "8", "📈 Digital Marketing", "Growth Specialist Ana"},
                {"Project Management Professional Basics", "Manage project paths milestones, identify task bottlenecks early, and control cost variables.", "10", "💼 Business", "Director Thomas"},
                {"Entrepreneurship & Startup Fundamentals", "Formulate strategic business models, align market positions, and optimize corporate resource streams.", "8", "💼 Business", "Director Thomas"},
                {"Business Analytics", "Evaluate operational performance indicators, interpret market charts data, and write business projections.", "10", "💼 Business", "Director Thomas"},
                {"Leadership & Team Management", "Coordinate agile engineering squads, resolve task disputes, and streamline company operations.", "6", "💼 Business", "Director Thomas"},
                {"Agile & Scrum Methodologies", "Run quick product development updates, handle sprint planning boards, and maintain clear product requirements.", "8", "💼 Business", "Director Thomas"},
                {"Spoken English Masterclass", "Refine verbal communication, choose the right professional vocabulary, and speak clearly in any setting.", "6", "🗣️ Communication Skills", "Coach Clara"},
                {"Professional Business Communication", "Write clear business emails, communicate effectively with teams, and master executive report structures.", "8", "🗣️ Communication Skills", "Coach Clara"},
                {"Public Speaking & Presentation Skills", "Conquer speech anxiety, engage your audience, and build clear, professional slides.", "6", "🗣️ Communication Skills", "Coach Clara"},
                {"Interview Preparation & HR Skills", "Master behavioral interview structures, showcase technical architectures clearly, and handle negotiations.", "8", "🗣️ Communication Skills", "Coach Clara"},
                {"Resume Writing & Career Development", "Highlight your technical projects, write clean impact statements, and optimize your portfolio profiles.", "4", "🗣️ Communication Skills", "Coach Clara"},
                {"☕ Java Full Stack Development", "Comprehensive enterprise training mapping advanced Java algorithms directly to responsive frontend React layout trees.", "16", "⭐ Bonus (Premium Courses)", "Dr. Mike"},
                {"🌐 MERN Stack Development", "Build full-stack applications from scratch using MongoDB document sharding, Express, React, and Node servers.", "14", "⭐ Bonus (Premium Courses)", "Prof. Sarah"},
                {"🌐 MEAN Stack Development", "Orchestrate large scale responsive software models using Angular templates backed by Express.js API routers.", "14", "⭐ Bonus (Premium Courses)", "Prof. Sarah"},
                {"🤖 AI & Machine Learning with Python", "Train automated predictive networks pipelines, neural layouts, and continuous machine learning integrations.", "16", "⭐ Bonus (Premium Courses)", "Dr. Rachel"},
                {"📊 Data Science & Analytics Bootcamp", "Process big data streams safely, configure clean data ingestion models, and build analytical data charts.", "12", "⭐ Bonus (Premium Courses)", "Dr. Mike"},
                {"☁️ AWS Cloud Engineer Career Path", "Architect secure enterprise infrastructures inside multi-region AWS cloud subnets automatically.", "14", "⭐ Bonus (Premium Courses)", "Architect Evans"},
                {"🛡️ Cyber Security Professional", "Harden application defenses, deploy monitoring systems, and pass comprehensive network vulnerability sweeps.", "16", "⭐ Bonus (Premium Courses)", "Sec Specialist Cole"},
                {"📱 Flutter Full Stack Mobile Development", "Build cross-platform mobile solutions linked to cloud computing endpoints, real-time servers, and state managers.", "12", "⭐ Bonus (Premium Courses)", "Alex Mercer"},
                {"💼 Software Testing & Automation (Selenium)", "Write reliable UI automation tests scripts, verify response codes, and test system functions using Selenium pipelines.", "10", "⭐ Bonus (Premium Courses)", "Director Thomas"},
                {"📈 DevOps with Docker & Kubernetes", "Deploy scalable production code clusters, configure container instances, and manage release loops.", "12", "⭐ Bonus (Premium Courses)", "Architect Evans"}
            };

            Course defaultCourse = null;
            for (String[] cData : coursesToSeed) {
                String title = cData[0];
                String desc = cData[1];
                int weeks = Integer.parseInt(cData[2]);
                String catName = cData[3];
                String instName = cData[4];

                if (courseRepo.findByTitle(title).isEmpty()) {
                    Course course = new Course();
                    course.setTitle(title);
                    course.setDescription(desc);
                    course.setDurationWeeks(weeks);
                    course.setIsPublished(true);
                    course.setCategory(catMap.get(catName));
                    course.setInstructor(instMap.get(instName));
                    course = courseRepo.save(course);
                    if (title.equals("React Fundamentals")) {
                        defaultCourse = course;
                    }
                } else {
                    Course course = courseRepo.findByTitle(title).get(0);
                    if (title.equals("React Fundamentals")) {
                        defaultCourse = course;
                    }
                }
            }

            if (defaultCourse == null) {
                defaultCourse = courseRepo.findAll().get(0);
            }

            // Ensure the quiz with ID 501 exists
            if (!quizRepo.existsById(501L)) {
                Quiz quiz = new Quiz();
                quiz.setId(501L);
                quiz.setTitle("React Core Framework Architecture Assessment");
                quiz.setCourse(defaultCourse);

                QuizQuestion q1 = new QuizQuestion();
                q1.setQuiz(quiz);
                q1.setQuestionText("Which mechanism does React use to optimize DOM updates?");
                q1.setOptionA("Shadow DOM");
                q1.setOptionB("Virtual DOM Stack");
                q1.setOptionC("Direct Browser Reflow");
                q1.setOptionD("Babel Compilation Hooks");
                q1.setCorrectOption("1");

                QuizQuestion q2 = new QuizQuestion();
                q2.setQuiz(quiz);
                q2.setQuestionText("What happens if you call a React Hook inside a conditional block?");
                q2.setOptionA("It runs perfectly on state adjustments");
                q2.setOptionB("React throws a hook order error");
                q2.setOptionC("The state variable clears instantly");
                q2.setOptionD("Memory consumption doubles automatically");
                q2.setCorrectOption("1");

                QuizQuestion q3 = new QuizQuestion();
                q3.setQuiz(quiz);
                q3.setQuestionText("Which statement best describes the Context API?");
                q3.setOptionA("It enforces bidirectional state streams");
                q3.setOptionB("It bypasses rendering completely");
                q3.setOptionC("It reduces prop drilling in component trees");
                q3.setOptionD("It compiles code to native machine layers");
                q3.setCorrectOption("2");

                quiz.setQuestions(java.util.List.of(q1, q2, q3));
                quizRepo.save(quiz);
                System.out.println("Seeded quiz ID 501 successfully!");
            }
        };
    }
}