import React, { useState } from 'react';
import { BookOpen, Search, Clock, DollarSign, Award, ChevronRight, X, GraduationCap, CheckCircle2 } from 'lucide-react';
import { COURSES_DATA } from '../data/coursesData';
import { CourseDetail, CategoryType } from '../types';

export const CourseExplorerPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCourseModal, setSelectedCourseModal] = useState<CourseDetail | null>(null);

  const filteredCourses = COURSES_DATA.filter(c => {
    const matchesSearch = !search.trim() ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.overview.toLowerCase().includes(search.toLowerCase());
    
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Tamil Nadu Higher Education Course Directory
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Detailed guide on Engineering, Medical, Agriculture, and Arts & Science courses available through TNEA, NEET, TNAU, and TANUVAS.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 max-w-3xl mx-auto">
        <div className="relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-cyan-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses (e.g. Artificial Intelligence, MBBS, Agriculture, Biotechnology)..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto text-xs font-semibold">
          {['All', 'Engineering', 'Medical', 'Agriculture', 'Arts & Science'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold'
                  : 'bg-slate-800/80 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* COURSES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                  {course.category}
                </span>
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  {course.duration}
                </span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                {course.name}
              </h3>

              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                {course.overview}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block">Average Salary</span>
                <span className="font-bold text-emerald-400 font-mono">{course.averageSalary}</span>
              </div>

              <button
                onClick={() => setSelectedCourseModal(course)}
                id={`view-course-${course.id}`}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition-all cursor-pointer"
              >
                Course Info →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* COURSE DETAILS MODAL */}
      {selectedCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 overflow-hidden max-h-[90vh] flex flex-col space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10">
                  {selectedCourseModal.category}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white mt-1">{selectedCourseModal.name}</h2>
              </div>
              <button
                onClick={() => setSelectedCourseModal(null)}
                id="close-course-modal-btn"
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-4 text-xs text-slate-300">
              
              <div className="p-3 rounded-2xl bg-slate-800/60 grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                <div>
                  <span className="text-slate-400 block text-[10px]">Duration</span>
                  <span className="font-bold text-white">{selectedCourseModal.duration}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Average Salary</span>
                  <span className="font-bold text-emerald-400">{selectedCourseModal.averageSalary}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Eligibility</span>
                  <span className="font-bold text-cyan-400">{selectedCourseModal.eligibility}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white mb-1">Course Overview</h4>
                <p className="text-slate-400 leading-relaxed">{selectedCourseModal.overview}</p>
              </div>

              {selectedCourseModal.futureScope && (
                <div>
                  <h4 className="font-bold text-white mb-1">Future Scope & Demand</h4>
                  <p className="text-slate-400 leading-relaxed bg-slate-800/40 p-3 rounded-xl border border-slate-800 text-cyan-300">
                    {selectedCourseModal.futureScope}
                  </p>
                </div>
              )}

              <div>
                <h4 className="font-bold text-white mb-2">Key Skills Developed</h4>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedCourseModal.skillsRequired || []).map((s, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white mb-2">Career Opportunities</h4>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedCourseModal.careerOpportunities || []).map((c, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-semibold">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white mb-2">Top Colleges Offering This Course in TN</h4>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedCourseModal.topColleges || []).map((tc, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200">
                      {tc}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
