export interface ScholarshipScheme {
  id: string;
  name: string;
  category: 'Government' | 'Private/Foundation' | 'Special Quota' | 'Central';
  offeredBy: string;
  amount: string;
  annualValue: number; // estimated numeric benefit in INR
  targetAudience: string;
  description: string;
  criteria: {
    gender?: 'Female' | 'Male' | 'All';
    isGovtSchoolOnly?: boolean;
    isFirstGraduateOnly?: boolean;
    communityRequirement?: string[]; // e.g. ['SC', 'ST', 'SCC']
    maxAnnualIncomeLakhs?: number;
    minPercentage?: number;
    minCutoff?: number;
    collegeTypeEligibility?: string[]; // ['Government', 'Autonomous', 'Private']
  };
  benefits: string[];
  documentsRequired: string[];
  applicationPortal: string;
  portalUrl: string;
}

export interface StudentScholarshipProfile {
  gender: 'Female' | 'Male' | 'Other' | 'Choose';
  isGovtSchoolStudent: boolean | 'Choose';
  isFirstGraduate: boolean | 'Choose';
  community: 'OC' | 'BC' | 'MBC/DNC' | 'SC' | 'ST' | 'SCC' | 'Choose';
  annualFamilyIncomeLakhs: number | '';
  hscPercentage: number | '';
  cutoffScore: number | '';
  isDifferentlyAbled: boolean;
}

export const TN_SCHOLARSHIPS_DATA: ScholarshipScheme[] = [
  {
    id: 'pudhumai-penn',
    name: 'Pudhumai Penn Scheme (Moovalur Ramamirtham Scheme)',
    category: 'Government',
    offeredBy: 'Department of Higher Education, Govt of Tamil Nadu',
    amount: '₹1,000 / Month (₹12,000 / Year)',
    annualValue: 12000,
    targetAudience: 'Female students who completed Class 6 to 12 in TN Govt Schools',
    description: 'Direct Benefit Transfer (DBT) of ₹1,000 per month credited directly into bank accounts of eligible girl students pursuing higher education degrees or diplomas.',
    criteria: {
      gender: 'Female',
      isGovtSchoolOnly: true
    },
    benefits: [
      '₹1,000 per month credited directly to student bank account until degree completion',
      'Applicable for Arts, Science, Engineering, Medical, and Diploma courses',
      'No income limit condition'
    ],
    documentsRequired: [
      'Class 6th to 12th TN Govt School Study Certificates (EMIS ID)',
      'Aadhaar Card linked with active Bank Account',
      'College Admission Fee Receipt & Student ID'
    ],
    applicationPortal: 'Pudhumai Penn Official Portal',
    portalUrl: 'https://penkalvi.tn.gov.in'
  },
  {
    id: 'tamil-pudhalvan',
    name: 'Tamil Pudhalvan Scheme',
    category: 'Government',
    offeredBy: 'Department of Higher Education, Govt of Tamil Nadu',
    amount: '₹1,000 / Month (₹12,000 / Year)',
    annualValue: 12000,
    targetAudience: 'Male students who completed Class 6 to 12 in TN Govt Schools',
    description: 'Monthly assistance scheme empowering young male students from Tamil Nadu government schools to successfully complete higher education.',
    criteria: {
      gender: 'Male',
      isGovtSchoolOnly: true
    },
    benefits: [
      '₹1,000 monthly allowance directly transferred to Aadhaar-seeded bank account',
      'Valid for 3 to 4 years of undergraduate study',
      'Assists with books, transport, and academic materials'
    ],
    documentsRequired: [
      'Class 6-12 Govt School Bonafide Certificate',
      'Aadhaar Card & Bank Passbook Copy',
      'Higher Education College Identity Card'
    ],
    applicationPortal: 'Tamil Pudhalvan Portal',
    portalUrl: 'https://penkalvi.tn.gov.in'
  },
  {
    id: 'tn-7point5-govt-quota',
    name: '7.5% Special Govt School Reservation & Free Education',
    category: 'Special Quota',
    offeredBy: 'Government of Tamil Nadu (TNEA & TN NEET Counseling)',
    amount: '100% Tuition, Hostel & Book Fee Waiver (~₹1.5 Lakhs/yr)',
    annualValue: 150000,
    targetAudience: 'Students admitted under 7.5% preferential quota for TN Govt School students',
    description: 'Under this historic scheme, the Tamil Nadu state government completely bears the full cost of tuition, hostel, transport, and counseling fees for students admitted through the 7.5% quota.',
    criteria: {
      isGovtSchoolOnly: true,
      collegeTypeEligibility: ['Government', 'Autonomous', 'Private']
    },
    benefits: [
      '100% Waiver of Tuition Fees, Special Fees, and Development Fees',
      'Complete waiver of Hostel Accommodation & Mess Charges',
      'Free textbook kit and counseling processing fee waiver'
    ],
    documentsRequired: [
      'CEO / Headmaster Certified 6th to 12th School Bonafide',
      'TNEA / TN NEET Counseling Allotment Order under 7.5% Quota',
      'Income Certificate & Community Certificate'
    ],
    applicationPortal: 'TNEA / TN Medical Admission Portal',
    portalUrl: 'https://www.tneaonline.org'
  },
  {
    id: 'first-generation-graduate',
    name: 'First Generation Graduate (FG) Fee Concession',
    category: 'Government',
    offeredBy: 'Directorate of Technical Education (DOTE), Tamil Nadu',
    amount: 'Tuition Fee Reduction ₹20,000 - ₹27,500 / Year',
    annualValue: 25000,
    targetAudience: 'Students who are the first in their family to pursue a professional degree',
    description: 'Subsidizes tuition fees for professional degree admissions (Engineering, Medical, Agri) when no other sibling or parent holds a graduate degree.',
    criteria: {
      isFirstGraduateOnly: true,
      collegeTypeEligibility: ['Government', 'Autonomous', 'Private']
    },
    benefits: [
      'Direct reduction of tuition fees up to ₹25,000 per year in self-financing engineering colleges',
      'Valid for the entire duration of 4 years',
      'No strict income cap if official First Graduate Certificate is issued by Tahsildar'
    ],
    documentsRequired: [
      'First Graduate Certificate issued by e-Seva / Tahsildar',
      'Joint Declaration Form signed by Parents & Candidate',
      'Family Smart Ration Card & Transfer Certificate (TC)'
    ],
    applicationPortal: 'e-Seva TN e-District Portal',
    portalUrl: 'https://www.tnesevai.tn.gov.in'
  },
  {
    id: 'post-matric-sc-st',
    name: 'Post-Matric Scholarship for SC / ST / SCC Students',
    category: 'Government',
    offeredBy: 'Adi Dravidar and Tribal Welfare Department, Govt of Tamil Nadu',
    amount: '100% Tuition Fee Waiver + Annual Maintenance Allowance',
    annualValue: 85000,
    targetAudience: 'SC, ST, and Scheduled Caste Converts to Christianity (SCC)',
    description: 'Comprehensive financial support covering 100% tuition fees and maintenance grants for SC/ST students in government and self-financing institutions admitted under counseling quota.',
    criteria: {
      communityRequirement: ['SC', 'ST', 'SCC'],
      maxAnnualIncomeLakhs: 2.5
    },
    benefits: [
      'Full tuition fee reimbursement paid directly to the institution',
      'Annual maintenance allowance up to ₹13,500 for hostellers / day scholars',
      'Exemption from non-refundable deposit fees'
    ],
    documentsRequired: [
      'Permanent Community Certificate with QR code',
      'Income Certificate from e-Seva (Income <= ₹2.5 LPA)',
      'TNEA/University Allotment Order'
    ],
    applicationPortal: 'TN e-Scholarship Portal',
    portalUrl: 'https://escholarship.tn.gov.in'
  },
  {
    id: 'bc-mbc-welfare',
    name: 'BC / MBC / DNC Welfare Higher Education Scholarship',
    category: 'Government',
    offeredBy: 'Backward Classes, MBC & Minorities Welfare Dept, Tamil Nadu',
    amount: 'Full Tuition Fee Waiver in Govt/Aided Colleges + Maintenance Grant',
    annualValue: 35000,
    targetAudience: 'Backward Classes (BC), Most Backward Classes (MBC), and Denotified Communities (DNC)',
    description: 'Provides free education for BC/MBC/DNC students in government and aided institutions, plus partial fee support for professional streams.',
    criteria: {
      communityRequirement: ['BC', 'MBC/DNC'],
      maxAnnualIncomeLakhs: 2.5
    },
    benefits: [
      'Complete tuition fee exemption for 3-year and 4-year degree programs in Govt/Aided colleges',
      'Special book grant for professional courses',
      'Hostel maintenance grant'
    ],
    documentsRequired: [
      'BC / MBC / DNC Permanent Community Certificate',
      'Annual Income Certificate (Income <= ₹2.5 Lakhs)',
      'Class 12 Marks Statement & Bonafide Certificate'
    ],
    applicationPortal: 'TN BC/MBC Welfare Portal',
    portalUrl: 'https://bcmbc.tn.gov.in'
  },
  {
    id: 'cm-merit-award',
    name: 'Chief Minister’s Talent Search & Merit Award',
    category: 'Government',
    offeredBy: 'Chief Minister’s Special Cell, Govt of Tamil Nadu',
    amount: '₹50,000 / Year + Merit Gold Citation',
    annualValue: 50000,
    targetAudience: 'Top scorers in Class 12 Higher Secondary Examinations (HSC >= 90% or Cutoff >= 190)',
    description: 'Prestigious award recognizing academic excellence in Higher Secondary examinations to encourage top rankers pursuing higher technical education in Tamil Nadu.',
    criteria: {
      minPercentage: 90,
      minCutoff: 190
    },
    benefits: [
      'Financial grant of ₹50,000 per academic year',
      'Free state-sponsored laptop and advanced learning subscription',
      'Priority consideration for state research internships'
    ],
    documentsRequired: [
      'Class 12 Marksheet verified by DGE Tamil Nadu',
      'TNEA Cutoff Certificate',
      'Bank Account Passbook & Aadhaar Card'
    ],
    applicationPortal: 'TN DGE Official Portal',
    portalUrl: 'https://dge.tn.gov.in'
  },
  {
    id: 'aicte-pragathi-girls',
    name: 'AICTE Pragati Scholarship for Girl Students',
    category: 'Central',
    offeredBy: 'AICTE, Ministry of Education, Govt of India',
    amount: '₹50,000 / Year for 4 Years',
    annualValue: 50000,
    targetAudience: 'Female students admitted to 1st year B.E./B.Tech programs in AICTE approved institutions',
    description: 'Central government scholarship scheme designed to empower young women pursuing technical engineering education across India.',
    criteria: {
      gender: 'Female',
      maxAnnualIncomeLakhs: 8.0,
      collegeTypeEligibility: ['Government', 'Autonomous', 'Private']
    },
    benefits: [
      '₹50,000 lump sum per annum towards tuition fee, computer purchase, or hostel charges',
      '10,000 scholarships awarded across India every year',
      'Renewable for up to 4 years'
    ],
    documentsRequired: [
      'Class 10th and 12th Marksheets',
      'Family Annual Income Certificate (< ₹8 Lakhs)',
      'Admission Allotment Letter from TNEA'
    ],
    applicationPortal: 'National Scholarship Portal (NSP)',
    portalUrl: 'https://scholarships.gov.in'
  },
  {
    id: 'merit-cum-means-private',
    name: 'Institutional Merit-Cum-Means Scholarship (Private Trust)',
    category: 'Private/Foundation',
    offeredBy: 'College Alumni Associations & Private Educational Trusts (e.g. SSN / PSG / Sona)',
    amount: '₹40,000 - ₹75,000 / Year Waiver',
    annualValue: 60000,
    targetAudience: 'High-merit students (Cutoff >= 185) with family income under ₹3.5 Lakhs/year',
    description: 'Offered by top autonomous and private institutions in Tamil Nadu to ensure talented students are not deprived of quality education due to financial constraints.',
    criteria: {
      minCutoff: 185,
      maxAnnualIncomeLakhs: 3.5,
      collegeTypeEligibility: ['Autonomous', 'Private']
    },
    benefits: [
      'Partial to full waiver of college tuition and laboratory fees',
      'Access to free campus placement training and skill development programs',
      'Laptops and library book bank access'
    ],
    documentsRequired: [
      'Class 12 Marksheet & Cutoff Card',
      'Income Certificate issued by Revenue Authority',
      'Statement of Purpose (SOP) & College Admission Proof'
    ],
    applicationPortal: 'College Financial Aid Office',
    portalUrl: 'https://www.tneaonline.org'
  }
];

export function checkScholarshipEligibility(
  scholarship: ScholarshipScheme,
  student: StudentScholarshipProfile
): { isEligible: boolean; matchScore: number; matchReasons: string[]; disqualifyingReasons: string[] } {
  const matchReasons: string[] = [];
  const disqualifyingReasons: string[] = [];
  let score = 100;

  const { criteria } = scholarship;

  // 1. Gender check
  if (criteria.gender && criteria.gender !== 'All') {
    if (student.gender === 'Choose' || !student.gender) {
      disqualifyingReasons.push(`Select gender in profile criteria (Requires: ${criteria.gender})`);
      score -= 50;
    } else if (student.gender !== criteria.gender) {
      disqualifyingReasons.push(`Requires candidate gender to be ${criteria.gender} (Current: ${student.gender})`);
      score -= 50;
    } else {
      matchReasons.push(`Gender requirement matched (${criteria.gender})`);
    }
  }

  // 2. Govt school requirement
  if (criteria.isGovtSchoolOnly) {
    if (student.isGovtSchoolStudent === 'Choose') {
      disqualifyingReasons.push('Select TN Govt School status (Class 6–12 required)');
      score -= 50;
    } else if (!student.isGovtSchoolStudent) {
      disqualifyingReasons.push('Requires Class 6–12 education in Tamil Nadu Government Schools');
      score -= 50;
    } else {
      matchReasons.push('Class 6–12 TN Govt School background verified');
    }
  }

  // 3. First graduate requirement
  if (criteria.isFirstGraduateOnly) {
    if (student.isFirstGraduate === 'Choose') {
      disqualifyingReasons.push('Select First Graduate status');
      score -= 40;
    } else if (!student.isFirstGraduate) {
      disqualifyingReasons.push('Requires candidate to be the First Graduate in the family');
      score -= 40;
    } else {
      matchReasons.push('First Generation Graduate status verified');
    }
  }

  // 4. Community check
  if (criteria.communityRequirement && criteria.communityRequirement.length > 0) {
    if (student.community === 'Choose' || !student.community) {
      disqualifyingReasons.push(`Select Community category (Reserved for: ${criteria.communityRequirement.join(', ')})`);
      score -= 50;
    } else if (!criteria.communityRequirement.includes(student.community)) {
      disqualifyingReasons.push(`Reserved for communities: ${criteria.communityRequirement.join(', ')} (Current: ${student.community})`);
      score -= 50;
    } else {
      matchReasons.push(`Community quota matched (${student.community})`);
    }
  }

  // 5. Income check
  if (criteria.maxAnnualIncomeLakhs !== undefined) {
    if (student.annualFamilyIncomeLakhs === '' || typeof student.annualFamilyIncomeLakhs !== 'number') {
      disqualifyingReasons.push(`Enter Annual Family Income (Max limit: ₹${criteria.maxAnnualIncomeLakhs} Lakhs)`);
      score -= 40;
    } else if (student.annualFamilyIncomeLakhs > criteria.maxAnnualIncomeLakhs) {
      disqualifyingReasons.push(`Family annual income exceeds limit of ₹${criteria.maxAnnualIncomeLakhs} Lakhs (Current: ₹${student.annualFamilyIncomeLakhs} Lakhs)`);
      score -= 40;
    } else {
      matchReasons.push(`Family income within limit (₹${student.annualFamilyIncomeLakhs} L <= ₹${criteria.maxAnnualIncomeLakhs} L)`);
    }
  }

  // 6. HSC percentage check
  if (criteria.minPercentage !== undefined) {
    if (student.hscPercentage === '' || typeof student.hscPercentage !== 'number') {
      disqualifyingReasons.push(`Enter HSC Overall Percentage (Minimum required: ${criteria.minPercentage}%)`);
      score -= 30;
    } else if (student.hscPercentage < criteria.minPercentage) {
      disqualifyingReasons.push(`Minimum 12th Board marks required: ${criteria.minPercentage}% (Current: ${student.hscPercentage}%)`);
      score -= 30;
    } else {
      matchReasons.push(`Academic performance criteria met (${student.hscPercentage}% >= ${criteria.minPercentage}%)`);
    }
  }

  // 7. Cutoff score check
  if (criteria.minCutoff !== undefined) {
    if (student.cutoffScore === '' || typeof student.cutoffScore !== 'number' || student.cutoffScore <= 0) {
      disqualifyingReasons.push(`Enter TNEA Cutoff score (Minimum required: ${criteria.minCutoff})`);
      score -= 30;
    } else if (student.cutoffScore < criteria.minCutoff) {
      disqualifyingReasons.push(`Minimum TNEA cutoff required: ${criteria.minCutoff} (Current: ${student.cutoffScore})`);
      score -= 30;
    } else {
      matchReasons.push(`TNEA Cutoff score met (${student.cutoffScore} >= ${criteria.minCutoff})`);
    }
  }

  const isEligible = disqualifyingReasons.length === 0;

  return {
    isEligible,
    matchScore: Math.max(0, score),
    matchReasons,
    disqualifyingReasons
  };
}
