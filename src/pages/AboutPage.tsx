import React from 'react';
import { Sparkles, Target, Cpu, Award, Shield, CheckCircle2, BookOpen, Compass } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-16">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>About DISHA AI Platform</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Revolutionizing College Guidance for Tamil Nadu Youth
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
          DISHA AI was created to eliminate guidance disparity for 12th standard students across Tamil Nadu by using artificial intelligence, real counseling cutoffs, and skill-matching algorithms.
        </p>
      </div>

      {/* Grid of Objectives */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">Project Objective</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            To provide a single-window transparent system where students enter their 12th subject marks (Maths, Physics, Chemistry, Biology, NEET score) and receive instant, unbiased recommendations for Colleges, Branches, and Careers across Tamil Nadu.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">How AI Empowers Students</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Traditional guidance relies on word-of-mouth or limited local knowledge. DISHA AI analyzes thousands of data points—previous year TNEA cutoffs, NAAC accreditation ratings, placement percentages, skill demand, and district proximity—to output tailored admission insights.
          </p>
        </div>

      </div>

      {/* Recommendation Workflow Process */}
      <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <h3 className="text-lg font-bold text-white text-center">Step-by-Step Recommendation Process</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          
          <div className="p-4 rounded-xl bg-slate-800/50 space-y-2">
            <div className="w-8 h-8 mx-auto rounded-full bg-cyan-500 text-slate-950 font-black flex items-center justify-center text-xs">
              1
            </div>
            <h4 className="text-xs font-bold text-white">Input Details</h4>
            <p className="text-[11px] text-slate-400">Enter HSC Marks, Stream, Multi-select Skills & Interests, and Preferred District.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/50 space-y-2">
            <div className="w-8 h-8 mx-auto rounded-full bg-blue-500 text-white font-black flex items-center justify-center text-xs">
              2
            </div>
            <h4 className="text-xs font-bold text-white">Instant Cutoff</h4>
            <p className="text-[11px] text-slate-400">System calculates TNEA Engineering or Agriculture Cutoffs instantly.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/50 space-y-2">
            <div className="w-8 h-8 mx-auto rounded-full bg-indigo-500 text-white font-black flex items-center justify-center text-xs">
              3
            </div>
            <h4 className="text-xs font-bold text-white">AI Matching</h4>
            <p className="text-[11px] text-slate-400">Gemini AI models and deterministic engine match colleges & career roles.</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/50 space-y-2">
            <div className="w-8 h-8 mx-auto rounded-full bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-xs">
              4
            </div>
            <h4 className="text-xs font-bold text-white">Dashboard & Export</h4>
            <p className="text-[11px] text-slate-400">View Recharts analytics, save choices, or download/print PDF reports.</p>
          </div>

        </div>
      </div>

    </div>
  );
};
