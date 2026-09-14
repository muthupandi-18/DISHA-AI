import React, { useState, useMemo } from 'react';
import { Search, X, GraduationCap, BookOpen, Briefcase, ChevronRight } from 'lucide-react';
import { COLLEGES_DATA } from '../data/collegesData';
import { COURSES_DATA } from '../data/coursesData';
import { CAREERS_DATA } from '../data/careersData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  setActiveTab: (tab: string) => void;
  onSelectCollege?: (collegeId: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, setActiveTab }) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return { colleges: [], courses: [], careers: [] };

    const q = query.toLowerCase();

    const colleges = COLLEGES_DATA.filter(
      c => c.name.toLowerCase().includes(q) || c.district.toLowerCase().includes(q) || c.code.includes(q)
    ).slice(0, 4);

    const courses = COURSES_DATA.filter(
      co => co.name.toLowerCase().includes(q) || co.category.toLowerCase().includes(q)
    ).slice(0, 4);

    const careers = CAREERS_DATA.filter(
      ca => ca.title.toLowerCase().includes(q) || ca.description.toLowerCase().includes(q)
    ).slice(0, 4);

    return { colleges, courses, careers };
  }, [query]);

  if (!isOpen) return null;

  const totalHits = searchResults.colleges.length + searchResults.courses.length + searchResults.careers.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-cyan-600 dark:text-cyan-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by College name, Code, District, Course, or Career..."
            autoFocus
            className="w-full bg-transparent text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              id="clear-search-btn"
              className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            id="close-search-modal-btn"
            className="px-2 py-1 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded"
          >
            ESC
          </button>
        </div>

        {/* Results Scroll Area */}
        <div className="p-4 overflow-y-auto space-y-6">
          {!query.trim() ? (
            <div className="text-center py-10 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                <Search className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-300">Global TN Education Search</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Type any college name (e.g. CEG Guindy, SSN, PSG Tech), district (Chennai, Coimbatore), course (AI & DS, MBBS), or career role.
              </p>
            </div>
          ) : totalHits === 0 ? (
            <div className="text-center py-10 space-y-2">
              <p className="text-sm font-bold text-slate-800 dark:text-slate-300">No results found for "{query}"</p>
              <p className="text-xs text-slate-500">Try searching for "Coimbatore", "AI & DS", "TNEA", "Medical", or "Software".</p>
            </div>
          ) : (
            <>
              {/* Colleges */}
              {searchResults.colleges.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5" />
                    Colleges ({searchResults.colleges.length})
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.colleges.map(college => (
                      <button
                        key={college.id}
                        onClick={() => {
                          setActiveTab('colleges');
                          onClose();
                        }}
                        id={`search-college-${college.id}`}
                        className="w-full text-left p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between border border-slate-200 dark:border-slate-700/50 group transition-all cursor-pointer"
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                            {college.name}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            Code: <span className="font-mono text-cyan-700 dark:text-cyan-300">{college.code}</span> • {college.district} • {college.accreditation}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Courses */}
              {searchResults.courses.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    Courses ({searchResults.courses.length})
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.courses.map(course => (
                      <button
                        key={course.id}
                        onClick={() => {
                          setActiveTab('courses');
                          onClose();
                        }}
                        id={`search-course-${course.id}`}
                        className="w-full text-left p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between border border-slate-200 dark:border-slate-700/50 group transition-all cursor-pointer"
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {course.name}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {course.category} • {course.duration} • Salary: {course.averageSalary}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Careers */}
              {searchResults.careers.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    Careers ({searchResults.careers.length})
                  </h4>
                  <div className="space-y-1.5">
                    {searchResults.careers.map(career => (
                      <button
                        key={career.id}
                        onClick={() => {
                          setActiveTab('careers');
                          onClose();
                        }}
                        id={`search-career-${career.id}`}
                        className="w-full text-left p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between border border-slate-200 dark:border-slate-700/50 group transition-all cursor-pointer"
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400">
                            {career.title}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            Expected Salary: {career.expectedSalary} • Growth: {career.growthRate}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
