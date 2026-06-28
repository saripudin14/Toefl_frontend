import React from "react";
import { useAuth } from "../../auth/auth-context";
import { StatsCard } from "../../../components/ui/StatsCard";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/Card";
import { CalendarIcon, TargetIcon, AwardIcon } from "lucide-react";

export function ExamTakerDashboard() {
  const { user } = useAuth();
  const userName = user?.name || "Student";

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Welcome back, {userName}</h2>
        <p className="text-slate-500 mt-1">
          Your next exam is scheduled for November 5th, 2025
        </p>
      </div>

      {/* Stats/Highlight Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Next Milestone"
          value="50 DAYS"
          trendLabel="12 HRS | 45 MIN"
          icon={CalendarIcon}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Target Score"
          value="100/120"
          trendLabel="TOEFL iBT"
          icon={TargetIcon}
          iconBgColor="bg-indigo-100"
          iconColor="text-indigo-600"
        />
        <StatsCard
          title="Latest Practice"
          value="92/120"
          trend="↑ 4 pts"
          trendUp={true}
          icon={AwardIcon}
          iconBgColor="bg-green-100"
          iconColor="text-green-600"
        />
      </div>

      {/* Placeholder Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="min-h-[300px] flex items-center justify-center border-dashed border-2 border-slate-200 bg-slate-50">
            <div className="text-center">
              <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3 inline-block">
                Demo Data
              </span>
              <p className="text-slate-500 font-medium">Exam History Chart coming soon</p>
            </div>
          </Card>
        </div>
        <div>
          <Card className="min-h-[300px] flex items-center justify-center border-dashed border-2 border-slate-200 bg-slate-50">
            <div className="text-center">
              <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3 inline-block">
                Demo Data
              </span>
              <p className="text-slate-500 font-medium">Upcoming Tasks coming soon</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
