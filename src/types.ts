export type StreamType = 'Choose Stream' | 'Computer Science' | 'Biology' | 'Commerce' | 'Mathematics' | 'Vocational' | '';

export type CategoryType = 'Engineering' | 'Medical' | 'Agriculture' | 'Arts & Science';

export type CollegeType = 'Government' | 'Private' | 'Autonomous' | 'Aided' | 'Deemed' | 'Central';

export interface StudentProfile {
  id: string;
  ownerUsername?: string;
  name: string;
  email: string;
  phone: string;
  hscBoard: string;
  overallPercentage: number;
  stream: StreamType;
  category: CategoryType;
  preferredDistrict: string;
  
  // Subject Marks
  mathsMark?: number;
  physicsMark?: number;
  chemistryMark?: number;
  biologyMark?: number;
  neetScore?: number;
  
  // Calculated Cutoffs
  engineeringCutoff?: number;
  agriCutoff?: number;
  
  skills: string[];
  interests: string[];
  hasUserCustomizedSkills?: boolean;
  hasUserCustomizedInterests?: boolean;
  hasSubmittedForm?: boolean;
}

export interface College {
  id: string;
  code: string; // TNEA / Counseling Code (e.g., 2001)
  name: string;
  district: string;
  type: CollegeType;
  category: CategoryType[];
  courses: string[];
  placementRating: number; // 1 to 5 stars
  placementRatePercent: number;
  avgPackageLpa: number;
  highestPackageLpa: number;
  accreditation: 'NAAC A++' | 'NAAC A+' | 'NAAC A' | 'NBA Accredited' | 'A++ (Autonomous)' | 'Govt Recognized';
  previousCutoff: Record<string, number>; // Branch -> Cutoff
  website: string;
  imageUrl: string;
  address: string;
  establishedYear: number;
  feesPerYear: string;
  hostelAvailable: boolean;
  nirfRank?: number;
}

export interface CourseDetail {
  id: string;
  name: string;
  category: CategoryType;
  overview: string;
  duration: string;
  eligibility: string;
  skillsRequired: string[];
  careerOpportunities: string[];
  averageSalary: string;
  futureScope: string;
  topColleges: string[];
  iconName: string;
}

export interface CareerDetail {
  id: string;
  title: string;
  category: CategoryType;
  description: string;
  requiredSkills: string[];
  expectedSalary: string; // e.g. "6.5 - 18 LPA"
  industries: string[];
  growthRate: string; // e.g. "+22% High"
  futureDemand: string;
  relatedCourses: string[];
}

export interface RecommendationResult {
  studentProfile: StudentProfile;
  aiSummary: string;
  recommendationScore: number; // 0 to 100
  cutoffScore: number;
  collegeRecommendations: {
    college: College;
    admissionProbability: 'High' | 'Moderate' | 'Reach';
    matchedBranches: string[];
    matchScore: number;
  }[];
  courseRecommendations: {
    course: CourseDetail;
    matchReason: string;
    score: number;
  }[];
  careerRecommendations: {
    career: CareerDetail;
    matchReason: string;
    avgSalary: string;
  }[];
}

export interface RoadmapStage {
  stageNumber: number;
  stageName: string;
  duration: string;
  objective: string;
  skillsToMaster: string[];
  recommendedProjects: string[];
  learningPlatforms: string[];
}

export interface SkillRoadmap {
  careerId: string;
  careerTitle: string;
  category: CategoryType;
  overview: string;
  prerequisites: string[];
  stages: RoadmapStage[];
  certificationsToAim: string[];
}

export interface UserAuth {
  isLoggedIn: boolean;
  user: {
    name: string;
    email: string;
    username?: string;
    phone?: string;
    role?: 'student' | 'admin';
    adminDepartment?: string;
  } | null;
}
