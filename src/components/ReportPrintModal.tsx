import React from 'react';
import { X, Printer, Sparkles, CheckCircle2, GraduationCap, MapPin, Award } from 'lucide-react';
import { useRecommendation } from '../context/RecommendationContext';

interface ReportPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportPrintModal: React.FC<ReportPrintModalProps> = ({ isOpen, onClose }) => {
  const { result } = useRecommendation();

  if (!isOpen || !result) return null;

  const { studentProfile, aiSummary, cutoffScore, collegeRecommendations, courseRecommendations, careerRecommendations } = result;

  const handlePrintAction = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md animate-fade-in print:p-0 print:bg-white print:static">
      <div className="w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 md:p-8 overflow-y-auto max-h-[92vh] space-y-6 text-slate-900 dark:text-white print:bg-white print:text-black print:border-none print:shadow-none print:max-h-none print:w-full">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 print:border-black pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500 flex items-center justify-center text-slate-950 font-black">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight print:text-black">DISHA AI RECOMMENDATION REPORT</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 print:text-gray-600">Tamil Nadu Higher Education Counseling System 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handlePrintAction}
              id="print-modal-trigger-btn"
              className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer hover:bg-cyan-400"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>

            <button
              onClick={onClose}
              id="close-print-modal-btn"
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Student Profile Overview */}
        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 print:bg-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 print:text-gray-600 block text-[10px]">Student Name</span>
            <span className="font-bold print:text-black">{studentProfile.name}</span>
          </div>
          <div>
            <span className="text-slate-400 print:text-gray-600 block text-[10px]">HSC Board & Stream</span>
            <span className="font-bold print:text-black">{studentProfile.hscBoard} ({studentProfile.stream})</span>
          </div>
          <div>
            <span className="text-slate-400 print:text-gray-600 block text-[10px]">Target Category</span>
            <span className="font-bold text-cyan-400 print:text-blue-700">{studentProfile.category}</span>
          </div>
          <div>
            <span className="text-slate-400 print:text-gray-600 block text-[10px]">Calculated Cutoff</span>
            <span className="font-bold text-emerald-400 font-mono text-sm print:text-emerald-700">{cutoffScore.toFixed(2)} / 200</span>
          </div>
        </div>

        {/* AI Insight */}
        <div className="p-4 rounded-2xl bg-slate-800/40 print:bg-gray-50 border border-slate-700/80 print:border-gray-300 space-y-1">
          <h4 className="text-xs font-bold text-cyan-400 print:text-blue-800 uppercase tracking-wider">AI Summary Insight</h4>
          <p className="text-xs text-slate-200 print:text-gray-800 leading-relaxed italic">"{aiSummary}"</p>
        </div>

        {/* Top Colleges Section */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-white print:text-black uppercase tracking-wider border-b border-slate-800 print:border-gray-300 pb-1">
            Matched Tamil Nadu Colleges
          </h3>
          <div className="space-y-2">
            {collegeRecommendations.slice(0, 5).map(({ college, admissionProbability, matchedBranches }) => (
              <div key={college.id} className="p-3 rounded-xl bg-slate-800/40 print:bg-white print:border print:border-gray-300 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold print:text-black">{college.name} <span className="font-mono text-cyan-400 text-[10px] print:text-blue-600">(Code: {college.code})</span></p>
                  <p className="text-[11px] text-slate-400 print:text-gray-600">{college.district} • Branches: {matchedBranches.join(', ')}</p>
                </div>
                <span className="font-bold text-emerald-400 print:text-emerald-700">{admissionProbability} Chance</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Courses & Careers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <h3 className="font-bold text-white print:text-black border-b border-slate-800 print:border-gray-300 pb-1 mb-2">Top Recommended Courses</h3>
            <ul className="space-y-1.5 text-slate-300 print:text-gray-800">
              {courseRecommendations.slice(0, 3).map(({ course }) => (
                <li key={course.id} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 print:text-blue-600 shrink-0" />
                  <span>{course.name} ({course.duration})</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white print:text-black border-b border-slate-800 print:border-gray-300 pb-1 mb-2">Career Prospects</h3>
            <ul className="space-y-1.5 text-slate-300 print:text-gray-800">
              {careerRecommendations.slice(0, 3).map(({ career, avgSalary }) => (
                <li key={career.id} className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400 print:text-amber-600 shrink-0" />
                  <span>{career.title} ({avgSalary})</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer info for print */}
        <div className="pt-4 border-t border-slate-800 print:border-gray-300 flex justify-between text-[10px] text-slate-500 print:text-gray-500">
          <span>Generated by DISHA AI Guidance Platform</span>
          <span>Date: {new Date().toLocaleDateString('en-IN')}</span>
        </div>

      </div>
    </div>
  );
};
