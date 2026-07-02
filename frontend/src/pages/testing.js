// Auto-split from the original combined data banks.
// Contains the video/notes content AND the 10 quiz questions for the "testing" category.

export const content = {
  "poster": "https://images.unsplash.com/photo-1516321165247-4aa89a48be55?auto=format&fit=crop&w=900&q=80",
  "videos": [
    {
      "title": "Testing Fundamentals",
      "url": "https://www.youtube.com/embed/7A7cQl6jVnY"
    },
    {
      "title": "Writing Test Cases",
      "url": "https://www.youtube.com/embed/UzkuOACmBpA"
    },
    {
      "title": "Automation Basics",
      "url": "https://www.youtube.com/embed/Fr8L4K4CjJ8"
    },
    {
      "title": "Selenium WebDriver Intro",
      "url": "https://www.youtube.com/embed/Fr8L4K4CjJ8"
    },
    {
      "title": "Continuous Testing in CI/CD",
      "url": "https://www.youtube.com/embed/scEDHsr3APg"
    }
  ],
  "notes": [
    "Test Planning Notes",
    "Bug Reporting Standards",
    "Regression Testing",
    "Performance Testing Basics",
    "Test Coverage Strategy"
  ]
};

export const questions = [
  {
    "stem": "What is the purpose of a test case?",
    "options": [
      "To slow down development",
      "To verify a specific piece of functionality works as expected",
      "To write documentation",
      "To design UI"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What does Selenium primarily automate?",
    "options": [
      "Database backups",
      "Web browser interactions for testing",
      "Email marketing",
      "Server provisioning"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What is 'regression testing'?",
    "options": [
      "Testing only new features",
      "Re-testing existing features after changes to ensure nothing broke",
      "Testing server hardware",
      "Testing UI colors only"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What is the difference between manual and automated testing?",
    "options": [
      "No difference",
      "Automated testing uses scripts to run tests without manual effort",
      "Manual testing is always faster",
      "Automated testing requires no setup"
    ],
    "correctIndex": 1
  },
  {
    "stem": "Why integrate testing into a CI/CD pipeline?",
    "options": [
      "To skip testing",
      "To catch issues early and automatically",
      "To slow releases down",
      "To replace developers"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What is 'unit testing'?",
    "options": [
      "Testing the entire system at once",
      "Testing individual components in isolation",
      "Testing only the UI",
      "Testing hardware only"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What is a 'bug' in software testing?",
    "options": [
      "A planned feature",
      "An error or flaw causing incorrect behavior",
      "A type of test case",
      "A successful test result"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What does 'test coverage' measure?",
    "options": [
      "Server uptime",
      "The extent to which code is tested",
      "Number of developers on a team",
      "Database size"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What is 'exploratory testing'?",
    "options": [
      "Following a strict predefined script only",
      "Simultaneously learning, designing, and executing tests",
      "Testing only automated scripts",
      "Testing hardware components"
    ],
    "correctIndex": 1
  },
  {
    "stem": "Why is 'regression testing' important after a code change?",
    "options": [
      "It's not important",
      "To ensure existing functionality still works correctly",
      "To slow down releases",
      "To replace manual testers entirely"
    ],
    "correctIndex": 1
  }
];