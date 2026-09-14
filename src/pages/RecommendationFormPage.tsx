import React, { useState, useEffect } from 'react';
import { Sparkles, Calculator, Check, Plus, ArrowRight, User, Mail, Phone, BookOpen, GraduationCap, MapPin, Layers, Award, LogIn, AlertCircle } from 'lucide-react';
import { useRecommendation } from '../context/RecommendationContext';
import { useAuth } from '../context/AuthContext';
import { DISTRICT_NAMES } from '../data/tnDistricts';
import { SKILLS_LIST, INTERESTS_LIST, BOARDS_LIST } from '../data/skillsAndInterests';
import { CategoryType, StreamType, StudentProfile } from '../types';

interface RecommendationFormPageProps {
  setActiveTab: (tab: string) => void;
}

export const RecommendationFormPage: React.FC<RecommendationFormPageProps> = ({ setActiveTab }) => {
  const { auth, openAuthModal, updateUser } = useAuth();
  const { studentProfile, runRecommendation, isLoading } = useRecommendation();

  // Form State initialized based on Auth status
  const [name, setName] = useState(() => {
    if (studentProfile.hasSubmittedForm && studentProfile.name) return studentProfile.name;
    if (auth.isLoggedIn && auth.user?.name) return auth.user.name;
    return '';
  });

  const [email, setEmail] = useState(() => {
    if (studentProfile.hasSubmittedForm && studentProfile.email) return studentProfile.email;
    if (auth.isLoggedIn && auth.user?.email && !auth.user.email.endsWith('@student.disha.tn.gov.in')) {
      return auth.user.email;
    }
    return '';
  });

  const [phone, setPhone] = useState(() => {
    if (studentProfile.hasSubmittedForm && studentProfile.phone) return studentProfile.phone;
    if (auth.isLoggedIn && auth.user?.phone && auth.user.phone !== '8310948606' && auth.user.phone !== '9876543210') {
      return auth.user.phone;
    }
    return '';
  });
  
  const [hscBoard, setHscBoard] = useState<string>('Choose Board');
  const [overallPercentage, setOverallPercentage] = useState<number | ''>('');
  
  const [stream, setStream] = useState<StreamType>('Choose Stream');
  const [category, setCategory] = useState<CategoryType>(studentProfile.category || 'Engineering');

  // Sync with Auth state changes (when user logs in or out)
  useEffect(() => {
    if (auth.isLoggedIn && auth.user) {
      if (auth.user.name) setName(auth.user.name);
      if (auth.user.email && !auth.user.email.endsWith('@student.disha.tn.gov.in')) {
        setEmail(auth.user.email);
      }
      if (auth.user.phone && auth.user.phone !== '8310948606' && auth.user.phone !== '9876543210') {
        setPhone(auth.user.phone);
      } else if (!studentProfile.hasSubmittedForm) {
        setPhone('');
      }
    } else {
      // Clear pre-filled mock values when guest user visits without logging in
      setName('');
      setEmail('');
      setPhone('');
      setStream('Choose Stream');
      setHscBoard('Choose Board');
      setOverallPercentage('');
      setMathsMark('');
      setPhysicsMark('');
      setChemistryMark('');
      setBiologyMark('');
      setNeetScore('');
      setSkills([]);
      setInterests([]);
    }
  }, [auth.isLoggedIn, auth.user]);

  // Marks
  const [mathsMark, setMathsMark] = useState<number | ''>('');
  const [physicsMark, setPhysicsMark] = useState<number | ''>('');
  const [chemistryMark, setChemistryMark] = useState<number | ''>('');
  const [biologyMark, setBiologyMark] = useState<number | ''>('');
  const [neetScore, setNeetScore] = useState<number | ''>('');

  // Chips
  const [skills, setSkills] = useState<string[]>(
    studentProfile.hasSubmittedForm && studentProfile.hasUserCustomizedSkills && Array.isArray(studentProfile.skills) ? studentProfile.skills : []
  );
  const [interests, setInterests] = useState<string[]>(
    studentProfile.hasSubmittedForm && studentProfile.hasUserCustomizedInterests && Array.isArray(studentProfile.interests) ? studentProfile.interests : []
  );

  // Preferred District
  const [preferredDistrict, setPreferredDistrict] = useState<string>(studentProfile.preferredDistrict || 'All Districts');

  // Helper values for cutoffs
  const m = typeof mathsMark === 'number' ? mathsMark : 0;
  const p = typeof physicsMark === 'number' ? physicsMark : 0;
  const c = typeof chemistryMark === 'number' ? chemistryMark : 0;
  const b = typeof biologyMark === 'number' ? biologyMark : 0;

  // Live Cutoff Calculation
  const liveEngineeringCutoff = m + (p / 2) + (c / 2);
  const liveAgriCutoff = (b / 2) + (m / 2) + (p / 2) + (c / 2);

  const toggleSkill = (skill: string) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter(s => s !== skill));
    } else {
      setSkills([...skills, skill]);
    }
  };

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validate marks based on category
    if (category === 'Engineering') {
      if (
        mathsMark === '' || physicsMark === '' || chemistryMark === '' ||
        Number(mathsMark) <= 0 || Number(physicsMark) <= 0 || Number(chemistryMark) <= 0
      ) {
        setFormError('Please enter valid marks (> 0) for Mathematics, Physics, and Chemistry to calculate your TNEA Engineering cutoff.');
        return;
      }
    } else if (category === 'Medical') {
      if (neetScore === '' || Number(neetScore) <= 0) {
        setFormError('Please enter a valid NEET score (> 0) to generate Medical college recommendations.');
        return;
      }
    } else if (category === 'Agriculture') {
      if (
        biologyMark === '' || physicsMark === '' || chemistryMark === '' ||
        Number(biologyMark) <= 0 || Number(physicsMark) <= 0 || Number(chemistryMark) <= 0
      ) {
        setFormError('Please enter valid marks (> 0) for Biology, Physics, and Chemistry for Agriculture cutoff calculation.');
        return;
      }
    } else if (category === 'Arts & Science') {
      if (overallPercentage === '' || Number(overallPercentage) <= 0) {
        setFormError('Please enter your HSC Overall Percentage (> 0) for Arts & Science recommendations.');
        return;
      }
    }

    const finalStream: StreamType = (stream === 'Choose Stream' || !stream) ? 'Computer Science' : stream;
    const finalBoard = (hscBoard === 'Choose Board' || hscBoard === 'Choose' || !hscBoard) ? 'State Board (Tamil Nadu)' : hscBoard;
    const finalPercentage = typeof overallPercentage === 'number' ? overallPercentage : 0;

    const userEmail = email.trim() || (auth.isLoggedIn && auth.user?.email && !auth.user.email.endsWith('@student.disha.tn.gov.in') ? auth.user.email : '');

    const profilePayload: StudentProfile = {
      id: auth.isLoggedIn && auth.user ? `student-${auth.user.email || auth.user.username}` : `student-${Date.now()}`,
      name: name.trim() || (auth.isLoggedIn && auth.user?.name ? auth.user.name : 'Student'),
      email: userEmail,
      phone: phone.trim() || (auth.isLoggedIn && auth.user?.phone ? auth.user.phone : ''),
      hscBoard: finalBoard,
      overallPercentage: finalPercentage,
      stream: finalStream,
      category,
      preferredDistrict,
      mathsMark: typeof mathsMark === 'number' ? mathsMark : 0,
      physicsMark: typeof physicsMark === 'number' ? physicsMark : 0,
      chemistryMark: typeof chemistryMark === 'number' ? chemistryMark : 0,
      biologyMark: typeof biologyMark === 'number' ? biologyMark : 0,
      neetScore: typeof neetScore === 'number' ? neetScore : 0,
      skills,
      interests,
      hasUserCustomizedSkills: true,
      hasUserCustomizedInterests: true,
      hasSubmittedForm: true
    };

    if (auth.isLoggedIn) {
      updateUser({
        name: profilePayload.name,
        email: profilePayload.email,
        phone: profilePayload.phone
      });
    }

    await runRecommendation(profilePayload);
    setActiveTab('dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Student Input Form</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          DISHA AI Recommendation Engine
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Enter your academic details, marks, skills, and interests to generate personalized college, course, and career recommendations.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* SECTION 1: Personal Information */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <User className="w-4 h-4 text-cyan-400" />
              1. Personal Information
            </h3>

            {!auth.isLoggedIn ? (
              <button
                type="button"
                onClick={openAuthModal}
                id="form-login-auto-fill-btn"
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log in to auto-fill</span>
              </button>
            ) : (
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span>Logged in as {auth.user?.name}</span>
              </span>
            )}
          </div>

          {!auth.isLoggedIn && (
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/80 text-[11px] text-slate-300 flex items-center justify-between">
              <span>You are filling form as a Guest. Enter your details below or log in to auto-save.</span>
            </div>
          )}

          <div>
            <label className="block text-slate-300 font-semibold mb-1 text-xs">Student Full Name *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 text-xs"
            />
          </div>
        </div>

        {/* SECTION 2: Academic Details & Stream */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <BookOpen className="w-4 h-4 text-blue-400" />
            2. Academic Details & Stream
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">HSC Board</label>
              <select
                value={hscBoard}
                onChange={(e) => setHscBoard(e.target.value)}
                id="form-board-select"
                className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 font-medium"
              >
                <option value="Choose Board">Choose Board</option>
                {BOARDS_LIST.map(board => (
                  <option key={board} value={board}>{board}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Overall Percentage (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={overallPercentage}
                onChange={(e) => setOverallPercentage(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="Enter percentage"
                className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Stream (Dropdown)</label>
              <select
                value={stream}
                onChange={(e) => setStream(e.target.value as StreamType)}
                id="form-stream-select"
                className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 font-medium"
              >
                <option value="Choose Stream">Choose Stream</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Biology">Biology</option>
                <option value="Commerce">Commerce</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Vocational">Vocational</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 3: Recommendation Category & Subject Marks */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            3. Target Counseling Category & Marks
          </h3>

          {/* Radio Buttons for Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Select Recommendation Category:</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {(['Engineering', 'Medical', 'Agriculture', 'Arts & Science'] as CategoryType[]).map((cat) => (
                <label
                  key={cat}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    category === cat
                      ? 'bg-blue-600/20 border-cyan-500 text-white font-bold'
                      : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{cat}</span>
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={category === cat}
                    onChange={() => setCategory(cat)}
                    className="accent-cyan-400"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Conditional Subject Inputs & Instant Cutoffs */}
          {category === 'Engineering' && (
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/80 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400">Engineering Subject Marks (out of 100)</span>
                <span className="text-[11px] font-mono text-slate-400">Formula: Mathematics + (Physics / 2) + (Chemistry / 2)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">Mathematics Mark</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={mathsMark}
                    onChange={(e) => setMathsMark(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="Enter mark"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Physics Mark</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={physicsMark}
                    onChange={(e) => setPhysicsMark(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="Enter mark"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Chemistry Mark</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={chemistryMark}
                    onChange={(e) => setChemistryMark(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="Enter mark"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Instant Calculated Cutoff Box */}
              <div className="p-3 rounded-xl bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border border-cyan-500/30 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">Calculated TNEA Engineering Cutoff:</span>
                <span className="text-xl font-black text-cyan-400 font-mono">{liveEngineeringCutoff.toFixed(2)} / 200</span>
              </div>
            </div>
          )}

          {category === 'Medical' && (
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/80 space-y-3">
              <span className="text-xs font-bold text-blue-400">Medical NEET Score</span>
              <div className="max-w-xs text-xs">
                <label className="block text-slate-300 mb-1">NEET Score (out of 720)</label>
                <input
                  type="number"
                  min="0"
                  max="720"
                  value={neetScore}
                  onChange={(e) => setNeetScore(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="Enter score"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          )}

          {category === 'Agriculture' && (
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/80 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400">Agriculture Marks (Biology, Maths, Physics, Chemistry)</span>
                <span className="text-[11px] font-mono text-slate-400">Formula: (Biology / 2) + (Mathematics / 2) + (Physics / 2) + (Chemistry / 2)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">Biology Mark</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={biologyMark}
                    onChange={(e) => setBiologyMark(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="Enter mark"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Physics Mark</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={physicsMark}
                    onChange={(e) => setPhysicsMark(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="Enter mark"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Chemistry Mark</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={chemistryMark}
                    onChange={(e) => setChemistryMark(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="Enter mark"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-950/60 to-slate-950/60 border border-emerald-500/30 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">Calculated Agriculture Cutoff:</span>
                <span className="text-xl font-black text-emerald-400 font-mono">{liveAgriCutoff.toFixed(2)} / 200</span>
              </div>
            </div>
          )}

          {category === 'Arts & Science' && (
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/80 space-y-2 text-xs">
              <span className="text-xs font-bold text-amber-400">Arts & Science Merit Criteria</span>
              <p className="text-slate-400">Uses overall 12th Percentage: <span className="text-amber-400 font-bold font-mono text-sm">{overallPercentage}%</span></p>
            </div>
          )}
        </div>

        {/* SECTION 4: Skills Multi-select Chips */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              4. Select Student Skills (Multi-select Chips)
            </h3>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-medium">
                {skills.length === 0 ? '0 selected (optional)' : `${skills.length} selected`}
              </span>
              {skills.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSkills([])}
                  id="clear-skills-btn"
                  className="text-[11px] text-amber-400/80 hover:text-amber-300 underline font-semibold transition-colors cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {SKILLS_LIST.map((sk) => {
              const selected = skills.includes(sk);
              return (
                <button
                  type="button"
                  key={sk}
                  onClick={() => toggleSkill(sk)}
                  id={`skill-chip-${sk.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all cursor-pointer ${
                    selected
                      ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow-sm'
                      : 'bg-slate-800/60 border-slate-700/80 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {selected ? <Check className="w-3 h-3 text-amber-400" /> : <Plus className="w-3 h-3 opacity-60" />}
                  <span>{sk}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 5: Interests Multi-select Chips */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              5. Select Student Interests (Multi-select Chips)
            </h3>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-medium">
                {interests.length === 0 ? '0 selected (optional)' : `${interests.length} selected`}
              </span>
              {interests.length > 0 && (
                <button
                  type="button"
                  onClick={() => setInterests([])}
                  id="clear-interests-btn"
                  className="text-[11px] text-cyan-400/80 hover:text-cyan-300 underline font-semibold transition-colors cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {INTERESTS_LIST.map((inst) => {
              const selected = interests.includes(inst);
              return (
                <button
                  type="button"
                  key={inst}
                  onClick={() => toggleInterest(inst)}
                  id={`interest-chip-${inst.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-all cursor-pointer ${
                    selected
                      ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 font-bold shadow-sm'
                      : 'bg-slate-800/60 border-slate-700/80 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {selected ? <Check className="w-3 h-3 text-cyan-400" /> : <Plus className="w-3 h-3 opacity-60" />}
                  <span>{inst}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 6: Preferred District Dropdown */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <MapPin className="w-4 h-4 text-rose-400" />
            6. Preferred District in Tamil Nadu (All 38 Districts)
          </h3>

          <div className="max-w-md text-xs">
            <label className="block text-slate-300 font-semibold mb-1">Select Tamil Nadu District *</label>
            <select
              value={preferredDistrict}
              onChange={(e) => setPreferredDistrict(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-white font-semibold focus:outline-none focus:border-cyan-500"
            >
              <option value="All Districts">All Districts (All Tamil Nadu)</option>
              {DISTRICT_NAMES.map(dist => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Form Validation Error Banner */}
        {formError && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-3 shadow-lg">
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* Submit Button */}
        <div className="text-center pt-2">
          <button
            type="submit"
            disabled={isLoading}
            id="generate-recs-submit-btn"
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-black text-sm shadow-2xl shadow-cyan-500/30 flex items-center justify-center gap-3 transition-all hover:scale-105 cursor-pointer disabled:opacity-50"
          >
            <Sparkles className="w-5 h-5 text-cyan-200 animate-pulse" />
            <span>{isLoading ? 'Processing DISHA AI Logic...' : 'Generate AI Recommendations'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </form>
    </div>
  );
};
