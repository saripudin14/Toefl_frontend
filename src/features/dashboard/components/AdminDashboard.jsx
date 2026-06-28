import React from "react";
import { StatsCard } from "../../../components/ui/StatsCard";
import { Card } from "../../../components/ui/Card";
import { UsersIcon, GraduationCapIcon, FileQuestionIcon, ShieldCheckIcon } from "lucide-react";

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">System Overview</h2>
        <p className="text-slate-500 mt-1">
          Institutional performance and capacity metrics for Q3 2024
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value="12,408"
          trend="12%"
          trendUp={true}
          icon={UsersIcon}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Total Participants"
          value="8,920"
          trend="8%"
          trendUp={true}
          icon={GraduationCapIcon}
          iconBgColor="bg-indigo-100"
          iconColor="text-indigo-600"
        />
        <StatsCard
          title="Total Questions"
          value="45,000+"
          trendLabel="in question bank"
          icon={FileQuestionIcon}
          iconBgColor="bg-amber-100"
          iconColor="text-amber-600"
        />
        <StatsCard
          title="Active Instructors"
          value="142"
          trend="2"
          trendUp={true}
          icon={ShieldCheckIcon}
          iconBgColor="bg-purple-100"
          iconColor="text-purple-600"
        />
      </div>

      {/* Placeholder Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="min-h-[400px] flex items-center justify-center border-dashed border-2 border-slate-200 bg-slate-50">
          <div className="text-center">
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3 inline-block">
              Demo Data
            </span>
            <p className="text-slate-500 font-medium">System Activity Chart coming soon</p>
          </div>
        </Card>
        <Card className="min-h-[400px] flex items-center justify-center border-dashed border-2 border-slate-200 bg-slate-50">
          <div className="text-center">
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3 inline-block">
              Demo Data
            </span>
            <p className="text-slate-500 font-medium">Recent Registrations List coming soon</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
