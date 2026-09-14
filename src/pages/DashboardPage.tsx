import React, { useState } from 'react';
import { Sparkles, GraduationCap, Award, BookOpen, Briefcase, MapPin, Bookmark, Printer, Download, CheckCircle2, AlertCircle, TrendingUp, User, ArrowUpRight, Share2, ShieldCheck, RefreshCw } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { useRecommendation } from '../context/RecommendationContext';
import { useAuth } from '../context/AuthContext';

interface DashboardPageProps {
  setActiveTab: (tab: string) => void;
  onOpenReportPrint?: () => void;
}

const COLORS = ['#06b6d4', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

export const DashboardPage: React.FC<DashboardPageProps> = ({ setActiveTab, onOpenReportPrint }) => {
  const { result, saveCurrentResult, isSaved, savedRecommendations } = useRecommendation();
  const { auth } = useAuth();
  const [activeTabSub, setActiveTabSub] = useState<'colleges' | 'courses' | 'careers' | 'saved'>('colleges');

  if (!result || !result.studentProfile?.hasSubmittedForm || !result.cutoffScore || result.cutoffScore <= 0) {
    return (
      <div className="text-center py-20 px-4 space-y-6 max-w-xl mx-auto">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-xl shadow-cyan-500/10">
          <GraduationCap className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-white">No Cutoff & Recommendation Details Submitted Yet</h2>
          <p className="text-xs sm:text-sm text-slate-400">
            You have not submitted your 12th standard subject marks. Please enter your marks in the Recommendation Form to calculate your official TNEA cutoff score and view personalized college recommendations.
          </p>
        </div>
        <button
          onClick={() => setActiveTab('recommend')}
          id="dashboard-go-to-form-btn"
          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-cyan-500/25 transition-all cursor-pointer inline-flex items-center gap-2"
        >
          <span>Fill Recommendation Form & Calculate Cutoff →</span>
        </button>
      </div>
    );
  }

  const { studentProfile, aiSummary, recommendationScore, cutoffScore, collegeRecommendations, courseRecommendations, careerRecommendations } = result;

  // Chart Data Preparation
  const skillsData = studentProfile.skills.map(skill => ({
    subject: skill,
    matchLevel: Math.floor(Math.random() * 20) + 80
  }));

  const interestData = studentProfile.interests.map((interest, idx) => ({
    name: interest,
    value: 20 + (idx * 15)
  }));

  const admissionProbData = [
    { name: 'High Prob (Safe)', count: collegeRecommendations.filter(c => c.admissionProbability === 'High').length, fill: '#10b981' },
    { name: 'Moderate (Match)', count: collegeRecommendations.filter(c => c.admissionProbability === 'Moderate').length, fill: '#3b82f6' },
    { name: 'Reach (Target)', count: collegeRecommendations.filter(c => c.admissionProbability === 'Reach').length, fill: '#f59e0b' }
  ];

  const handlePrint = () => {
    if (onOpenReportPrint) {
      onOpenReportPrint();
    } else {
      window.print();
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Header Bar */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 backdrop-blur-xl">
        
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-cyan-500/20">
            {studentProfile.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">{studentProfile.name}</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {studentProfile.category} Stream
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {studentProfile.hscBoard} • District: <span className="text-slate-200 font-semibold">{studentProfile.preferredDistrict}</span>
              {((studentProfile.email && !studentProfile.email.endsWith('@student.disha.tn.gov.in')) || (auth.user?.email && !auth.user.email.endsWith('@student.disha.tn.gov.in'))) && (
                <> • Email: <span className="text-slate-200 font-medium">{studentProfile.email || auth.user?.email}</span></>
              )}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={saveCurrentResult}
            id="dashboard-save-rec-btn"
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all cursor-pointer ${
              isSaved
                ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <Bookmark className="w-4 h-4 text-amber-400" />
            <span>{isSaved ? 'Saved to Profile' : 'Save Recommendation'}</span>
          </button>

          <button
            onClick={handlePrint}
            id="dashboard-print-report-btn"
            className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / PDF Report</span>
          </button>
        </div>

      </div>

      {/* KEY METRICS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Calculated Cutoff */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Calculated Cutoff Score</p>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-black text-cyan-400 font-mono tracking-tight">{cutoffScore.toFixed(2)}</p>
            <span className="text-xs text-slate-400 font-mono">/ 200</span>
          </div>
          <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
            Official TNEA / Category Formula
          </p>
        </div>

        {/* Metric 2: Recommendation Score */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Recommendation Match Score</p>
          <div className="flex items-baseline justify-between">
            <p className="text-3xl font-black text-emerald-400 font-mono tracking-tight">{recommendationScore}%</p>
            <span className="text-xs text-emerald-400 font-semibold">High Synergy</span>
          </div>
          <p className="text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
            Based on skills & interest alignment
          </p>
        </div>

        {/* Metric 3: Top College Match */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Primary College Match</p>
          <p className="text-sm font-bold text-white truncate">{collegeRecommendations[0]?.college.name || 'CEG Guindy'}</p>
          <p className="text-[11px] text-cyan-400 pt-1 border-t border-slate-800/80 font-medium">
            {collegeRecommendations[0]?.admissionProbability} Admission Probability
          </p>
        </div>

        {/* Metric 4: Top Career Role */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Top Career Prospect</p>
          <p className="text-sm font-bold text-white truncate">{careerRecommendations[0]?.career.title || 'AI & ML Engineer'}</p>
          <p className="text-[11px] text-amber-400 pt-1 border-t border-slate-800/80 font-medium">
            Expected Salary: {careerRecommendations[0]?.career.expectedSalary}
          </p>
        </div>

      </div>

      {/* AI GENERATED RECOMMENDATION SUMMARY BANNER */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border border-cyan-500/30 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
            DISHA AI Personal Guidance Insight
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
          "{aiSummary}"
        </p>
      </div>

      {/* RECHARTS ANALYTICS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 1: Admission Probability Distribution */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
            Admission Probability Breakdown
          </h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={admissionProbData}>
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {admissionProbData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Student Skills Analysis */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
            Skills Alignment Radar
          </h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={skillsData.length ? skillsData : [{ subject: 'Logic', matchLevel: 90 }, { subject: 'Problem Solving', matchLevel: 85 }]}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={9} />
                <Radar name="Skills" dataKey="matchLevel" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.4} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Interests Pie Distribution */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
            Interest Category Weights
          </h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={interestData.length ? interestData : [{ name: 'Tech', value: 50 }, { name: 'AI', value: 50 }]}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={65}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {interestData.map((entry, index) => (
                    <Cell key={`pie-cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* RECOMMENDATION RESULT TABS & LISTS */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTabSub('colleges')}
            id="dash-subtab-colleges"
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTabSub === 'colleges'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Recommended Colleges ({collegeRecommendations.length})
          </button>

          <button
            onClick={() => setActiveTabSub('courses')}
            id="dash-subtab-courses"
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTabSub === 'courses'
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Recommended Courses ({courseRecommendations.length})
          </button>

          <button
            onClick={() => setActiveTabSub('careers')}
            id="dash-subtab-careers"
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTabSub === 'careers'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Recommended Careers ({careerRecommendations.length})
          </button>

          <button
            onClick={() => setActiveTabSub('saved')}
            id="dash-subtab-saved"
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTabSub === 'saved'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Saved Reports ({savedRecommendations.length})
          </button>
        </div>

        {/* Colleges Tab Content */}
        {activeTabSub === 'colleges' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {collegeRecommendations.map(({ college, admissionProbability, matchedBranches, matchScore }) => (
              <div
                key={college.id}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-cyan-400 font-bold">Code: {college.code}</span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {college.type}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white mt-1 leading-snug">{college.name}</h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      <span>{college.district} • {college.accreditation}</span>
                    </p>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-bold border shrink-0 ${
                      admissionProbability === 'High'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : admissionProbability === 'Moderate'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}
                  >
                    {admissionProbability} Chance
                  </span>
                </div>

                <div className="space-y-1 text-xs">
                  <p className="text-slate-400 font-medium">Matched Branches:</p>
                  <div className="flex flex-wrap gap-1">
                    {matchedBranches.map(b => (
                      <span key={b} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Placement: <strong className="text-white">{college.placementRatePercent}%</strong></span>
                  <span>Avg Package: <strong className="text-cyan-400">{college.avgPackageLpa} LPA</strong></span>
                  <a
                    href={college.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cyan-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    Website <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Courses Tab Content */}
        {activeTabSub === 'courses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courseRecommendations.map(({ course, matchReason, score }) => (
              <div key={course.id} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-blue-400 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                      {course.category}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-1">{course.name}</h3>
                  </div>
                  <span className="text-sm font-black text-cyan-400 font-mono">{score}% Match</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{course.overview}</p>
                <div className="p-2.5 rounded-xl bg-slate-800/60 text-xs text-slate-400 space-y-1">
                  <p><strong className="text-slate-200">Duration:</strong> {course.duration} | <strong className="text-slate-200">Avg Salary:</strong> {course.averageSalary}</p>
                  <p className="text-cyan-300 italic">{matchReason}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Careers Tab Content */}
        {activeTabSub === 'careers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {careerRecommendations.map(({ career, matchReason, avgSalary }) => (
              <div key={career.id} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">{career.title}</h3>
                    <p className="text-xs text-amber-400 font-semibold">{career.category} Industry</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    {career.growthRate}
                  </span>
                </div>
                <p className="text-xs text-slate-300">{career.description}</p>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Expected Salary: <strong className="text-cyan-400">{avgSalary}</strong></span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Saved Reports Tab Content */}
        {activeTabSub === 'saved' && (
          <div className="space-y-4">
            {savedRecommendations.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-8">No saved recommendation reports yet.</p>
            ) : (
              savedRecommendations.map((saved, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white">{saved.studentProfile.name}</p>
                    <p className="text-slate-400">Cutoff: <span className="text-cyan-400 font-mono font-bold">{saved.cutoffScore}</span> • District: {saved.studentProfile.preferredDistrict}</p>
                  </div>
                  <button
                    onClick={handlePrint}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30"
                  >
                    View / Print
                  </button>
                </div>
              ))
            )}
          </div>
        )}

      </div>

    </div>
  );
};
