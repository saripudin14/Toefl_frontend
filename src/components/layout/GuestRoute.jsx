import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth/auth-context";
import { LoadingSpinner } from "../ui/LoadingSpinner";

export function GuestRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <LoadingSpinner size="lg" className="text-blue-600 mb-4" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
