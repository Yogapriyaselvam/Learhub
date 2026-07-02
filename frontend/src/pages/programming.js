// Auto-split from the original combined data banks.
// Contains the video/notes content AND the 10 quiz questions for the "programming" category.

export const content = {
  "poster": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
  "videos": [
    {
      "title": "Variables, Data Types & Operators",
      "url": "https://www.youtube.com/embed/W6NZfCO5SIk"
    },
    {
      "title": "Control Flow: Loops & Conditionals",
      "url": "https://www.youtube.com/embed/IsG4Xd6LlsM"
    },
    {
      "title": "Functions & Scope",
      "url": "https://www.youtube.com/embed/N8ap4k_1QEQ"
    },
    {
      "title": "Object-Oriented Building Blocks",
      "url": "https://www.youtube.com/embed/PFmuCDHHpwk"
    },
    {
      "title": "Error Handling & Debugging",
      "url": "https://www.youtube.com/embed/cFTFtuEQ-10"
    }
  ],
  "notes": [
    "Memory Management Basics",
    "Data Structures Overview",
    "Algorithm Complexity (Big-O)",
    "Recursion Patterns",
    "Best Coding Practices"
  ]
};

export const questions = [
  {
    "stem": "What is the time complexity of binary search on a sorted array?",
    "options": [
      "O(n)",
      "O(log n)",
      "O(n^2)",
      "O(1)"
    ],
    "correctIndex": 1
  },
  {
    "stem": "Which keyword is used to define a constant value in most C-style languages?",
    "options": [
      "var",
      "let",
      "const",
      "static"
    ],
    "correctIndex": 2
  },
  {
    "stem": "What does OOP stand for?",
    "options": [
      "Object-Oriented Programming",
      "Open Output Process",
      "Ordered Operation Pipeline",
      "Optional Object Parsing"
    ],
    "correctIndex": 0
  },
  {
    "stem": "Which data structure uses FIFO (First In First Out) ordering?",
    "options": [
      "Stack",
      "Queue",
      "Tree",
      "Graph"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What does a 'null pointer exception' typically indicate?",
    "options": [
      "Out of memory",
      "Accessing a reference that points to nothing",
      "Infinite loop",
      "Syntax error"
    ],
    "correctIndex": 1
  },
  {
    "stem": "Which of the following is typically immutable once created in many languages?",
    "options": [
      "Array",
      "String",
      "List",
      "Object"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What is 'recursion'?",
    "options": [
      "A loop with no end",
      "A function calling itself",
      "A type of array",
      "A syntax error"
    ],
    "correctIndex": 1
  },
  {
    "stem": "Which loop structure checks its condition after executing the loop body at least once?",
    "options": [
      "for loop",
      "while loop",
      "do-while loop",
      "foreach loop"
    ],
    "correctIndex": 2
  },
  {
    "stem": "What does 'compiling' code mean?",
    "options": [
      "Running it in a browser",
      "Translating source code into machine-executable code",
      "Deleting unused variables",
      "Formatting the code style"
    ],
    "correctIndex": 1
  },
  {
    "stem": "Which symbol typically starts a single-line comment in C-style languages?",
    "options": [
      "#",
      "//",
      "<!--",
      "**"
    ],
    "correctIndex": 1
  }
];