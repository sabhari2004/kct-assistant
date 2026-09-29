/**
 * useAuth — React hook that tracks Firebase Auth state app-wide.
 * Provides the current user and a loading state.
 *
 * If Firebase Auth is not yet enabled in the Firebase Console,
 * this hook fails gracefully so the rest of the app still renders.
 */

import { useState, useEffect } from 'react';
import type { User } from '../types';
import { onAuthChange } from '../services/auth';

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    try {
      unsubscribe = onAuthChange((authUser) => {
        setUser(authUser);
        setLoading(false);
      });
    } catch (err) {
      // Firebase Auth not configured or not enabled in Firebase Console.
      // Fail gracefully — treat as unauthenticated.
      console.warn('Firebase Auth error (is Email/Password auth enabled in Firebase Console?):', err);
      setLoading(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return {
    user,
    loading,
    isAuthenticated: user !== null,
    isAdmin: user?.role === 'admin',
  };
}
