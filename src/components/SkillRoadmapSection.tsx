import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  CheckSquare, 
  Square, 
  BookOpen, 
  Award, 
  Layers, 
  Clock, 
  Compass, 
  Code, 
  Rocket, 
  GraduationCap, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Download,
  Printer
} from 'lucide-react';
import { SKILL_ROADMAPS_DATA, getSkillRoadmapByCareerId } from '../data/skillRoadmapsData';
import { SkillRoadmap, RoadmapStage } from '../types';

interface SkillRoadmapSectionProps {
  checkedSkillsMap: Record<string, string[]>;
  onToggleSkill: (careerId: string, skillName: string) => void;
}

export const SkillRoadmapSection: React.FC<SkillRoadmapSectionProps> = ({
  checkedSkillsMap,
  onToggleSkill
}) => {
  const [selectedCareerId, setSelectedCareerId] = useState<string>(SKILL_ROADMAPS_DATA[0].careerId);
  const [expandedStages, setExpandedStages] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: false,
    4: false
  });
  const [showPrintViewModal, setShowPrintViewModal] = useState(false);

  const getLevelInfo = (stageNum: number) => {
    switch (stageNum) {
      case 1:
        return { tag: 'Beginner Level', color: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30', badge: '🌱 Stage 1' };
      case 2:
        return { tag: 'Intermediate Level', color: 'bg-blue-500/10 text-blue-300 border-blue-500/30', badge: '🚀 Stage 2' };
      case 3:
        return { tag: 'Advanced Level', color: 'bg-purple-500/10 text-purple-300 border-purple-500/30', badge: '⚡ Stage 3' };
      case 4:
      default:
        return { tag: 'Expert & Placement', color: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30', badge: '🏆 Stage 4' };
    }
  };

  const toggleStageExpand = (stageNum: number) => {
    setExpandedStages(prev => ({
      ...prev,
      [stageNum]: !prev[stageNum]
    }));
  };

  // Define active roadmap based on selected career
  const activeRoadmap: SkillRoadmap = getSkillRoadmapByCareerId(selectedCareerId) || SKILL_ROADMAPS_DATA[0];

  // Calculate overall skills completion across all stages for this roadmap
  const allSkillsInRoadmap = activeRoadmap.stages.flatMap(s => s.skillsToMaster);
  const checkedForThisCareer = checkedSkillsMap[activeRoadmap.careerId] || [];
  const completedSkillsCount = checkedForThisCareer.filter(s => allSkillsInRoadmap.includes(s)).length;
  const totalSkillsCount = allSkillsInRoadmap.length;
  const overallRoadmapProgress = totalSkillsCount > 0 ? Math.round((completedSkillsCount / totalSkillsCount) * 100) : 0;

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl shadow-2xl space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 text-slate-950 font-bold shadow-lg shadow-amber-500/20">
              <Compass className="w-5 h-5 text-slate-950" />
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Step-by-Step Industry Skill Roadmaps
              </h2>
              <p className="text-xs text-slate-400">
                Structured 4-stage learning pathways designed for Tamil Nadu students from beginner to placement-ready.
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPrintViewModal(true)}
            id="print-roadmap-btn"
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 flex items-center gap-2 transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span>Print Roadmap</span>
          </button>
        </div>
      </div>

      {/* Career Roadmap Selector Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>Select Industry Pathway:</span>
          </label>
          <span className="text-[11px] text-slate-400 font-medium">
            {SKILL_ROADMAPS_DATA.length} Curated Roadmaps Available
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {SKILL_ROADMAPS_DATA.map(rm => {
            const isSelected = selectedCareerId === rm.careerId;
            const rmSkills = rm.stages.flatMap(s => s.skillsToMaster);
            const rmChecked = (checkedSkillsMap[rm.careerId] || []).filter(s => rmSkills.includes(s)).length;
            const rmPct = rmSkills.length > 0 ? Math.round((rmChecked / rmSkills.length) * 100) : 0;

            return (
              <button
                key={rm.careerId}
                onClick={() => setSelectedCareerId(rm.careerId)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 group relative overflow-hidden ${
                  isSelected
                    ? 'bg-gradient-to-br from-slate-900 via-cyan-950/40 to-slate-900 border-cyan-500 text-white shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-500/30'
                    : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800/80 text-amber-400 border border-slate-700">
                      {rm.category}
                    </span>
                    <span className={`text-[10px] font-mono font-bold ${
                      rmPct >= 75 ? 'text-emerald-400' : rmPct > 0 ? 'text-cyan-400' : 'text-slate-500'
                    }`}>
                      {rmPct}%
                    </span>
                  </div>
                  <h4 className={`text-xs font-bold leading-tight line-clamp-1 ${isSelected ? 'text-cyan-300' : 'text-white group-hover:text-cyan-300'}`}>
                    {rm.careerTitle}
                  </h4>
                </div>

                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all"
                    style={{ width: `${rmPct}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Roadmap Overview Card */}
      <div className="p-6 rounded-2xl bg-slate-950/80 border border-cyan-500/30 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-amber-400 px-2.5 py-1 rounded-md bg-amber-500/10 border border-amber-500/20">
              {activeRoadmap.category} Domain
            </span>
            <h3 className="text-xl font-black text-white mt-1">{activeRoadmap.careerTitle} Learning Path</h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">{activeRoadmap.overview}</p>
          </div>

          <div className="shrink-0 bg-slate-900/90 p-4 rounded-2xl border border-slate-800 text-center min-w-[180px]">
            <span className="text-[10px] text-slate-400 font-bold block uppercase">Path Completion</span>
            <span className="text-2xl font-black text-cyan-400 font-mono">{completedSkillsCount} / {totalSkillsCount} Skills</span>
            <div className="w-full h-2 bg-slate-800 rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-500" 
                style={{ width: `${overallRoadmapProgress}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block font-semibold">{overallRoadmapProgress}% Mastered</span>
          </div>
        </div>

        {/* Prerequisites & Target Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-800/80 text-xs">
          <div>
            <span className="text-slate-400 font-bold uppercase text-[10px] block mb-1">Entry Prerequisites:</span>
            <div className="flex flex-wrap gap-1.5">
              {activeRoadmap.prerequisites.map((p, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                  • {p}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-amber-400 font-bold uppercase text-[10px] block mb-1">Target Certifications to Aim:</span>
            <div className="flex flex-wrap gap-1.5">
              {activeRoadmap.certificationsToAim.map((cert, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 font-medium">
                  🏆 {cert}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* STAGES TIMELINE STEPS */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Interactive 4-Stage Learning Timeline</span>
          </h3>
          <span className="text-xs text-slate-400">Click stage nodes to view or hide roadmap details</span>
        </div>

        {/* Timeline Container with vertical connecting bar */}
        <div className="relative pl-6 sm:pl-10 space-y-6 before:absolute before:left-3 sm:before:left-5 before:top-4 before:bottom-4 before:w-1 before:bg-gradient-to-b before:from-cyan-500 before:via-blue-500 before:to-emerald-500 before:rounded-full">
          {activeRoadmap.stages.map((stage: RoadmapStage) => {
            const isExpanded = !!expandedStages[stage.stageNumber];
            const stageCheckedCount = stage.skillsToMaster.filter(s => checkedForThisCareer.includes(s)).length;
            const stageTotalCount = stage.skillsToMaster.length;
            const stageProgress = stageTotalCount > 0 ? Math.round((stageCheckedCount / stageTotalCount) * 100) : 0;
            const lvl = getLevelInfo(stage.stageNumber);

            return (
              <div key={stage.stageNumber} className="relative group">
                
                {/* Timeline Connector Node Circle */}
                <div 
                  onClick={() => toggleStageExpand(stage.stageNumber)}
                  className={`absolute -left-6 sm:-left-10 top-4 -translate-x-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs shadow-lg transition-all z-10 cursor-pointer ${
                    stageProgress === 100
                      ? 'bg-emerald-500 border-emerald-300 text-slate-950 shadow-emerald-500/30'
                      : stageProgress > 0
                      ? 'bg-slate-900 border-cyan-400 text-cyan-300 shadow-cyan-500/20'
                      : 'bg-slate-900 border-slate-700 text-slate-500'
                  }`}
                >
                  {stageProgress === 100 ? '✓' : stage.stageNumber}
                </div>

                <div className="rounded-2xl bg-slate-950/70 border border-slate-800/90 overflow-hidden transition-all hover:border-slate-700 shadow-xl">
                  {/* Stage Header Bar */}
                  <div 
                    onClick={() => toggleStageExpand(stage.stageNumber)}
                    className="p-4 bg-slate-900/60 hover:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer border-b border-slate-800/60"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-md border ${lvl.color}`}>
                          {lvl.tag}
                        </span>
                        <span className="text-xs font-mono font-bold text-amber-400">
                          {lvl.badge}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <span>{stage.stageName}</span>
                          {stageProgress === 100 && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-bold">
                              Completed ✓
                            </span>
                          )}
                        </h4>
                        <p className="text-xs text-slate-400 flex items-center gap-3 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-cyan-400" />
                            {stage.duration}
                          </span>
                          <span>•</span>
                          <span>{stageCheckedCount}/{stageTotalCount} Skills Checked ({stageProgress}%)</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                      {/* Mini progress bar */}
                      <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-cyan-400 rounded-full transition-all duration-300" 
                          style={{ width: `${stageProgress}%` }}
                        />
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Stage Details Content */}
                  {isExpanded && (
                    <div className="p-5 space-y-5 text-xs text-slate-300 bg-slate-950/40">
                      
                      {/* Objective */}
                      <div>
                        <span className="text-cyan-400 font-bold uppercase text-[10px] block mb-1">Stage Objective & Learning Outcome:</span>
                        <p className="text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                          {stage.objective}
                        </p>
                      </div>

                      {/* Skills Checklist for this Stage */}
                      <div className="space-y-2">
                        <span className="text-slate-400 font-bold uppercase text-[10px] block">
                          Skills & Knowledge Points to Check Off:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {stage.skillsToMaster.map(skill => {
                            const isChecked = checkedForThisCareer.includes(skill);
                            return (
                              <button
                                key={skill}
                                type="button"
                                onClick={() => onToggleSkill(activeRoadmap.careerId, skill)}
                                className={`p-2.5 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                                  isChecked 
                                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' 
                                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                                }`}
                              >
                                {isChecked ? (
                                  <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                                ) : (
                                  <Square className="w-4 h-4 text-slate-600 shrink-0" />
                                )}
                                <span className={`text-xs ${isChecked ? 'line-through text-slate-400 font-normal' : 'font-medium'}`}>{skill}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Recommended Projects & Platforms Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        
                        {/* Recommended Projects */}
                        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                          <span className="text-amber-400 font-bold uppercase text-[10px] flex items-center gap-1.5">
                            <Code className="w-3.5 h-3.5 text-amber-400" />
                            Recommended Capstone / Lab Projects:
                          </span>
                          <ul className="space-y-1.5">
                            {stage.recommendedProjects.map((proj, pIdx) => (
                              <li key={pIdx} className="text-slate-300 flex items-start gap-2">
                                <span className="text-amber-400 font-bold">•</span>
                                <span>{proj}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Learning Platforms */}
                        <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                          <span className="text-cyan-400 font-bold uppercase text-[10px] flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                            Suggested Free Courses & Platforms:
                          </span>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {stage.learningPlatforms.map((plat, plIdx) => (
                              <span key={plIdx} className="px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-semibold">
                                {plat}
                              </span>
                            ))}
                          </div>
                        </div>

                      </div>

                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* PRINT ROADMAP MODAL */}
      {showPrintViewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-cyan-400">DISHA Tamil Nadu Guidance</span>
                <h3 className="text-xl font-bold text-white">{activeRoadmap.careerTitle} Skill Roadmap Summary</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer hover:bg-cyan-400"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print Now
                </button>
                <button
                  onClick={() => setShowPrintViewModal(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs cursor-pointer hover:bg-slate-700"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <p className="text-slate-300">{activeRoadmap.overview}</p>

              <div className="space-y-4">
                {activeRoadmap.stages.map((stg) => (
                  <div key={stg.stageNumber} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between font-bold text-white text-sm">
                      <span>{stg.stageName}</span>
                      <span className="text-cyan-400 text-xs font-mono">{stg.duration}</span>
                    </div>
                    <p className="text-slate-400">{stg.objective}</p>
                    <div>
                      <span className="font-bold text-slate-300 block mb-1">Key Skills:</span>
                      <div className="flex flex-wrap gap-1">
                        {stg.skillsToMaster.map(sk => (
                          <span key={sk} className="px-2 py-0.5 rounded bg-slate-800 text-slate-200">
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
