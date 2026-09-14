import React, { useState } from 'react';
import { Sparkles, User, Lock, ArrowRight, ShieldCheck, AtSign, Mail, Phone, GraduationCap, Award, Compass, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const { login, signup, loginAsAdmin } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup' | 'admin'>('signin');

  // Student Form State
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  // Admin Form State
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (mode === 'admin') {
      if (!adminUsername.trim()) {
        setErrorMsg('Please enter admin username.');
        return;
      }
      if (!adminPassword) {
        setErrorMsg('Please enter admin password.');
        return;
      }
      const adminName = adminUsername.trim().toLowerCase() === 'admin' 
        ? 'DoTE Chief Administrator' 
        : adminUsername.trim();
      const adminEmail = `${adminUsername.toLowerCase().replace(/\s+/g, '')}@disha.tn.gov.in`;
      loginAsAdmin(adminName, adminEmail, 'Directorate of Technical Education (DoTE)');
      return;
    }

    if (!username.trim()) {
      setErrorMsg('Please enter your username.');
      return;
    }

    const computedUser = username.trim();
    const isEmailInput = computedUser.includes('@');
    const studentName = name.trim() || (isEmailInput ? computedUser.split('@')[0] : computedUser);
    const studentEmail = isEmailInput ? computedUser : (email.trim() || '');

    if (mode === 'signup' && !phone.trim()) {
      setErrorMsg('Please enter your phone number.');
      return;
    }

    if (mode === 'signup') {
      signup(studentName, studentEmail, phone, computedUser);
    } else {
      login(studentName, studentEmail, phone, computedUser);
    }
  };

  const handleDemoAdminFill = () => {
    setAdminUsername('admin');
    setAdminPassword('admin123');
    setErrorMsg('');
  };

  return (
    <div className="min-h-[88vh] flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* LEFT COLUMN: BRANDING & FEATURES HERO */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950 p-8 lg:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            {/* Logo Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>TN Govt Higher Education Portal</span>
            </div>

            <div>
              <h1 className="text-3xl font-black text-white tracking-tight leading-tight">
                DISHA <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">AI</span>
              </h1>
              <p className="text-xs text-cyan-200/80 font-medium mt-1">
                Tamil Nadu Higher Education & College Guidance System
              </p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Sign in to unlock personalized TNEA & NEET college recommendations, cutoff predictions, branch analysis, and government seat guidance.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs text-slate-200">
                <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <span>500+ Engineering & Arts Colleges in TN</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-200">
                <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  <Award className="w-4 h-4" />
                </div>
                <span>TNEA & NEET Community Cutoff Matcher</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-200">
                <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  <Compass className="w-4 h-4" />
                </div>
                <span>AI Career Roadmap & Salary Analytics</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-8 mt-6 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span>© 2026 DISHA AI Portal</span>
            <span className="flex items-center gap-1 text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> Official Guidance System
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: LOGIN / SIGNUP FORM */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          
          <div className="max-w-md mx-auto w-full space-y-6">
            
            {/* Header */}
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                {mode === 'admin' 
                  ? 'Government Admin Login' 
                  : mode === 'signup' 
                    ? 'Create Student Account' 
                    : 'Student Sign In'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {mode === 'admin'
                  ? 'Access seat allocations, college databases & counseling parameters'
                  : mode === 'signup'
                    ? 'Register your username to save TNEA recommendations & bookmarks'
                    : 'Enter your username to access the DISHA AI website'}
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold">
              <button
                type="button"
                onClick={() => { setMode('signin'); setErrorMsg(''); }}
                id="login-page-student-tab"
                className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  mode === 'signin' 
                    ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 font-bold shadow-sm' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Student Login</span>
              </button>

              <button
                type="button"
                onClick={() => { setMode('signup'); setErrorMsg(''); }}
                id="login-page-signup-tab"
                className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  mode === 'signup' 
                    ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 font-bold shadow-sm' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <AtSign className="w-3.5 h-3.5" />
                <span>Sign Up</span>
              </button>

              <button
                type="button"
                onClick={() => { setMode('admin'); setErrorMsg(''); }}
                id="login-page-admin-tab"
                className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  mode === 'admin' 
                    ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-bold shadow-sm' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Login</span>
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-300 text-xs font-medium text-center">
                {errorMsg}
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {mode === 'admin' ? (
                /* ADMIN LOGIN FIELDS */
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Admin Username</label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={adminUsername}
                        onChange={(e) => setAdminUsername(e.target.value)}
                        placeholder="e.g. admin"
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Admin Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input
                        type="password"
                        required
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        placeholder="e.g. admin123"
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleDemoAdminFill}
                    className="w-full py-1.5 px-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Click to Fill Demo Admin Credentials</span>
                  </button>

                  <button
                    type="submit"
                    id="admin-login-submit-btn"
                    className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-red-600 hover:from-amber-600 hover:to-red-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
                  >
                    <span>Log In as Admin</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              ) : (
                /* STUDENT LOGIN / SIGNUP FIELDS */
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Username
                    </label>
                    <div className="relative">
                      <AtSign className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username (e.g. muthupandi08)"
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  {mode === 'signup' && (
                    <>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Student Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Muthupandi S"
                            className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email ID</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="muthupandi@example.com"
                            className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  {mode === 'signup' && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number *</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 9876543210"
                          className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    id="student-login-submit-btn"
                    className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
                  >
                    <span>{mode === 'signup' ? 'Create Account & Enter Website' : 'Log In & Enter Website'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}

            </form>

            <div className="text-center text-[11px] text-slate-500 dark:text-slate-400 pt-2">
              {mode === 'signin' ? (
                <p>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => { setMode('signup'); setErrorMsg(''); }}
                    className="text-cyan-600 dark:text-cyan-400 font-semibold hover:underline cursor-pointer"
                  >
                    Sign up now
                  </button>
                </p>
              ) : mode === 'signup' ? (
                <p>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => { setMode('signin'); setErrorMsg(''); }}
                    className="text-cyan-600 dark:text-cyan-400 font-semibold hover:underline cursor-pointer"
                  >
                    Log in
                  </button>
                </p>
              ) : null}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
