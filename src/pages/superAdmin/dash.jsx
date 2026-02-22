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
  ChevronDown,
} from "lucide-react";
import AdminLayout from "./layout";
import { toast } from "sonner";
import axios from "axios";

export default function SAdminDashboard() {
  const [overallStats, setOverallStats] = useState({
    totalUsers: 0,
    pendingApplications: 0,
    conversionRate: "0%",
  });
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleDetails = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  const [applications, setApplications] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState("all");
  const [cohorts, setCohorts] = useState([]);
  const [activeCohorts, setActiveCohorts] = useState([]);
  const [distribution, setDistribution] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [trends, setTrends] = useState({ reach: 0, pending: 0, rate: 0 });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("adminToken");
        const headers = { Authorization: `Bearer ${token}` };

        // 1. Fetch Applications & Stats (Assuming your existing endpoint)
        const appRes = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/applications/apply`,
          { headers },
        );

        // 2. Fetch Cohorts
        const cohortRes = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/applications/cohorts`,
          { headers },
        );

        const ResactiveCohorts = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/applications/cohorts/all-active`,
          { headers },
        );

        if (ResactiveCohorts.data.success) {
          setActiveCohorts(ResactiveCohorts.data.data);
        }

        if (appRes.data.success) {
          setApplications(appRes.data.data);
          calculateTrends(appRes.data.data);
          // Calculate dynamic stats
          setOverallStats({
            totalUsers: appRes.data.totalCount || appRes.data.data.length,
            pendingApplications: appRes.data.data.filter(
              (a) => a.status === "Pending",
            ).length,
            conversionRate: `${((appRes.data.data.filter((a) => a.status === "Approved").length / appRes.data.data.length) * 100).toFixed(1)}%`,
          });
        }

        if (cohortRes.data.success) {
          setCohorts(cohortRes.data.data);
          calculateDistribution(appRes.data.data);
        }
      } catch (error) {
        toast.error("Failed to sync dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Add this helper inside or above fetchData
  const calculateTrends = (apps) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const newApps = apps.filter(
      (a) => new Date(a.createdAt) > sevenDaysAgo,
    ).length;
    const totalApps = apps.length;

    // Simple growth calculation: (New / Total) * 100
    const growth = totalApps > 0 ? ((newApps / totalApps) * 100).toFixed(1) : 0;

    setTrends({
      reach: growth,
      pending: apps.filter(
        (a) => a.status === "Pending" && new Date(a.createdAt) > sevenDaysAgo,
      ).length,
      rate: (
        (apps.filter((a) => a.status === "Approved").length / totalApps) *
        10
      ).toFixed(1), // Simulated rate change
    });
  };

  // Then call calculateTrends(appRes.data.data) inside your useEffect after setting applications

  const calculateDistribution = (apps) => {
    const total = apps.length;
    if (total === 0) return;

    const counts = apps.reduce((acc, app) => {
      const track = app.track || "Other";
      acc[track] = (acc[track] || 0) + 1;
      return acc;
    }, {});

    const distArray = Object.entries(counts)
      .map(([name, count]) => ({
        name,
        val: Math.round((count / total) * 100),
        color:
          name === "Frontend"
            ? "bg-blue-500"
            : name === "Backend"
              ? "bg-gray-900"
              : "bg-indigo-400",
      }))
      .sort((a, b) => b.val - a.val);

    setDistribution(distArray);
  };

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

          <p className="text-gray-400 text-sm font-medium">
            Manage your platform resources and users.
          </p>
        </div>
        {/* Section 1: Minimalist Metric Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          {[
            {
              label: "Total Platform Reach",
              value: overallStats.totalUsers,
              icon: <Globe className="w-4 h-4" />,
              trend: `+${trends.reach}%`,
              trendType: "neutral",
              subText: "new this week",
            },
            {
              label: "Pending Reviews",
              value: overallStats.pendingApplications,
              icon: <Clock className="w-4 h-4" />,
              trend: trends.pending > 0 ? `+${trends.pending}` : "Clear",
              trendType: trends.pending > 5 ? "warning" : "success",
              subText: "needs attention",
            },
            {
              label: "Admission Rate",
              value: overallStats.conversionRate,
              icon: <Zap className="w-4 h-4" />,
              trend: `${trends.rate}%`,
              trendType: parseFloat(trends.rate) > 5 ? "success" : "neutral",
              subText: "vs last month",
            },
            {
              label: "Active Cohorts",
              value: activeCohorts.length,
              icon: <LayoutGrid className="w-4 h-4" />,
              trend: "Live",
              trendType: "success",
              subText: "running now",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white p-6 hover:bg-gray-50/80 transition-all duration-300 group relative"
            >
              {/* Header: Icon and Label */}
              <div className="flex items-center gap-2.5 mb-4">
                <div className="text-gray-400 group-hover:text-gray-900 transition-colors duration-300">
                  {stat.icon}
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 leading-none">
                  {stat.label}
                </span>
              </div>

              {/* Content: Value and Trend side-by-side */}
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-3xl font-bold tracking-tight text-gray-900 leading-none">
                    {stat.value}
                  </h3>
                </div>

                <div className="flex flex-col items-end">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold transition-colors ${
                      stat.trendType === "success"
                        ? "text-emerald-700 bg-emerald-50"
                        : stat.trendType === "warning"
                          ? "text-amber-700 bg-amber-50"
                          : "text-blue-700 bg-blue-50"
                    }`}
                  >
                    {stat.trend}
                  </span>
                  <span className="text-[9px] text-gray-400 mt-1.5 font-bold uppercase tracking-tighter">
                    {stat.subText}
                  </span>
                </div>
              </div>

              {/* Subtle bottom border accent on hover */}
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gray-900 transition-all duration-300 group-hover:w-full" />
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
                  {filteredApplications.map((app, i) => {
                    const isExpanded = expandedIndex === i;
                    return (
                      <div key={i} className="flex flex-col gap-2">
                        {/* Main Card */}
                        <div
                          className={`group flex items-center justify-between p-4 rounded-3xl bg-white border border-gray-100 hover:shadow-md transition-shadow duration-300 cursor-pointer`}
                          onClick={() => toggleDetails(i)}
                        >
                          <div className="flex items-center gap-4">
                            {/* Avatar */}
                            <div className="relative">
                              <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-lg font-bold text-gray-900 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                {app.fname[0]}
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full" />
                            </div>

                            {/* Name & Email */}
                            <div>
                              <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {app.fname}
                              </h4>
                              <p className="text-xs text-gray-500 font-medium tracking-tight">
                                {app.email}
                              </p>
                            </div>
                          </div>

                          {/* Applied Track & Expand Icon */}
                          <div className="flex items-center gap-4">
                            <div className="hidden md:block text-right">
                              <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                                Applied For
                              </p>
                              <p className="text-xs font-semibold text-gray-600">
                                {app.track || "General"}
                              </p>
                            </div>
                            <div className="flex items-center justify-center p-2 rounded-full bg-gray-50 group-hover:bg-blue-600 transition-colors duration-300">
                              {isExpanded ? (
                                <ChevronDown className="w-5 h-5 text-gray-600 group-hover:text-white" />
                              ) : (
                                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white" />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Expanded Details */}
                        {isExpanded && (
                          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 animate-fadeIn shadow-sm">
                            <h5 className="font-semibold text-gray-700 mb-3">
                              Applicant Details
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                              <p>
                                <strong>Full Name:</strong> {app.fname}{" "}
                                {app.lname}
                              </p>
                              <p>
                                <strong>Email:</strong> {app.email}
                              </p>
                              <p>
                                <strong>Phone:</strong> {app.phone || "N/A"}
                              </p>
                              <p>
                                <strong>Track:</strong> {app.track || "General"}
                              </p>
                              <p>
                                <strong>Level:</strong> {app.level || "N/A"}
                              </p>
                              <p>
                                <strong>Social Source:</strong>{" "}
                                {app.social || "N/A"}
                              </p>
                              <p>
                                <strong>University:</strong>{" "}
                                {app.university || "N/A"}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
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
                <div className="space-y-1">
                  <h3 className="text-sm font-black uppercase tracking-widest text-gray-900">
                    Track Distribution
                  </h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">
                    Across all cohorts
                  </p>
                </div>
                <Activity className="w-4 h-4 text-gray-400" />
              </div>

              <div className="space-y-6">
                {distribution.length > 0 ? (
                  distribution.map((item) => (
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
                          className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${item.val}%` }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-4 text-center text-xs text-gray-400 italic">
                    Awaiting application data...
                  </div>
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-50">
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-400">
                  <span>Active Cohorts</span>
                  <span className="text-gray-900">
                    {cohorts.filter((c) => c.isActive).length}
                  </span>
                </div>
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
