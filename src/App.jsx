// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ExpertDashboard from "./pages/ExpertDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./services/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expert"
          element={
            <ProtectedRoute>
              <ExpertDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AuthProvider>
  );
}
