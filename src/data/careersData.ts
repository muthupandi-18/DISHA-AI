import { CareerDetail } from '../types';

export const CAREERS_DATA: CareerDetail[] = [
  {
    id: 'ai-engineer',
    title: 'AI & Machine Learning Engineer',
    category: 'Engineering',
    description: 'Designs, trains, and deploys deep neural networks, LLMs, computer vision, and autonomous decision models for enterprise products.',
    requiredSkills: ['Programming', 'Logical Thinking', 'Problem Solving', 'Data Analysis', 'Critical Thinking'],
    expectedSalary: '7.5 - 24 LPA',
    industries: ['Information Technology', 'Healthcare AI', 'Automotive & Autonomous Driving', 'Fintech', 'E-Commerce'],
    growthRate: '+34% Very High',
    futureDemand: 'Crucial global role as AI is integrated into all software products and industrial automation.',
    relatedCourses: ['Artificial Intelligence & Data Science (AI & DS)', 'Computer Science & Engineering (CSE)', 'Information Technology (IT)']
  },
  {
    id: 'software-developer',
    title: 'Full Stack / Software Engineer',
    category: 'Engineering',
    description: 'Builds scalable web applications, mobile apps, enterprise cloud microservices, and backend APIs.',
    requiredSkills: ['Programming', 'Problem Solving', 'Logical Thinking', 'Team Work'],
    expectedSalary: '6.0 - 20 LPA',
    industries: ['Software Product Companies', 'SaaS Giants', 'Banking & Finance', 'Gaming', 'Consulting'],
    growthRate: '+25% High',
    futureDemand: 'Evergreen baseline role across tech hubs in Chennai, Coimbatore, Bengaluru, and global remote opportunities.',
    relatedCourses: ['Computer Science & Engineering (CSE)', 'Information Technology (IT)', 'BCA (Bachelor of Computer Applications)', 'B.Sc Computer Science']
  },
  {
    id: 'cyber-analyst',
    title: 'Cyber Security & Forensic Analyst',
    category: 'Engineering',
    description: 'Protects critical IT infrastructure, performs ethical hacking penetration testing, audits cloud security, and investigates cyber incidents.',
    requiredSkills: ['Critical Thinking', 'Programming', 'Problem Solving', 'Logical Thinking'],
    expectedSalary: '6.5 - 22 LPA',
    industries: ['Cybersecurity Agencies', 'Defense & Intelligence', 'Banking & Payment Gateways', 'Government IT'],
    growthRate: '+32% Very High',
    futureDemand: 'Massive talent shortage in cybersecurity ensures premium compensation and high job security.',
    relatedCourses: ['Cyber Security & Forensic Engineering', 'Computer Science & Engineering (CSE)', 'Information Technology (IT)']
  },
  {
    id: 'embedded-engineer',
    title: 'VLSI & Embedded Systems Engineer',
    category: 'Engineering',
    description: 'Develops chip architectures, microcontrollers, IoT sensor nodes, and electronic control units (ECUs) for EV and telecommunications.',
    requiredSkills: ['Hardware Interfacing', 'Logical Thinking', 'Problem Solving', 'Programming'],
    expectedSalary: '6.0 - 18 LPA',
    industries: ['Semiconductor Design Fabs', 'Automotive & EV Manufacturing', 'Consumer Electronics', 'Telecom 5G/6G'],
    growthRate: '+28% High',
    futureDemand: 'High growth driven by India Semiconductor Mission and semiconductor fab investments in Tamil Nadu.',
    relatedCourses: ['Electronics & Communication Engineering (ECE)', 'Electrical & Electronics Engineering (EEE)']
  },
  {
    id: 'doctor-physician',
    title: 'Medical Officer / General Physician / Surgeon',
    category: 'Medical',
    description: 'Diagnoses medical illnesses, prescribes medications, performs surgical procedures, and manages patient health in government and private medical centers.',
    requiredSkills: ['Clinical Aptitude', 'Critical Thinking', 'Communication', 'Problem Solving', 'Leadership'],
    expectedSalary: '9.0 - 30 LPA',
    industries: ['Government Medical Hospitals', 'Multispecialty Healthcare Chains', 'Private Medical Clinics', 'Medical Research Institutes'],
    growthRate: '+20% High',
    futureDemand: 'Prestige medical role with lifelong career stability and continuous specialization options.',
    relatedCourses: ['MBBS (Bachelor of Medicine and Bachelor of Surgery)']
  },
  {
    id: 'dental-surgeon',
    title: 'Dental Surgeon & Orthodontist',
    category: 'Medical',
    description: 'Provides oral healthcare, cosmetic dental aligners, root canal therapy, oral surgery, and dental implant procedures.',
    requiredSkills: ['Clinical Aptitude', 'Creativity', 'Communication', 'Drawing'],
    expectedSalary: '5.5 - 16 LPA',
    industries: ['Dental Clinics', 'Multispecialty Hospitals', 'Dental Research Labs', 'Private Practice'],
    growthRate: '+18% Moderate-High',
    futureDemand: 'Steady expansion in cosmetic dentistry, pediatric dental care, and dental implantology.',
    relatedCourses: ['BDS (Bachelor of Dental Surgery)']
  },
  {
    id: 'agri-officer',
    title: 'Agricultural Officer / Agronomist',
    category: 'Agriculture',
    description: 'Advises farmers on crop management, precision soil nutrition, organic pest control, seed technology, and implements government agricultural welfare schemes.',
    requiredSkills: ['Agricultural Science', 'Research', 'Problem Solving', 'Communication'],
    expectedSalary: '5.0 - 14 LPA',
    industries: ['Tamil Nadu Agriculture Dept', 'Agri-Tech Companies', 'Fertilizer & Seed Corporations', 'Rural Development Banks'],
    growthRate: '+22% High',
    futureDemand: 'Direct government posts via TNPSC and private agri-tech corporate recruitment.',
    relatedCourses: ['B.Sc (Hons.) Agriculture']
  },
  {
    id: 'veterinary-surgeon',
    title: 'Veterinary Assistant Surgeon / Animal Health Officer',
    category: 'Agriculture',
    description: 'Diagnoses and treats livestock, poultry flocks, companion pets, performs animal surgeries, and monitors dairy herd health.',
    requiredSkills: ['Clinical Aptitude', 'Agricultural Science', 'Problem Solving', 'Team Work'],
    expectedSalary: '6.0 - 16 LPA',
    industries: ['TN Animal Husbandry Department', 'Poultry Conglomerates', 'Dairy Cooperatives', 'Pet Veterinary Clinics'],
    growthRate: '+24% High',
    futureDemand: 'Strong government job postings in Tamil Nadu rural veterinary dispensaries and booming urban pet hospitals.',
    relatedCourses: ['B.V.Sc & AH (Bachelor of Veterinary Science & Animal Husbandry)']
  },
  {
    id: 'chartered-accountant',
    title: 'Chartered Accountant / Financial Auditor',
    category: 'Arts & Science',
    description: 'Audits corporate balance sheets, manages corporate taxation, financial strategy, investment planning, and regulatory compliance.',
    requiredSkills: ['Critical Thinking', 'Problem Solving', 'Management', 'Data Analysis'],
    expectedSalary: '8.0 - 25 LPA',
    industries: ['Big 4 Accounting Firms', 'Banking & Financial Institutions', 'Corporate Tax Consultancies', 'Government Income Tax Dept'],
    growthRate: '+22% High',
    futureDemand: 'Essential high-level role across all business enterprises, financial advisory firms, and MNCs.',
    relatedCourses: ['B.Com (General / Accounting & Finance / CA)', 'BBA (Bachelor of Business Administration)']
  },
  {
    id: 'business-analyst',
    title: 'Business Analyst / Management Consultant',
    category: 'Arts & Science',
    description: 'Analyzes business performance data, optimizes operational workflows, formulates market expansion strategies, and manages key corporate client projects.',
    requiredSkills: ['Leadership', 'Management', 'Communication', 'Public Speaking', 'Data Analysis'],
    expectedSalary: '6.5 - 18 LPA',
    industries: ['Management Consultancies', 'IT Business Operations', 'E-Commerce Platforms', 'FMCG Corporate Groups'],
    growthRate: '+26% High',
    futureDemand: 'High demand as companies rely heavily on data-driven strategic decisions and digital modernization.',
    relatedCourses: ['BBA (Bachelor of Business Administration)', 'B.Com (General / Accounting & Finance / CA)', 'B.Sc Computer Science / Data Science']
  }
];
