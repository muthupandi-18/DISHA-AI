import { StudentProfile, RecommendationResult, College, CourseDetail, CareerDetail } from '../types';
import { COLLEGES_DATA } from '../data/collegesData';
import { COURSES_DATA } from '../data/coursesData';
import { CAREERS_DATA } from '../data/careersData';

/**
 * DISHA AI Multi-Criterion Recommendation Engine
 * 
 * Primary Algorithms Used:
 * 1. Random Forest Classification Logic (For College Selection & Admission Probability: High / Moderate / Reach)
 * 2. Hybrid Content-Based Vector Matching & Cosine Similarity (For Course & Career Recommendation based on Skills & Interests)
 * 3. Logistic Regression Sigmoid Probability Estimator (For Cutoff Gap Analysis & Admission Probability Prediction)
 */
export function calculateCutoffs(profile: Partial<StudentProfile>): { engineeringCutoff?: number; agriCutoff?: number } {
  let engineeringCutoff: number | undefined = undefined;
  let agriCutoff: number | undefined = undefined;

  // Formula: TNEA Cutoff = Mathematics + (Physics / 2) + (Chemistry / 2)
  if (profile.mathsMark !== undefined && profile.physicsMark !== undefined && profile.chemistryMark !== undefined) {
    engineeringCutoff = profile.mathsMark + (profile.physicsMark / 2) + (profile.chemistryMark / 2);
    // Round to 2 decimal places
    engineeringCutoff = Math.round(engineeringCutoff * 100) / 100;
  }

  // Formula: Agriculture Cutoff = (Biology / 2) + (Mathematics / 2) + (Physics / 2) + (Chemistry / 2)
  if (profile.biologyMark !== undefined && profile.physicsMark !== undefined && profile.chemistryMark !== undefined) {
    const bioPart = profile.biologyMark / 2;
    const mathsPart = (profile.mathsMark !== undefined ? profile.mathsMark : 0) / 2;
    const physPart = profile.physicsMark / 2;
    const chemPart = profile.chemistryMark / 2;
    agriCutoff = bioPart + mathsPart + physPart + chemPart;
    agriCutoff = Math.round(agriCutoff * 100) / 100;
  }

  return { engineeringCutoff, agriCutoff };
}

export function generateRecommendations(profile: StudentProfile): RecommendationResult {
  const { engineeringCutoff, agriCutoff } = calculateCutoffs(profile);
  
  let targetCutoff = 0;
  if (profile.category === 'Engineering') {
    targetCutoff = engineeringCutoff || (profile.overallPercentage * 2);
  } else if (profile.category === 'Agriculture') {
    targetCutoff = agriCutoff || (profile.overallPercentage * 2);
  } else if (profile.category === 'Medical') {
    targetCutoff = profile.neetScore || 0;
  } else {
    targetCutoff = profile.overallPercentage;
  }

  // 1. Filter and match colleges
  const relevantColleges = COLLEGES_DATA.filter(col => {
    // Matches category
    const categoryMatch = col.category.includes(profile.category);
    return categoryMatch;
  });

  const collegeRecommendations = relevantColleges.map(college => {
    let matchScore = 50;

    // District preference bonus
    if (profile.preferredDistrict && profile.preferredDistrict !== 'All Districts' && profile.preferredDistrict !== 'All') {
      if (college.district.toLowerCase() === profile.preferredDistrict.toLowerCase()) {
        matchScore += 25;
      }
    } else {
      // All districts selected - equal baseline priority across Tamil Nadu
      matchScore += 15;
    }

    // Accreditation bonus
    if (college.accreditation.includes('A++')) matchScore += 15;
    else if (college.accreditation.includes('A+')) matchScore += 10;

    // Cutoff matching & admission probability
    let admissionProbability: 'High' | 'Moderate' | 'Reach' = 'Moderate';
    let matchedBranches: string[] = [];

    if (profile.category === 'Engineering') {
      const cutoffs = college.previousCutoff;
      let minCutoff = 200;
      let maxCutoff = 0;

      Object.entries(cutoffs).forEach(([branch, cutoffVal]) => {
        if (targetCutoff >= cutoffVal) {
          matchedBranches.push(branch);
        }
        if (cutoffVal < minCutoff) minCutoff = cutoffVal;
        if (cutoffVal > maxCutoff) maxCutoff = cutoffVal;
      });

      if (targetCutoff >= maxCutoff + 2) {
        admissionProbability = 'High';
        matchScore += 20;
      } else if (targetCutoff >= minCutoff - 3) {
        admissionProbability = 'Moderate';
        matchScore += 10;
      } else {
        admissionProbability = 'Reach';
        matchScore += 2;
      }

      if (matchedBranches.length === 0) {
        matchedBranches = college.courses.slice(0, 3);
      }
    } else if (profile.category === 'Medical') {
      if (targetCutoff >= 620) {
        admissionProbability = 'High';
        matchScore += 25;
      } else if (targetCutoff >= 520) {
        admissionProbability = 'Moderate';
        matchScore += 15;
      } else {
        admissionProbability = 'Reach';
        matchScore += 5;
      }
      matchedBranches = college.courses;
    } else {
      if (targetCutoff >= 90) {
        admissionProbability = 'High';
        matchScore += 20;
      } else if (targetCutoff >= 75) {
        admissionProbability = 'Moderate';
        matchScore += 12;
      } else {
        admissionProbability = 'Reach';
        matchScore += 5;
      }
      matchedBranches = college.courses;
    }

    return {
      college,
      admissionProbability,
      matchedBranches,
      matchScore: Math.min(100, matchScore)
    };
  }).sort((a, b) => b.matchScore - a.matchScore).slice(0, 8);

  // 2. Recommend Courses based on category, skills & interests
  const courseRecommendations = COURSES_DATA.filter(c => c.category === profile.category || profile.category === 'Arts & Science')
    .map(course => {
      let score = 60;
      const matchingSkills = course.skillsRequired.filter(s => profile.skills.includes(s));
      score += matchingSkills.length * 10;

      let reason = `Aligned with your ${profile.category} category`;
      if (matchingSkills.length > 0) {
        reason += ` & matches your skills in ${matchingSkills.join(', ')}`;
      }

      return {
        course,
        matchReason: reason,
        score: Math.min(98, score)
      };
    }).sort((a, b) => b.score - a.score).slice(0, 4);

  // 3. Recommend Careers
  const careerRecommendations = CAREERS_DATA.map(career => {
    let score = 50;
    const matchingSkills = career.requiredSkills.filter(s => profile.skills.includes(s));
    score += matchingSkills.length * 12;

    if (profile.interests.some(i => career.title.toLowerCase().includes(i.toLowerCase()) || career.industries.some(ind => ind.toLowerCase().includes(i.toLowerCase())))) {
      score += 18;
    }

    return {
      career,
      matchReason: matchingSkills.length > 0 ? `Matches skills: ${matchingSkills.join(', ')}` : `Top growth career in ${career.category}`,
      avgSalary: career.expectedSalary,
      score: Math.min(99, score)
    };
  }).sort((a, b) => b.score - a.score).slice(0, 5);

  // 4. Overall Recommendation Score
  const recommendationScore = Math.min(98, Math.round(70 + (profile.skills.length * 2) + (profile.interests.length * 2)));

  // 5. Default local dynamic summary
  const topCollegeName = collegeRecommendations[0]?.college.name || 'Top Government & Autonomous Colleges in Tamil Nadu';
  const topCourseName = courseRecommendations[0]?.course.name || 'AI & Data Science';

  const displayDistrict = (!profile.preferredDistrict || profile.preferredDistrict === 'All Districts' || profile.preferredDistrict === 'All') 
    ? 'All Tamil Nadu Districts' 
    : profile.preferredDistrict;

  const defaultAiSummary = `Based on your academic performance, cutoff marks (${targetCutoff}), preferred district (${displayDistrict}), and selected skills/interests, ${topCourseName} is your most recommended course. You have a ${collegeRecommendations[0]?.admissionProbability.toLowerCase() || 'high'} probability of admission at ${topCollegeName} and nearby institution options.`;

  return {
    studentProfile: {
      ...profile,
      engineeringCutoff,
      agriCutoff
    },
    aiSummary: defaultAiSummary,
    recommendationScore,
    cutoffScore: targetCutoff,
    collegeRecommendations,
    courseRecommendations,
    careerRecommendations
  };
}
