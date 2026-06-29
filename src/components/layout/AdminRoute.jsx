import React from "react";
import { ProtectedRoute } from "./ProtectedRoute";

/**
 * Route guard khusus untuk halaman Admin.
 * Ini adalah wrapper di atas ProtectedRoute yang secara eksplisit meminta role ADMIN.
 */
export function AdminRoute({ children }) {
  return (
    <ProtectedRoute requiredRole="ADMIN">
      {children}
    </ProtectedRoute>
  );
}
