import React from "react";
import { StatsCard } from "../../../components/ui/StatsCard";
import { Card } from "../../../components/ui/Card";
import { MonitorPlayIcon, CheckCircleIcon, ClockIcon } from "lucide-react";

export function ProctorDashboard() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Live Proctoring Room</h2>
        <p className="text-slate-500 mt-1">
          Monitoring Session ID: #TOEFL-2024-A404
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Active Sessions"
          value="24"
          trendLabel="students taking test"
          icon={MonitorPlayIcon}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Completed"
          value="08"
          trendLabel="students finished"
          icon={CheckCircleIcon}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
        <StatsCard
          title="Remaining Time"
          value="58:10"
          trendLabel="session ends at 10:30 AM"
          icon={ClockIcon}
          iconBgColor="bg-amber-100"
          iconColor="text-amber-600"
        />
      </div>

      {/* Placeholder Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <Card className="min-h-[500px] flex items-center justify-center border-dashed border-2 border-slate-200 bg-slate-50">
            <div className="text-center">
              <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3 inline-block">
                Demo Data
              </span>
              <p className="text-slate-500 font-medium">Live Camera Grid coming soon</p>
            </div>
          </Card>
        </div>
        <div>
          <Card className="h-full min-h-[500px] flex items-center justify-center border-dashed border-2 border-slate-200 bg-slate-50">
            <div className="text-center p-4">
              <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3 inline-block">
                Demo Data
              </span>
              <p className="text-slate-500 font-medium">Participant Status List coming soon</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
