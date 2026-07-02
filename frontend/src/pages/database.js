// Auto-split from the original combined data banks.
// Contains the video/notes content AND the 10 quiz questions for the "database" category.

export const content = {
  "poster": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=900&q=80",
  "videos": [
    {
      "title": "Relational Database Basics",
      "url": "https://www.youtube.com/embed/HXV3zeQKqGY"
    },
    {
      "title": "Writing Effective Queries",
      "url": "https://www.youtube.com/embed/7S_tz1z_5bA"
    },
    {
      "title": "Joins & Relationships",
      "url": "https://www.youtube.com/embed/9yeOJ0ZMUYw"
    },
    {
      "title": "Indexing for Performance",
      "url": "https://www.youtube.com/embed/ztHopE5Wnpc"
    },
    {
      "title": "Transactions & ACID",
      "url": "https://www.youtube.com/embed/GAe5oB742dw"
    }
  ],
  "notes": [
    "Database Normalization Notes",
    "Schema Design Principles",
    "Backup & Recovery",
    "NoSQL vs SQL",
    "Query Optimization Tips"
  ]
};

export const questions = [
  {
    "stem": "What does SQL stand for?",
    "options": [
      "Structured Query Language",
      "Simple Query Logic",
      "System Query List",
      "Standard Query Layer"
    ],
    "correctIndex": 0
  },
  {
    "stem": "Which type of JOIN returns only matching rows from both tables?",
    "options": [
      "LEFT JOIN",
      "RIGHT JOIN",
      "INNER JOIN",
      "FULL OUTER JOIN"
    ],
    "correctIndex": 2
  },
  {
    "stem": "What is the purpose of a primary key?",
    "options": [
      "Style the table",
      "Uniquely identify each row",
      "Encrypt data",
      "Speed up the network"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What does 'normalization' aim to reduce?",
    "options": [
      "Query speed",
      "Data redundancy",
      "Number of tables",
      "Number of users"
    ],
    "correctIndex": 1
  },
  {
    "stem": "Which database type is MongoDB an example of?",
    "options": [
      "Relational",
      "Document-based NoSQL",
      "Graph database",
      "Columnar"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What is a 'foreign key' used for?",
    "options": [
      "Encrypting a table",
      "Linking one table to another",
      "Styling a table",
      "Deleting rows automatically"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What does ACID stand for in database transactions?",
    "options": [
      "Atomicity, Consistency, Isolation, Durability",
      "Access, Control, Identity, Data",
      "Analysis, Compression, Indexing, Duplication",
      "Automatic, Consistent, Isolated, Direct"
    ],
    "correctIndex": 0
  },
  {
    "stem": "What is an 'index' used for in a database?",
    "options": [
      "Storing backups",
      "Speeding up data retrieval",
      "Encrypting records",
      "Formatting tables"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What is a 'schema' in database terms?",
    "options": [
      "A backup copy",
      "The structure/organization of a database",
      "A type of query",
      "A user password"
    ],
    "correctIndex": 1
  },
  {
    "stem": "Which of these is a NoSQL database?",
    "options": [
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "Oracle DB"
    ],
    "correctIndex": 2
  }
];