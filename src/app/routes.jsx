import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "../components/layout/ProtectedRoute";
import { GuestRoute } from "../components/layout/GuestRoute";
import { AdminRoute } from "../components/layout/AdminRoute";
import { AppLayout } from "../components/layout/AppLayout";
import { ForbiddenPage } from "../features/auth/pages/ForbiddenPage";
import { NotFoundPage } from "../features/auth/pages/NotFoundPage";

// Lazy load feature pages
const LoginPage = React.lazy(() => import("../features/auth/pages/LoginPage"));
const RegisterPage = React.lazy(() => import("../features/auth/pages/RegisterPage").then(m => ({ default: m.RegisterPage })));
const ForgotPasswordPage = React.lazy(() => import("../features/auth/pages/ForgotPasswordPage").then(m => ({ default: m.ForgotPasswordPage })));
const ResetPasswordPage = React.lazy(() => import("../features/auth/pages/ResetPasswordPage").then(m => ({ default: m.ResetPasswordPage })));
const DashboardPage = React.lazy(() => import("../features/dashboard/pages/DashboardPage"));
const SettingsPage = React.lazy(() => import("../features/auth/pages/SettingsPage").then(m => ({ default: m.SettingsPage })));

// Admin User Management Pages
const AdminUsersPage = React.lazy(() => import("../features/users/pages/AdminUsersPage").then(m => ({ default: m.AdminUsersPage })));
const CreateUserPage = React.lazy(() => import("../features/users/pages/CreateUserPage").then(m => ({ default: m.CreateUserPage })));
const UserDetailPage = React.lazy(() => import("../features/users/pages/UserDetailPage").then(m => ({ default: m.UserDetailPage })));
const EditUserPage = React.lazy(() => import("../features/users/pages/EditUserPage").then(m => ({ default: m.EditUserPage })));

export function AppRoutes() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    }>
      <Routes>
        {/* Default route redirect to dashboard (which will redirect to login if not auth) */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        {/* Guest routes */}
        <Route 
          path="/login" 
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          } 
        />
        
        <Route 
          path="/register" 
          element={
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          } 
        />
        
        <Route 
          path="/forgot-password" 
          element={
            <GuestRoute>
              <ForgotPasswordPage />
            </GuestRoute>
          } 
        />
        
        <Route 
          path="/reset-password" 
          element={
            <GuestRoute>
              <ResetPasswordPage />
            </GuestRoute>
          } 
        />
        
        {/* Protected routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <AppLayout>
                <SettingsPage />
              </AppLayout>
            </ProtectedRoute>
          } 
        />

        {/* Admin Routes */}
        <Route 
          path="/admin/users" 
          element={
            <AdminRoute>
              <AppLayout>
                <AdminUsersPage />
              </AppLayout>
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/users/new" 
          element={
            <AdminRoute>
              <AppLayout>
                <CreateUserPage />
              </AppLayout>
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/users/:id" 
          element={
            <AdminRoute>
              <AppLayout>
                <UserDetailPage />
              </AppLayout>
            </AdminRoute>
          } 
        />
        <Route 
          path="/admin/users/:id/edit" 
          element={
            <AdminRoute>
              <AppLayout>
                <EditUserPage />
              </AppLayout>
            </AdminRoute>
          } 
        />
        
        {/* Public routes */}
        <Route path="/403" element={<ForbiddenPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </React.Suspense>
  );
}
