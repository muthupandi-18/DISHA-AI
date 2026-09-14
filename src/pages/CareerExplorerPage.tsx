import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Search, 
  TrendingUp, 
  DollarSign, 
  Award, 
  ChevronRight, 
  X, 
  Layers, 
  CheckCircle2, 
  CheckSquare, 
  Square, 
  Zap, 
  BarChart3, 
  Plus, 
  Trash2, 
  Sparkles,
  BookOpen,
  Target,
  Flame,
  UserCheck,
  Compass,
  MapPin,
  RotateCcw
} from 'lucide-react';
import { CAREERS_DATA } from '../data/careersData';
import { CareerDetail } from '../types';
import { SkillRoadmapSection } from '../components/SkillRoadmapSection';
import { useRecommendation } from '../context/RecommendationContext';

const LOCAL_STORAGE_SKILL_KEY = 'disha_student_skills_progress_v1';

// Default skills mapping per career ID for extra industry granularity
const DOMAIN_EXTRA_SKILLS: Record<string, string[]> = {
  'ai-engineer': ['Python & NumPy', 'PyTorch / TensorFlow', 'Mathematics & Linear Algebra', 'MLOps & Model Deployment', 'Prompt Engineering'],
  'software-developer': ['Data Structures & Algorithms', 'React / Modern Frontend', 'Node.js & Rest APIs', 'SQL & Database Design', 'Git & CI/CD'],
  'cyber-analyst': ['Linux Systems Administration', 'Network Protocols & Wireshark', 'Ethical Hacking / Metasploit', 'OWASP Top 10 Security', 'Cloud Security'],
  'embedded-engineer': ['C / Embedded C Programming', 'Microcontrollers (ARM/ESP32)', 'RTOS Principles', 'Circuit Design & PCB Layout', 'IoT Protocols (MQTT/SPI)'],
  'doctor-physician': ['Human Anatomy & Physiology', 'Clinical Diagnostics', 'Pharmacology Basics', 'Emergency First Care', 'Patient Ethics & Communication'],
  'dental-surgeon': ['Dental Anatomy & Radiology', 'Periodontics & Root Canal', 'Oral Surgery Basics', 'Cosmetic Dentistry', 'Sterilization Protocols'],
  'agri-officer': ['Soil Health & Nutrient Analysis', 'Organic Pest Management', 'Precision Agri-Tech & Drones', 'Crop Pathology', 'Rural Welfare Policies'],
  'veterinary-surgeon': ['Animal Anatomy & Pathology', 'Surgical Procedures', 'Livestock Nutrition', 'Vaccination Protocols', 'Veterinary Diagnostics'],
  'chartered-accountant': ['Financial Accounting & Tally/SAP', 'GST & Income Tax Laws', 'Corporate Auditing', 'Cost Management', 'Excel & Financial Modeling'],
  'business-analyst': ['SQL & Data Analytics', 'PowerBI / Tableau', 'Requirements Gathering', 'Process Mapping (BPMN)', 'Agile / Scrum Methodology']
};

export const CareerExplorerPage: React.FC = () => {
  const { studentProfile } = useRecommendation();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCareerModal, setSelectedCareerModal] = useState<CareerDetail | null>(null);
  
  // Navigation Sub-tab: 'roadmap' | 'tracker' | 'catalog'
  const [activeSubTab, setActiveSubTab] = useState<'roadmap' | 'tracker' | 'catalog'>('roadmap');

  // Skill Tracker State: Record<careerId, string[]> storing checked skill names
  const [checkedSkillsMap, setCheckedSkillsMap] = useState<Record<string, string[]>>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_SKILL_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // If user has not submitted form, ensure we clear any pre-filled stale mock checklist
  useEffect(() => {
    if (!studentProfile.hasSubmittedForm) {
      localStorage.removeItem(LOCAL_STORAGE_SKILL_KEY);
      setCheckedSkillsMap({});
    }
  }, [studentProfile.hasSubmittedForm]);

  // Active Career for the standalone Tracker section
  const [activeTrackerCareerId, setActiveTrackerCareerId] = useState<string>(CAREERS_DATA[0].id);
  const [customSkillInput, setCustomSkillInput] = useState('');
  const [customSkillsMap, setCustomSkillsMap] = useState<Record<string, string[]>>({});

  const handleResetSkillsChecklist = () => {
    setCheckedSkillsMap({});
    localStorage.removeItem(LOCAL_STORAGE_SKILL_KEY);
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_SKILL_KEY, JSON.stringify(checkedSkillsMap));
    } catch (e) {
      console.error('Error saving skills progress to localStorage', e);
    }
  }, [checkedSkillsMap]);

  const activeCareer = CAREERS_DATA.find(c => c.id === activeTrackerCareerId) || CAREERS_DATA[0];

  // Combined skills for selected career
  const getCareerSkillsList = (careerId: string) => {
    const careerObj = CAREERS_DATA.find(c => c.id === careerId);
    if (!careerObj) return [];
    const base = careerObj.requiredSkills;
    const extras = DOMAIN_EXTRA_SKILLS[careerId] || [];
    const customs = customSkillsMap[careerId] || [];
    // Remove duplicates
    return Array.from(new Set([...base, ...extras, ...customs]));
  };

  const toggleSkillCheck = (careerId: string, skillName: string) => {
    setCheckedSkillsMap(prev => {
      const currentChecked = prev[careerId] || [];
      const exists = currentChecked.includes(skillName);
      const updated = exists 
        ? currentChecked.filter(s => s !== skillName)
        : [...currentChecked, skillName];
      return {
        ...prev,
        [careerId]: updated
      };
    });
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSkillInput.trim()) return;
    const skillName = customSkillInput.trim();

    setCustomSkillsMap(prev => {
      const currentCustoms = prev[activeTrackerCareerId] || [];
      if (currentCustoms.includes(skillName)) return prev;
      return {
        ...prev,
        [activeTrackerCareerId]: [...currentCustoms, skillName]
      };
    });

    // Auto-check new custom skill
    toggleSkillCheck(activeTrackerCareerId, skillName);
    setCustomSkillInput('');
  };

  // Calculate stats for active tracker career
  const currentSkillsList = getCareerSkillsList(activeTrackerCareerId);
  const currentChecked = checkedSkillsMap[activeTrackerCareerId] || [];
  const completedCount = currentChecked.filter(s => currentSkillsList.includes(s)).length;
  const totalCount = currentSkillsList.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Total overall skills across all careers learned
  const totalSkillsLearnedOverall = (Object.values(checkedSkillsMap) as string[][]).reduce((acc, arr) => acc + arr.length, 0);

  const getReadinessLevelBadge = (pct: number) => {
    if (pct >= 85) return { label: 'Industry Ready 🚀', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' };
    if (pct >= 50) return { label: 'Intermediate Competency ⚡', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40' };
    if (pct >= 20) return { label: 'Building Foundation 🌱', color: 'bg-amber-500/20 text-amber-400 border-amber-500/40' };
    return { label: 'Skill Goal Started 🎯', color: 'bg-slate-800 text-slate-400 border-slate-700' };
  };

  const filteredCareers = CAREERS_DATA.filter(c => {
    const matchesSearch = !search.trim() ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());

    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wide">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>Industry Readiness & Career Mapping</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Tamil Nadu Career Prospects & <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-amber-400 bg-clip-text text-transparent">Skill Roadmaps</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Explore high-growth Tamil Nadu career paths, follow 4-stage step-by-step skill roadmaps, and track your placement readiness.
        </p>
      </div>

      {/* TOP NAVIGATION SUB-TABS */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 border-b border-slate-800 pb-4 max-w-2xl mx-auto">
        <button
          onClick={() => setActiveSubTab('roadmap')}
          id="subtab-roadmap-btn"
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'roadmap'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Skill Roadmaps</span>
        </button>

        <button
          onClick={() => setActiveSubTab('tracker')}
          id="subtab-tracker-btn"
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'tracker'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Skill Checklist</span>
        </button>

        <button
          onClick={() => setActiveSubTab('catalog')}
          id="subtab-catalog-btn"
          className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
            activeSubTab === 'catalog'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-lg shadow-cyan-500/20'
              : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Career Catalog</span>
        </button>
      </div>

      {/* VIEW 1: INTERACTIVE SKILL ROADMAP SECTION */}
      {activeSubTab === 'roadmap' && (
        <SkillRoadmapSection 
          checkedSkillsMap={checkedSkillsMap}
          onToggleSkill={toggleSkillCheck}
        />
      )}

      {/* VIEW 2: SKILL PROGRESS TRACKER BANNER / SECTION */}
      {activeSubTab === 'tracker' && (
        <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-cyan-500/30 backdrop-blur-xl shadow-2xl relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800/80 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white font-bold shadow-lg shadow-cyan-500/20">
                  <BarChart3 className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-white">Student Industry Skill Progress Tracker</h2>
                  <p className="text-xs text-slate-400">Check off skills you are learning in college or self-study to benchmark against hiring requirements.</p>
                </div>
              </div>
            </div>

            {/* Total Overall Stats */}
            <div className="flex items-center gap-4 bg-slate-950/60 p-3 rounded-2xl border border-slate-800 shrink-0">
              <div className="text-center px-2">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">Skills Mastered</span>
                <span className="text-xl font-black text-cyan-400 font-mono">{totalSkillsLearnedOverall}</span>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div className="text-center px-2">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">Target Goal</span>
                <span className="text-xl font-black text-amber-400 font-mono">{activeCareer.title.split(' ')[0]}</span>
              </div>
              {totalSkillsLearnedOverall > 0 && (
                <>
                  <div className="h-8 w-px bg-slate-800" />
                  <button
                    onClick={handleResetSkillsChecklist}
                    id="reset-skills-checklist-btn"
                    title="Clear all checked skills"
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Reset</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Tracker Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
            
            {/* Target Role Selector */}
            <div className="lg:col-span-4 space-y-3">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                1. Select Target Career Role
              </label>
              <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                {CAREERS_DATA.map(c => {
                  const cSkills = getCareerSkillsList(c.id);
                  const cChecked = (checkedSkillsMap[c.id] || []).filter(s => cSkills.includes(s)).length;
                  const cPct = cSkills.length > 0 ? Math.round((cChecked / cSkills.length) * 100) : 0;
                  const isSelected = activeTrackerCareerId === c.id;

                  return (
                    <button
                      key={c.id}
                      onClick={() => setActiveTrackerCareerId(c.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-cyan-950/40 border-cyan-500/50 text-white shadow-lg'
                          : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="truncate pr-2">
                        <p className={`text-xs font-bold truncate ${isSelected ? 'text-cyan-300' : 'text-slate-200'}`}>{c.title}</p>
                        <span className="text-[10px] text-slate-400">{c.category} • {cChecked}/{cSkills.length} skills</span>
                      </div>
                      <div className="shrink-0 flex items-center gap-2">
                        <span className={`text-xs font-mono font-bold ${cPct >= 80 ? 'text-emerald-400' : cPct > 0 ? 'text-cyan-400' : 'text-slate-500'}`}>
                          {cPct}%
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Skills Checklist */}
            <div className="lg:col-span-8 space-y-4 bg-slate-950/70 p-5 rounded-2xl border border-slate-800/80">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-cyan-400">Target Role Benchmark</span>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span>{activeCareer.title}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${getReadinessLevelBadge(progressPercent).color}`}>
                      {getReadinessLevelBadge(progressPercent).label}
                    </span>
                  </h3>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-semibold">Role Readiness Score</span>
                    <span className="text-lg font-black text-cyan-400 font-mono">{completedCount} / {totalCount} Skills ({progressPercent}%)</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Checklist Grid */}
              <div className="space-y-2 pt-1">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Industry Required & Core Technical Competencies:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[220px] overflow-y-auto pr-1">
                  {currentSkillsList.map((skill) => {
                    const isChecked = currentChecked.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkillCheck(activeTrackerCareerId, skill)}
                        className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                          isChecked 
                            ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200 font-medium' 
                            : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-600 shrink-0" />
                        )}
                        <span className={`text-xs truncate ${isChecked ? 'line-through text-slate-400' : ''}`}>{skill}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add Custom Skill Form */}
              <form onSubmit={handleAddCustomSkill} className="flex items-center gap-2 pt-2 border-t border-slate-800">
                <input
                  type="text"
                  value={customSkillInput}
                  onChange={(e) => setCustomSkillInput(e.target.value)}
                  placeholder="Add your own self-learned skill (e.g. Docker, Figma, AWS)..."
                  className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Skill</span>
                </button>
              </form>

            </div>

          </div>
        </section>
      )}

      {/* VIEW 3: CAREER CATALOG */}
      {activeSubTab === 'catalog' && (
        <>
          {/* Filter & Search Bar */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-cyan-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search job roles (e.g. AI Specialist, Doctor, Agronomist, Software Engineer)..."
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
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold'
                      : 'bg-slate-800/80 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* CAREERS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCareers.map((career) => {
              const cSkills = getCareerSkillsList(career.id);
              const cChecked = (checkedSkillsMap[career.id] || []).filter(s => cSkills.includes(s)).length;
              const cPct = cSkills.length > 0 ? Math.round((cChecked / cSkills.length) * 100) : 0;

              return (
                <div
                  key={career.id}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                        {career.category}
                      </span>
                      <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5" />
                        {career.growthRate}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                      {career.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {career.description}
                    </p>

                    {/* Skill readiness badge in card */}
                    <div className="pt-2 flex items-center justify-between text-xs">
                      <span className="text-[11px] text-slate-400">Skill Progress:</span>
                      <span className={`text-xs font-mono font-bold ${cPct >= 80 ? 'text-emerald-400' : cPct > 0 ? 'text-cyan-400' : 'text-slate-500'}`}>
                        {cChecked} / {cSkills.length} ({cPct}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-cyan-400 rounded-full transition-all"
                        style={{ width: `${cPct}%` }}
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Expected Starting Salary</span>
                      <span className="font-bold text-cyan-400 font-mono">{career.expectedSalary}</span>
                    </div>

                    <button
                      onClick={() => setSelectedCareerModal(career)}
                      id={`view-career-${career.id}`}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition-all cursor-pointer"
                    >
                      Career Info →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* CAREER DETAILS MODAL WITH SKILL TRACKER INTEGRATION */}
      {selectedCareerModal && (() => {
        const modalSkills = getCareerSkillsList(selectedCareerModal.id);
        const modalChecked = (checkedSkillsMap[selectedCareerModal.id] || []).filter(s => modalSkills.includes(s));
        const modalPct = modalSkills.length > 0 ? Math.round((modalChecked.length / modalSkills.length) * 100) : 0;

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
            <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 overflow-hidden max-h-[90vh] flex flex-col space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] uppercase font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10">
                    {selectedCareerModal.category} Domain
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-white mt-1">{selectedCareerModal.title}</h2>
                </div>
                <button
                  onClick={() => setSelectedCareerModal(null)}
                  id="close-career-modal-btn"
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-y-auto space-y-4 text-xs text-slate-300 pr-1">
                
                <div className="p-3 rounded-2xl bg-slate-800/60 grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Expected Salary</span>
                    <span className="font-bold text-cyan-400">{selectedCareerModal.expectedSalary}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">5-Yr Growth Rate</span>
                    <span className="font-bold text-emerald-400">{selectedCareerModal.growthRate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Future TN Demand</span>
                    <span className="font-bold text-amber-400">{selectedCareerModal.futureDemand}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-white mb-1">Role Description</h4>
                  <p className="text-slate-400 leading-relaxed">{selectedCareerModal.description}</p>
                </div>

                {/* Interactive Skill Tracker inside Modal */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/30 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                      <h4 className="font-bold text-white">Your Skill Checklist for {selectedCareerModal.title}</h4>
                    </div>
                    <span className="text-xs font-mono font-bold text-cyan-400">
                      {modalChecked.length} / {modalSkills.length} ({modalPct}%)
                    </span>
                  </div>

                  <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all"
                      style={{ width: `${modalPct}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {modalSkills.map((sk) => {
                      const isChecked = modalChecked.includes(sk);
                      return (
                        <button
                          key={sk}
                          type="button"
                          onClick={() => toggleSkillCheck(selectedCareerModal.id, sk)}
                          className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                            isChecked 
                              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200' 
                              : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          {isChecked ? (
                            <CheckSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          ) : (
                            <Square className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                          )}
                          <span className={`text-xs truncate ${isChecked ? 'line-through text-slate-400' : ''}`}>{sk}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-white mb-2">Key Hiring Industries in Tamil Nadu</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCareerModal.industries.map((ind, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20 font-semibold">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-white mb-2">Recommended Courses to Reach This Goal</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCareerModal.relatedCourses.map((rc, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200">
                        {rc}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        );
      })()}

    </div>
  );
};

