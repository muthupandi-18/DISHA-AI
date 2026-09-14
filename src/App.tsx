import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { RecommendationProvider } from './context/RecommendationContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AuthModal } from './components/AuthModal';
import { AIChatWidget } from './components/AIChatWidget';
import { ReportPrintModal } from './components/ReportPrintModal';

import { LandingPage } from './pages/LandingPage';
import { RecommendationFormPage } from './pages/RecommendationFormPage';
import { DashboardPage } from './pages/DashboardPage';
import { CollegeExplorerPage } from './pages/CollegeExplorerPage';
import { CourseExplorerPage } from './pages/CourseExplorerPage';
import { CareerExplorerPage } from './pages/CareerExplorerPage';
import { AboutPage } from './pages/AboutPage';
import { useAuth } from './context/AuthContext';
import { LoginPage } from './pages/LoginPage';
import { AdminPage } from './pages/AdminPage';

const AppContent: React.FC = () => {
  const { auth, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isReportPrintOpen, setIsReportPrintOpen] = useState(false);

  // Set active tab to 'home' upon login
  useEffect(() => {
    if (auth.isLoggedIn) {
      setActiveTab('home');
    }
  }, [auth.isLoggedIn]);

  // Automatically switch activeTab away from admin if user is not an admin
  useEffect(() => {
    if (auth.isLoggedIn && !isAdmin && activeTab === 'admin') {
      setActiveTab('home');
    }
  }, [auth.isLoggedIn, isAdmin, activeTab]);

  // Keyboard shortcut for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // If user is not logged in, show login page first
  if (!auth.isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 transition-colors">
        <LoginPage />
      </div>
    );
  }

  const renderCurrentTab = () => {
    switch (activeTab) {
      case 'home':
        return <LandingPage setActiveTab={setActiveTab} />;
      case 'recommend':
        return <RecommendationFormPage setActiveTab={setActiveTab} />;
      case 'dashboard':
        return <DashboardPage setActiveTab={setActiveTab} onOpenReportPrint={() => setIsReportPrintOpen(true)} />;
      case 'colleges':
        return <CollegeExplorerPage />;
      case 'courses':
        return <CourseExplorerPage />;
      case 'careers':
        return <CareerExplorerPage />;
      case 'about':
        return <AboutPage />;
      case 'admin':
        return isAdmin ? (
          <AdminPage setActiveTab={setActiveTab} />
        ) : (
          <LandingPage setActiveTab={setActiveTab} />
        );
      default:
        return <LandingPage setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950 transition-colors">
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {renderCurrentTab()}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        setActiveTab={setActiveTab}
      />

      {/* Student Login / Signup Modal */}
      <AuthModal />

      {/* Interactive AI Chat Assistant */}
      <AIChatWidget />

      {/* Printable / Downloadable PDF Report Modal */}
      <ReportPrintModal
        isOpen={isReportPrintOpen}
        onClose={() => setIsReportPrintOpen(false)}
      />

    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RecommendationProvider>
          <AppContent />
        </RecommendationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
