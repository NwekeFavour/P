import React, { useEffect, useState } from "react";
import {
  Users,
  Search,
  Filter,
  ChevronRight,
  User2Icon,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  MoreVertical,
  Activity,
  Zap,
  Globe,
  LayoutGrid,
  Inbox,
  Layers,
  Settings,
} from "lucide-react";
import AdminLayout from "./layout";
import { toast } from "sonner";

export default function SAdminDashboard() {
  const [overallStats, setOverallStats] = useState({
    totalUsers: 0,
    pendingApplications: 0,
    conversionRate: "0%",
  });
  const [applications, setApplications] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // ... (Your fetch logic remains the same as before) ...

  const filteredApplications = applications.filter((app) =>
    `${app.fname} ${app.lname}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-20 px-4 border-2 border-dashed border-gray-100 rounded-3xl bg-gray-50/30">
      <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 border border-gray-100">
        <Inbox className="w-8 h-8 text-gray-300" />
      </div>
      <h3 className="text-lg font-bold text-gray-900">No applications found</h3>
      <p className="text-sm text-gray-500 max-w-[280px] text-center mt-1">
        We couldn't find any records matching your current filters or search
        query.
      </p>
      <button
        onClick={() => setSearchQuery("")}
        className="mt-6 px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-gray-800 transition-all active:scale-95"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-10 pb-20">
        <div className="mb-8">

            <h1 className="text-2xl font-bold text-gray-900 capitalize tracking-tight">

              {location.pathname.split("/").pop() || "Dashboard"}

            </h1>

            <p className="text-gray-400 text-sm font-medium">Manage your platform resources and users.</p>

          </div>
        {/* Section 1: Minimalist Metric Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          {[
            {
              label: "Total Platform Reach",
              value: overallStats.totalUsers,
              icon: <Globe className="w-4 h-4" />,
            },
            {
              label: "Pending Reviews",
              value: overallStats.pendingApplications,
              icon: <Clock className="w-4 h-4" />,
            },
            {
              label: "Admission Rate",
              value: overallStats.conversionRate,
              icon: <Zap className="w-4 h-4" />,
            },
            {
              label: "Active Cohorts",
              value: "12",
              icon: <LayoutGrid className="w-4 h-4" />,
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2 text-gray-400 mb-3">
                {stat.icon}
                <span className="text-[11px] font-bold uppercase tracking-tighter">
                  {stat.label}
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </h3>
                <span className="text-emerald-500 text-xs font-medium">
                  +2.5%
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Section 2: Two-Column Command View */}
        {/* --- Main Dashboard Content Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: The Application Feed (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Feed Header */}
            <div className="flex flex-wrap items-center justify-between pb-2 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-gray-900">Applicants</h2>
                <span className="px-2.5 py-1 bg-gray-900 text-white text-[10px] font-black rounded-lg tracking-tighter">
                  {filteredApplications.length} ACTIVE
                </span>
              </div>

              <div className="relative md:mt-0 mt-3 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                <input
                  type="text"
                  placeholder="Quick search..."
                  className="pl-10 pr-4 py-2 bg-gray-50/50 border border-transparent focus:bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-50 rounded-2xl text-sm transition-all w-full md:w-64 outline-none"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Dynamic Content Area */}
            <div className="min-h-[400px]">
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-[88px] w-full bg-gray-50/50 animate-pulse rounded-3xl border border-gray-100"
                    />
                  ))}
                </div>
              ) : filteredApplications.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                  {filteredApplications.map((app, i) => (
                    <div
                      key={i}
                      className="group flex items-center justify-between p-4 rounded-3xl bg-white border border-gray-50 hover:border-gray-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-lg font-bold text-gray-900 group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
                            {app.fname[0]}
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {app.fname} {app.lname}
                          </h4>
                          <p className="text-xs text-gray-400 font-medium tracking-tight">
                            {app.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="hidden md:block text-right">
                          <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                            Applied For
                          </p>
                          <p className="text-xs font-bold text-gray-600">
                            {app.track || "General"}
                          </p>
                        </div>
                        <div className="p-2 rounded-xl bg-gray-50 group-hover:bg-gray-900 group-hover:text-white transition-all">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState />
              )}
            </div>
          </div>

          {/* Right Sidebar: Quick Insights (4 Cols) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            {/* Distribution Card */}
            <div className="p-8 rounded-[2rem] bg-white border border-gray-100 shadow-sm shadow-gray-200/50">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">
                  Distribution
                </h3>
                <Layers className="w-4 h-4 text-gray-400" />
              </div>

              <div className="space-y-6">
                {[
                  { name: "Frontend", color: "bg-blue-500", val: 45 },
                  { name: "Backend", color: "bg-gray-900", val: 30 },
                  { name: "Design", color: "bg-indigo-400", val: 25 },
                ].map((item) => (
                  <div key={item.name} className="group cursor-default">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-xs font-bold text-gray-500 group-hover:text-gray-900 transition-colors">
                        {item.name}
                      </span>
                      <span className="text-xs font-black text-gray-900">
                        {item.val}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                        style={{ width: `${item.val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Tip - Glassmorphism style */}
            <div className="group relative p-8 rounded-[2rem] bg-indigo-600 overflow-hidden shadow-xl shadow-indigo-100 transition-transform hover:scale-[1.02] duration-300">
              <div className="relative z-10">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center mb-4">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-white font-bold text-lg leading-tight mb-2">
                  Power Search
                </h4>
                <p className="text-indigo-100 text-sm leading-relaxed opacity-80">
                  Typing a cohort name in the search bar instantly isolates
                  those specific students.
                </p>
              </div>

              {/* Decorative Orbs */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-indigo-400/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
