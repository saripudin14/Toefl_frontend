import React from "react";
import { StatsCard } from "../../../components/ui/StatsCard";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { 
  UsersIcon, 
  GraduationCapIcon, 
  FileQuestionIcon, 
  ShieldCheckIcon,
  ActivityIcon,
  CheckCircle2Icon,
  AlertTriangleIcon,
  ArrowRightIcon,
  BellIcon,
  DatabaseIcon,
  ShieldAlertIcon,
  CpuIcon
} from "lucide-react";

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">System Overview</h2>
          <p className="text-slate-500 mt-1">
            Institutional performance and capacity metrics for Q3 2024
          </p>
        </div>
        <Button variant="outline" className="shrink-0 gap-2">
          Full Report <ArrowRightIcon className="w-4 h-4" />
        </Button>
      </div>

      {/* Active Sessions Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping absolute"></div>
          <div className="w-2 h-2 rounded-full bg-blue-500 relative"></div>
          <p className="text-blue-800 font-medium">
            Currently <span className="font-bold">245</span> candidates and <span className="font-bold">12</span> proctors active across all CDCs/sites.
          </p>
        </div>
        <Button variant="ghost" className="text-blue-700 hover:bg-blue-100 h-8 px-3">
          View Live Map
        </Button>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Exam Result Summary Chart (Placeholder) */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Exam Result Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex flex-col justify-end relative gap-4">
              <div className="absolute inset-0 flex flex-col justify-between text-xs text-slate-400">
                <div className="border-b border-dashed border-slate-200 h-full w-full">100%</div>
                <div className="border-b border-dashed border-slate-200 h-full w-full">75%</div>
                <div className="border-b border-dashed border-slate-200 h-full w-full">50%</div>
                <div className="border-b border-dashed border-slate-200 h-full w-full">25%</div>
                <div className="h-full w-full">0%</div>
              </div>
              <div className="relative z-10 flex items-end justify-around h-full pt-4">
                {/* Dummy Bars */}
                <div className="w-12 bg-blue-500 rounded-t-sm h-[60%]" title="Jan"></div>
                <div className="w-12 bg-blue-500 rounded-t-sm h-[80%]" title="Feb"></div>
                <div className="w-12 bg-blue-500 rounded-t-sm h-[40%]" title="Mar"></div>
                <div className="w-12 bg-blue-500 rounded-t-sm h-[75%]" title="Apr"></div>
                <div className="w-12 bg-blue-500 rounded-t-sm h-[90%]" title="May"></div>
                <div className="w-12 bg-blue-500 rounded-t-sm h-[65%]" title="Jun"></div>
              </div>
              <div className="flex justify-around text-xs text-slate-500 mt-2 font-medium">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* System Health */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                  <CheckCircle2Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">System Health</h3>
                  <p className="text-sm text-slate-500 mt-1">All modules operational</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Check Details
              </Button>
            </CardContent>
          </Card>

          {/* Recent System Activity */}
          <Card>
            <CardHeader className="pb-3 border-b border-slate-100">
              <CardTitle className="text-base">Recent System Activity</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                <div className="p-4 flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <ShieldCheckIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">New Proctor Assigned</p>
                    <p className="text-xs text-slate-500">Proctor ID: P-2094 assigned to CDC-Jakarta</p>
                    <p className="text-xs text-slate-400 mt-1">2 mins ago</p>
                  </div>
                </div>
                <div className="p-4 flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                    <DatabaseIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Batch Results Released</p>
                    <p className="text-xs text-slate-500">TOEFL iBT Nov 04 results published (420 users)</p>
                    <p className="text-xs text-slate-400 mt-1">1 hour ago</p>
                  </div>
                </div>
                <div className="p-4 flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                    <AlertTriangleIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">Suspicious Activity Flag</p>
                    <p className="text-xs text-slate-500">Multiple login failures detected for Admin IP</p>
                    <p className="text-xs text-slate-400 mt-1">3 hours ago</p>
                  </div>
                </div>
                <div className="p-4 flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                    <CpuIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">System Backup Complete</p>
                    <p className="text-xs text-slate-500">Automated daily backup successful</p>
                    <p className="text-xs text-slate-400 mt-1">5 hours ago</p>
                  </div>
                </div>
              </div>
              <div className="p-3 border-t border-slate-100 bg-slate-50 rounded-b-xl text-center">
                <button className="text-sm text-blue-600 font-medium hover:text-blue-700">
                  Show All Logs
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
