import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAuth } from '../types';
import { syncUserToAdminDirectory } from '../utils/userDirectorySync';

interface AuthContextType {
  auth: UserAuth;
  login: (name: string, email: string, phone?: string, username?: string) => void;
  signup: (name: string, email: string, phone?: string, username?: string) => void;
  loginAsAdmin: (name: string, email: string, adminDepartment?: string) => void;
  updateUser: (userData: Partial<NonNullable<UserAuth['user']>>) => void;
  logout: () => void;
  isAdmin: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<UserAuth>(() => {
    const saved = localStorage.getItem('disha_user');
    if (saved) {
      try {
        const u = JSON.parse(saved);
        if (u) {
          if (u.phone === '8310948606' || u.phone === '9876543210') {
            u.phone = '';
          }
          if (u.email && u.email.endsWith('@student.disha.tn.gov.in')) {
            u.email = '';
          }
        }
        return { isLoggedIn: true, user: u };
      } catch (e) {
        // ignore error
      }
    }
    return { isLoggedIn: false, user: null };
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (auth.isLoggedIn && auth.user) {
      localStorage.setItem('disha_user', JSON.stringify(auth.user));
      if (auth.user.role === 'student') {
        syncUserToAdminDirectory(auth.user, false);
      }
    } else {
      localStorage.removeItem('disha_user');
    }
  }, [auth]);

  const updateUser = (userData: Partial<NonNullable<UserAuth['user']>>) => {
    setAuth(prev => {
      if (!prev.isLoggedIn || !prev.user) return prev;
      const updatedUser = {
        ...prev.user,
        ...userData
      };
      if (updatedUser.role === 'student') {
        syncUserToAdminDirectory(updatedUser, false);
      }
      return {
        ...prev,
        user: updatedUser
      };
    });
  };

  const login = (name: string, email: string, phone?: string, username?: string) => {
    const isEmail = username?.includes('@') || email.includes('@');
    const computedEmail = email ? email : (isEmail && username ? username : '');
    const computedUsername = username?.trim() || (computedEmail ? computedEmail.split('@')[0] : name.toLowerCase().replace(/\s+/g, ''));
    
    const userObj = { name, email: computedEmail, phone, username: computedUsername, role: 'student' as const };
    
    // Sync login event to Admin User Directory
    syncUserToAdminDirectory(userObj, true);

    setAuth({
      isLoggedIn: true,
      user: userObj
    });
    setIsAuthModalOpen(false);
  };

  const loginAsAdmin = (name: string, email: string, adminDepartment: string = 'Directorate of Technical Education (DoTE)') => {
    setAuth({
      isLoggedIn: true,
      user: {
        name,
        email,
        username: 'admin',
        role: 'admin',
        adminDepartment
      }
    });
    setIsAuthModalOpen(false);
  };

  const signup = (name: string, email: string, phone?: string, username?: string) => {
    login(name, email, phone, username);
  };

  const logout = () => {
    setAuth({ isLoggedIn: false, user: null });
  };

  const isAdmin = auth.isLoggedIn && auth.user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        signup,
        loginAsAdmin,
        updateUser,
        logout,
        isAdmin,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
