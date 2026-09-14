import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Building2, 
  Edit3, 
  Plus, 
  Search, 
  Save, 
  Trash2, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Calendar, 
  FileText, 
  Filter, 
  Download, 
  RefreshCw,
  Award,
  MapPin,
  FileSpreadsheet,
  UserPlus,
  Printer,
  Sliders,
  Bell,
  Activity,
  BarChart3,
  PieChart
} from 'lucide-react';
import { COLLEGES_DATA } from '../data/collegesData';
import { DISTRICT_NAMES } from '../data/tnDistricts';
import { College } from '../types';
import { useAuth } from '../context/AuthContext';
import { getStoredUserDirectory, syncUserToAdminDirectory } from '../utils/userDirectorySync';

interface AdminPageProps {
  setActiveTab: (tab: string) => void;
}

export interface AdminUserRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  district: string;
  stream: string;
  category: 'Engineering' | 'Medical' | 'Agriculture' | 'Arts & Science';
  cutoff: number;
  registeredDate: string;
  lastActive: string;
  reportsGenerated: number;
  status: 'Active' | 'Verified' | 'Suspended' | 'Inactive';
}

const DEFAULT_USERS: AdminUserRecord[] = [
  {
    id: 'USR-1001',
    name: 'Muthupandi S',
    email: 'muthupandi082006@gmail.com',
    phone: '9876543210',
    district: 'Madurai',
    stream: 'Computer Science',
    category: 'Engineering',
    cutoff: 188.5,
    registeredDate: '2026-07-28',
    lastActive: 'Today at 05:22 PM',
    reportsGenerated: 4,
    status: 'Verified'
  },
  {
    id: 'USR-1002',
    name: 'Kavitha Ramasamy',
    email: 'kavitha.r@gmail.com',
    phone: '9443218765',
    district: 'Chennai',
    stream: 'Biology',
    category: 'Medical',
    cutoff: 196.0,
    registeredDate: '2026-07-29',
    lastActive: '2 hours ago',
    reportsGenerated: 6,
    status: 'Verified'
  },
  {
    id: 'USR-1003',
    name: 'Amarnath K',
    email: 'amarnath.k@yahoo.in',
    phone: '9123456780',
    district: 'Coimbatore',
    stream: 'Computer Science',
    category: 'Engineering',
    cutoff: 192.0,
    registeredDate: '2026-07-30',
    lastActive: 'Today at 11:15 AM',
    reportsGenerated: 3,
    status: 'Active'
  },
  {
    id: 'USR-1004',
    name: 'Priya Dharshini',
    email: 'priyadharshini.p@gmail.com',
    phone: '9842109876',
    district: 'Tiruchirappalli',
    stream: 'Biology',
    category: 'Agriculture',
    cutoff: 178.5,
    registeredDate: '2026-07-31',
    lastActive: '1 day ago',
    reportsGenerated: 2,
    status: 'Verified'
  },
  {
    id: 'USR-1005',
    name: 'Vigneshwar M',
    email: 'vignesh.m@outlook.com',
    phone: '9789012345',
    district: 'Salem',
    stream: 'Commerce',
    category: 'Arts & Science',
    cutoff: 165.0,
    registeredDate: '2026-08-01',
    lastActive: '3 hours ago',
    reportsGenerated: 1,
    status: 'Active'
  },
  {
    id: 'USR-1006',
    name: 'Meenakshi Sundaram',
    email: 'meena.s@gmail.com',
    phone: '9360123456',
    district: 'Tirunelveli',
    stream: 'Computer Science',
    category: 'Engineering',
    cutoff: 194.5,
    registeredDate: '2026-08-01',
    lastActive: 'Today at 02:40 PM',
    reportsGenerated: 5,
    status: 'Verified'
  },
  {
    id: 'USR-1007',
    name: 'Santhosh Kumar',
    email: 'santhosh.sk@gmail.com',
    phone: '9940123890',
    district: 'Erode',
    stream: 'Mathematics',
    category: 'Engineering',
    cutoff: 172.0,
    registeredDate: '2026-08-02',
    lastActive: '5 hours ago',
    reportsGenerated: 2,
    status: 'Active'
  },
  {
    id: 'USR-1008',
    name: 'Ananya Subash',
    email: 'ananya.subash@gmail.com',
    phone: '9840567890',
    district: 'Thanjavur',
    stream: 'Biology',
    category: 'Medical',
    cutoff: 189.0,
    registeredDate: '2026-08-02',
    lastActive: 'Just now',
    reportsGenerated: 3,
    status: 'Verified'
  }
];

export const AdminPage: React.FC<AdminPageProps> = ({ setActiveTab }) => {
  const { auth, isAdmin } = useAuth();

  // Guard against non-admin student access
  if (!auth.isLoggedIn || !isAdmin || auth.user?.role !== 'admin') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl max-w-xl mx-auto my-12 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center justify-center mb-4">
          <ShieldCheck className="w-8 h-8 text-rose-500" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">Admin Access Required</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 max-w-md">
          You are currently signed in as a student (<strong>{auth.user?.name || 'Student'}</strong>). The Admin Console is restricted to authorized government administrators.
        </p>
        <button
          onClick={() => setActiveTab('dashboard')}
          id="admin-access-denied-return-btn"
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-indigo-500 transition-all cursor-pointer"
        >
          Return to Student Dashboard
        </button>
      </div>
    );
  }
  
  // Navigation sub-tab inside Admin
  const [adminTab, setAdminTab] = useState<'users' | 'colleges' | 'reports' | 'settings'>('users');

  // --- 1. USER MANAGEMENT STATE ---
  const [usersList, setUsersList] = useState<AdminUserRecord[]>(() => getStoredUserDirectory());

  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [userCategoryFilter, setUserCategoryFilter] = useState('All');
  const [userDistrictFilter, setUserDistrictFilter] = useState('All');
  const [userStatusFilter, setUserStatusFilter] = useState('All');

  // User Edit Modal State
  const [editingUser, setEditingUser] = useState<AdminUserRecord | null>(null);
  
  // Add User Modal State
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserDistrict, setNewUserDistrict] = useState('Chennai');
  const [newUserCategory, setNewUserCategory] = useState<'Engineering' | 'Medical' | 'Agriculture' | 'Arts & Science'>('Engineering');
  const [newUserCutoff, setNewUserCutoff] = useState<number | ''>(180);

  // --- 2. COLLEGES STATE ---
  const [collegesList, setCollegesList] = useState<College[]>(() => {
    const saved = localStorage.getItem('disha_admin_colleges');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return [...COLLEGES_DATA];
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [districtFilter, setDistrictFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [editingCollegeId, setEditingCollegeId] = useState<string | null>(null);
  const [editedCutoffs, setEditedCutoffs] = useState<Record<string, number>>({});

  // Add College Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newColName, setNewColName] = useState('');
  const [newColCode, setNewColCode] = useState('');
  const [newColDistrict, setNewColDistrict] = useState('Chennai');
  const [newColType, setNewColType] = useState<'Government' | 'Private' | 'Autonomous' | 'Aided' | 'Deemed' | 'Central'>('Government');

  // --- 3. EDITABLE SYSTEM SETTINGS & METRICS ---
  const [sysRegisteredCount, setSysRegisteredCount] = useState<string>(() => localStorage.getItem('disha_sys_reg_count') || '1,48,290');
  const [sysActiveRound, setSysActiveRound] = useState<string>(() => localStorage.getItem('disha_sys_active_round') || 'Round 2 - Choice Filling');
  const [sysGovtSeats, setSysGovtSeats] = useState<string>(() => localStorage.getItem('disha_sys_govt_seats') || '68,450');
  const [sysAnnouncementBanner, setSysAnnouncementBanner] = useState<string>(() => localStorage.getItem('disha_sys_announcement') || 'TNEA Round 2 Choice filling closes on August 10, 2026. Verify seat matrix before locking options.');

  // --- 4. PRINTABLE REPORT MODAL ---
  const [showPrintReportModal, setShowPrintReportModal] = useState(false);

  // Notification toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Listen to live user directory updates across tabs or logins
  useEffect(() => {
    const handleDirectoryUpdate = () => {
      setUsersList(getStoredUserDirectory());
    };
    window.addEventListener('disha_user_directory_updated', handleDirectoryUpdate);
    return () => window.removeEventListener('disha_user_directory_updated', handleDirectoryUpdate);
  }, []);

  // Save Users list to localStorage when modified locally
  useEffect(() => {
    localStorage.setItem('disha_admin_registered_users', JSON.stringify(usersList));
  }, [usersList]);

  // Save Colleges list to localStorage
  useEffect(() => {
    localStorage.setItem('disha_admin_colleges', JSON.stringify(collegesList));
  }, [collegesList]);

  // Merge & update logged-in user activity in the user list whenever auth updates
  useEffect(() => {
    if (auth.isLoggedIn && auth.user && auth.user.role === 'student') {
      const updatedList = syncUserToAdminDirectory(auth.user, true);
      setUsersList(updatedList);
    } else {
      setUsersList(getStoredUserDirectory());
    }
  }, [auth]);

  // --- USER HANDLERS ---
  const handleSaveEditedUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    setUsersList(prev => prev.map(u => u.id === editingUser.id ? editingUser : u));
    setEditingUser(null);
    showToast(`Updated profile for ${editingUser.name}!`);
  };

  const handleDeleteUser = (userId: string, userName: string) => {
    if (window.confirm(`Are you sure you want to delete user profile "${userName}"?`)) {
      setUsersList(prev => prev.filter(u => u.id !== userId));
      showToast(`User ${userName} deleted successfully.`);
    }
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'Active' ? 'Verified' : u.status === 'Verified' ? 'Suspended' : 'Active';
        showToast(`User status changed to ${nextStatus}`);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  const handleAddUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;

    const newUser: AdminUserRecord = {
      id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newUserName,
      email: newUserEmail,
      phone: newUserPhone || '9876543210',
      district: newUserDistrict,
      stream: 'Computer Science',
      category: newUserCategory,
      cutoff: typeof newUserCutoff === 'number' ? newUserCutoff : 175,
      registeredDate: new Date().toISOString().slice(0, 10),
      lastActive: 'Just created',
      reportsGenerated: 0,
      status: 'Active'
    };

    setUsersList([newUser, ...usersList]);
    setShowAddUserModal(false);
    setNewUserName('');
    setNewUserEmail('');
    setNewUserPhone('');
    showToast(`Registered new user ${newUser.name}`);
  };

  // CSV Report Generator
  const handleExportUserCSV = () => {
    const headers = ['User ID,Full Name,Email Address,Phone Number,District,12th Stream,Target Category,Calculated Cutoff,Registration Date,Last Active Status,Reports Downloaded,Account Status'];
    const rows = filteredUsers.map(u => 
      `"${u.id}","${u.name.replace(/"/g, '""')}","${u.email}","${u.phone}","${u.district}","${u.stream}","${u.category}",${u.cutoff},"${u.registeredDate}","${u.lastActive}",${u.reportsGenerated},"${u.status}"`
    );
    const csvData = [headers, ...rows].join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `DISHA_User_Usage_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported complete User Analytics report CSV!');
  };

  // Export College Cutoffs CSV
  const handleExportCollegesCSV = () => {
    const headers = ['College Code,College Name,District,Type,Accreditation,Avg Package LPA,Course,Cutoff Score'];
    const rows: string[] = [];
    collegesList.forEach(col => {
      Object.entries(col.previousCutoff).forEach(([course, cutoff]) => {
        rows.push(`"${col.code}","${col.name.replace(/"/g, '""')}","${col.district}","${col.type}","${col.accreditation}",${col.avgPackageLpa},"${course}",${cutoff}`);
      });
    });
    const csvData = [headers, ...rows].join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `DISHA_College_Cutoffs_Database_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported College Cutoffs CSV report!');
  };

  // Save Settings
  const handleSaveSystemSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('disha_sys_reg_count', sysRegisteredCount);
    localStorage.setItem('disha_sys_active_round', sysActiveRound);
    localStorage.setItem('disha_sys_govt_seats', sysGovtSeats);
    localStorage.setItem('disha_sys_announcement', sysAnnouncementBanner);
    showToast('System KPI parameters and notice banner saved successfully!');
  };

  // Filtering Users
  const filteredUsers = usersList.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                          u.email.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                          u.phone.includes(userSearchQuery) ||
                          u.district.toLowerCase().includes(userSearchQuery.toLowerCase());
    const matchesCategory = userCategoryFilter === 'All' || u.category === userCategoryFilter;
    const matchesDistrict = userDistrictFilter === 'All' || u.district === userDistrictFilter;
    const matchesStatus = userStatusFilter === 'All' || u.status === userStatusFilter;
    return matchesSearch && matchesCategory && matchesDistrict && matchesStatus;
  });

  // Analytics Metrics calculations
  const totalUsersCount = usersList.length;
  const verifiedUsersCount = usersList.filter(u => u.status === 'Verified').length;
  const activeTodayCount = usersList.filter(u => u.lastActive.toLowerCase().includes('today') || u.lastActive.toLowerCase().includes('now') || u.lastActive.toLowerCase().includes('hour')).length;
  const totalReportsGenerated = usersList.reduce((acc, u) => acc + u.reportsGenerated, 0);
  const avgCutoff = totalUsersCount > 0 ? (usersList.reduce((acc, u) => acc + u.cutoff, 0) / totalUsersCount).toFixed(1) : '182.5';

  // Category counts
  const engUsersCount = usersList.filter(u => u.category === 'Engineering').length;
  const medUsersCount = usersList.filter(u => u.category === 'Medical').length;
  const agriUsersCount = usersList.filter(u => u.category === 'Agriculture').length;
  const artsUsersCount = usersList.filter(u => u.category === 'Arts & Science').length;

  // --- COLLEGE HANDLERS ---
  const filteredColleges = collegesList.filter(col => {
    const matchesSearch = col.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          col.code.includes(searchQuery) ||
                          col.district.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = districtFilter === 'All' || col.district === districtFilter;
    const matchesType = typeFilter === 'All' || col.type === typeFilter;
    return matchesSearch && matchesDistrict && matchesType;
  });

  const handleEditClick = (col: College) => {
    setEditingCollegeId(col.id);
    setEditedCutoffs({ ...col.previousCutoff });
  };

  const handleCutoffChange = (courseName: string, val: number) => {
    setEditedCutoffs(prev => ({
      ...prev,
      [courseName]: val
    }));
  };

  const handleSaveCutoffs = (collegeId: string) => {
    setCollegesList(prev => prev.map(c => {
      if (c.id === collegeId) {
        return {
          ...c,
          previousCutoff: { ...editedCutoffs }
        };
      }
      return c;
    }));
    setEditingCollegeId(null);
    showToast('Cutoff scores updated successfully in database!');
  };

  const handleAddCollegeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newColName.trim()) return;

    const newCol: College = {
      id: `custom-${Date.now()}`,
      code: newColCode || `${Math.floor(1000 + Math.random() * 8000)}`,
      name: newColName,
      district: newColDistrict,
      type: newColType,
      category: ['Engineering'],
      courses: ['Computer Science & Engineering (CSE)', 'Electronics & Communication Engineering (ECE)'],
      placementRating: 4.5,
      placementRatePercent: 88,
      avgPackageLpa: 6.0,
      highestPackageLpa: 18.0,
      accreditation: 'NAAC A+',
      previousCutoff: {
        'Computer Science & Engineering (CSE)': 185.0,
        'Electronics & Communication Engineering (ECE)': 180.0
      },
      website: 'https://dte.tn.gov.in',
      imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80',
      address: `Campus Road, ${newColDistrict}, Tamil Nadu`,
      establishedYear: 2005,
      feesPerYear: '₹35,000 / year',
      hostelAvailable: true
    };

    setCollegesList([newCol, ...collegesList]);
    setShowAddModal(false);
    setNewColName('');
    setNewColCode('');
    showToast(`Added ${newCol.name} to counseling database!`);
  };

  return (
    <div className="space-y-8 pb-16 animate-fade-in">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-50 p-4 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs shadow-2xl flex items-center gap-2 border border-emerald-400 animate-bounce">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Admin Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-950/70 via-slate-900 to-slate-900 border border-amber-500/30 backdrop-blur-xl relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold tracking-wide">
              <ShieldCheck className="w-4 h-4" />
              <span>TN Higher Education Administration Portal</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              DISHA Counseling <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">Admin Console</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Welcome, <strong className="text-amber-300">{auth.user?.name || 'Administrator'}</strong> ({auth.user?.adminDepartment || 'Directorate of Technical Education'}). Monitor live website user statistics, manage user accounts, edit college cutoffs, and export official reports.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowPrintReportModal(true)}
              id="admin-take-report-btn"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Generate Official PDF Report</span>
            </button>

            <button
              onClick={handleExportUserCSV}
              id="admin-export-csv-btn"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center gap-2 transition-all cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Export User Analytics CSV</span>
            </button>
          </div>
        </div>

        {/* Announcement Banner Display */}
        {sysAnnouncementBanner && (
          <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3 text-xs text-amber-200">
            <Bell className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="font-medium"><strong>System Notice:</strong> {sysAnnouncementBanner}</span>
          </div>
        )}
      </div>

      {/* Admin KPI Stat Cards (Editable System Values) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1 relative group">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Active Users</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black text-white font-mono">{totalUsersCount} registered</p>
          <p className="text-[11px] text-amber-400/90 font-medium">{activeTodayCount} active today • {verifiedUsersCount} verified</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">TNEA Counseling Status</span>
            <Calendar className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-lg font-black text-cyan-400 font-mono truncate">{sysActiveRound}</p>
          <p className="text-[11px] text-cyan-400/90 font-medium">System State Active</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">State Registration Volume</span>
            <Activity className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-black text-white font-mono">{sysRegisteredCount}</p>
          <p className="text-[11px] text-emerald-400 font-medium">+14.2% platform growth</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Reports Downloaded</span>
            <FileText className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-emerald-400 font-mono">{totalReportsGenerated} PDF/CSVs</p>
          <p className="text-[11px] text-slate-400 font-medium">Avg Cutoff: {avgCutoff} / 200</p>
        </div>
      </div>

      {/* Main Admin Tab Navigation Bar */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 max-w-full overflow-x-auto">
        <button
          onClick={() => setAdminTab('users')}
          id="tab-admin-users"
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
            adminTab === 'users'
              ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User Activity & Management ({usersList.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('colleges')}
          id="tab-admin-colleges"
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
            adminTab === 'colleges'
              ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>College Cutoffs & Seats ({collegesList.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('reports')}
          id="tab-admin-reports"
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
            adminTab === 'reports'
              ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Analytics & Usage Reports</span>
        </button>

        <button
          onClick={() => setAdminTab('settings')}
          id="tab-admin-settings"
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer whitespace-nowrap ${
            adminTab === 'settings'
              ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Editable System Options</span>
        </button>
      </div>

      {/* TAB 1: USER ACTIVITY & EDITABLE USER MANAGEMENT */}
      {adminTab === 'users' && (
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" />
                <span>Registered Website Users & Traffic Directory</span>
              </h2>
              <p className="text-xs text-slate-400">
                View active candidates, modify user details, update cutoffs/categories, manage access status, or export user data.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setUsersList(getStoredUserDirectory());
                  showToast('Refreshed live user activity directory!');
                }}
                id="admin-refresh-users-btn"
                title="Refresh user directory & active sessions"
                className="px-3 py-2 rounded-xl bg-slate-800/80 border border-slate-700/80 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                <span>Refresh Directory</span>
              </button>

              <button
                onClick={() => setShowAddUserModal(true)}
                id="admin-create-user-btn"
                className="px-3.5 py-2 rounded-xl bg-amber-500/20 border border-amber-500/40 hover:bg-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add Student Record</span>
              </button>

              <button
                onClick={handleExportUserCSV}
                id="admin-export-users-csv-btn"
                className="px-3.5 py-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Export CSV Report</span>
              </button>
            </div>
          </div>

          {/* User Search & Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={userSearchQuery}
                onChange={(e) => setUserSearchQuery(e.target.value)}
                placeholder="Search user name, email, phone, or district..."
                className="w-full pl-9 pr-3 py-2 bg-slate-800/80 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <select
                value={userCategoryFilter}
                onChange={(e) => setUserCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="All">All Categories ({usersList.length})</option>
                <option value="Engineering">Engineering ({engUsersCount})</option>
                <option value="Medical">Medical ({medUsersCount})</option>
                <option value="Agriculture">Agriculture ({agriUsersCount})</option>
                <option value="Arts & Science">Arts & Science ({artsUsersCount})</option>
              </select>
            </div>

            <div>
              <select
                value={userDistrictFilter}
                onChange={(e) => setUserDistrictFilter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="All">All Districts</option>
                {DISTRICT_NAMES.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={userStatusFilter}
                onChange={(e) => setUserStatusFilter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800/80 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="All">All Account Statuses</option>
                <option value="Verified">Verified</option>
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* User Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="p-3">User & Email</th>
                  <th className="p-3">District</th>
                  <th className="p-3">Target Category</th>
                  <th className="p-3">Cutoff Score</th>
                  <th className="p-3">Last Active</th>
                  <th className="p-3">Reports</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Editable Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-400">
                      No user accounts match your search filters.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3">
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <span>{u.name}</span>
                          <span className="text-[10px] text-amber-400 font-mono">({u.id})</span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">{u.email} • {u.phone}</div>
                      </td>
                      <td className="p-3">
                        {u.district && u.district !== 'Not Provided' && u.district !== 'Pending' ? (
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium flex items-center gap-1 w-fit text-xs">
                            <MapPin className="w-3 h-3 text-cyan-400" />
                            {u.district}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-slate-800/60 text-slate-400 font-normal text-xs italic">
                            Form Pending
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        {u.category && u.category !== 'Pending' && u.district !== 'Not Provided' && u.district !== 'Pending' && u.cutoff > 0 ? (
                          <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 font-semibold text-xs">
                            {u.category}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-500 italic">Unselected</span>
                        )}
                      </td>
                      <td className="p-3 font-mono font-bold text-cyan-300 text-sm">
                        {u.cutoff && u.cutoff > 0 ? (
                          <>
                            {u.cutoff} <span className="text-[10px] text-slate-500 font-normal">/200</span>
                          </>
                        ) : (
                          <span className="text-xs text-slate-500 font-normal italic">N/A</span>
                        )}
                      </td>
                      <td className="p-3 text-slate-300">
                        {u.lastActive}
                      </td>
                      <td className="p-3 font-mono text-center font-bold text-slate-200">
                        {u.reportsGenerated}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => handleToggleUserStatus(u.id)}
                          title="Click to toggle account status"
                          className={`px-2 py-1 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${
                            u.status === 'Verified' 
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20' 
                              : u.status === 'Active'
                              ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20'
                              : 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20'
                          }`}
                        >
                          {u.status}
                        </button>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditingUser({ ...u })}
                            id={`edit-user-${u.id}`}
                            className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition-colors cursor-pointer"
                            title="Edit User Profile"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(u.id, u.name)}
                            id={`delete-user-${u.id}`}
                            className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 transition-colors cursor-pointer"
                            title="Delete User"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: COLLEGE CUTOFF & SEAT MATRIX MANAGER */}
      {adminTab === 'colleges' && (
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-amber-400" />
                <span>College Cutoff & Database Management</span>
              </h2>
              <p className="text-xs text-slate-400">
                Search institutions and modify TNEA / NEET previous year cutoff mark benchmarks in real-time.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAddModal(true)}
                id="admin-add-college-btn"
                className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New College</span>
              </button>

              <button
                onClick={handleExportCollegesCSV}
                id="admin-export-colleges-csv-btn"
                className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
                <span>Export College Database</span>
              </button>
            </div>
          </div>

          {/* Search controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by college name, TNEA code, or district..."
                className="w-full pl-9 pr-3 py-2.5 bg-slate-800/80 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <select
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-800/80 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="All">All Districts ({DISTRICT_NAMES.length})</option>
                {DISTRICT_NAMES.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-800/80 border border-slate-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="All">All Institution Types</option>
                <option value="Government">Government</option>
                <option value="Autonomous">Autonomous</option>
                <option value="Private">Private</option>
                <option value="Aided">Aided</option>
                <option value="Deemed">Deemed</option>
                <option value="Central">Central</option>
              </select>
            </div>
          </div>

          {/* Colleges List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-2">
              <span>Showing {filteredColleges.length} institutions</span>
              <span>Click 'Edit Cutoffs' to adjust cutoff benchmarks</span>
            </div>

            {filteredColleges.length === 0 ? (
              <div className="p-8 text-center bg-slate-950/50 rounded-2xl border border-slate-800 space-y-2">
                <Building2 className="w-8 h-8 text-slate-600 mx-auto" />
                <p className="text-sm font-semibold text-slate-300">No colleges match your search query.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                {filteredColleges.slice(0, 25).map((col) => {
                  const isEditing = editingCollegeId === col.id;
                  return (
                    <div
                      key={col.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        isEditing 
                          ? 'bg-amber-950/20 border-amber-500/50 shadow-xl' 
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono text-[11px] font-bold">
                              Code: {col.code}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-medium">
                              {col.type}
                            </span>
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] font-medium flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-cyan-400" />
                              {col.district}
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-white">{col.name}</h3>
                          <p className="text-xs text-slate-400">{col.address} • {col.accreditation}</p>
                        </div>

                        <div>
                          {isEditing ? (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleSaveCutoffs(col.id)}
                                id={`save-cutoff-${col.id}`}
                                className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
                              >
                                <Save className="w-3.5 h-3.5" />
                                <span>Save Cutoffs</span>
                              </button>
                              <button
                                onClick={() => setEditingCollegeId(null)}
                                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleEditClick(col)}
                              id={`edit-cutoff-${col.id}`}
                              className="px-3 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                              <span>Edit Cutoffs</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Cutoffs Section */}
                      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                          Branch Cutoff Marks Benchmark (TNEA / Cutoff Score out of 200)
                        </p>

                        {isEditing ? (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                            {Object.entries(editedCutoffs).map(([course, cutoff]) => (
                              <div key={course} className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-amber-500/30">
                                <span className="text-xs text-slate-200 truncate pr-2">{course}</span>
                                <div className="flex items-center gap-1 shrink-0">
                                  <input
                                    type="number"
                                    step="0.5"
                                    min="35"
                                    max="200"
                                    value={cutoff}
                                    onChange={(e) => handleCutoffChange(course, parseFloat(e.target.value) || 0)}
                                    className="w-20 px-2 py-1 bg-slate-800 border border-slate-700 rounded text-cyan-300 font-mono font-bold text-xs text-center focus:outline-none focus:border-amber-400"
                                  />
                                  <span className="text-[10px] text-slate-400">/200</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                            {Object.entries(col.previousCutoff).map(([course, cutoff]) => (
                              <div key={course} className="p-2 rounded-lg bg-slate-950/60 border border-slate-800/60 flex items-center justify-between text-xs">
                                <span className="text-slate-300 truncate pr-2">{course}</span>
                                <span className="text-cyan-400 font-mono font-bold">{cutoff}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: PLATFORM ANALYTICS & REPORTS */}
      {adminTab === 'reports' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Category Traffic Breakdown */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <PieChart className="w-5 h-5 text-amber-400" />
                <span>Category Distribution Breakdown</span>
              </h3>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-semibold">Engineering (TNEA)</span>
                    <span className="text-amber-400 font-mono font-bold">{engUsersCount} users ({Math.round((engUsersCount/totalUsersCount)*100 || 0)}%)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full rounded-full" style={{ width: `${(engUsersCount/totalUsersCount)*100 || 0}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-semibold">Medical (NEET)</span>
                    <span className="text-cyan-400 font-mono font-bold">{medUsersCount} users ({Math.round((medUsersCount/totalUsersCount)*100 || 0)}%)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${(medUsersCount/totalUsersCount)*100 || 0}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-semibold">Agriculture (TNAU)</span>
                    <span className="text-emerald-400 font-mono font-bold">{agriUsersCount} users ({Math.round((agriUsersCount/totalUsersCount)*100 || 0)}%)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${(agriUsersCount/totalUsersCount)*100 || 0}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-300 font-semibold">Arts & Science</span>
                    <span className="text-purple-400 font-mono font-bold">{artsUsersCount} users ({Math.round((artsUsersCount/totalUsersCount)*100 || 0)}%)</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-purple-400 h-full rounded-full" style={{ width: `${(artsUsersCount/totalUsersCount)*100 || 0}%` }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Export Summary Card */}
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  <span>Generate Admin Audit & Usage Reports</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Download structured data files for higher education policy reporting, counseling committee meetings, or student analytics review.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Registered Active Student Accounts:</span>
                  <span className="font-mono font-bold text-amber-300">{totalUsersCount}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Average Cutoff Benchmark:</span>
                  <span className="font-mono font-bold text-cyan-300">{avgCutoff} / 200</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>Total Recommendation Reports:</span>
                  <span className="font-mono font-bold text-emerald-300">{totalReportsGenerated}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleExportUserCSV}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Download Users CSV</span>
                </button>
                <button
                  onClick={() => setShowPrintReportModal(true)}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Formal PDF Report</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 4: EDITABLE SYSTEM OPTIONS & ANNOUNCEMENTS */}
      {adminTab === 'settings' && (
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
          <div className="pb-4 border-b border-slate-800">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-400" />
              <span>Editable System Parameters & Announcements</span>
            </h2>
            <p className="text-xs text-slate-400">
              Customize website header metrics, active counseling phase titles, and global notification banners displayed to students.
            </p>
          </div>

          <form onSubmit={handleSaveSystemSettings} className="space-y-4 max-w-2xl text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Global Announcement Banner Text (Displayed across website)
              </label>
              <textarea
                rows={3}
                value={sysAnnouncementBanner}
                onChange={(e) => setSysAnnouncementBanner(e.target.value)}
                placeholder="Enter alert banner message for students..."
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Active Counseling Phase Name
                </label>
                <input
                  type="text"
                  value={sysActiveRound}
                  onChange={(e) => setSysActiveRound(e.target.value)}
                  placeholder="e.g. Round 2 - Choice Filling"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Total State Candidates Metric Display
                </label>
                <input
                  type="text"
                  value={sysRegisteredCount}
                  onChange={(e) => setSysRegisteredCount(e.target.value)}
                  placeholder="e.g. 1,48,290"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Government Quota Seats Stat Display
              </label>
              <input
                type="text"
                value={sysGovtSeats}
                onChange={(e) => setSysGovtSeats(e.target.value)}
                placeholder="e.g. 68,450"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Editable System Options</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* --- EDIT USER MODAL --- */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-amber-400" />
                <span>Edit User Profile ({editingUser.id})</span>
              </h3>
              <button onClick={() => setEditingUser(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSaveEditedUser} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Phone</label>
                  <input
                    type="text"
                    value={editingUser.phone}
                    onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">District</label>
                  <select
                    value={editingUser.district}
                    onChange={(e) => setEditingUser({ ...editingUser, district: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                  >
                    {DISTRICT_NAMES.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Target Category</label>
                  <select
                    value={editingUser.category}
                    onChange={(e) => setEditingUser({ ...editingUser, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Medical">Medical</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Arts & Science">Arts & Science</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Cutoff Mark (/200)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={editingUser.cutoff}
                    onChange={(e) => setEditingUser({ ...editingUser, cutoff: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Account Status</label>
                  <select
                    value={editingUser.status}
                    onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Active">Active</option>
                    <option value="Verified">Verified</option>
                    <option value="Suspended">Suspended</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold hover:from-amber-400 hover:to-orange-500 shadow-lg"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD USER MODAL --- */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-amber-400" />
                <span>Register New Student Record</span>
              </h3>
              <button onClick={() => setShowAddUserModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddUserSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Student Full Name</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  placeholder="e.g. Ramesh K"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    placeholder="e.g. ramesh@gmail.com"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={newUserPhone}
                    onChange={(e) => setNewUserPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">District</label>
                  <select
                    value={newUserDistrict}
                    onChange={(e) => setNewUserDistrict(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                  >
                    {DISTRICT_NAMES.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Target Category</label>
                  <select
                    value={newUserCategory}
                    onChange={(e) => setNewUserCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Medical">Medical</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Arts & Science">Arts & Science</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Cutoff Mark (/200)</label>
                <input
                  type="number"
                  step="0.5"
                  value={newUserCutoff}
                  onChange={(e) => setNewUserCutoff(e.target.value === '' ? '' : parseFloat(e.target.value))}
                  placeholder="e.g. 182.5"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold hover:from-amber-400 hover:to-orange-500 shadow-lg"
                >
                  Add Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD COLLEGE MODAL --- */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/30 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-400" />
                <span>Add New Institution to DISHA Database</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddCollegeSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">College Full Name</label>
                <input
                  type="text"
                  required
                  value={newColName}
                  onChange={(e) => setNewColName(e.target.value)}
                  placeholder="e.g. Government College of Technology, Erode"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">TNEA Code</label>
                  <input
                    type="text"
                    value={newColCode}
                    onChange={(e) => setNewColCode(e.target.value)}
                    placeholder="e.g. 2701"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">District</label>
                  <select
                    value={newColDistrict}
                    onChange={(e) => setNewColDistrict(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                  >
                    {DISTRICT_NAMES.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Institution Type</label>
                <select
                  value={newColType}
                  onChange={(e) => setNewColType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Government">Government</option>
                  <option value="Autonomous">Autonomous</option>
                  <option value="Private">Private</option>
                  <option value="Aided">Aided</option>
                  <option value="Deemed">Deemed</option>
                  <option value="Central">Central</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold hover:from-amber-400 hover:to-orange-500 shadow-lg shadow-amber-500/20"
                >
                  Add College
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- FORMAL PRINTABLE REPORT MODAL --- */}
      {showPrintReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black">
                  TN
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">DISHA Counseling Platform Usage Audit Report</h2>
                  <p className="text-xs text-slate-400">Directorate of Technical Education (DoTE) • Official Executive Summary</p>
                </div>
              </div>

              <button
                onClick={() => setShowPrintReportModal(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>

            {/* Print Content Area */}
            <div id="printable-admin-report" className="space-y-6 text-slate-200">
              <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 flex justify-between items-center text-xs">
                <div>
                  <p className="text-slate-400">Report Reference No:</p>
                  <p className="font-mono font-bold text-amber-300">DISH-ADM-{new Date().getFullYear()}-0803</p>
                </div>
                <div>
                  <p className="text-slate-400">Generated Date:</p>
                  <p className="font-semibold text-white">{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <div>
                  <p className="text-slate-400">Admin Authority:</p>
                  <p className="font-semibold text-white">{auth.user?.name || 'Administrator'}</p>
                </div>
              </div>

              {/* Summary KPIs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <p className="text-slate-400">Total Registered Users</p>
                  <p className="text-xl font-bold font-mono text-white">{totalUsersCount}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <p className="text-slate-400">Verified Candidates</p>
                  <p className="text-xl font-bold font-mono text-emerald-400">{verifiedUsersCount}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <p className="text-slate-400">Avg State Cutoff</p>
                  <p className="text-xl font-bold font-mono text-cyan-400">{avgCutoff} / 200</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                  <p className="text-slate-400">Total Reports Generated</p>
                  <p className="text-xl font-bold font-mono text-amber-400">{totalReportsGenerated}</p>
                </div>
              </div>

              {/* User Roster Summary Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Candidate User Summary Roster</h4>
                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                      <tr>
                        <th className="p-2">User ID</th>
                        <th className="p-2">Candidate Name</th>
                        <th className="p-2">District</th>
                        <th className="p-2">Category</th>
                        <th className="p-2">Cutoff</th>
                        <th className="p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 bg-slate-900/50">
                      {usersList.slice(0, 10).map(u => (
                        <tr key={u.id}>
                          <td className="p-2 font-mono text-amber-300">{u.id}</td>
                          <td className="p-2 font-semibold text-white">{u.name}</td>
                          <td className="p-2">{u.district}</td>
                          <td className="p-2">{u.category}</td>
                          <td className="p-2 font-mono text-cyan-300">{u.cutoff}</td>
                          <td className="p-2 font-bold text-emerald-400">{u.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                <p><strong>Official Declaration:</strong> This report is auto-generated by the DISHA AI Counseling Analytics Portal for higher education counseling planning and seat matrix allocation across engineering, medical, agriculture, and arts colleges in Tamil Nadu.</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowPrintReportModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-xs hover:from-amber-400 hover:to-orange-500 shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Report</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
