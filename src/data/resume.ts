export const resume = {
  name: 'Rufi Aiman',
  email: 'rufiaiman7790@gmail.com',
  phone: '8549931775',
  github: 'https://github.com/Rufi-1',
  linkedin: 'https://linkedin.com/in/rufi-aiman-6a7bba319/',
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
      'Cleaned and standardized structured datasets using Python (Pandas) — handled missing values and removed duplicates.',
      'Detected data anomalies using boxplots and the IQR method, documenting root causes for reliability.',
      'Wrote SQL queries and built Pivot Tables/Excel reports for descriptive statistics and stakeholder reporting.',
    ],
  },

  projects: [
    {
      index: '01',
      eyebrow: 'AI · NUTRITION · MULTILINGUAL',
      accent: 'saffron',
      title: 'Indian AI Dietician',
      description:
        'A multilingual, voice-enabled AI Dietician built for the Indian demographic — generating culturally relevant, medically safe diet plans aligned with ICMR/NIN guidelines.',
      problem:
        "Most AI dietary tools are trained on Western datasets and recommend unfamiliar, expensive ingredients. They're also English-only and text-only. Indian-AI Dietician addresses this with regional-language voice support and diet plans built around affordable Indian staples.",
      solutions: [
        'Diet plans aligned to ICMR & NIN guidelines for cardiac, PCOS, diabetes, hypertension, and pregnancy.',
        'Multilingual voice & text interaction in English, Hindi, Kannada, Telugu, and Tamil.',
        'Speech-to-text via Whisper Large V3 and text-to-speech via gTTS.',
        'AI recommendations via Groq-hosted Llama 3.3 (70B), with secure bcrypt auth and JSON-based chat history.',
      ],
      stack: ['Python', 'Streamlit', 'Groq API', 'Llama 3.3', 'Whisper Large V3', 'Google Translate API', 'gTTS', 'bcrypt'],
      repo: 'https://github.com/Rufi-1/indian-ai-dietician',
    },
    {
      index: '02',
      eyebrow: 'HEALTHCARE · LANGUAGE · ACCESS',
      accent: 'mint',
      title: 'MediLingo — Healthcare Language Assistant',
      description:
        'An AI-powered healthcare assistant that converts complex medical terminology into simple, understandable language for patients.',
      problem:
        'Medical reports and terminology are often difficult for patients to understand, creating communication barriers and reducing healthcare accessibility.',
      solutions: [
        'Simplifies complex medical terminology into plain, patient-friendly language using the Gemini API.',
        'Multilingual output — English and Hindi, in both written and audio form.',
        'Hindi text & speech output via gTTS for broader accessibility.',
        'User-friendly, accessible interface built with Streamlit.',
      ],
      stack: ['Python', 'SQL', 'Gemini API', 'Streamlit', 'gTTS'],
      repo: 'https://github.com/Rufi-1/medi-lingo',
    },
    {
      index: '03',
      eyebrow: 'DATA · STATISTICS · TOOLING',
      accent: 'sky',
      title: 'Data Analytics Studio',
      description:
        'A general-purpose data analysis dashboard for Google Colab — upload any CSV/Excel file and instantly get a full analytics workflow: cleaning, descriptive and inferential statistics, correlation analysis, outlier detection, and 60+ auto-generated visualizations.',
      problem:
        'Most data analysis notebooks are written for one specific dataset — column names, chart types, and statistical tests are hard-coded, so reusing them for a new dataset means rewriting large parts of the notebook.',
      solutions: [
        'Dynamic column-type detection — auto-identifies numeric, categorical, and date columns in any uploaded dataset.',
        'Descriptive and inferential stats (Shapiro-Wilk, t-tests, ANOVA, chi-square) applied conditionally based on data structure.',
        '60+ auto-generated visualizations (30+ Matplotlib + 30+ Seaborn), adapted to the dataset\'s actual columns.',
        'Interactive chart builder using ipywidgets — build custom charts without writing code.',
      ],
      stack: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'SciPy', 'ipywidgets', 'Google Colab'],
      repo: 'https://github.com/Rufi-1/data-analytics-studio',
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