export const resume = {
  name: 'Rufi Aiman',
  email: 'rufiaiman7790@gmail.com',
  phone: '8549931775',
  github: 'https://github.com/Rufi-1',
  linkedin: 'https://linkedin.com/in/rufi-aiman-6a7bba319/',
  location: 'Mysuru, Karnataka, India',

  objective:
    'BCA graduate and hands-on developer building multilingual AI applications, data analytics tools, and full-stack web projects. Currently training in Full Stack Development and Data Science at QSpiders, Mysuru.',

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
    { label: 'Programming', value: 'Python, JavaScript, SQL, C' },
    {
      label: 'Frontend',
      value:
        'HTML5, CSS3, JavaScript, React.js, Responsive Design, Component-Based Development, Form Handling, Client-Side Validation, DOM Manipulation',
    },
    {
      label: 'Backend',
      value: 'Django, Django REST Framework, REST APIs, API Integration, JSON, Backend Application Logic',
    },
    {
      label: 'Generative AI & RAG',
      value:
        'RAG Pipelines, Vector Databases, Embeddings, Semantic Retrieval, Context Grounding, Prompt Engineering, LLM API Integration, Multilingual AI Workflows',
    },
    {
      label: 'AI Tools & Models',
      value: 'Groq API, Llama 3.3, Gemini API, Whisper, gTTS, Google Translate API, Google AI Studio, Streamlit',
    },
    {
      label: 'Data Analysis',
      value:
        'Pandas, NumPy, SciPy, Matplotlib, Seaborn, Excel (Pivot Tables, ToolPak), Data Cleaning, EDA, Feature Engineering, Data Validation, Anomaly Detection, Root-Cause Analysis',
    },
    {
      label: 'Statistics',
      value:
        'Descriptive & Inferential Stats, Correlation, Covariance, Hypothesis Testing (t-test, ANOVA, Chi-Square, Shapiro-Wilk), IQR Method',
    },
    { label: 'Databases', value: 'SQL, DBMS, SQLite, JSON-Based Data Handling' },
    { label: 'Tools', value: 'Git, GitHub, VS Code, Jupyter Notebook, Streamlit, Google AI Studio' },
  ],

  experience: {
    dates: 'May — Jul 2026',
    title: 'Data Analytics Intern',
    company: 'Spatialhawk Geo-Informatics Pvt. Ltd.',
    location: 'Mysuru',
    points: [
      'Cleaned and standardized structured datasets using Python and Pandas — handled missing values, removed duplicates, and identified data inconsistencies.',
      'Applied feature-engineering and data-transformation concepts, detected anomalies using boxplots and the IQR method, and documented possible root causes.',
      'Wrote SQL queries and prepared Excel Pivot Table reports for descriptive analysis and stakeholder reporting.',
      'Built practical skills in data validation, analytical problem-solving, documentation, and communicating technical findings.',
    ],
  },

  projects: [
    {
      index: '01',
      eyebrow: 'AI · RAG · NUTRITION · MULTILINGUAL',
      accent: 'saffron',
      title: 'Indian AI Dietician',
      description:
        'A multilingual, voice-enabled RAG application that generates personalized, ICMR/NIN-aligned diet plans for Indian users.',
      problem:
        "Most AI dietary tools are trained on Western datasets and recommend unfamiliar, expensive ingredients. They're also English-only and text-only. Indian-AI Dietician addresses this with regional-language voice support and diet plans built around affordable Indian staples.",
      solutions: [
        'RAG workflow that retrieves nutrition context from a vector database before the LLM generates grounded, ICMR/NIN-aligned diet plans.',
        'Plans for cardiac, PCOS, diabetes, hypertension, and pregnancy needs.',
        'Multilingual voice & text interaction in 5 languages — English, Hindi, Kannada, Telugu, and Tamil.',
        'Speech-to-text via Whisper Large V3, text-to-speech via gTTS, and Google Translate API integration.',
        'Groq-hosted Llama 3.3 (70B) for plan generation, bcrypt authentication, and persistent user-history tracking.',
      ],
      stack: [
        'Python',
        'Streamlit',
        'RAG',
        'Vector Database',
        'Groq API',
        'Llama 3.3',
        'Whisper Large V3',
        'Google Translate API',
        'gTTS',
        'bcrypt',
      ],
      repo: 'https://github.com/Rufi-1/indian-ai-dietician',
    },
    {
      index: '02',
      eyebrow: 'HEALTHCARE · LANGUAGE · ACCESS',
      accent: 'mint',
      title: 'MediLingo — Healthcare Language Assistant',
      description:
        'An AI-powered assistant that converts complex medical terminology into clear, patient-friendly explanations.',
      problem:
        'Medical reports and terminology are often difficult for patients to understand, creating communication barriers and reducing healthcare accessibility.',
      solutions: [
        'Simplifies complex medical terminology into plain, patient-friendly language using the Gemini API.',
        'Multilingual output — English and Hindi, in both written and audio form.',
        'Hindi text & speech output via gTTS for broader accessibility.',
        'User-friendly, accessible interface built with Streamlit.',
        'Selected by one competition judge among their top three project selections at Google Prompt to Prototype.',
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
        "60+ auto-generated visualizations (30+ Matplotlib + 30+ Seaborn), adapted to the dataset's actual columns.",
        'Interactive chart builder using ipywidgets — build custom charts without writing code.',
      ],
      stack: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'SciPy', 'ipywidgets', 'Google Colab'],
      repo: 'https://github.com/Rufi-1/data-analytics-studio',
    },
    {
      index: '04',
      eyebrow: 'FULL-STACK · REACT · DJANGO · IN PROGRESS',
      accent: 'violet',
      title: 'Personal Web & Full-Stack Projects',
      description:
        'Practice-driven full-stack applications focused on responsive UI, form handling, and frontend-backend integration.',
      problem:
        'A good full-stack application needs a responsive interface, reliable backend logic, and a clean connection between the two. These projects are where I practice all three, end to end.',
      solutions: [
        'Built reusable React components and managed user interactions.',
        'Developed backend logic with Python and Django.',
        'Connected frontend interfaces to backend services via REST APIs.',
        'Practiced debugging, validation, error handling, and user-flow testing.',
      ],
      stack: ['React.js', 'JavaScript', 'HTML', 'CSS', 'Django', 'REST APIs'],
      repo: 'https://github.com/Rufi-1',
    },
  ],

  certifications: [
    'Google AI Studio: Building & Deploying Apps — GUVI & HCL (2026)',
    'Basic Computer Course — STP Computer Education (2024)',
  ],

  learning: [
    'Full Stack Development & Data Science (QSpiders)',
    'Next.js & TypeScript',
    'Tailwind CSS & FastAPI',
    'Node.js',
    'Power BI',
    'Machine Learning & MLOps',
    'Cloud AI Platforms',
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
    'Google Prompt to Prototype — MediLingo selected by one judge among their top three project selections',
    'Participant — India AI Impact Buildathon 2026',
    'Participant — AI for Bharat Hackathon',
    'Built and deployed independent AI, data, and web applications',
  ],
};