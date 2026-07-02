// Auto-split from the original combined data banks.
// Contains the video/notes content AND the 10 quiz questions for the "security" category.

export const content = {
  "poster": "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=900&q=80",
  "videos": [
    {
      "title": "Security Fundamentals",
      "url": "https://www.youtube.com/embed/inWWhr5tnEA"
    },
    {
      "title": "Common Attack Vectors",
      "url": "https://www.youtube.com/embed/2TofunAI6fU"
    },
    {
      "title": "Network Defense Techniques",
      "url": "https://www.youtube.com/embed/qiQR5rTSshw"
    },
    {
      "title": "Web Application Vulnerabilities",
      "url": "https://www.youtube.com/embed/3Kq1MIfTWCE"
    },
    {
      "title": "Ethical Hacking Methodology",
      "url": "https://www.youtube.com/embed/3Kq1MIfTWCE"
    }
  ],
  "notes": [
    "Cryptography Basics",
    "Access Control Models",
    "Incident Response Notes",
    "Security Auditing",
    "Compliance & Standards"
  ]
};

export const questions = [
  {
    "stem": "What does SQL Injection exploit?",
    "options": [
      "Weak passwords",
      "Unsanitized user input in database queries",
      "Slow internet",
      "Outdated browsers"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What is the purpose of a firewall?",
    "options": [
      "Speed up the network",
      "Filter and control network traffic",
      "Store passwords",
      "Compress files"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What does 'phishing' refer to?",
    "options": [
      "A type of encryption",
      "Tricking users into revealing sensitive information",
      "A firewall rule",
      "A backup strategy"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What does HTTPS provide that HTTP does not?",
    "options": [
      "Faster loading",
      "Encrypted communication",
      "Better SEO ranking",
      "Smaller file sizes"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What is penetration testing used for?",
    "options": [
      "Marketing analysis",
      "Finding security vulnerabilities through simulated attacks",
      "Writing documentation",
      "UI testing"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What does 'two-factor authentication' add to security?",
    "options": [
      "Nothing extra",
      "An additional verification step beyond password",
      "A faster login",
      "A backup password only"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What is 'malware'?",
    "options": [
      "A software update",
      "Malicious software designed to harm systems",
      "A firewall rule",
      "A type of encryption"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What does 'encryption' do to data?",
    "options": [
      "Deletes it permanently",
      "Converts it into unreadable form without a key",
      "Compresses it",
      "Backs it up automatically"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What is a 'DDoS attack'?",
    "options": [
      "A type of encryption",
      "Overwhelming a system with traffic to disrupt service",
      "A password recovery method",
      "A firewall configuration"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What is the principle of 'least privilege'?",
    "options": [
      "Giving all users admin access",
      "Granting users only the access they need",
      "Removing all access",
      "Sharing passwords openly"
    ],
    "correctIndex": 1
  }
];