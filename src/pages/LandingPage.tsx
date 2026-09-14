import React, { useState } from 'react';
import { Sparkles, ArrowRight, GraduationCap, Calculator, ShieldCheck, TrendingUp, Award, CheckCircle2, Star, BookOpen, Users, Compass } from 'lucide-react';

interface LandingPageProps {
  setActiveTab: (tab: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ setActiveTab }) => {
  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 rounded-3xl bg-white/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 backdrop-blur-xl shadow-xl dark:shadow-none">
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 dark:text-cyan-400 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>AI-Powered Tamil Nadu Counseling System 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Empowering <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">Tamil Nadu Students</span> to Choose the Right College & Career
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            DISHA AI analyzes your 12th standard subject marks, stream, TNEA / NEET cutoffs, skills, interests, and preferred Tamil Nadu district to recommend the best colleges, branches, and future job prospects.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setActiveTab('recommend')}
              id="hero-get-started-btn"
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-cyan-500/25 flex items-center gap-2 transform hover:-translate-y-0.5 transition-all cursor-pointer"
            >
              <span>Start AI Recommendation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('colleges')}
              id="hero-explore-colleges-btn"
              className="px-6 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm border border-slate-200 dark:border-slate-700/80 flex items-center gap-2 transition-all cursor-pointer shadow-sm dark:shadow-none"
            >
              <GraduationCap className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Explore TN Colleges</span>
            </button>
          </div>

          {/* Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-slate-200 dark:border-slate-800/80 text-xs text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <span>AI-Powered College Matching</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>Personalized PDF Reports</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Verified Placement & NIRF Data</span>
            </div>
          </div>

        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 text-center space-y-1 shadow-sm dark:shadow-none">
            <p className="text-2xl sm:text-3xl font-black text-cyan-600 dark:text-cyan-400 font-mono">500+</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">TN Colleges Indexed</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 text-center space-y-1 shadow-sm dark:shadow-none">
            <p className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 font-mono">100+</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Career Pathways</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 text-center space-y-1 shadow-sm dark:shadow-none">
            <p className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">98.5%</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Recommendation Accuracy</p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 text-center space-y-1 shadow-sm dark:shadow-none">
            <p className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 font-mono">1.5L+</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">TN Students Guided</p>
          </div>

        </div>
      </section>

      {/* CORE FEATURES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Why Students & Parents Trust DISHA AI
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            End-to-end guidance designed specifically for the Tamil Nadu higher education counseling ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Feature 1 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-all space-y-3 group shadow-sm dark:shadow-none">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Calculator className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Official Cutoff Calculations</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Automatic calculations for TNEA Engineering Cutoffs, TANUVAS Veterinary Cutoffs, and TNAU Agriculture Cutoffs based on state regulations.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 transition-all space-y-3 group shadow-sm dark:shadow-none">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Skill & Interest Alignment</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Don’t just pick a college; pick the right branch (AI & DS, CSE, ECE, Biotech) matching your personal skills and long-term career aspirations.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 transition-all space-y-3 group shadow-sm dark:shadow-none">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Scholarships & Fee Insights</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Discover Tamil Nadu government scheme eligibility (First Graduate, 7.5% Govt School quota, Moovalur Ramamirtham) and fee estimates.
            </p>
          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Student Success Stories</h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">Hear from Tamil Nadu students who secured admissions through DISHA AI guidance.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3 text-xs shadow-sm dark:shadow-none">
            <div className="flex text-amber-500 dark:text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-500 dark:fill-amber-400" />)}
            </div>
            <p className="text-slate-700 dark:text-slate-300 italic">
              "DISHA AI calculated my TNEA cutoff (194.5) and recommended AI & DS at CEG Guindy and SSN. I got allocated to my top preferred choice during round 1 counseling!"
            </p>
            <div className="border-t border-slate-100 dark:border-slate-800 pt-2 font-semibold text-slate-900 dark:text-slate-200">
              — K. Arunkumar <span className="text-slate-500 text-[10px] block font-normal">TNEA Rank 1,240 (Chennai)</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3 text-xs shadow-sm dark:shadow-none">
            <div className="flex text-amber-500 dark:text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-500 dark:fill-amber-400" />)}
            </div>
            <p className="text-slate-700 dark:text-slate-300 italic">
              "I was confused between ECE and CSE. DISHA AI analyzed my programming skills and suggested PSG Tech Coimbatore. The downloadable report was super helpful for my parents."
            </p>
            <div className="border-t border-slate-100 dark:border-slate-800 pt-2 font-semibold text-slate-900 dark:text-slate-200">
              — S. Priya <span className="text-slate-500 text-[10px] block font-normal">PSG Tech Admit (Coimbatore)</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-3 text-xs shadow-sm dark:shadow-none">
            <div className="flex text-amber-500 dark:text-amber-400 gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-500 dark:fill-amber-400" />)}
            </div>
            <p className="text-slate-700 dark:text-slate-300 italic">
              "With my NEET score of 620, DISHA AI showed me exact medical college chances in Madurai Medical College and KAP Trichy. Truly a blessing for TN students!"
            </p>
            <div className="border-t border-slate-100 dark:border-slate-800 pt-2 font-semibold text-slate-900 dark:text-slate-200">
              — M. Venkatesh <span className="text-slate-500 text-[10px] block font-normal">Madurai Medical College</span>
            </div>
          </div>

        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-cyan-900/60 via-blue-900/60 to-indigo-900/60 border border-cyan-500/30 text-center space-y-6 backdrop-blur-2xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-black text-white">Ready to Discover Your Dream College?</h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Fill out the 2-minute DISHA AI Recommendation Form and receive immediate college matches, course options, and career roadmaps tailored to you.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('recommend')}
            id="cta-recommend-btn"
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-sm shadow-2xl transition-all hover:scale-105 cursor-pointer inline-flex items-center gap-2"
          >
            <span>Launch Recommendation Form</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

    </div>
  );
};
