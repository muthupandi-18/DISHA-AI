import React, { createContext, useContext, useState, useEffect } from 'react';
import { StudentProfile, RecommendationResult } from '../types';
import { generateRecommendations } from '../utils/recommendationEngine';
import { useAuth } from './AuthContext';
import { syncUserToAdminDirectory } from '../utils/userDirectorySync';

interface RecommendationContextType {
  studentProfile: StudentProfile;
  setStudentProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
  result: RecommendationResult | null;
  setResult: React.Dispatch<React.SetStateAction<RecommendationResult | null>>;
  runRecommendation: (profile: StudentProfile) => Promise<RecommendationResult>;
  savedRecommendations: RecommendationResult[];
  saveCurrentResult: () => void;
  isSaved: boolean;
  isLoading: boolean;
}

const defaultProfile: StudentProfile = {
  id: 'student-guest',
  name: '',
  email: '',
  phone: '',
  hscBoard: 'Choose Board',
  overallPercentage: 0,
  stream: 'Choose Stream',
  category: 'Engineering',
  preferredDistrict: 'All Districts',
  mathsMark: 0,
  physicsMark: 0,
  chemistryMark: 0,
  biologyMark: 0,
  neetScore: 0,
  skills: [],
  interests: [],
  hasSubmittedForm: false
};

const RecommendationContext = createContext<RecommendationContextType | undefined>(undefined);

export const RecommendationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { auth } = useAuth();

  const [studentProfile, setStudentProfile] = useState<StudentProfile>(() => {
    const saved = localStorage.getItem('disha_profile');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        // Reset mock default name/email/phone if stored from old session
        if (parsed.name === 'Muthupandi' || parsed.name === 'Muthupandi M' || parsed.name === 'Amarnath') parsed.name = '';
        if (parsed.email === 'muthupandi@example.com' || parsed.email === 'amarnath@example.com') parsed.email = '';
        if (parsed.phone === '9876543210' || parsed.phone === '8310948606' || !parsed.hasSubmittedForm) parsed.phone = '';
        if (!parsed.stream || parsed.stream === 'Computer Science') parsed.stream = 'Choose Stream';
        if (!Array.isArray(parsed.skills) || !parsed.hasUserCustomizedSkills || !parsed.hasSubmittedForm) {
          parsed.skills = [];
        }
        if (!Array.isArray(parsed.interests) || !parsed.hasUserCustomizedInterests || !parsed.hasSubmittedForm) {
          parsed.interests = [];
        }
        return parsed;
      } catch (e) {}
    }
    return defaultProfile;
  });

  const [result, setResult] = useState<RecommendationResult | null>(() => {
    const saved = localStorage.getItem('disha_result');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Only load result if user has explicitly filled & submitted the form with real cutoff
        if (
          parsed &&
          parsed.studentProfile?.hasSubmittedForm === true &&
          parsed.studentProfile?.name !== 'Muthupandi M' &&
          parsed.studentProfile?.name !== 'Muthupandi' &&
          parsed.studentProfile?.name !== 'Amarnath' &&
          typeof parsed.cutoffScore === 'number' &&
          parsed.cutoffScore > 0
        ) {
          return parsed;
        } else {
          localStorage.removeItem('disha_result');
        }
      } catch (e) {
        localStorage.removeItem('disha_result');
      }
    }
    // No default fake recommendations if user hasn't submitted real details
    return null;
  });

  // Sync auth user changes: if logged-in user changes or hasn't submitted form, ensure no previous session mock data is shown
  useEffect(() => {
    if (auth.isLoggedIn && auth.user) {
      const activeUserKey = auth.user.username || auth.user.name;
      const isOwner = studentProfile.ownerUsername === activeUserKey ||
                      (studentProfile.name && studentProfile.name.toLowerCase() === auth.user.name.toLowerCase());

      if (!isOwner || studentProfile.name === 'Muthupandi' || studentProfile.name === 'Muthupandi M' || studentProfile.name === 'Amarnath' || !studentProfile.hasSubmittedForm) {
        setStudentProfile({
          ...defaultProfile,
          id: `student-${activeUserKey}`,
          ownerUsername: activeUserKey,
          name: auth.user.name,
          email: (auth.user.email && !auth.user.email.endsWith('@student.disha.tn.gov.in')) ? auth.user.email : '',
          phone: (auth.user.phone && auth.user.phone !== '8310948606' && auth.user.phone !== '9876543210') ? auth.user.phone : '',
          skills: [],
          interests: [],
          hasSubmittedForm: false
        });
        setResult(null);
        localStorage.removeItem('disha_result');
        localStorage.removeItem('disha_student_skills_progress_v1');
      }
    } else {
      // Guest or logged out
      if (!studentProfile.hasSubmittedForm || studentProfile.name === 'Muthupandi' || studentProfile.name === 'Muthupandi M') {
        setStudentProfile(defaultProfile);
        setResult(null);
        localStorage.removeItem('disha_result');
        localStorage.removeItem('disha_student_skills_progress_v1');
      }
    }
  }, [auth.isLoggedIn, auth.user?.username, auth.user?.name]);

  const [savedRecommendations, setSavedRecommendations] = useState<RecommendationResult[]>(() => {
    const saved = localStorage.getItem('disha_saved_list');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [];
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('disha_profile', JSON.stringify(studentProfile));
  }, [studentProfile]);

  useEffect(() => {
    if (result) {
      localStorage.setItem('disha_result', JSON.stringify(result));
    }
  }, [result]);

  useEffect(() => {
    localStorage.setItem('disha_saved_list', JSON.stringify(savedRecommendations));
  }, [savedRecommendations]);

  const runRecommendation = async (profile: StudentProfile): Promise<RecommendationResult> => {
    setIsLoading(true);
    const profileWithFlag: StudentProfile = {
      ...profile,
      hasSubmittedForm: true,
      ownerUsername: auth.isLoggedIn && auth.user ? (auth.user.username || auth.user.name) : 'guest'
    };
    setStudentProfile(profileWithFlag);

    // 1. Calculate deterministic base recommendation
    const baseResult = generateRecommendations(profileWithFlag);

    // Sync user details and cutoff score to admin activity directory
    syncUserToAdminDirectory({
      name: profileWithFlag.name || auth.user?.name,
      email: profileWithFlag.email || auth.user?.email,
      phone: profileWithFlag.phone || auth.user?.phone,
      district: profileWithFlag.preferredDistrict !== 'All Districts' ? profileWithFlag.preferredDistrict : undefined,
      cutoff: baseResult.cutoffScore,
      category: profileWithFlag.category as any
    }, false);

    // 2. Fetch AI summary from backend Express Gemini API
    try {
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile,
          calculatedCutoff: baseResult.cutoffScore
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.summary) {
          baseResult.aiSummary = data.summary;
        }
      }
    } catch (err) {
      console.warn("Backend AI call failed, using deterministic summary:", err);
    }

    setResult(baseResult);
    setIsLoading(false);
    return baseResult;
  };

  const isSaved = Boolean(
    result && savedRecommendations.some(s => s.studentProfile.name === result.studentProfile.name && s.cutoffScore === result.cutoffScore)
  );

  const saveCurrentResult = () => {
    if (!result) return;
    if (isSaved) {
      setSavedRecommendations(prev => prev.filter(s => s.cutoffScore !== result.cutoffScore));
    } else {
      setSavedRecommendations(prev => [result, ...prev]);
    }
  };

  return (
    <RecommendationContext.Provider
      value={{
        studentProfile,
        setStudentProfile,
        result,
        setResult,
        runRecommendation,
        savedRecommendations,
        saveCurrentResult,
        isSaved,
        isLoading
      }}
    >
      {children}
    </RecommendationContext.Provider>
  );
};

export const useRecommendation = () => {
  const context = useContext(RecommendationContext);
  if (!context) throw new Error('useRecommendation must be used within RecommendationProvider');
  return context;
};
