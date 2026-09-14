import React, { useState } from 'react';
import { X, Sparkles, User, Mail, Phone, Lock, ArrowRight, ShieldCheck, Key, AtSign } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login, signup, loginAsAdmin } = useAuth();
  const [mode, setMode] = useState<'signin' | 'signup' | 'admin'>('signin');
  
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          id="close-auth-modal-btn"
          className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5 space-y-2">
          <div className={`w-12 h-12 mx-auto rounded-xl flex items-center justify-center text-white shadow-lg ${
            mode === 'admin' 
              ? 'bg-gradient-to-tr from-amber-500 to-red-600 shadow-amber-500/20' 
              : 'bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-cyan-500/20'
          }`}>
            {mode === 'admin' ? (
              <ShieldCheck className="w-6 h-6" />
            ) : (
              <Sparkles className="w-6 h-6 animate-pulse" />
            )}
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
            {mode === 'admin' 
              ? 'TN Govt Admin Portal' 
              : mode === 'signup' 
                ? 'Create Student Account' 
                : 'Welcome Back to DISHA AI'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {mode === 'admin'
              ? 'Access college cutoffs, seat allocations, and counseling parameters'
              : mode === 'signup' 
                ? 'Save your TNEA & NEET recommendations and track college choices' 
                : 'Log in to access your personalized recommendation dashboard'}
          </p>
        </div>

        {/* Role Selector Segmented Control */}
        <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 mb-5 text-xs font-semibold">
          <button
            type="button"
            onClick={() => { setMode('signin'); setErrorMsg(''); }}
            id="auth-tab-student-btn"
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mode !== 'admin' 
                ? 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 font-bold' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Student Portal</span>
          </button>
          <button
            type="button"
            onClick={() => { setMode('admin'); setErrorMsg(''); }}
            id="auth-tab-admin-btn"
            className={`py-2 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              mode === 'admin' 
                ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-bold' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Login</span>
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium text-center">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {mode === 'admin' ? (
            /* ADMIN LOGIN FIELDS - ONLY USERNAME AND PASSWORD */
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    placeholder="Enter admin username (e.g. admin)"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter password (e.g. admin123)"
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Demo Admin Quick Button */}
              <button
                type="button"
                onClick={handleDemoAdminFill}
                id="demo-admin-fill-btn"
                className="w-full py-1.5 px-3 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                <span>Auto-Fill Demo Admin Credentials (admin / admin123)</span>
              </button>

              <button
                type="submit"
                id="admin-auth-submit-btn"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 hover:from-amber-400 hover:to-red-500 text-white font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Login to Admin Portal</span>
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
                        placeholder="e.g. K. Muthupandi"
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
                    placeholder="••••••••"
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
                id="auth-submit-btn"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>{mode === 'signup' ? 'Sign Up & Continue' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          )}

        </form>

        {/* Toggle Mode Footer */}
        {mode !== 'admin' && (
          <div className="mt-5 text-center text-xs text-slate-400">
            {mode === 'signup' ? (
              <span>
                Already have an account?{' '}
                <button
                  onClick={() => setMode('signin')}
                  id="toggle-signin-btn"
                  className="text-cyan-400 font-bold hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </span>
            ) : (
              <span>
                New student?{' '}
                <button
                  onClick={() => setMode('signup')}
                  id="toggle-signup-btn"
                  className="text-cyan-400 font-bold hover:underline cursor-pointer"
                >
                  Create Account
                </button>
              </span>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

