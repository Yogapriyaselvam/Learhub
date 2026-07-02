// Auto-split from the original combined data banks.
// Contains the video/notes content AND the 10 quiz questions for the "datascience" category.

export const content = {
  "poster": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
  "videos": [
    {
      "title": "Data Cleaning Techniques",
      "url": "https://www.youtube.com/embed/vmEHCJofslg"
    },
    {
      "title": "Exploratory Data Analysis",
      "url": "https://www.youtube.com/embed/xi0vhXFPegw"
    },
    {
      "title": "Working with DataFrames",
      "url": "https://www.youtube.com/embed/vmEHCJofslg"
    },
    {
      "title": "Visualizing Data Trends",
      "url": "https://www.youtube.com/embed/3Xc3CA655Y4"
    },
    {
      "title": "Statistical Hypothesis Testing",
      "url": "https://www.youtube.com/embed/0oc49DyA3hU"
    }
  ],
  "notes": [
    "Descriptive Statistics Notes",
    "Correlation vs Causation",
    "Handling Missing Data",
    "Reporting Insights Clearly",
    "Data Storytelling"
  ]
};

export const questions = [
  {
    "stem": "Which Python library is primarily used for dataframes?",
    "options": [
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Flask"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What does a high correlation coefficient (close to 1) indicate?",
    "options": [
      "No relationship",
      "Strong positive relationship",
      "Strong negative relationship",
      "Random data"
    ],
    "correctIndex": 1
  },
  {
    "stem": "Which chart is best for showing distribution of a single variable?",
    "options": [
      "Histogram",
      "Pie chart",
      "Scatter plot",
      "Line chart"
    ],
    "correctIndex": 0
  },
  {
    "stem": "What is the median of a dataset?",
    "options": [
      "The average value",
      "The most frequent value",
      "The middle value when sorted",
      "The range of values"
    ],
    "correctIndex": 2
  },
  {
    "stem": "What is a common technique for handling missing data?",
    "options": [
      "Ignoring all data",
      "Imputation",
      "Deleting the dataset",
      "Renaming columns"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What is 'data wrangling'?",
    "options": [
      "Deleting all data",
      "Cleaning and transforming raw data for analysis",
      "Encrypting data",
      "Visualizing final reports only"
    ],
    "correctIndex": 1
  },
  {
    "stem": "Which of these best describes an 'outlier'?",
    "options": [
      "The most frequent value",
      "A data point significantly different from others",
      "The average value",
      "A missing value"
    ],
    "correctIndex": 1
  },
  {
    "stem": "What does 'standard deviation' measure?",
    "options": [
      "The middle value",
      "The spread of data around the mean",
      "The total count of data",
      "The maximum value only"
    ],
    "correctIndex": 1
  },
  {
    "stem": "Which library is commonly used for numerical computing in Python?",
    "options": [
      "NumPy",
      "Django",
      "Flask",
      "React"
    ],
    "correctIndex": 0
  },
  {
    "stem": "What is 'feature engineering'?",
    "options": [
      "Designing hardware chips",
      "Creating new input variables to improve model performance",
      "Writing test cases",
      "Managing servers"
    ],
    "correctIndex": 1
  }
];