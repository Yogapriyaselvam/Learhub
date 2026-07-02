// Auto-split from the original combined data banks.
// Contains the video/notes content AND the 10 quiz questions for the "ai" category.

export const content = {
  "poster": "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&w=900&q=80",
  "videos": [
    {
      "title": "Introduction to AI Concepts",
      "url": "https://www.youtube.com/embed/JMUxmLyrhSk"
    },
    {
      "title": "Supervised vs Unsupervised Learning",
      "url": "https://www.youtube.com/embed/7eh4d6sabA0"
    },
    {
      "title": "Neural Network Basics",
      "url": "https://www.youtube.com/embed/aircAruvnKk"
    },
    {
      "title": "Model Training Workflow",
      "url": "https://www.youtube.com/embed/uqomO_BZ44g"
    },
    {
      "title": "Evaluating Model Performance",
      "url": "https://www.youtube.com/embed/85dtiMz9tSo"
    }
  ],
  "notes": [
    "Data Preprocessing Notes",
    "Feature Engineering",
    "Overfitting & Regularization",
    "Common AI Frameworks",
    "Ethical AI Considerations"
  ]
};

export const questions = [
  {
    "stem": "Which type of learning uses labeled training data?",
    "options": [
      "Unsupervised Learning",
      "Supervised Learning",
      "Reinforcement Learning",
      "Clustering"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What does 'overfitting' mean in machine learning?",
    "options": [
      "Model performs well on new data",
      "Model memorizes training data but fails on new data",
      "Model trains too fast",
      "Model has too few parameters"
    ],
    "correctIndex": 1
  },
  {
    "stem": "Which algorithm is commonly used for classification tasks?",
    "options": [
      "Linear Regression",
      "K-Means",
      "Logistic Regression",
      "PCA"
    ],
    "correctIndex": 2
  },
  {
    "stem": "What is a neural network's 'activation function' used for?",
    "options": [
      "Storing data",
      "Introducing non-linearity",
      "Compressing images",
      "Sorting arrays"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What does NLP stand for?",
    "options": [
      "Natural Language Processing",
      "Neural Logic Pathways",
      "Numeric Linear Programming",
      "Node Layer Protocol"
    ],
    "correctIndex": 0
  },
  {
    "stem": "What is 'reinforcement learning'?",
    "options": [
      "Learning from labeled data only",
      "Learning through rewards and penalties from actions",
      "Learning without any data",
      "A type of database query"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What is a 'dataset' in machine learning?",
    "options": [
      "A programming language",
      "A collection of data used to train/test models",
      "A type of neural network",
      "A cloud server"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What does 'training' a model mean?",
    "options": [
      "Deleting old data",
      "Adjusting model parameters using data",
      "Compiling the code",
      "Designing the UI"
    ],
    "correctIndex": 1
  },
  {
    "stem": "Which of these is an example of a computer vision task?",
    "options": [
      "Sentiment analysis",
      "Image classification",
      "Speech-to-text",
      "Text translation"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What is a 'confusion matrix' used for?",
    "options": [
      "Styling charts",
      "Evaluating classification model performance",
      "Managing databases",
      "Writing SQL queries"
    ],
    "correctIndex": 1
  }
];