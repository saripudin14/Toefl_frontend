import React from "react";
import { StatsCard } from "../../../components/ui/StatsCard";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/Card";
import { Button } from "../../../components/ui/Button";
import { Badge } from "../../../components/ui/Badge";
import { 
  MonitorPlayIcon, 
  CheckCircleIcon, 
  ClockIcon,
  AlertTriangleIcon,
  VideoIcon,
  MicIcon,
  MessageSquareIcon,
  SearchIcon,
  MoreVerticalIcon,
  ExternalLinkIcon
} from "lucide-react";

export function ProctorDashboard() {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Live Proctoring Room</h2>
          <p className="text-slate-500 mt-1">
            Monitoring Session ID: <span className="font-semibold text-slate-700">#TOEFL-2024-A404</span>
          </p>
        </div>
        <Button variant="danger" className="shrink-0 gap-2">
          <AlertTriangleIcon className="w-4 h-4" /> Report Violation
        </Button>
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Today's Supervised Exams List */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Today's Supervised Exams</CardTitle>
              <Badge variant="primary" className="uppercase tracking-wider text-xs">Active Session</Badge>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div>
                    <h4 className="font-semibold text-slate-800">TOEFL iBT Home Edition - Batch A</h4>
                    <p className="text-sm text-slate-500 mt-0.5">08:00 AM - 10:30 AM • 32 Participants</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="warning">In Progress</Badge>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ExternalLinkIcon className="w-4 h-4 text-slate-400" />
                    </Button>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors opacity-75">
                  <div>
                    <h4 className="font-semibold text-slate-800">TOEFL ITP Standard - Batch B</h4>
                    <p className="text-sm text-slate-500 mt-0.5">13:00 PM - 15:00 PM • 45 Participants</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">Scheduled</Badge>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ExternalLinkIcon className="w-4 h-4 text-slate-400" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Video Feeds Grid (Placeholders) */}
          <h3 className="text-lg font-semibold text-slate-800 pt-2">Live Camera Feeds</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-slate-900 rounded-xl overflow-hidden relative aspect-video shadow-sm border border-slate-200">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600">
                  <VideoIcon className="w-8 h-8 mb-2 opacity-50" />
                  <span className="text-xs font-medium">Camera Feed {i}</span>
                </div>
                {/* Overlay controls */}
                <div className="absolute inset-x-0 top-0 p-2 flex justify-between bg-gradient-to-b from-black/60 to-transparent">
                  <span className="text-white text-xs font-medium bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                    Participant {i}
                  </span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1"></div>
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-2 flex justify-end gap-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                  <button className="p-1.5 bg-black/50 text-white rounded-md hover:bg-blue-600 transition-colors">
                    <MicIcon className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 bg-black/50 text-white rounded-md hover:bg-blue-600 transition-colors">
                    <MessageSquareIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar - Taker Status */}
        <div>
          <Card className="h-full min-h-[600px] flex flex-col sticky top-6">
            <CardHeader className="pb-3 border-b border-slate-100">
              <div className="flex justify-between items-center mb-3">
                <CardTitle className="text-base uppercase tracking-wider text-slate-500">Taker Status</CardTitle>
                <Badge variant="primary" className="rounded-full px-2">32</Badge>
              </div>
              <div className="relative">
                <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search taker..." 
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-y-auto">
              <div className="divide-y divide-slate-100">
                {[
                  { name: "Budi Santoso", status: "online", flag: false },
                  { name: "Siti Aminah", status: "online", flag: false },
                  { name: "Andi Wijaya", status: "warning", flag: true },
                  { name: "Dewi Lestari", status: "online", flag: false },
                  { name: "Eko Prasetyo", status: "offline", flag: false },
                  { name: "Rina Maharani", status: "online", flag: false },
                  { name: "Hendra Gunawan", status: "online", flag: false },
                  { name: "Maya Sari", status: "warning", flag: true },
                ].map((taker, i) => (
                  <div key={i} className="p-3 flex items-center justify-between hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                          {taker.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white ${
                          taker.status === 'online' ? 'bg-green-500' : 
                          taker.status === 'warning' ? 'bg-amber-500' : 'bg-slate-300'
                        }`}></div>
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${taker.flag ? 'text-amber-700' : 'text-slate-700'}`}>
                          {taker.name}
                        </p>
                        <p className="text-xs text-slate-400">ID: P-10{i}</p>
                      </div>
                    </div>
                    {taker.flag && (
                      <AlertTriangleIcon className="w-4 h-4 text-amber-500" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
            <div className="p-3 border-t border-slate-100 bg-slate-50 rounded-b-xl text-center">
              <button className="text-sm text-blue-600 font-medium hover:text-blue-700">
                View All 32 Takers
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
