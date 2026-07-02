// Auto-split from the original combined data banks.
// Contains the video/notes content AND the 10 quiz questions for the "cloud" category.

export const content = {
  "poster": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
  "videos": [
    {
      "title": "Cloud Computing Fundamentals",
      "url": "https://www.youtube.com/embed/M988_fsOSWo"
    },
    {
      "title": "Compute & Storage Services",
      "url": "https://www.youtube.com/embed/NKEFWyqJ5XA"
    },
    {
      "title": "Networking in the Cloud",
      "url": "https://www.youtube.com/embed/2LaAJq1lB1Q"
    },
    {
      "title": "Containers & Orchestration",
      "url": "https://www.youtube.com/embed/X48VuDVv0do"
    },
    {
      "title": "CI/CD Pipelines",
      "url": "https://www.youtube.com/embed/scEDHsr3APg"
    }
  ],
  "notes": [
    "Identity & Access Management",
    "Cost Optimization Notes",
    "High Availability Design",
    "Monitoring & Logging",
    "Cloud Security Basics"
  ]
};

export const questions = [
  {
    "stem": "What does IAM stand for in cloud platforms?",
    "options": [
      "Internet Access Module",
      "Identity and Access Management",
      "Integrated Application Manager",
      "Infrastructure as a Module"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What is the main benefit of containerization (e.g. Docker)?",
    "options": [
      "Slower deployments",
      "Consistent environments across systems",
      "Larger file sizes",
      "No need for code"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What does Kubernetes primarily manage?",
    "options": [
      "Database backups",
      "Container orchestration",
      "Email servers",
      "DNS records"
    ],
    "correctIndex": 1
  },
  {
    "stem": "Which of these is a core benefit of cloud computing?",
    "options": [
      "Fixed hardware costs",
      "On-demand scalability",
      "No internet required",
      "Manual server provisioning only"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What is a CI/CD pipeline used for?",
    "options": [
      "Manual code reviews only",
      "Automating build, test, and deployment",
      "Designing UI",
      "Managing payroll"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What does 'scalability' mean in cloud computing?",
    "options": [
      "Fixed resource allocation",
      "Ability to increase or decrease resources based on demand",
      "Only vertical scaling is possible",
      "Manual server replacement"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What is a 'load balancer' used for?",
    "options": [
      "Encrypting data",
      "Distributing incoming traffic across multiple servers",
      "Writing code",
      "Managing databases only"
    ],
    "correctIndex": 1
  },
  {
    "stem": "Which of these is a common cloud deployment model?",
    "options": [
      "Public cloud",
      "Private garage",
      "Local disk only",
      "Offline server"
    ],
    "correctIndex": 0
  },
  {
    "stem": "What does 'serverless computing' mean?",
    "options": [
      "No servers exist anywhere",
      "Developers don't manage the underlying servers directly",
      "Only used for static websites",
      "A deprecated technology"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What is the purpose of 'auto-scaling'?",
    "options": [
      "Manually adding servers",
      "Automatically adjusting resources based on load",
      "Deleting old backups",
      "Formatting storage"
    ],
    "correctIndex": 1
  }
];