import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";

// Components
import Navbar from "./components/Navbar.jsx";

// Pages
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import EmailVerification from "./pages/EmailVerification.jsx";

// Admin Pages
import AdminEmployees from "./pages/admin/AdminEmployees.jsx";
import AddEmployee from "./pages/admin/AddEmployee.jsx";
import EditEmployee from "./pages/admin/EditEmployee.jsx";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  console.log("ProtectedRoute - user:", user, "loading:", loading);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-zinc-950 text-white flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    console.log("No user, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  if (user.mustChangePassword) {
    console.log("User must change password, redirecting to onboarding");
    return <Navigate to="/onboarding" replace />;
  }

  console.log("User authenticated, showing protected content");
  return children;
};

// Admin Only Route Component
const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (user?.role !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// Public Route Component (redirect if already logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  console.log("PublicRoute - user:", user, "loading:", loading);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-zinc-950 text-white flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // If user exists and is fully set up, redirect to dashboard
  if (user && !user.mustChangePassword) {
    console.log("User authenticated, redirecting to dashboard");
    return <Navigate to="/dashboard" replace />;
  }

  // If user exists but needs onboarding, redirect to onboarding
  if (user && user.mustChangePassword) {
    console.log("User needs onboarding, redirecting");
    return <Navigate to="/onboarding" replace />;
  }

  // No user, show public route
  console.log("No user, showing public route");
  return children;
};

// App Layout Component
const AppLayout = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-white font-sans">
      {user && <Navbar />}
      <div className={user ? "pt-4" : ""}>{children}</div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppLayout>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            }
          />

          {/* Onboarding Route */}
          <Route path="/onboarding" element={<Onboarding />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/email-verification"
            element={
              <ProtectedRoute>
                <EmailVerification />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin/employees"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <AdminEmployees />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/employees/create"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <AddEmployee />
                </AdminRoute>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/employees/edit/:id"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <EditEmployee />
                </AdminRoute>
              </ProtectedRoute>
            }
          />

          {/* Default Redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AppLayout>
    </AuthProvider>
  );
};

export default App;
