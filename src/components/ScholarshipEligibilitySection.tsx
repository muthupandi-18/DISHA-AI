import React, { useState, useMemo } from 'react';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  DollarSign, 
  FileText, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  Info, 
  UserCheck, 
  Building2, 
  Filter,
  RefreshCw
} from 'lucide-react';
import { useRecommendation } from '../context/RecommendationContext';
import { 
  TN_SCHOLARSHIPS_DATA, 
  StudentScholarshipProfile, 
  checkScholarshipEligibility,
  ScholarshipScheme 
} from '../data/scholarshipsData';

export const ScholarshipEligibilitySection: React.FC = () => {
  const { studentProfile } = useRecommendation();

  // Initialize scholarship profile state from studentProfile context or default 'Choose'
  const [profile, setProfile] = useState<StudentScholarshipProfile>(() => {
    const cutoff = (studentProfile.engineeringCutoff && studentProfile.engineeringCutoff > 0) ? studentProfile.engineeringCutoff :
      (studentProfile.mathsMark && studentProfile.physicsMark && studentProfile.chemistryMark && studentProfile.mathsMark > 0
        ? studentProfile.mathsMark + (studentProfile.physicsMark / 2) + (studentProfile.chemistryMark / 2)
        : (studentProfile.overallPercentage && studentProfile.overallPercentage > 0 ? Math.round(studentProfile.overallPercentage * 2) : ''));

    return {
      gender: 'Choose',
      isGovtSchoolStudent: 'Choose',
      isFirstGraduate: 'Choose',
      community: 'Choose',
      annualFamilyIncomeLakhs: '',
      hscPercentage: (studentProfile.overallPercentage && studentProfile.overallPercentage > 0) ? studentProfile.overallPercentage : '',
      cutoffScore: cutoff,
      isDifferentlyAbled: false
    };
  });

  const [filterType, setFilterType] = useState<'all' | 'eligible' | 'government' | 'special'>('eligible');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Sync profile with student profile context
  const handleResetToProfile = () => {
    const cutoff = (studentProfile.engineeringCutoff && studentProfile.engineeringCutoff > 0) ? studentProfile.engineeringCutoff :
      (studentProfile.mathsMark && studentProfile.physicsMark && studentProfile.chemistryMark && studentProfile.mathsMark > 0
        ? studentProfile.mathsMark + (studentProfile.physicsMark / 2) + (studentProfile.chemistryMark / 2)
        : (studentProfile.overallPercentage && studentProfile.overallPercentage > 0 ? Math.round(studentProfile.overallPercentage * 2) : ''));

    setProfile({
      gender: 'Choose',
      isGovtSchoolStudent: 'Choose',
      isFirstGraduate: 'Choose',
      community: 'Choose',
      annualFamilyIncomeLakhs: '',
      hscPercentage: (studentProfile.overallPercentage && studentProfile.overallPercentage > 0) ? studentProfile.overallPercentage : '',
      cutoffScore: cutoff,
      isDifferentlyAbled: false
    });
  };

  // Evaluate eligibility for all scholarships
  const evaluatedScholarships = useMemo(() => {
    return TN_SCHOLARSHIPS_DATA.map(sch => {
      const result = checkScholarshipEligibility(sch, profile);
      return {
        scholarship: sch,
        ...result
      };
    });
  }, [profile]);

  // Summary counts
  const eligibleItems = useMemo(() => evaluatedScholarships.filter(item => item.isEligible), [evaluatedScholarships]);
  const totalEligibleValue = useMemo(() => eligibleItems.reduce((acc, item) => acc + item.scholarship.annualValue, 0), [eligibleItems]);

  // Filtered list based on tab
  const filteredScholarships = useMemo(() => {
    return evaluatedScholarships.filter(item => {
      if (filterType === 'eligible') return item.isEligible;
      if (filterType === 'government') return item.scholarship.category === 'Government';
      if (filterType === 'special') return item.scholarship.category === 'Special Quota' || item.scholarship.category === 'Central';
      return true;
    });
  }, [evaluatedScholarships, filterType]);

  return (
    <div className="space-y-6 bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-7 shadow-xl">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 text-xs font-bold border border-cyan-500/30">
            <Award className="w-3.5 h-3.5" />
            <span>TN Higher Education Financial Aid Engine 2026</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Scholarship Eligibility Checker
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xl">
            Evaluate your profile against Tamil Nadu government schemes (Pudhumai Penn, 7.5% Quota, First Graduate, Post-Matric) and private trust grants.
          </p>
        </div>

        {/* Aggregate Value Badge */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-emerald-500/10 to-blue-500/10 border border-emerald-500/30 flex items-center gap-4 shrink-0">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Estimated Eligible Benefit
            </span>
            <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              ₹{totalEligibleValue.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-600 dark:text-slate-300">/ yr</span>
            </span>
            <p className="text-[11px] text-slate-600 dark:text-slate-400">
              <strong className="text-emerald-600 dark:text-emerald-400">{eligibleItems.length}</strong> scheme{eligibleItems.length !== 1 ? 's' : ''} matched your profile
            </p>
          </div>
        </div>
      </div>

      {/* STUDENT PROFILE CONTROLS / FORM */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>Your Profile Criteria for Scholarship Matching</span>
          </h3>
          <button
            onClick={handleResetToProfile}
            id="reset-scholarship-profile-btn"
            className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Sync with Dashboard Profile</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          {/* Gender */}
          <div>
            <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Gender</label>
            <select
              value={profile.gender}
              onChange={(e) => setProfile(prev => ({ ...prev, gender: e.target.value as any }))}
              id="scholarship-gender-select"
              className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:outline-none focus:border-cyan-500"
            >
              <option value="Choose">Choose Gender</option>
              <option value="Female">Female (Girl)</option>
              <option value="Male">Male (Boy)</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Govt School Student */}
          <div>
            <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">6–12th in TN Govt School?</label>
            <select
              value={typeof profile.isGovtSchoolStudent === 'boolean' ? (profile.isGovtSchoolStudent ? 'yes' : 'no') : 'Choose'}
              onChange={(e) => setProfile(prev => ({ ...prev, isGovtSchoolStudent: e.target.value === 'Choose' ? 'Choose' : e.target.value === 'yes' }))}
              id="scholarship-govt-school-select"
              className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:outline-none focus:border-cyan-500"
            >
              <option value="Choose">Choose Option</option>
              <option value="yes">Yes (TN Govt School)</option>
              <option value="no">No (Private / Aided)</option>
            </select>
          </div>

          {/* First Graduate */}
          <div>
            <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">First Graduate in Family?</label>
            <select
              value={typeof profile.isFirstGraduate === 'boolean' ? (profile.isFirstGraduate ? 'yes' : 'no') : 'Choose'}
              onChange={(e) => setProfile(prev => ({ ...prev, isFirstGraduate: e.target.value === 'Choose' ? 'Choose' : e.target.value === 'yes' }))}
              id="scholarship-first-grad-select"
              className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:outline-none focus:border-cyan-500"
            >
              <option value="Choose">Choose Option</option>
              <option value="yes">Yes (1st Graduate)</option>
              <option value="no">No</option>
            </select>
          </div>

          {/* Community */}
          <div>
            <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Community Category</label>
            <select
              value={profile.community}
              onChange={(e) => setProfile(prev => ({ ...prev, community: e.target.value as any }))}
              id="scholarship-community-select"
              className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:outline-none focus:border-cyan-500"
            >
              <option value="Choose">Choose Community</option>
              <option value="OC">OC (Open)</option>
              <option value="BC">BC (Backward Class)</option>
              <option value="MBC/DNC">MBC / DNC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="SCC">SCC (SC Converts)</option>
            </select>
          </div>

          {/* Annual Family Income */}
          <div>
            <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">Annual Income (Lakhs)</label>
            <input
              type="number"
              step="0.5"
              min="0.5"
              max="15"
              placeholder="Enter Income"
              value={profile.annualFamilyIncomeLakhs}
              onChange={(e) => setProfile(prev => ({ ...prev, annualFamilyIncomeLakhs: e.target.value === '' ? '' : parseFloat(e.target.value) }))}
              id="scholarship-income-input"
              className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Cutoff Score */}
          <div>
            <label className="block text-slate-600 dark:text-slate-400 font-semibold mb-1">TNEA Cutoff / %</label>
            <input
              type="number"
              step="0.5"
              min="0"
              max="200"
              placeholder="Enter Cutoff"
              value={profile.cutoffScore}
              onChange={(e) => setProfile(prev => ({ ...prev, cutoffScore: e.target.value === '' ? '' : parseFloat(e.target.value) }))}
              id="scholarship-cutoff-input"
              className="w-full px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setFilterType('eligible')}
            id="filter-scholarship-eligible-btn"
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              filterType === 'eligible'
                ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Eligible Only ({eligibleItems.length})
          </button>
          <button
            onClick={() => setFilterType('all')}
            id="filter-scholarship-all-btn"
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              filterType === 'all'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Schemes ({evaluatedScholarships.length})
          </button>
          <button
            onClick={() => setFilterType('government')}
            id="filter-scholarship-govt-btn"
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              filterType === 'government'
                ? 'bg-blue-600 text-white font-bold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            TN Govt Schemes
          </button>
          <button
            onClick={() => setFilterType('special')}
            id="filter-scholarship-special-btn"
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              filterType === 'special'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Quota & Central
          </button>
        </div>

        <span className="text-xs text-slate-500 dark:text-slate-400">
          Click any card to inspect required documents & application link
        </span>
      </div>

      {/* SCHOLARSHIP CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredScholarships.map(({ scholarship, isEligible, matchReasons, disqualifyingReasons }) => {
          const isExpanded = expandedId === scholarship.id;

          return (
            <div
              key={scholarship.id}
              className={`rounded-2xl border transition-all overflow-hidden flex flex-col justify-between ${
                isEligible
                  ? 'bg-slate-50 dark:bg-slate-950/60 border-emerald-500/40 hover:border-emerald-500 shadow-sm'
                  : 'bg-slate-50/50 dark:bg-slate-950/30 border-slate-200 dark:border-slate-800/80 opacity-80'
              }`}
            >
              {/* Card Header */}
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        scholarship.category === 'Government' 
                          ? 'bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30'
                          : scholarship.category === 'Special Quota'
                          ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                      }`}>
                        {scholarship.category}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        {scholarship.offeredBy}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                      {scholarship.name}
                    </h4>
                  </div>

                  {/* Status Badge */}
                  <div className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 flex items-center gap-1.5 ${
                    isEligible 
                      ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30' 
                      : 'bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30'
                  }`}>
                    {isEligible ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Eligible</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                        <span>Criteria Not Met</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Amount Banner */}
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400 font-medium">Financial Assistance:</span>
                  <span className="font-bold text-cyan-600 dark:text-cyan-400 font-mono text-xs sm:text-sm">
                    {scholarship.amount}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {scholarship.description}
                </p>

                {/* Match / Disqualification Reasons */}
                <div className="space-y-1.5 pt-1">
                  {isEligible ? (
                    matchReasons.slice(0, 2).map((reason, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-emerald-700 dark:text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3 h-3 shrink-0" />
                        <span>{reason}</span>
                      </div>
                    ))
                  ) : (
                    disqualifyingReasons.map((reason, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-amber-700 dark:text-amber-400 font-medium">
                        <XCircle className="w-3 h-3 shrink-0" />
                        <span>{reason}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Collapsible Details */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-slate-200 dark:border-slate-800/80 space-y-3 text-xs bg-slate-100/50 dark:bg-slate-900/40">
                  {/* Benefits */}
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white mb-1">Key Scheme Benefits:</h5>
                    <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300 text-[11px]">
                      {scholarship.benefits.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Required Documents */}
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white mb-1">Documents Required for Application:</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {scholarship.documentsRequired.map((doc, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[10px] font-medium">
                          <FileText className="w-3 h-3 inline mr-1 text-cyan-600 dark:text-cyan-400" />
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Portal Action */}
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Portal: <strong>{scholarship.applicationPortal}</strong>
                    </span>
                    <a
                      href={scholarship.portalUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                    >
                      <span>Apply on Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              )}

              {/* Toggle Footer */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : scholarship.id)}
                id={`toggle-scholarship-${scholarship.id}`}
                className="w-full p-2.5 bg-slate-100 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <span>{isExpanded ? 'Hide Required Documents & Portal' : 'View Documents & Application Details'}</span>
                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          );
        })}
      </div>

    </div>
  );
};
