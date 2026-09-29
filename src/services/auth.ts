/**
 * Auth service — Firebase Authentication (Email/Password).
 * Replaces mock stubs with real Firebase SDK calls.
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

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Map a Firebase user to our app's User type */
async function mapFirebaseUser(fbUser: FirebaseUser): Promise<User> {
  const snap = await getDoc(doc(db, 'users', fbUser.uid));
  const data = snap.data();
  return {
    id: fbUser.uid,
    name: fbUser.displayName || data?.name || 'Student',
    email: fbUser.email || '',
    role: data?.role || 'student',
    department: data?.department,
    year: data?.year,
    avatar: fbUser.photoURL || undefined,
  };
}

// ─── Auth Functions ───────────────────────────────────────────────────────────

/** Sign in an existing user with email and password */
export async function login(email: string, password: string): Promise<User> {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return mapFirebaseUser(cred.user);
}

/** Register a new student account */
export async function register(
  name: string,
  email: string,
  password: string
): Promise<User> {
  const cred = await createUserWithEmailAndPassword(auth, email, password);

  // Set display name
  await updateProfile(cred.user, { displayName: name });

  // Create user document in Firestore
  await setDoc(doc(db, 'users', cred.user.uid), {
    name,
    email,
    role: 'student',
    createdAt: serverTimestamp(),
  });

  return {
    id: cred.user.uid,
    name,
    email,
    role: 'student',
  };
}

/** Sign out the current user */
export async function logout(): Promise<void> {
  await signOut(auth);
}

/** Send a password reset email */
export async function resetPassword(email: string): Promise<void> {
  await sendPasswordResetEmail(auth, email);
}

/** Get the currently signed-in Firebase user synchronously (null if not signed in) */
export function getCurrentUser(): User | null {
  const fbUser = auth.currentUser;
  if (!fbUser) return null;
  return {
    id: fbUser.uid,
    name: fbUser.displayName || 'Student',
    email: fbUser.email || '',
    role: 'student',
  };
}

/** Subscribe to auth state changes — returns unsubscribe function */
export function onAuthChange(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, async (fbUser) => {
    if (fbUser) {
      callback(await mapFirebaseUser(fbUser));
    } else {
      callback(null);
    }
  });
}
