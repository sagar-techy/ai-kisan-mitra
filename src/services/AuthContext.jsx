// src/services/AuthContext.jsx
import { createContext, useEffect, useMemo, useState } from "react";
import { auth } from "./firebase";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const AuthContext = createContext(null);

const SESSION_KEY = "akm_session_started_at";
const MILLIS_24H = 24 * 60 * 60 * 1000;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to check 24h session expiry
  const isExpired = () => {
    const startedAt = Number(localStorage.getItem(SESSION_KEY));
    if (!startedAt) return true; // force login if no timestamp
    return Date.now() - startedAt > MILLIS_24H;
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u && !isExpired()) {
        setUser(u);
      } else {
        // Session expired or no user
        if (u && isExpired()) {
          signOut(auth);
        }
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      // Sign up and start a 24h session immediately, then redirect caller
      async register({ name, email, password }) {
        const cred = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (name) {
          try {
            await updateProfile(cred.user, { displayName: name });
          } catch (e) {
            // Non-fatal if profile update fails
            console.warn("Profile update failed", e);
          }
        }
        localStorage.setItem(SESSION_KEY, String(Date.now()));
        setUser(cred.user);
        return cred.user;
      },
      async login({ email, password }) {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        localStorage.setItem(SESSION_KEY, String(Date.now()));
        setUser(cred.user);
        return cred.user;
      },
      async logout() {
        await signOut(auth);
        localStorage.removeItem(SESSION_KEY);
        setUser(null);
      },
      isSessionExpired: isExpired,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
