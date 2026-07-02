// Auto-split from the original combined data banks.
// Contains the video/notes content AND the 10 quiz questions for the "mobile" category.

export const content = {
  "poster": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80",
  "videos": [
    {
      "title": "App Architecture Overview",
      "url": "https://www.youtube.com/embed/VPvVD8t02U8"
    },
    {
      "title": "Building Layouts & Widgets",
      "url": "https://www.youtube.com/embed/x0uinJvhNxI"
    },
    {
      "title": "Navigation Between Screens",
      "url": "https://www.youtube.com/embed/R2D6P4h6W5I"
    },
    {
      "title": "Working with Device APIs",
      "url": "https://www.youtube.com/embed/1ukSR1GRtMU"
    },
    {
      "title": "State & Data Persistence",
      "url": "https://www.youtube.com/embed/d_m5csmrf7I"
    }
  ],
  "notes": [
    "UI/UX for Mobile Notes",
    "Lifecycle Management",
    "Permissions & Security",
    "Testing on Devices",
    "Publishing to App Stores"
  ]
};

export const questions = [
  {
    "stem": "Which language is primarily used for native Android development today?",
    "options": [
      "Swift",
      "Kotlin",
      "Objective-C",
      "Dart"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What does Flutter use as its single codebase language?",
    "options": [
      "Java",
      "Dart",
      "Kotlin",
      "JavaScript"
    ],
    "correctIndex": 1
  },
  {
    "stem": "Which lifecycle method is called when an Android Activity becomes visible?",
    "options": [
      "onDestroy()",
      "onStart()",
      "onPause()",
      "onStop()"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What is used in React Native to bridge JavaScript with native modules?",
    "options": [
      "The Bridge",
      "Webpack",
      "Redux",
      "Babel"
    ],
    "correctIndex": 0
  },
  {
    "stem": "What should you request from the user before accessing the camera?",
    "options": [
      "A subscription",
      "Permission",
      "A login token",
      "Nothing"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What file format is used to package an Android app for distribution?",
    "options": [
      ".exe",
      ".apk",
      ".ipa",
      ".dmg"
    ],
    "correctIndex": 1
  },
  {
    "stem": "In Flutter, what is a 'Widget'?",
    "options": [
      "A database table",
      "A basic building block of the UI",
      "A backend server",
      "A testing tool"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What tool is commonly used to test Android apps on a virtual device?",
    "options": [
      "Emulator",
      "Compiler",
      "Linker",
      "Debugger console only"
    ],
    "correctIndex": 0
  },
  {
    "stem": "What does 'responsive layout' mean in mobile development?",
    "options": [
      "Fixed layout regardless of screen size",
      "Layout that adapts to different screen sizes",
      "A layout with animations only",
      "A backend concept"
    ],
    "correctIndex": 1
  },
  {
    "stem": "Which state management approach is commonly used in React Native?",
    "options": [
      "Redux",
      "SQL joins",
      "CSS Grid",
      "XML parsing"
    ],
    "correctIndex": 0
  }
];