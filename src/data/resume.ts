export const resume = {
  name: 'Rufi Aiman',
  email: 'rufiaiman7790@gmail.com',
  phone: '8549931775',
  github: 'https://github.com/Rufi-1',
  linkedin: 'https://linkedin.com/in/rufiaiman-6a7bba319',
  location: 'Mysuru, Karnataka, India',

  objective:
    'Motivated Bachelor of Computer Applications graduate with a strong foundation in Python, SQL, data analytics, and web development. Hands-on experience in data cleaning, statistical analysis, and anomaly detection through a Data Analytics internship, complemented by independent experience building AI-powered applications with REST API integrations and Django backend development. Eager to contribute as a fresher in data analytics or software development while continuing to build expertise in modern tools and frameworks.',

  education: [
    {
      year: '2026',
      title: 'Bachelor of Computer Applications (BCA)',
      place: "Maharani's Science College for Women, Mysuru",
      score: 'CGPA: 8.73',
    },
    {
      year: '2023',
      title: 'Pre-University Course (PCMB)',
      place: 'Farooqia Girls Composite College',
      score: 'Percentage: 84.12%',
    },
    {
      year: '2021',
      title: 'SSLC',
      place: 'Little Gems School',
      score: 'Percentage: 84.32%',
    },
  ],

  skills: [
    { label: 'Programming', value: 'Python (Advanced), C, JavaScript' },
    { label: 'Web Development', value: 'HTML, CSS, JavaScript, Django REST APIs' },
    { label: 'Database', value: 'SQL, DBMS' },
    { label: 'Analysis', value: 'Pandas, NumPy, Matplotlib, Seaborn, Excel (Pivot Tables, ToolPak)' },
    { label: 'Statistics', value: 'Descriptive & Inferential Stats (t-Test, ANOVA, Chi-Square, IQR, Correlation)' },
    { label: 'Tools', value: 'Git, GitHub, Streamlit, Google AI Studio, VS Code' },
    { label: 'Core', value: 'Data Cleaning, Root-Cause Analysis, API Integration, Documentation' },
  ],

  experience: {
    dates: 'May — Jul 2026',
    title: 'Data Analytics Intern',
    company: 'Spatialhawk Geo-Informatics Pvt. Ltd.',
    location: 'Mysuru',
    points: [
      'Cleaned and structured datasets using Python (Pandas), handling missing values and removing duplicates.',
      'Detected data anomalies using boxplots and the IQR method, documenting root causes for reliability.',
      'Wrote SQL queries with Pivot Tables and Excel reports for descriptive statistics and stakeholder reporting.',
    ],
  },

  projects: [
    {
      index: '01',
      eyebrow: 'AI · NUTRITION · MULTILINGUAL',
      accent: 'saffron',
      title: 'Indian AI Dietician',
      description:
        'A multilingual, voice-enabled diet app for Indian users, built to fill the gap in ICMR/NIN-aligned regional-language tools.',
      problem:
        'Designed a multilingual, voice-enabled diet app for Indian users, addressing the lack of ICMR/NIN-aligned regional-language tools.',
      solutions: [
        'Generated ICMR/NIN-aligned diet plans in 5 languages via Whisper & gTTS, using prompt engineering with Groq-hosted Llama 3.3.',
        'Implemented secure bcrypt authentication and persistent JSON-based user history tracking.',
      ],
      stack: ['Python', 'Streamlit', 'Groq API', 'Whisper', 'gTTS', 'Google Translate API', 'bcrypt'],
    },
    {
      index: '02',
      eyebrow: 'HEALTHCARE · LANGUAGE · ACCESS',
      accent: 'mint',
      title: 'MediLingo — Healthcare Language Assistant',
      description:
        'A healthcare language assistant that translates complex medical terminology into plain, accessible explanations.',
      problem:
        'Medical terminology can often be difficult for patients to understand, creating communication gaps.',
      solutions: [
        'Simplified complex medical terminology into plain language using the Gemini API.',
        'Delivered explanations in English and Hindi, written and audio, to improve patient accessibility.',
      ],
      stack: ['Python', 'SQL', 'Gemini API'],
    },
    {
      index: '03',
      eyebrow: 'DATA · STATISTICS · TOOLING',
      accent: 'sky',
      title: 'Data Analytics Studio',
      description:
        'A dataset-agnostic statistical pipeline that adapts its full analysis workflow to any uploaded file.',
      problem:
        'Built a dataset-agnostic tool that adapts its full statistical pipeline to any uploaded file.',
      solutions: [
        'Built correlation/covariance analysis and inferential tests (Shapiro-Wilk, t-tests, ANOVA, chi-square).',
        'Designed a dataset-agnostic architecture that adapts the analysis pipeline to any uploaded file.',
      ],
      stack: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'SciPy'],
    },
  ],

  certifications: [
    'Google AI Studio: Building & Deploying Apps — GUVI & HCL (2026)',
    'Basic Computer Course — STP Computer Education (2024)',
  ],

  learning: [
    'React (Frontend)',
    'Power BI & Advanced SQL',
    'Machine Learning & GenAI (Qspiders)',
  ],

  softSkills: [
    'Problem Solving',
    'Analytical Thinking',
    'Communication',
    'Team Collaboration',
    'Quick Learner',
    'Adaptability',
    'Time Management',
  ],

  achievements: [
    'Participant — India AI Impact Buildathon 2026',
    'Participant — AI for Bharat Hackathon',
    'Built 3 independent AI/data applications',
  ],
};