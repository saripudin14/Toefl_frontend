import React from "react";
import { useAuth } from "../../auth/auth-context";
import { StatsCard } from "../../../components/ui/StatsCard";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { 
  CalendarIcon, 
  TargetIcon, 
  AwardIcon, 
  DownloadIcon, 
  CheckCircleIcon,
  CircleIcon,
  ChevronRightIcon
} from "lucide-react";

export function ExamTakerDashboard() {
  const { user } = useAuth();
  const userName = user?.name || "Student";

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Welcome back, {userName}</h2>
          <p className="text-slate-500 mt-1">
            Your next exam is scheduled for November 5th, 2025
          </p>
        </div>
        <Button variant="outline" className="shrink-0 gap-2">
          <DownloadIcon className="w-4 h-4" /> Download Certificate
        </Button>
      </div>

      {/* Stats/Highlight Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Next Milestone"
          value="50 DAYS"
          trendLabel="TOEFL iBT Home Edition"
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
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full border-4 border-green-500 flex items-center justify-center text-green-700 font-bold text-xl shrink-0">
                92
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-500 mb-1">Latest Score</p>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">Reading</span>
                  <span className="font-semibold text-slate-800">24/30</span>
                </div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">Listening</span>
                  <span className="font-semibold text-slate-800">26/30</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600">Speaking</span>
                  <span className="font-semibold text-slate-800">21/30</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Exam History */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Exam History</CardTitle>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-6 py-3 font-medium">Exam</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Type</th>
                  <th className="px-6 py-3 font-medium">Score</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-800">TOEFL iBT Test</td>
                  <td className="px-6 py-4 text-slate-600">Oct 12, 2025</td>
                  <td className="px-6 py-4 text-slate-600">Practice</td>
                  <td className="px-6 py-4 font-semibold text-slate-800">92/120</td>
                  <td className="px-6 py-4">
                    <Badge variant="success">Completed</Badge>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-800">TOEFL ITP Test</td>
                  <td className="px-6 py-4 text-slate-600">Sep 05, 2025</td>
                  <td className="px-6 py-4 text-slate-600">Official</td>
                  <td className="px-6 py-4 font-semibold text-slate-800">550/677</td>
                  <td className="px-6 py-4">
                    <Badge variant="success">Completed</Badge>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-slate-800">Reading Section Practice</td>
                  <td className="px-6 py-4 text-slate-600">Aug 20, 2025</td>
                  <td className="px-6 py-4 text-slate-600">Practice</td>
                  <td className="px-6 py-4 font-semibold text-slate-800">22/30</td>
                  <td className="px-6 py-4">
                    <Badge variant="success">Completed</Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* Registration Status */}
          <Card>
            <CardHeader>
              <CardTitle>Registration Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 relative">
                <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-slate-200 z-0"></div>
                
                <div className="flex items-start gap-4 relative z-10">
                  <div className="bg-white rounded-full">
                    <CheckCircleIcon className="w-6 h-6 text-green-500 bg-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800">Personal Info</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Completed on Oct 10</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 relative z-10">
                  <div className="bg-white rounded-full">
                    <CheckCircleIcon className="w-6 h-6 text-green-500 bg-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800">Payment</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Verified</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 relative z-10">
                  <div className="bg-white rounded-full">
                    <CircleIcon className="w-6 h-6 text-blue-500 fill-blue-50 bg-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-800">Slot Selection</h4>
                    <p className="text-xs text-blue-600 mt-0.5 font-medium cursor-pointer hover:underline">Select your schedule</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 relative z-10">
                  <div className="bg-white rounded-full">
                    <CircleIcon className="w-6 h-6 text-slate-300 bg-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-400">Confirmation</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Pending previous steps</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
