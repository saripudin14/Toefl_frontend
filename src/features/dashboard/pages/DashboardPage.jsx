import React from "react";
import { AppLayout } from "../../../components/layout/AppLayout";
import { useAuth } from "../../auth/auth-context";
import { ROLES } from "../../../lib/constants";
import { AdminDashboard } from "../components/AdminDashboard";
import { ProctorDashboard } from "../components/ProctorDashboard";
import { ExamTakerDashboard } from "../components/ExamTakerDashboard";

export default function DashboardPage() {
  const { user } = useAuth();
  
  // Default to Exam Taker if no specific role matched
  const primaryRole = user?.roles?.[0];
  
  let DashboardContent = ExamTakerDashboard;
  let pageTitle = "Dashboard";

  if (primaryRole === ROLES.ADMIN) {
    DashboardContent = AdminDashboard;
    pageTitle = "Admin Dashboard";
  } else if (primaryRole === ROLES.PENGAWAS) {
    DashboardContent = ProctorDashboard;
    pageTitle = "Proctor Dashboard";
  }

  return (
    <AppLayout title={pageTitle}>
      <DashboardContent />
    </AppLayout>
  );
}
