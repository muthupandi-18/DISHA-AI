import { SkillRoadmap } from '../types';

export const SKILL_ROADMAPS_DATA: SkillRoadmap[] = [
  {
    careerId: 'ai-engineer',
    careerTitle: 'AI & Machine Learning Engineer',
    category: 'Engineering',
    overview: 'Comprehensive 4-stage technical roadmap to transition from basic programming to building and deploying production LLMs, neural networks, and MLOps pipelines.',
    prerequisites: ['Basic High School Mathematics', 'Logical Thinking', 'Curiosity for AI'],
    certificationsToAim: [
      'AWS Certified Machine Learning - Specialty',
      'TensorFlow Developer Certificate',
      'Naan Mudhalvan AI/ML Specialist Badge'
    ],
    stages: [
      {
        stageNumber: 1,
        stageName: 'Stage 1: Mathematics & Python Fundamentals',
        duration: 'Months 1 - 3',
        objective: 'Master foundational computer science, linear algebra, calculus, and core Python data science libraries.',
        skillsToMaster: [
          'Python Syntax & Data Structures',
          'Linear Algebra & Vector Calculus',
          'NumPy & Pandas Data Wrangling',
          'Matplotlib & Seaborn Visualization',
          'Git & GitHub Version Control'
        ],
        recommendedProjects: [
          'Exploratory Data Analysis (EDA) on Tamil Nadu Weather/Agri Datasets',
          'Interactive Data Dashboard with Streamlit'
        ],
        learningPlatforms: ['NPTEL Python Course', 'FreeCodeCamp Data Analysis', 'Naan Mudhalvan Portal']
      },
      {
        stageNumber: 2,
        stageName: 'Stage 2: Core Machine Learning Algorithms',
        duration: 'Months 4 - 6',
        objective: 'Understand classical supervised/unsupervised ML algorithms, model evaluation metrics, and feature engineering.',
        skillsToMaster: [
          'Scikit-Learn Framework',
          'Linear & Logistic Regression',
          'Decision Trees & Random Forests',
          'XGBoost & Gradient Boosting',
          'K-Means Clustering & PCA'
        ],
        recommendedProjects: [
          'TNEA College Admission Predictor Model',
          'Customer Churn & Student Drop-Out Risk Detector'
        ],
        learningPlatforms: ['Coursera Machine Learning by Andrew Ng', 'Kaggle Competitions']
      },
      {
        stageNumber: 3,
        stageName: 'Stage 3: Deep Learning, Computer Vision & NLP',
        duration: 'Months 7 - 9',
        objective: 'Build neural network architectures, train PyTorch/TensorFlow models, and fine-tune Large Language Models (LLMs).',
        skillsToMaster: [
          'PyTorch & Neural Networks',
          'Convolutional Neural Networks (CNNs)',
          'Transformers & Hugging Face',
          'RAG (Retrieval-Augmented Generation)',
          'LangChain & Vector Databases (ChromaDB/Qdrant)'
        ],
        recommendedProjects: [
          'Tamil Speech & Text Multilingual Medical Assistant',
          'Crop Disease Detection from Leaf Images using OpenCV & CNN'
        ],
        learningPlatforms: ['Fast.ai Deep Learning', 'DeepLearning.AI Short Courses']
      },
      {
        stageNumber: 4,
        stageName: 'Stage 4: MLOps, Model Deployment & Placement Prep',
        duration: 'Months 10 - 12',
        objective: 'Deploy models into scalable REST APIs, containerize applications, and prepare for technical interviews at top IT firms.',
        skillsToMaster: [
          'FastAPI / Flask Model Serving',
          'Docker & Containerization',
          'Model Monitoring & MLflow',
          'Cloud AI Services (AWS SageMaker / GCP Vertex AI)',
          'System Design for Machine Learning'
        ],
        recommendedProjects: [
          'End-to-End Real-Time AI Microservice Deployed on Cloud Run',
          'Automated AI Essay & Resume Evaluator'
        ],
        learningPlatforms: ['Full Stack Deep Learning', 'LeetCode Python Data Structures']
      }
    ]
  },
  {
    careerId: 'software-developer',
    careerTitle: 'Full Stack / Software Engineer',
    category: 'Engineering',
    overview: 'Step-by-step full-stack roadmap covering modern frontend frameworks, backend server architectures, databases, and DevOps practices.',
    prerequisites: ['Basic Computer Literacy', 'Interest in Web/App Development'],
    certificationsToAim: [
      'AWS Certified Developer Associate',
      'Meta Front-End / Back-End Developer Professional Certificate',
      'Oracle Certified Java SE Programmer'
    ],
    stages: [
      {
        stageNumber: 1,
        stageName: 'Stage 1: Web Foundations & Programming Mechanics',
        duration: 'Months 1 - 3',
        objective: 'Build semantic responsive web pages and write clean, structured code with JavaScript & Data Structures.',
        skillsToMaster: [
          'HTML5 & Semantic Structure',
          'Modern CSS3, Flexbox & Grid',
          'Tailwind CSS Utility Framework',
          'JavaScript ES6+ & Async/Await',
          'Data Structures & Algorithms (DSA Basics)'
        ],
        recommendedProjects: [
          'Responsive Portfolio & Resume Web App',
          'Interactive Task Manager with Local Storage'
        ],
        learningPlatforms: ['FreeCodeCamp Responsive Web Design', 'Odin Project', 'GeeksforGeeks']
      },
      {
        stageNumber: 2,
        stageName: 'Stage 2: Modern Frontend Frameworks & State',
        duration: 'Months 4 - 6',
        objective: 'Master React.js or Vue.js, TypeScript, state management, and API integrations.',
        skillsToMaster: [
          'TypeScript & Strict Typing',
          'React.js Component Architecture',
          'React Hooks & Custom Hooks',
          'Redux Toolkit / Context API',
          'Vite & Webpack Build Tools'
        ],
        recommendedProjects: [
          'District-wise College Explorer Web Portal',
          'Real-Time Weather & News Aggregator App'
        ],
        learningPlatforms: ['React Official Docs', 'Scrimba React Bootcamp']
      },
      {
        stageNumber: 3,
        stageName: 'Stage 3: Backend Development & Databases',
        duration: 'Months 7 - 9',
        objective: 'Develop scalable RESTful & GraphQL APIs, manage SQL/NoSQL databases, and secure authentication.',
        skillsToMaster: [
          'Node.js & Express.js Framework',
          'PostgreSQL / MySQL Relational DB',
          'MongoDB / Firestore NoSQL DB',
          'JWT Auth & OAuth Integration',
          'ORMs (Drizzle / Prisma / TypeORM)'
        ],
        recommendedProjects: [
          'E-Commerce Backend API with Payment Gateway',
          'Student Admission & College Management System'
        ],
        learningPlatforms: ['Node School', 'PostgreSQL Official Tutorials', 'MongoDB University']
      },
      {
        stageNumber: 4,
        stageName: 'Stage 4: Cloud, CI/CD & Placement Readiness',
        duration: 'Months 10 - 12',
        objective: 'Deploy apps with Docker & CI/CD, practice LeetCode DSA coding, and crack product company placement rounds.',
        skillsToMaster: [
          'Docker & Container Orchestration',
          'GitHub Actions & CI/CD Workflows',
          'Cloud Hosting (AWS / Cloud Run / Vercel)',
          'Advanced DSA (Graphs, Trees, DP)',
          'System Design Fundamentals'
        ],
        recommendedProjects: [
          'Full-Stack Enterprise SaaS Platform with Cloud CI/CD Pipeline'
        ],
        learningPlatforms: ['LeetCode', 'NeetCode 150 Roadmap', 'System Design Primer']
      }
    ]
  },
  {
    careerId: 'cyber-analyst',
    careerTitle: 'Cyber Security & Forensic Analyst',
    category: 'Engineering',
    overview: 'Practitioner roadmap for mastering network defense, penetration testing, SOC monitoring, and vulnerability assessments.',
    prerequisites: ['Networking Basics', 'Command Line Comfort'],
    certificationsToAim: [
      'CompTIA Security+',
      'Certified Ethical Hacker (CEH)',
      'Offensive Security Certified Professional (OSCP)'
    ],
    stages: [
      {
        stageNumber: 1,
        stageName: 'Stage 1: Computer Networks & Operating Systems',
        duration: 'Months 1 - 3',
        objective: 'Master TCP/IP protocols, Linux bash scripting, and system internals.',
        skillsToMaster: [
          'TCP/IP & OSI Model Protocols',
          'Linux Systems Administration (Ubuntu/Kali)',
          'Bash Shell Scripting',
          'Wireshark Network Packet Inspection',
          'Basic Cryptography & SSL/TLS'
        ],
        recommendedProjects: [
          'Network Traffic Packet Analyzer Tool',
          'Automated Linux System Hardening Script'
        ],
        learningPlatforms: ['TryHackMe Pre-Security Path', 'NPTEL Computer Networks']
      },
      {
        stageNumber: 2,
        stageName: 'Stage 2: Ethical Hacking & Web Vulnerabilities',
        duration: 'Months 4 - 6',
        objective: 'Understand the OWASP Top 10 vulnerabilities, penetration testing tools, and web app security.',
        skillsToMaster: [
          'OWASP Top 10 Security Risks',
          'Burp Suite & OWASP ZAP',
          'Nmap Port Scanning & Reconnaissance',
          'SQL Injection & XSS Exploitation',
          'Metasploit Framework'
        ],
        recommendedProjects: [
          'Penetration Test Report on Vulnerable Web Labs (DVWA)',
          'Automated Vulnerability Scanner Script in Python'
        ],
        learningPlatforms: ['Hack The Box', 'PortSwigger Web Security Academy']
      },
      {
        stageNumber: 3,
        stageName: 'Stage 3: SOC Analytics, Forensics & Cloud Defense',
        duration: 'Months 7 - 9',
        objective: 'Monitor Security Information and Event Management (SIEM) systems and conduct digital forensics.',
        skillsToMaster: [
          'Splunk / Elastic SIEM Incident Logging',
          'Digital Forensics & Malware Triage',
          'AWS / Azure Security Hardening',
          'Firewall & IDS/IPS Configuration',
          'Python Security Scripting'
        ],
        recommendedProjects: [
          'Custom SIEM Log Analyzer & Threat Alert System',
          'Memory & Disk Image Forensic Analysis Case Study'
        ],
        learningPlatforms: ['Cybrary', 'SANS Cyber Aces']
      },
      {
        stageNumber: 4,
        stageName: 'Stage 4: Compliance, Bug Bounties & Career Placement',
        duration: 'Months 10 - 12',
        objective: 'Participate in bug bounty programs, master ISO 27001 compliance standards, and prepare for SOC analyst interviews.',
        skillsToMaster: [
          'ISO 27001 & NIST Cybersecurity Framework',
          'Responsible Vulnerability Disclosure',
          'Incident Response Playbook Design',
          'Bug Bounty Hunting Techniques'
        ],
        recommendedProjects: [
          'HackerOne / Bugcrowd Responsible Disclosure Submission Portfolio'
        ],
        learningPlatforms: ['HackerOne Community', 'eJPT Certification Prep']
      }
    ]
  },
  {
    careerId: 'embedded-engineer',
    careerTitle: 'VLSI & Embedded Systems Engineer',
    category: 'Engineering',
    overview: 'Hands-on roadmap for designing microcontrollers, firmware, IoT devices, and semiconductor hardware.',
    prerequisites: ['Basic Electrical Circuit Theory', 'C Programming'],
    certificationsToAim: [
      'ARM Accredited Engineer (AAE)',
      'NPTEL VLSI Design Certification',
      'Naan Mudhalvan EV & Robotics Badge'
    ],
    stages: [
      {
        stageNumber: 1,
        stageName: 'Stage 1: Electronic Circuits & C Programming',
        duration: 'Months 1 - 3',
        objective: 'Master analog/digital circuits, microcontroller architectures, and low-level Embedded C.',
        skillsToMaster: [
          'Embedded C / C++ Programming',
          'Digital Logic Circuit Design',
          'Microcontroller Fundamentals (8051 / AVR / PIC)',
          'Electronic Components & Soldering',
          'Oscilloscope & Multimeter Usage'
        ],
        recommendedProjects: [
          'Digital Temperature & Moisture Sensor Controller',
          '8051 Microcontroller Timer & LED Array Matrix'
        ],
        learningPlatforms: ['NPTEL Embedded Systems', 'Coursera An Introduction to Programming with C']
      },
      {
        stageNumber: 2,
        stageName: 'Stage 2: ARM Cortex, RTOS & Communication Protocols',
        duration: 'Months 4 - 6',
        objective: 'Program 32-bit ARM Cortex processors and use FreeRTOS for multi-tasking applications.',
        skillsToMaster: [
          'ARM Cortex-M Architecture',
          'I2C, SPI, UART & CAN Bus Protocols',
          'FreeRTOS Multi-tasking & Semaphores',
          'PCB Layout Design (KiCad / Eagle)',
          'STM32 Firmware Development'
        ],
        recommendedProjects: [
          'CAN Bus Automotive Telemetry Simulator Node',
          'Multi-Sensor FreeRTOS Data Logger'
        ],
        learningPlatforms: ['STMicroelectronics Tutorials', 'KiCad Academy']
      },
      {
        stageNumber: 3,
        stageName: 'Stage 3: IoT & Electric Vehicle (EV) Systems',
        duration: 'Months 7 - 9',
        objective: 'Build smart connected IoT nodes and Battery Management Systems (BMS) for EVs.',
        skillsToMaster: [
          'ESP32 / Wi-Fi / Bluetooth LE',
          'MQTT / HTTP IoT Cloud Communication',
          'Battery Management System (BMS) Logic',
          'Motor Control (BLDC Drivers)',
          'Verilog HDL Basics (for VLSI)'
        ],
        recommendedProjects: [
          'Smart Agricultural IoT Node with Cloud Dashboard',
          'EV Lithium Battery Thermal & Voltage Monitor'
        ],
        learningPlatforms: ['EdX Embedded Systems', 'Naan Mudhalvan EV Workshops']
      },
      {
        stageNumber: 4,
        stageName: 'Stage 4: VLSI Design, FPGA & Placement Prep',
        duration: 'Months 10 - 12',
        objective: 'Synthesize Verilog on FPGA boards, practice chip design interview questions, and target core hardware companies.',
        skillsToMaster: [
          'Verilog / VHDL Hardware Description Language',
          'FPGA Synthesis (Xilinx Vivado)',
          'CMOS VLSI IC Layout',
          'Static Timing Analysis (STA)'
        ],
        recommendedProjects: [
          'RISC-V 32-bit Soft Processor Core Implemented on FPGA'
        ],
        learningPlatforms: ['NPTEL VLSI Design', 'Xilinx University Program']
      }
    ]
  },
  {
    careerId: 'doctor-physician',
    careerTitle: 'Medical Officer / General Physician / Surgeon',
    category: 'Medical',
    overview: 'Comprehensive medical education and clinical skill progress roadmap from MBBS academic entry to hospital residency and NEET-PG specialization.',
    prerequisites: ['Biology Focus in Higher Secondary', 'NEET Qualification'],
    certificationsToAim: [
      'MBBS Degree (NMC Recognized)',
      'Basic Life Support (BLS) & ACLS Certification',
      'Advanced Trauma Life Support (ATLS)'
    ],
    stages: [
      {
        stageNumber: 1,
        stageName: 'Stage 1: Pre-Clinical Sciences (Phase 1)',
        duration: '1st Year MBBS',
        objective: 'Build solid foundations in human body structure, biochemical processes, and physical mechanics.',
        skillsToMaster: [
          'Human Gross Anatomy & Histology',
          'Physiology & Organ Systems',
          'Biochemistry & Metabolic Pathways',
          'Medical Ethics & Doctor-Patient Communication'
        ],
        recommendedProjects: [
          'Cadaveric Dissection & Anatomical Atlas Mapping',
          'Hematology & Physiological Lab Case Studies'
        ],
        learningPlatforms: ['NMC e-Modules', 'Marrow / Prepladder Phase 1']
      },
      {
        stageNumber: 2,
        stageName: 'Stage 2: Para-Clinical Mastery (Phase 2)',
        duration: '2nd & 3rd Year MBBS',
        objective: 'Understand disease mechanisms, drugs, forensic medicine, and pathology.',
        skillsToMaster: [
          'Pathology & Histopathology Diagnostics',
          'Pharmacology & Drug Prescriptions',
          'Microbiology & Infection Control',
          'Forensic Medicine & Toxicology',
          'Community Medicine & Public Health'
        ],
        recommendedProjects: [
          'Rural Primary Health Center (PHC) Outbreak Study in TN',
          'Clinical Pharmacology Drug Reaction Logbook'
        ],
        learningPlatforms: ['Standard Medical Textbooks (Robbins/KD Tripathi)', 'e-Sanjeevani Telemedicine']
      },
      {
        stageNumber: 3,
        stageName: 'Stage 3: Clinical Postings & Specialty Rotation (Phase 3)',
        duration: '4th & 5th Year MBBS',
        objective: 'Examine patients in wards, participate in surgeries, and master diagnostic reasoning.',
        skillsToMaster: [
          'General Medicine Clinical History Taking',
          'General Surgery & Surgical Suturing',
          'Obstetrics & Gynecology (OBG)',
          'Pediatrics & Neonatal Care',
          'Radiology & ECG Diagnostics'
        ],
        recommendedProjects: [
          'In-patient Clinical Case Presentations in Medical College Hospital',
          'Emergency Room Triage Protocols'
        ],
        learningPlatforms: ['Hospital Ward Rotations', 'AIIMS Clinical Skills Modules']
      },
      {
        stageNumber: 4,
        stageName: 'Stage 4: Rotatory Internship (CRRI) & NEET-PG / NEXT',
        duration: '1 Year Compulsory Internship',
        objective: 'Perform independently as Junior Resident, complete 12 months rotation, and prepare for MD/MS specialization exams.',
        skillsToMaster: [
          'Emergency Trauma Resuscitation',
          'IV Cannulation & Arterial Blood Gas Sampling',
          'Outpatient Department (OPD) Patient Management',
          'NEET-PG / NEXT Entrance Preparation'
        ],
        recommendedProjects: [
          'Completed 365-day Medical Intern Logbook across ER, ICU, Surgery & Medicine'
        ],
        learningPlatforms: ['Government Medical College Rotations', 'NEXT Preparation Test Series']
      }
    ]
  },
  {
    careerId: 'chartered-accountant',
    careerTitle: 'Chartered Accountant / Financial Auditor',
    category: 'Arts & Science',
    overview: 'Structured 3-level ICAI Chartered Accountancy roadmap including CA Foundation, Intermediate, Articleship, and Final examination.',
    prerequisites: ['10+2 Any Stream (Commerce Preferred)', 'Analytical Mindset'],
    certificationsToAim: [
      'ICAI Chartered Accountant Membership',
      'DISA (Diploma in Information System Audit)',
      'Certified Information Systems Auditor (CISA)'
    ],
    stages: [
      {
        stageNumber: 1,
        stageName: 'Stage 1: CA Foundation & Accounting Principles',
        duration: 'Months 1 - 6',
        objective: 'Clear ICAI Foundation exam with strong grounding in financial accounting and business laws.',
        skillsToMaster: [
          'Principles & Practice of Accounting',
          'Business Laws & Contract Act',
          'Quantitative Aptitude & Statistics',
          'Business Economics & Financial Markets'
        ],
        recommendedProjects: [
          'Sole Proprietorship Balance Sheet & Trial Balance Design',
          'Case Study Analysis on Contract Law Judgments'
        ],
        learningPlatforms: ['ICAI BOS Portal', 'Unacademy CA Foundation']
      },
      {
        stageNumber: 2,
        stageName: 'Stage 2: CA Intermediate (Group 1 & Group 2)',
        duration: 'Months 7 - 18',
        objective: 'Master corporate accounting, direct/indirect taxation, auditing standards, and cost management.',
        skillsToMaster: [
          'Advanced Corporate Accounting',
          'GST (Goods & Services Tax) & Income Tax',
          'Auditing & Assurance Standards',
          'Cost & Management Accounting',
          'Enterprise Information Systems (EIS)'
        ],
        recommendedProjects: [
          'Filing GST Returns & Tax Computation Mock Spreadsheet',
          'Internal Audit Checklist for Retail Business'
        ],
        learningPlatforms: ['ICAI Study Material', 'ICAI Cloud Campus']
      },
      {
        stageNumber: 3,
        stageName: 'Stage 3: 2-Year Practical Articleship Training',
        duration: 'Years 2 - 4',
        objective: 'Work under a practicing CA firm auditing companies, conducting tax audits, and filing corporate returns.',
        skillsToMaster: [
          'Statutory Auditing of Private/Public Companies',
          'Tally Prime & SAP Financial Modules',
          'Tax Audit Form 3CD Preparation',
          'Company Law & MCA21 Filings',
          'Financial Statement Analysis'
        ],
        recommendedProjects: [
          'Complete Audit File Execution for Manufacturing/IT Firm'
        ],
        learningPlatforms: ['CA Firm Articleship', 'ICAI Advanced IT & Soft Skills Training (AICITSS)']
      },
      {
        stageNumber: 4,
        stageName: 'Stage 4: CA Final Examination & Corporate Advisory',
        duration: 'Final Year',
        objective: 'Clear CA Final exams, qualify as Chartered Accountant, and join Big 4 or top corporate finance divisions.',
        skillsToMaster: [
          'Financial Reporting (Ind AS / IFRS)',
          'Strategic Financial Management (SFM)',
          'Advanced Tax Laws & International Taxation',
          'Corporate Restructuring & Mergers'
        ],
        recommendedProjects: [
          'Valuation Report for M&A Tech Startup Deal'
        ],
        learningPlatforms: ['ICAI Final Live Coaching', 'Big 4 Placement Drives']
      }
    ]
  },
  {
    careerId: 'agri-officer',
    careerTitle: 'Agricultural Officer / Agronomist',
    category: 'Agriculture',
    overview: 'Progress roadmap combining B.Sc Agriculture curriculum with agri-tech, soil science, crop protection, and TNPSC AO competitive exams.',
    prerequisites: ['10+2 Biology/Agriculture Stream', 'Passion for Farming & Environment'],
    certificationsToAim: [
      'Tamil Nadu State Agricultural Officer Qualification',
      'Certified Precision Agriculture Professional',
      'Organic Crop Inspector Certification'
    ],
    stages: [
      {
        stageNumber: 1,
        stageName: 'Stage 1: Plant Sciences & Agronomy Basics',
        duration: 'Year 1 (College)',
        objective: 'Understand crop botany, soil chemistry, plant genetics, and meteorological principles.',
        skillsToMaster: [
          'Crop Production Fundamentals',
          'Soil Science & Fertility Testing',
          'Plant Physiology & Biochemistry',
          'Agricultural Meteorology',
          'Farm Machinery Basics'
        ],
        recommendedProjects: [
          'Soil Nutrient NPK Testing Report across District Farms',
          'Herbarium Collection & Weed Identification Manual'
        ],
        learningPlatforms: ['TNAU e-Learn Portal', 'ICAR e-Courseware']
      },
      {
        stageNumber: 2,
        stageName: 'Stage 2: Crop Protection, Irrigation & Pathology',
        duration: 'Year 2 & 3',
        objective: 'Diagnose plant diseases, manage insect pests, and master modern micro-irrigation systems.',
        skillsToMaster: [
          'Entomology & Pest Management',
          'Plant Pathology & Disease Control',
          'Micro-Irrigation (Drip & Sprinkler)',
          'Seed Technology & Hybridization',
          'Organic Farming Standards'
        ],
        recommendedProjects: [
          'Bio-Pesticide Preparation & Field Trial',
          'Drip Irrigation Design for Paddy & Sugarcane'
        ],
        learningPlatforms: ['TNAU Agritech Portal', 'NPTEL Agricultural Extension']
      },
      {
        stageNumber: 3,
        stageName: 'Stage 3: Agri-Tech, Drones & RAWE Field Training',
        duration: 'Year 4 (RAWE Internship)',
        objective: 'Live in rural villages during Rural Agricultural Work Experience (RAWE), deploy Agri-Drones and Smart Sensors.',
        skillsToMaster: [
          'Agri-Drone Spraying Protocols',
          'GIS & Remote Sensing for Crop Mapping',
          'Agricultural Economics & Marketing',
          'Extension Teaching Methods with Farmers',
          'Government Welfare Schemes (PM-KISAN / Kalaignar Scheme)'
        ],
        recommendedProjects: [
          'Village Agricultural Development Plan (VADP) Execution',
          'Agri-Startup Business Model Proposal'
        ],
        learningPlatforms: ['TNAU Village Stay Posting', 'MANAGE Agri-Clinics Scheme']
      },
      {
        stageNumber: 4,
        stageName: 'Stage 4: TNPSC Agricultural Officer Exam & Govt Service',
        duration: 'Post-Graduation Prep',
        objective: 'Crack TNPSC Agricultural Officer (AO) exam or join corporate fertilizer, seed, and agri-banking sectors.',
        skillsToMaster: [
          'TNPSC AO Paper I (Agriculture Science) & Paper II (General Studies)',
          'Bank AO (IBPS AFO) Entrance Training',
          'Agri-Credit & NABARD Loan Appraisal',
          'Rural Communication in Tamil'
        ],
        recommendedProjects: [
          'TNPSC Agricultural Officer Mock Exam Mastery'
        ],
        learningPlatforms: ['TNPSC Coaching Modules', 'IBPS AFO Test Series']
      }
    ]
  },
  {
    careerId: 'business-analyst',
    careerTitle: 'Business Analyst / Management Consultant',
    category: 'Arts & Science',
    overview: 'Roadmap for transforming raw business data into strategic decisions using SQL, Tableau, financial modeling, and process optimization.',
    prerequisites: ['Analytical Aptitude', 'Good Communication'],
    certificationsToAim: [
      'ECBA / CCBA (IIBA Business Analysis)',
      'Microsoft Certified: Power BI Data Analyst Associate',
      'Tableau Certified Data Analyst'
    ],
    stages: [
      {
        stageNumber: 1,
        stageName: 'Stage 1: Excel Mastery & SQL Data Querying',
        duration: 'Months 1 - 3',
        objective: 'Perform business data wrangling, formula modeling, and SQL database queries.',
        skillsToMaster: [
          'Advanced Excel (VLOOKUP, INDEX/MATCH, Pivot Tables)',
          'SQL Database Queries & Joins',
          'Descriptive Business Statistics',
          'Data Cleaning & Transformation',
          'Requirement Gathering Basics'
        ],
        recommendedProjects: [
          'Retail Sales Analysis Spreadsheet Model',
          'Customer Order SQL Database Query Suite'
        ],
        learningPlatforms: ['Excel Skills for Business (Coursera)', 'Mode Analytics SQL Tutorial']
      },
      {
        stageNumber: 2,
        stageName: 'Stage 2: Business Intelligence & Visualization',
        duration: 'Months 4 - 6',
        objective: 'Create interactive dashboards in Power BI and Tableau for executive decision-making.',
        skillsToMaster: [
          'Microsoft Power BI & DAX Formulas',
          'Tableau Dashboard Design',
          'Data Storytelling & Executive Presentation',
          'BPMN Process Flowcharting (Visio/Lucidchart)',
          'Agile / Scrum Methodologies'
        ],
        recommendedProjects: [
          'E-Commerce Executive KPI Performance Dashboard',
          'Hospitality Revenue & Occupancy Analysis'
        ],
        learningPlatforms: ['Microsoft Learn Power BI Path', 'Tableau eLearning']
      },
      {
        stageNumber: 3,
        stageName: 'Stage 3: Python for Business & Financial Modeling',
        duration: 'Months 7 - 9',
        objective: 'Automate business reporting with Python and build financial projections.',
        skillsToMaster: [
          'Python for Data Analysis (Pandas/Seaborn)',
          'Financial Statement Modeling & Forecasting',
          'User Stories & BRD (Business Requirements Document) Writing',
          'A/B Testing & Market Experimentation'
        ],
        recommendedProjects: [
          'Automated Python Report Generator for Monthly Financials',
          'Comprehensive BRD Document for Mobile Banking App'
        ],
        learningPlatforms: ['IIBA Entry Certificate in Business Analysis', 'Udemy Python for BA']
      },
      {
        stageNumber: 4,
        stageName: 'Stage 4: Case Studies, Product Management & Placement',
        duration: 'Months 10 - 12',
        objective: 'Solve consulting case studies, practice stakeholder communication, and crack product company interviews.',
        skillsToMaster: [
          'Management Consulting Case Frameworks',
          'Stakeholder Interviewing & Conflict Resolution',
          'Product Roadmap & Feature Prioritization (RICE/Kano)',
          'Mock Business Presentation'
        ],
        recommendedProjects: [
          'Market Entry Strategy Case Study for EV Launch in Tamil Nadu'
        ],
        learningPlatforms: ['Victor Cheng Case Interview', 'Product School Resources']
      }
    ]
  }
];

// Helper to retrieve roadmap by career ID
export function getSkillRoadmapByCareerId(careerId: string): SkillRoadmap | undefined {
  return SKILL_ROADMAPS_DATA.find(r => r.careerId === careerId);
}
