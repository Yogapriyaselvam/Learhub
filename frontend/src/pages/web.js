// Auto-split from the original combined data banks.
// Contains the video/notes content AND the 10 quiz questions for the "web" category.

export const content = {
  "poster": "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=900&q=80",
  "videos": [
    {
      "title": "HTML & Semantic Structure",
      "url": "https://www.youtube.com/embed/qz0aGYrrlhU"
    },
    {
      "title": "CSS Layout & Flexbox/Grid",
      "url": "https://www.youtube.com/embed/JJSoEo8JSnc"
    },
    {
      "title": "JavaScript DOM Manipulation",
      "url": "https://www.youtube.com/embed/0ik6X4DJKCc"
    },
    {
      "title": "Component-Based UI Building",
      "url": "https://www.youtube.com/embed/bMknfKXIFA8"
    },
    {
      "title": "API Integration & Fetch",
      "url": "https://www.youtube.com/embed/cuEtnrL9-H0"
    }
  ],
  "notes": [
    "Responsive Design Notes",
    "State Management Concepts",
    "Routing & Navigation",
    "Performance Optimization",
    "Deployment Checklist"
  ]
};

export const questions = [
  {
    "stem": "Which HTML tag is used to link an external CSS file?",
    "options": [
      "<style>",
      "<script>",
      "<link>",
      "<css>"
    ],
    "correctIndex": 2
  },
  {
    "stem": "What does the Virtual DOM help React do?",
    "options": [
      "Style components",
      "Efficiently update the real DOM",
      "Compile JavaScript",
      "Manage cookies"
    ],
    "correctIndex": 1
  },
  {
    "stem": "Which CSS property is used for flexible box layouts?",
    "options": [
      "display: flex",
      "position: absolute",
      "float: left",
      "overflow: hidden"
    ],
    "correctIndex": 0
  },
  {
    "stem": "What HTTP method is typically used to fetch data without side effects?",
    "options": [
      "POST",
      "DELETE",
      "GET",
      "PUT"
    ],
    "correctIndex": 2
  },
  {
    "stem": "In React, what is used to manage component-level state?",
    "options": [
      "useEffect",
      "useState",
      "useRef",
      "useMemo"
    ],
    "correctIndex": 1
  },
  {
    "stem": "Which CSS unit is relative to the root element's font size?",
    "options": [
      "px",
      "rem",
      "vh",
      "pt"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What does JSON stand for?",
    "options": [
      "JavaScript Object Notation",
      "Java Standard Object Network",
      "JavaScript Ordered Node",
      "Just Simple Object Notation"
    ],
    "correctIndex": 0
  },
  {
    "stem": "Which HTTP status code indicates a successful request?",
    "options": [
      "404",
      "500",
      "200",
      "301"
    ],
    "correctIndex": 2
  },
  {
    "stem": "What is the purpose of 'props' in React?",
    "options": [
      "Store global CSS",
      "Pass data from parent to child components",
      "Manage routing",
      "Compile JSX"
    ],
    "correctIndex": 1
  },
  {
    "stem": "Which tag is used to create a hyperlink in HTML?",
    "options": [
      "<link>",
      "<a>",
      "<href>",
      "<nav>"
    ],
    "correctIndex": 1
  }
];