import React, { useState, useMemo } from 'react';
import { Search, Filter, GraduationCap, MapPin, Star, ExternalLink, X, Building, CheckCircle2, ChevronRight, Award, Sparkles } from 'lucide-react';
import { COLLEGES_DATA } from '../data/collegesData';
import { DISTRICT_NAMES } from '../data/tnDistricts';
import { College, CollegeType, CategoryType } from '../types';
import { ScholarshipEligibilitySection } from '../components/ScholarshipEligibilitySection';

export const CollegeExplorerPage: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'directory' | 'scholarships'>('directory');
  const [search, setSearch] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'rating' | 'cutoff' | 'name'>('rating');

  const [selectedCollegeModal, setSelectedCollegeModal] = useState<College | null>(null);

  const filteredColleges = useMemo(() => {
    return COLLEGES_DATA.filter(col => {
      // Search
      const matchesSearch = !search.trim() ||
        col.name.toLowerCase().includes(search.toLowerCase()) ||
        col.code.includes(search) ||
        col.district.toLowerCase().includes(search.toLowerCase());

      // District
      const matchesDistrict = selectedDistrict === 'All' || col.district.toLowerCase() === selectedDistrict.toLowerCase();

      // Type
      const matchesType = selectedType === 'All' || col.type === selectedType;

      // Category
      const matchesCategory = selectedCategory === 'All' || col.category.includes(selectedCategory as CategoryType);

      return matchesSearch && matchesDistrict && matchesType && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.placementRating - a.placementRating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return b.placementRatePercent - a.placementRatePercent;
    });
  }, [search, selectedDistrict, selectedType, selectedCategory, sortBy]);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Page Header */}
      <div className="text-center space-y-3">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
          Tamil Nadu College & Scholarship Portal
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Explore accredited institutions across 38 districts and check your eligibility for government fee waivers (7.5% Quota, First Graduate, Pudhumai Penn, Post-Matric).
        </p>

        {/* SUB-NAVIGATION TAB BAR */}
        <div className="inline-flex items-center gap-2 p-1.5 bg-slate-200/80 dark:bg-slate-900 rounded-2xl border border-slate-300 dark:border-slate-800 text-xs font-bold shadow-inner">
          <button
            onClick={() => setActiveSubTab('directory')}
            id="tab-college-directory-btn"
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'directory'
                ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-md border border-slate-200 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Colleges Directory ({COLLEGES_DATA.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('scholarships')}
            id="tab-scholarship-checker-btn"
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'scholarships'
                ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-md border border-slate-200 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Award className="w-4 h-4 text-emerald-500" />
            <span>Scholarship Eligibility Engine</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
              NEW
            </span>
          </button>
        </div>
      </div>

      {/* SCHOLARSHIP ELIGIBILITY SECTION IF ACTIVE */}
      {activeSubTab === 'scholarships' && (
        <ScholarshipEligibilitySection />
      )}

      {/* COLLEGE DIRECTORY SECTION IF ACTIVE */}
      {activeSubTab === 'directory' && (
        <>
          {/* SEARCH AND FILTERS BAR */}
      <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-cyan-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by college name, code (e.g. 2001, 0001), district, or course..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          
          <div>
            <label className="block text-slate-400 font-semibold mb-1">District (38 TN Districts)</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="All">All Districts</option>
              {DISTRICT_NAMES.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">College Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="All">All Types</option>
              <option value="Government">Government</option>
              <option value="Autonomous">Autonomous</option>
              <option value="Private">Private</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="All">All Categories</option>
              <option value="Engineering">Engineering</option>
              <option value="Medical">Medical</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Arts & Science">Arts & Science</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="rating">Placement Rating</option>
              <option value="cutoff">Placement %</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>

        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
          <span>Showing <strong className="text-white">{filteredColleges.length}</strong> institutions</span>
          {(search || selectedDistrict !== 'All' || selectedType !== 'All' || selectedCategory !== 'All') && (
            <button
              onClick={() => { setSearch(''); setSelectedDistrict('All'); setSelectedType('All'); setSelectedCategory('All'); }}
              id="reset-college-filters-btn"
              className="text-cyan-400 hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* COLLEGES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredColleges.map((college) => (
          <div
            key={college.id}
            className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 overflow-hidden shadow-lg flex flex-col group transition-all"
          >
            {/* Card Image Banner */}
            <div className="relative h-40 overflow-hidden bg-slate-800">
              <img
                src={college.imageUrl}
                alt={college.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-950/80 text-cyan-400 border border-cyan-500/30">
                  Code: {college.code}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950/80 text-white border border-slate-700">
                  {college.type}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-bold text-white">
                <span className="flex items-center gap-1 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  {college.placementRating} / 5.0
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px]">
                  {college.accreditation}
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="text-sm font-bold text-white leading-snug group-hover:text-cyan-400 transition-colors">
                  {college.name}
                </h3>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  <span>{college.district}, Tamil Nadu</span>
                </p>
              </div>

              {/* Courses snippet */}
              <div className="space-y-1 text-xs">
                <p className="text-[11px] text-slate-400 font-semibold">Available Courses:</p>
                <div className="flex flex-wrap gap-1">
                  {college.courses.slice(0, 3).map(c => (
                    <span key={c} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                      {c}
                    </span>
                  ))}
                  {college.courses.length > 3 && (
                    <span className="px-1.5 py-0.5 text-[10px] text-slate-400">+{college.courses.length - 3} more</span>
                  )}
                </div>
              </div>

              {/* Footer Metrics & Detail Trigger */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] block">Avg Package</span>
                  <span className="font-bold text-cyan-400 font-mono">{college.avgPackageLpa} LPA</span>
                </div>

                <button
                  onClick={() => setSelectedCollegeModal(college)}
                  id={`view-college-${college.id}`}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer"
                >
                  Details & Scholarships →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
        </>
      )}

      {/* COLLEGE DETAILS MODAL */}
      {selectedCollegeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Image Header */}
            <div className="relative h-48 bg-slate-800 shrink-0">
              <img
                src={selectedCollegeModal.imageUrl}
                alt={selectedCollegeModal.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
              
              <button
                onClick={() => setSelectedCollegeModal(null)}
                id="close-college-modal-btn"
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/80 text-slate-300 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  TNEA Code: {selectedCollegeModal.code}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-white mt-1">{selectedCollegeModal.name}</h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-300">
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-2xl bg-slate-800/60 text-center">
                <div>
                  <span className="text-slate-400 block text-[10px]">District</span>
                  <span className="font-bold text-white">{selectedCollegeModal.district}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Type</span>
                  <span className="font-bold text-white">{selectedCollegeModal.type}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Placement Rate</span>
                  <span className="font-bold text-emerald-400">{selectedCollegeModal.placementRatePercent}%</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Standard Fees</span>
                  <span className="font-bold text-cyan-400">{selectedCollegeModal.feesPerYear}</span>
                </div>
              </div>

              {/* SCHOLARSHIPS & CONCESSIONS BREAKDOWN */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border border-emerald-500/30 space-y-2">
                <h4 className="font-bold text-white flex items-center gap-1.5 text-xs">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Applicable TN Govt & College Scholarships</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded-xl bg-slate-800 border border-slate-700">
                    <span className="font-bold text-emerald-400 block">7.5% TN Govt School Quota</span>
                    <span className="text-slate-400">100% Tuition & Hostel fee covered for eligible students</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-800 border border-slate-700">
                    <span className="font-bold text-cyan-400 block">First Graduate Concession</span>
                    <span className="text-slate-400">₹20,000 - ₹25,000/yr tuition fee reduction</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-800 border border-slate-700">
                    <span className="font-bold text-blue-400 block">Pudhumai Penn / Tamil Pudhalvan</span>
                    <span className="text-slate-400">₹1,000/month directly credited to student bank</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-800 border border-slate-700">
                    <span className="font-bold text-amber-400 block">Post-Matric SC/ST Waiver</span>
                    <span className="text-slate-400">100% Tuition waiver for income ≤ ₹2.5 LPA</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white mb-2">Available Courses & Cutoffs</h4>
                <div className="space-y-1.5">
                  {selectedCollegeModal.courses.map(c => (
                    <div key={c} className="p-2 rounded-xl bg-slate-800/40 flex items-center justify-between border border-slate-800">
                      <span className="font-semibold text-slate-200">{c}</span>
                      <span className="text-cyan-400 font-mono font-bold">
                        {selectedCollegeModal.previousCutoff[c] ? `Prev Cutoff: ${selectedCollegeModal.previousCutoff[c]}` : 'Counseling Merit'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white mb-1">Address & Contact</h4>
                <p className="text-slate-400">{selectedCollegeModal.address}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => {
                    setSelectedCollegeModal(null);
                    setActiveSubTab('scholarships');
                  }}
                  id="check-scholarships-full-btn"
                  className="px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold flex items-center gap-1.5 border border-emerald-500/30 cursor-pointer transition-all text-xs"
                >
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Check All My Scholarship Matches</span>
                </button>

                <a
                  href={selectedCollegeModal.website}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center gap-2 cursor-pointer transition-all"
                >
                  <span>Visit Official Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
