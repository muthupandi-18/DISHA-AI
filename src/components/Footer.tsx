import React from 'react';
import { Sparkles, MapPin, Phone, Mail, GraduationCap, Shield, Heart } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-900 pt-12 pb-8 transition-colors mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight">
                DISHA <span className="text-cyan-600 dark:text-cyan-400">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Tamil Nadu’s flagship AI-powered College, Course & Career Recommendation Engine for 12th standard students navigating TNEA, NEET, TANUVAS, TNAU, and Arts & Science counseling.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
              <span>Dedicated to Students across all 38 TN Districts</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Quick Navigation</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActiveTab('recommend')} id="footer-link-form" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer">
                  AI Recommendation Form
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} id="footer-link-dashboard" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer">
                  Student Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('colleges')} id="footer-link-colleges" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer">
                  TN College Explorer
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('courses')} id="footer-link-courses" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer">
                  Top Course Catalog
                </button>
              </li>
            </ul>
          </div>

          {/* Academic Categories */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Counseling Streams</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>TNEA Engineering Cutoff Formula</span>
              </li>
              <li className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>NEET Medical & BDS Admissions</span>
              </li>
              <li className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>TNAU Agriculture & TANUVAS Vet</span>
              </li>
              <li className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Arts & Science Merit Percentages</span>
              </li>
            </ul>
          </div>

          {/* Student Helpline & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Counseling Support</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Have questions about TNEA cutoffs or career paths? Chat live with DISHA AI.
            </p>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs shadow-sm dark:shadow-none">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Phone className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Helpline: 1800-425-4300 (TNEA Toll-Free)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Mail className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>support@disha.ai.tn.gov</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="border-t border-slate-200 dark:border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
          <p>© 2026 DISHA AI System. Built for Tamil Nadu Higher Education Guidance.</p>
          <div className="flex items-center gap-1">
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for 12th Standard Students</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
