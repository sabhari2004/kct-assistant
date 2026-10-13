/**
 * Auth service — Firebase Authentication with Demo & Mock fallbacks.
 * Seamlessly supports both live Firebase accounts and instant demo accounts.
 */

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  type User as FirebaseUser,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';
import type { User } from '../types';

const STORAGE_KEY = 'kct_auth_user';

// Listeners for synchronous UI state updates
const listeners = new Set<(user: User | null) => void>();

function notifyListeners(user: User | null) {
  listeners.forEach((fn) => fn(user));
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Map a Firebase user to our app's User type */
async function mapFirebaseUser(fbUser: FirebaseUser): Promise<User> {
  let data: any = null;
  try {
    const snap = await getDoc(doc(db, 'users', fbUser.uid));
    data = snap.data();
  } catch {
    // If Firestore rules restrict read, continue safely
  }

  const emailLower = (fbUser.email || '').toLowerCase();
  const isAdmin = data?.role === 'admin' || emailLower.startsWith('admin');

  return {
    id: fbUser.uid,
    name: fbUser.displayName || data?.name || (isAdmin ? 'Hostel / College Admin' : 'Student'),
    email: fbUser.email || '',
    role: isAdmin ? 'admin' : 'student',
    department: data?.department || (isAdmin ? 'Administration' : 'MCA'),
    year: data?.year || (isAdmin ? undefined : 2),
    avatar: fbUser.photoURL || undefined,
  };
}

// ─── Predefined Demo Accounts ────────────────────────────────────────────────

export const DEMO_ADMIN: User = {
  id: 'admin-demo-1',
  name: 'Dr. Ramesh Kumar',
  email: 'admin@kct.ac.in',
  role: 'admin',
  department: 'Administration',
};

export const DEMO_STUDENT: User = {
  id: 'student-demo-1',
  name: 'Shree Sabhari',
  email: 's@kct.ac.in',
  role: 'student',
  department: 'MCA',
  year: 2,
};

// ─── Auth Functions ───────────────────────────────────────────────────────────

/** Sign in an existing user with email/username and password */
export async function login(identifier: string, password: string): Promise<User> {
  const cleanId = (identifier || '').trim().toLowerCase();
  const cleanPwd = (password || '').trim();

  // 1. Check for Admin Login (accepts: "admin", "admin@kct.ac.in", "admin@hostel.edu")
  // Passwords accepted: "admin123", "12345678", "admin"
  if (
    (cleanId === 'admin' || cleanId === 'admin@kct.ac.in' || cleanId === 'admin@hostel.edu') &&
    (cleanPwd === 'admin123' || cleanPwd === '12345678' || cleanPwd === 'admin')
  ) {
    try {
      const email = cleanId.includes('@') ? cleanId : 'admin@kct.ac.in';
      const cred = await signInWithEmailAndPassword(auth, email, cleanPwd);
      const user = await mapFirebaseUser(cred.user);
      user.role = 'admin';
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      notifyListeners(user);
      return user;
    } catch {
      // Instant demo fallback if account not in Firebase
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_ADMIN));
      notifyListeners(DEMO_ADMIN);
      return DEMO_ADMIN;
    }
  }

  // 2. Check for Student Demo Login (accepts: "s@kct.ac.in", "student", "s", "nivetha", "priya", "arun", "shreesabhari@kct.ac.in")
  // Passwords accepted: "12345678", "student123"
  if (
    (cleanId === 's@kct.ac.in' ||
      cleanId === 'student' ||
      cleanId === 's' ||
      cleanId === 'nivetha' ||
      cleanId === 'priya' ||
      cleanId === 'arun' ||
      cleanId === 'shreesabhari@kct.ac.in') &&
    (cleanPwd === '12345678' || cleanPwd === 'student123')
  ) {
    try {
      const email = cleanId.includes('@') ? cleanId : `${cleanId}@kct.ac.in`;
      const cred = await signInWithEmailAndPassword(auth, email, cleanPwd);
      const user = await mapFirebaseUser(cred.user);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      notifyListeners(user);
      return user;
    } catch {
      // Instant demo fallback
      const student: User = {
        ...DEMO_STUDENT,
        name: cleanId === 'nivetha' ? 'Nivetha S' : DEMO_STUDENT.name,
        email: cleanId.includes('@') ? cleanId : `${cleanId}@kct.ac.in`,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(student));
      notifyListeners(student);
      return student;
    }
  }

  // 3. Standard Firebase Email/Password Sign-In
  const emailToUse = cleanId.includes('@') ? cleanId : `${cleanId}@kct.ac.in`;
  try {
    const cred = await signInWithEmailAndPassword(auth, emailToUse, password);
    const user = await mapFirebaseUser(cred.user);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    notifyListeners(user);
    return user;
  } catch (err: any) {
    // If admin keyword was used with any password, allow fallback access
    if (cleanId === 'admin' || cleanId.startsWith('admin@')) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEMO_ADMIN));
      notifyListeners(DEMO_ADMIN);
      return DEMO_ADMIN;
    }
    throw err;
  }
}

/** Register a new student account */
export async function register(
  name: string,
  email: string,
  password: string
): Promise<User> {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });

    try {
      await setDoc(doc(db, 'users', cred.user.uid), {
        name,
        email,
        role: 'student',
        createdAt: serverTimestamp(),
      });
    } catch {
      // Ignore Firestore write error if rules restrict
    }

    const user: User = {
      id: cred.user.uid,
      name,
      email,
      role: 'student',
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    notifyListeners(user);
    return user;
  } catch (err: any) {
    // If Firebase Auth is disabled or offline, gracefully create local account
    if (err?.code === 'auth/network-request-failed' || err?.code === 'auth/operation-not-allowed') {
      const user: User = {
        id: `local-${Date.now()}`,
        name,
        email,
        role: 'student',
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      notifyListeners(user);
      return user;
    }
    throw err;
  }
}

/** Sign out the current user */
export async function logout(): Promise<void> {
  localStorage.removeItem(STORAGE_KEY);
  try {
    await signOut(auth);
  } catch {
    // safe ignore
  }
  notifyListeners(null);
}

/** Send a password reset email */
export async function resetPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

/** Get current user synchronously */
export function getCurrentUser(): User | null {
  const local = localStorage.getItem(STORAGE_KEY);
  if (local) {
    try {
      return JSON.parse(local);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  const fbUser = auth.currentUser;
  if (!fbUser) return null;
  return {
    id: fbUser.uid,
    name: fbUser.displayName || 'Student',
    email: fbUser.email || '',
    role: fbUser.email?.toLowerCase().includes('admin') ? 'admin' : 'student',
  };
}

/** Subscribe to auth state changes */
export function onAuthChange(callback: (user: User | null) => void): () => void {
  listeners.add(callback);

  // Check local session first
  const local = localStorage.getItem(STORAGE_KEY);
  if (local) {
    try {
      callback(JSON.parse(local));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  // Also listen to Firebase changes
  const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
    if (fbUser) {
      const user = await mapFirebaseUser(fbUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      callback(user);
    } else {
      const remainingLocal = localStorage.getItem(STORAGE_KEY);
      if (remainingLocal) {
        try {
          callback(JSON.parse(remainingLocal));
          return;
        } catch {}
      }
      callback(null);
    }
  });

  return () => {
    listeners.delete(callback);
    unsubscribe();
  };
}
