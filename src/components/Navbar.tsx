import React, { useState } from 'react';
import { Sparkles, Compass, GraduationCap, MapPin, BookOpen, Briefcase, Search, User, Bookmark, Menu, X, LayoutDashboard, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRecommendation } from '../context/RecommendationContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onOpenSearch }) => {
  const { auth, isAdmin, openAuthModal, logout } = useAuth();
  const { savedRecommendations } = useRecommendation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const baseNavItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'recommend', label: 'AI Form', icon: Sparkles },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'colleges', label: 'Colleges', icon: GraduationCap },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'careers', label: 'Careers', icon: Briefcase },
    { id: 'about', label: 'About', icon: Sparkles }
  ];

  const navItems = isAdmin 
    ? [...baseNavItems, { id: 'admin', label: 'Admin Console', icon: ShieldCheck }]
    : baseNavItems;

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/90 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800/80 transition-colors shadow-sm dark:shadow-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <button
            onClick={() => setActiveTab('home')}
            id="nav-logo-btn"
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 text-white shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-cyan-400 dark:via-blue-400 dark:to-indigo-300 bg-clip-text text-transparent">
                  DISHA AI
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20">
                  TN
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium leading-none hidden sm:block">
                TN Student Guidance
              </p>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-600/20 text-cyan-700 dark:text-cyan-400 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global Search Button */}
            <button
              onClick={onOpenSearch}
              id="global-search-btn"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs border border-slate-200 dark:border-slate-700/80 transition-all cursor-pointer"
              title="Search Colleges, Courses, Careers..."
            >
              <Search className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded text-slate-500 dark:text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Saved Recommendations Badge */}
            <button
              onClick={() => setActiveTab('dashboard')}
              id="saved-recs-btn"
              className="relative p-2 rounded-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 transition-colors cursor-pointer"
              title="View Saved Recommendations"
            >
              <Bookmark className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              {savedRecommendations.length > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-bold text-white bg-cyan-500 rounded-full animate-bounce">
                  {savedRecommendations.length}
                </span>
              )}
            </button>

            {/* Auth / Student or Admin Profile */}
            {auth.isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  id="user-profile-dropdown-btn"
                  className={`flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg border text-white text-xs font-semibold cursor-pointer transition-all ${
                    isAdmin 
                      ? 'bg-gradient-to-r from-amber-950/60 to-orange-950/60 border-amber-500/50 hover:border-amber-400'
                      : 'bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border-blue-500/30 hover:border-blue-500/50'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                    isAdmin ? 'bg-amber-400 text-slate-950' : 'bg-cyan-500 text-slate-950'
                  }`}>
                    {isAdmin ? <ShieldCheck className="w-3.5 h-3.5" /> : auth.user?.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[110px] truncate">{auth.user?.name}</span>
                  {isAdmin && (
                    <span className="px-1.5 py-0.5 text-[9px] uppercase font-bold tracking-wider bg-amber-500/20 text-amber-300 rounded border border-amber-500/40">
                      Admin
                    </span>
                  )}
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{auth.user?.name}</p>
                        {isAdmin && <ShieldCheck className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
                      </div>
                      {auth.user?.username && (
                        <p className="text-[10px] font-mono text-cyan-600 dark:text-cyan-400 font-semibold truncate">@{auth.user.username}</p>
                      )}
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{auth.user?.email}</p>
                      {auth.user?.adminDepartment && (
                        <p className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold truncate mt-0.5">{auth.user.adminDepartment}</p>
                      )}
                    </div>

                    {isAdmin ? (
                      <button
                        onClick={() => { setActiveTab('admin'); setUserDropdownOpen(false); }}
                        id="dropdown-admin-btn"
                        className="w-full text-left px-4 py-2 text-xs text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950/30 flex items-center gap-2 cursor-pointer font-bold"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                        Admin Management Console
                      </button>
                    ) : (
                      <button
                        onClick={() => { setActiveTab('dashboard'); setUserDropdownOpen(false); }}
                        id="dropdown-dashboard-btn"
                        className="w-full text-left px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                        Student Dashboard
                      </button>
                    )}

                    <button
                      onClick={() => { logout(); setUserDropdownOpen(false); }}
                      id="dropdown-logout-btn"
                      className="w-full text-left px-4 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 flex items-center gap-2 cursor-pointer border-t border-slate-100 dark:border-slate-800/80 mt-1"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                id="login-modal-open-btn"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>Login / Admin</span>
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle-btn"
              className="lg:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-item-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-600/20 text-cyan-700 dark:text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
