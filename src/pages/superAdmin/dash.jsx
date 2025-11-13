import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, Search, Filter, ChevronLeft, ChevronRight, User2Icon } from "lucide-react";
import AdminLayout from "./layout";

export default function SAdminDashboard() {
  const [overallStats, setOverallStats] = useState({
    totalUsers: 0,
    premiumUsers: 0,
    freeUsers: 0,
    newUsers: 0,
    pendingApplications: 0,
    conversionRate: "0%",
  });
  const [cohorts, setCohorts] = useState([]);
  const [applications, setApplications] = useState([]);
  const [cohortStats, setCohortStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCohort, setSelectedCohort] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const token = localStorage.getItem("adminToken");
  const [user, setUser] = useState(null);
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchAdmin = async () => {
      if (!token) return;
      try {
        const res = await fetch(`${BASE_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setUser(data.data.fname + " " + data.data.lname);
      } catch (err) {
        console.error("Failed to fetch admin:", err);
      }
    };
    fetchAdmin();
  }, [token]);

  // Fetch all cohorts
  useEffect(() => {
    const fetchCohorts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/applications/cohorts`);
        const data = await res.json();
        setCohorts(data.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCohorts();
  }, []);

  // Fetch overall stats
  useEffect(() => {
    const fetchOverallStats = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/applications/stats`);
        const data = await res.json();
        setOverallStats(data.stats);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOverallStats();
  }, []);

  // Fetch applications and cohort stats when cohort changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let appsUrl =
          selectedCohort === "all"
            ? `${BASE_URL}/api/applications/apply`
            : `${BASE_URL}/api/applications/cohorts/${selectedCohort}/applications`;

        const appsRes = await fetch(appsUrl);
        const appsData = await appsRes.json();
        setApplications(appsData.data || []);

        if (selectedCohort !== "all") {
          const statsRes = await fetch(
            `${BASE_URL}/api/applications/cohorts/${selectedCohort}/stats`
          );
          const statsData = await statsRes.json();
          setCohortStats(statsData.stats);
        } else {
          setCohortStats(null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCohort]);

  const filteredApplications = applications.filter((app) =>
    `${app.fname} ${app.lname} ${app.email}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "bg-green-50 text-green-600";
      case "pending":
        return "bg-yellow-50 text-yellow-600";
      case "rejected":
        return "bg-gray-50 text-gray-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <AdminLayout setUser={setUser}>
      <div className="space-y-6 bg-white min-h-screen p-4">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search applications"
                className="w-full sm:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800" />
            <div className="flex items-center gap-3">
              <div className="w-fit border rounded-full p-2">
                <User2Icon className="w-6 h-5" />
              </div>
              <div className="hidden sm:block">
                <p className="font-semibold text-sm text-gray-800">Super Admin</p>
                <p className="text-xs text-gray-500">{user}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Date Range Info */}
        <div className="">
          <p className="text-sm text-gray-600">In the last 30 days</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: "Total Users", value: overallStats.totalUsers, subtitle: "Active users" },
            { label: "Pending Applications", value: overallStats.pendingApplications, subtitle: "Awaiting review" },
            { label: "Conversion Rate", value: overallStats.conversionRate, subtitle: "Free to Premium" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-lg p-6 text-gray-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-3xl font-bold mb-1">{loading ? "..." : stat.value}</h3>
              <p className="text-sm font-medium opacity-90">{stat.label}</p>
              <p className="text-xs opacity-75 mt-1">{stat.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Cohort Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">All Applications</h2>
              <p className="text-sm text-gray-500">Monitor and manage all cohort applications</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <select
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 hover:border-gray-400 focus:outline-none focus:ring focus:ring-gray-400 cursor-pointer"
                  value={selectedCohort}
                  onChange={(e) => setSelectedCohort(e.target.value)}
                >
                  <option value="all">All Cohorts</option>
                  {cohorts.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              <button className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors">
                View all
              </button>
            </div>
          </div>

          {/* Cohort Stats Grid */}
          {cohortStats && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
              {[
                { label: "Total", value: cohortStats.totalApplications },
                { label: "Premium", value: cohortStats.premiumApplications },
                { label: "Free", value: cohortStats.freeApplications },
                { label: "Pending", value: cohortStats.pendingApplications },
                { label: "Approved", value: cohortStats.approvedApplications },
                { label: "Rejected", value: cohortStats.rejectedApplications },
              ].map((stat, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
              ))}
            </div>
          )}

          {/* Mobile Cards View */}
          <div className="sm:hidden space-y-3">
            {loading ? (
              <p className="text-center py-8 text-gray-500">Loading...</p>
            ) : filteredApplications.length === 0 ? (
              <p className="text-center py-8 text-gray-500">No applications found</p>
            ) : (
              filteredApplications.map((app, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-semibold text-gray-800">{`${app.fname} ${app.lname}`}</p>
                      <p className="text-xs text-gray-500">{app.email}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        app.status
                      )}`}
                    >
                      {app.status || "Pending"}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-600">
                      <span className="font-medium">Cohort:</span> {app.cohort?.name || "-"}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Track:</span> {app.track || "-"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block">
            <ScrollArea className="w-full">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow className="border-b border-gray-300 bg-gray-100">
                    <TableHead className="font-semibold text-gray-700">Applicant</TableHead>
                    <TableHead className="font-semibold text-gray-700">Status</TableHead>
                    <TableHead className="font-semibold text-gray-700">Cohort</TableHead>
                    <TableHead className="font-semibold text-gray-700">Track</TableHead>
                    <TableHead className="font-semibold text-gray-700">Email</TableHead>
                    <TableHead className="font-semibold text-gray-700">Reviewed</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : filteredApplications.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        No applications found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredApplications.map((app, i) => (
                      <TableRow
                        key={i}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <TableCell className="font-medium text-gray-800">{`${app.fname} ${app.lname}`}</TableCell>
                        <TableCell>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              app.status
                            )}`}
                          >
                            {app.status || "Pending"}
                          </span>
                        </TableCell>
                        <TableCell className="text-gray-600">{app.cohort?.name || "-"}</TableCell>
                        <TableCell className="text-gray-600">{app.track || "-"}</TableCell>
                        <TableCell className="text-gray-600">{app.email}</TableCell>
                        <TableCell className="text-gray-600 text-sm">
                          {app.reviewedAt ? new Date(app.reviewedAt).toLocaleDateString() : "-"}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing {filteredApplications.length} applications
            </p>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <ChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              {[1, 2, 3, 4].map((page) => (
                <button
                  key={page}
                  className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                    page === 1
                      ? "bg-green-200 text-gray-800"
                      : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <p className="text-sm text-gray-600">{currentDate}</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}