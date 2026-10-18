"use client";

import { useState, useEffect } from "react";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("admin_logged_in") === "true";
    setIsLoggedIn(loggedIn);
    setIsLoading(false);
  }, []);

  const handleLogin = () => {
    sessionStorage.setItem("admin_logged_in", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    sessionStorage.removeItem("admin_logged_in");
    setIsLoggedIn(false);
    try {
      await fetch('/api/admin/auth', { method: 'DELETE' });
    } catch (e) {
      // Ignore
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
}
