import { AdminUserRecord } from '../pages/AdminPage';

export const DEFAULT_USERS: AdminUserRecord[] = [
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
    lastActive: 'Just now (Logged In)',
    reportsGenerated: 5,
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

export function sanitizeUserRecord(u: AdminUserRecord): AdminUserRecord {
  const isFormPending = (!u.cutoff || u.cutoff === 0) && (u.district === 'Not Provided' || u.district === 'Pending' || !u.district);
  return {
    ...u,
    district: u.district || 'Not Provided',
    cutoff: u.cutoff || 0,
    category: isFormPending ? 'Pending' : (u.category || 'Pending')
  };
}

export function getStoredUserDirectory(): AdminUserRecord[] {
  const saved = localStorage.getItem('disha_admin_registered_users');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map(sanitizeUserRecord);
      }
    } catch (e) {
      console.error('Failed to parse user directory:', e);
    }
  }
  return DEFAULT_USERS.map(sanitizeUserRecord);
}

export interface UserSyncPayload {
  name?: string;
  email?: string;
  phone?: string;
  username?: string;
  district?: string;
  cutoff?: number;
  category?: 'Engineering' | 'Medical' | 'Agriculture' | 'Arts & Science';
}

export function syncUserToAdminDirectory(
  user: UserSyncPayload | null | undefined,
  isLoginEvent: boolean = true
): AdminUserRecord[] {
  if (!user || (!user.name && !user.email && !user.phone && !user.username)) {
    return getStoredUserDirectory();
  }

  const currentUsers = getStoredUserDirectory();
  const timeFormatted = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const activeLabel = isLoginEvent ? `Just now (${timeFormatted} - Frequent Login)` : 'Just now (Active)';

  const rawEmail = (user.email || '').toLowerCase().trim();
  const rawPhone = (user.phone || '').trim();
  const rawName = (user.name || '').trim();
  const rawUsername = (user.username || '').toLowerCase().trim();

  let matchedIndex = -1;

  // Search for matching user by email, phone, name, or username
  for (let i = 0; i < currentUsers.length; i++) {
    const u = currentUsers[i];
    const uEmail = u.email.toLowerCase().trim();
    const uPhone = u.phone.trim();
    const uName = u.name.toLowerCase().trim();
    const uNameCompact = uName.replace(/\s+/g, '');

    const emailMatch = rawEmail && uEmail && (uEmail === rawEmail || (rawEmail.includes('@') && uEmail === rawEmail));
    const phoneMatch = rawPhone && uPhone && uPhone === rawPhone && rawPhone !== '9876543210';
    const nameMatch = rawName && (uName === rawName.toLowerCase() || uNameCompact === rawName.toLowerCase().replace(/\s+/g, ''));
    const usernameMatch = rawUsername && (uNameCompact === rawUsername || uEmail.split('@')[0] === rawUsername);

    if (emailMatch || phoneMatch || nameMatch || usernameMatch) {
      matchedIndex = i;
      break;
    }
  }

  let updatedList = [...currentUsers];

  if (matchedIndex !== -1) {
    const existing = updatedList[matchedIndex];
    const isFormSubmitted = (user.district && user.district !== 'Not Provided') || (user.cutoff && user.cutoff > 0);
    const updatedUser: AdminUserRecord = sanitizeUserRecord({
      ...existing,
      name: rawName || existing.name,
      email: (rawEmail && !rawEmail.endsWith('@student.disha.tn.gov.in')) ? rawEmail : existing.email,
      phone: rawPhone || existing.phone,
      district: user.district || existing.district,
      cutoff: user.cutoff && user.cutoff > 0 ? user.cutoff : existing.cutoff,
      category: isFormSubmitted && user.category ? user.category : (user.category || existing.category || 'Pending'),
      lastActive: activeLabel,
      reportsGenerated: isLoginEvent ? (existing.reportsGenerated || 0) + 1 : existing.reportsGenerated,
      status: existing.status === 'Suspended' ? 'Suspended' : 'Verified'
    });

    // Move updated user to top of the list so frequent logins appear first
    updatedList.splice(matchedIndex, 1);
    updatedList.unshift(updatedUser);
  } else {
    // Create new record for new user without pre-filling mock district/cutoff
    const newUser: AdminUserRecord = sanitizeUserRecord({
      id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
      name: rawName || user.username || 'Student Candidate',
      email: rawEmail || `${rawUsername || 'student'}@student.disha.tn.gov.in`,
      phone: rawPhone || '9876543210',
      district: user.district || 'Not Provided',
      stream: 'Pending',
      category: user.category || 'Pending',
      cutoff: user.cutoff && user.cutoff > 0 ? user.cutoff : 0,
      registeredDate: new Date().toISOString().slice(0, 10),
      lastActive: activeLabel,
      reportsGenerated: 0,
      status: 'Verified'
    });
    updatedList.unshift(newUser);
  }

  // Deduplicate entries by email/phone if duplicates exist
  const seenKeys = new Set<string>();
  updatedList = updatedList.filter(u => {
    const key = `${u.email.toLowerCase().trim()}_${u.phone.trim()}`;
    if (seenKeys.has(key)) return false;
    seenKeys.add(key);
    return true;
  });

  localStorage.setItem('disha_admin_registered_users', JSON.stringify(updatedList));

  // Notify components that user directory has updated
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('disha_user_directory_updated'));
  }

  return updatedList;
}
