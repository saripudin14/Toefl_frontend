import React from "react";
import { StatsCard } from "../../../components/ui/StatsCard";
import { 
  UsersIcon, 
  GraduationCapIcon, 
  BookOpenIcon, 
  MonitorPlayIcon,
  ShieldAlertIcon
} from "lucide-react";

export function UserStatsCards({ meta }) {
  // If no meta or role_counts available, fallback to 0 or placeholders
  const roleCounts = meta?.role_counts || {};

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <StatsCard
        title="Total Pengguna"
        value={meta?.total || 0}
        icon={UsersIcon}
        iconBgColor="bg-blue-100"
        iconColor="text-blue-600"
        className="col-span-2 md:col-span-1"
      />
      <StatsCard
        title="Pengguna Ujian"
        value={roleCounts.PENGGUNA_UJIAN || 0}
        icon={GraduationCapIcon}
        iconBgColor="bg-indigo-100"
        iconColor="text-indigo-600"
      />
      <StatsCard
        title="Pengguna Belajar"
        value={roleCounts.PENGGUNA_BELAJAR || 0}
        icon={BookOpenIcon}
        iconBgColor="bg-green-100"
        iconColor="text-green-600"
      />
      <StatsCard
        title="Pengawas"
        value={roleCounts.PENGAWAS || 0}
        icon={MonitorPlayIcon}
        iconBgColor="bg-amber-100"
        iconColor="text-amber-600"
      />
      <StatsCard
        title="Admin"
        value={roleCounts.ADMIN || 0}
        icon={ShieldAlertIcon}
        iconBgColor="bg-red-100"
        iconColor="text-red-600"
      />
    </div>
  );
}
