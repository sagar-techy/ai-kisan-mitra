// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../services/useAuth";

const SESSION_KEY = "akm_session_started_at";

export default function ProtectedRoute({ children }) {
  const { user, loading, isSessionExpired } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-gray-300">
        Checking access...
      </div>
    );
  }

  if (!user) {
    // If there's never been a session, send to register; else to login
    const hasSession = Boolean(localStorage.getItem(SESSION_KEY));
    const to = hasSession && isSessionExpired() ? "/login" : "/register";
    return <Navigate to={to} replace state={{ from: location }} />;
  }

  // If user exists but session expired (edge case before onAuthStateChanged), send to login
  if (isSessionExpired()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
