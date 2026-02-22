import React, { useEffect, useState } from "react";
import AdminLayout from "./layout";
import {
  Users,
  Layers,
  CheckCircle,
  Clock,
  MoreHorizontal,
  Trash2,
  User2Icon,
  ArrowUpRight,
  Filter,
  Search,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboard() {
  const [cohorts, setCohorts] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loadingCohorts, setLoadingCohorts] = useState(true);
  const [loadingApps, setLoadingApps] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [error, setError] = useState(null);

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchCohorts();
    fetchApplications();
  }, []);

  // API Methods (Consolidated logic)
  const fetchCohorts = async (activeOnly = false) => {
    try {
      const url = activeOnly
        ? `${BASE_URL}/api/applications/cohorts/active`
        : `${BASE_URL}/api/applications/cohorts`;
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setCohorts(activeOnly ? [data.data] : data.data);
    } catch (err) {
      setError("Failed to fetch cohorts");
    } finally {
      setLoadingCohorts(false);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/applications/apply`);
      const data = await res.json();
      if (data.success) setApplications(data.data || []);
    } catch (err) {
      toast.error("Error fetching applications");
    } finally {
      setLoadingApps(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const res = await fetch(`${BASE_URL}/api/applications/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setApplications((prev) =>
          prev.map((app) => (app._id === id ? { ...app, status } : app)),
        );
        toast.success(`Applicant ${status}`);
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleDeleteApplicant = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/applications/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setApplications((prev) => prev.filter((app) => app._id !== id));
        toast.success("Applicant removed");
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const trackMetrics = applications.reduce((acc, app) => {
    acc[app.track] = (acc[app.track] || 0) + 1;
    return acc;
  }, {});

  const trackList = Object.entries(trackMetrics).map(([name, count]) => ({
    name,
    count,
    percentage:
      applications.length > 0 ? (count / applications.length) * 100 : 0,
  }));
  return (
    <AdminLayout>
      <div className="space-y-8 pb-10">
        {/* --- Welcome Header --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Overview
            </h1>
            <p className="text-gray-500 font-medium">
              Monitoring platform activity and intake metrics.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-gray-100 shadow-sm">
            <Button
              variant={activeTab === "all" ? "default" : "ghost"}
              size="sm"
              onClick={() => {
                fetchCohorts(false);
                setActiveTab("all");
              }}
              className="rounded-xl font-bold"
            >
              {" "}
              All Cohorts{" "}
            </Button>
            <Button
              variant={activeTab === "active" ? "default" : "ghost"}
              size="sm"
              onClick={() => {
                fetchCohorts(true);
                setActiveTab("active");
              }}
              className="rounded-xl font-bold"
            >
              {" "}
              Active{" "}
            </Button>
          </div>
        </div>

        {/* --- Stats Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 border border-gray-200 rounded-2xl overflow-hidden shadow-sm mb-8">
          {[
            {
              label: "Total Applications",
              value: applications.length,
              icon: Users,
              color: "text-blue-600",
              bg: "bg-blue-50",
            },
            {
              label: "Active Cohorts",
              value: cohorts.filter((c) => c.isActive).length,
              icon: Layers,
              color: "text-indigo-600",
              bg: "bg-indigo-50",
            },
            {
              label: "Pending Review",
              value: applications.filter((a) => a.status === "Pending").length,
              icon: Clock,
              color: "text-amber-600",
              bg: "bg-amber-50",
            },
            {
              label: "Approved Users",
              value: applications.filter((a) => a.status === "Approved").length,
              icon: CheckCircle,
              color: "text-emerald-600",
              bg: "bg-emerald-50",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white p-6 hover:bg-gray-50/80 transition-all duration-300 group"
            >
              <div className="flex items-center gap-2 mb-4">
                {/* Dynamic Icon Rendering */}
                <div
                  className={`p-2 rounded-lg ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}
                >
                  <stat.icon className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                  {stat.label}
                </span>
              </div>

              <div className="flex items-baseline justify-between">
                <h3 className="text-3xl font-bold tracking-tight text-gray-900">
                  {stat.value.toLocaleString()}
                </h3>

                {/* Subtle status indicator */}
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                      stat.label.includes("Pending")
                        ? "bg-amber-400"
                        : "bg-emerald-400"
                    }`}
                  />
                  <span className="text-[10px] font-medium text-gray-400">
                    Live
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- Main Content Layout --- */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Applications Table (Large) */}
          <div className="xl:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                Recent Applications{" "}
                <Badge variant="secondary" className="rounded-lg">
                  {applications.length}
                </Badge>
              </h2>
            </div>

            <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-100">
                      <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase">
                        Applicant
                      </th>
                      <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase">
                        Track
                      </th>
                      <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {loadingApps ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="p-10 text-center animate-pulse text-gray-400"
                        >
                          Loading Applications...
                        </td>
                      </tr>
                    ) : (
                      applications.map((app) => (
                        <tr
                          key={app._id}
                          className="hover:bg-gray-50/50 transition-colors group"
                        >
                          <td className="px-6 py-4">
                            <p className="font-bold text-gray-900 text-sm">
                              {app.fname} {app.lname}
                            </p>
                            <p className="text-xs text-gray-400">{app.email}</p>
                          </td>
                          <td className="px-6 py-4">
                            <Badge
                              variant="outline"
                              className="border-gray-200 text-gray-600 font-medium"
                            >
                              {app.track}
                            </Badge>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                app.status === "Approved"
                                  ? "bg-emerald-50 text-emerald-600"
                                  : app.status === "Rejected"
                                    ? "bg-red-50 text-red-600"
                                    : "bg-amber-50 text-amber-600"
                              }`}
                            >
                              {app.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="end"
                                className="rounded-2xl border-none! bg-white! w-48 p-2"
                              >
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(app._id, "Approved")
                                  }
                                  className="text-emerald-600 font-bold rounded-xl pointer-cursor"
                                >
                                  Approve Applicant
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleStatusChange(app._id, "Rejected")
                                  }
                                  className="text-red-600 font-bold rounded-xl"
                                >
                                  Reject Applicant
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedApplicant(app);
                                    setOpenDialog(true);
                                  }}
                                  className="text-gray-500 rounded-xl"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                                  Record
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Cohorts Sidebar (Small) */}
          <div className="space-y-4">
            {/* --- Track Momentum Sidebar Section --- */}
            <div className="space-y-4 mb-8">
              <h2 className="text-xl font-bold text-gray-900">
                Track Momentum
              </h2>
              <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
                <CardContent className="p-6 space-y-6">
                  {trackList
                    .sort((a, b) => b.count - a.count)
                    .map((track, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-sm font-bold text-gray-900">
                              {track.name}
                            </p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                              {track.count} Applicants
                            </p>
                          </div>
                          <span className="text-sm font-black text-indigo-600">
                            {Math.round(track.percentage)}%
                          </span>
                        </div>
                        {/* Progress Bar Container */}
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 rounded-full transition-all duration-1000"
                            style={{ width: `${track.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  {trackList.length === 0 && (
                    <p className="text-center text-gray-400 text-sm py-4">
                      No data available
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            <h2 className="text-xl font-bold text-gray-900">Cohorts Summary</h2>
            <div className="space-y-3">
              {cohorts.map((cohort) => (
                <Card
                  key={cohort._id}
                  className="border-none shadow-sm rounded-3xl overflow-hidden hover:ring-2 ring-indigo-500/20 transition-all"
                >
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div className="w-10 h-10 bg-indigo-50 rounded-2xl flex items-center justify-center">
                        <Layers className="w-5 h-5 text-indigo-600" />
                      </div>
                      <Badge
                        className={
                          cohort.isActive
                            ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-50 border-none"
                            : "bg-gray-100 text-gray-400 hover:bg-gray-100 border-none"
                        }
                      >
                        {cohort.isActive ? "Active" : "Closed"}
                      </Badge>
                    </div>
                    <h4 className="font-black text-gray-900 truncate">
                      {cohort.name}
                    </h4>
                    <div className="flex items-center gap-4 mt-4 text-[11px] font-bold text-gray-400 uppercase tracking-tighter">
                      <div>
                        <p>Starts</p>
                        <p className="text-gray-600">
                          {new Date(cohort.startDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="h-6 w-px bg-gray-100" />
                      <div>
                        <p>Capacity</p>
                        <p className="text-gray-600">
                          {cohort.maxCapacity || "∞"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- Delete Confirmation Dialog --- */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[400px] rounded-[2rem] border-none shadow-2xl p-8">
          <DialogHeader className="items-center text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <Trash2 className="w-8 h-8 text-red-500" />
            </div>
            <DialogTitle className="text-2xl font-black">
              Confirm Deletion
            </DialogTitle>
          </DialogHeader>
          <div className="py-4 text-center text-gray-500 font-medium">
            Are you sure you want to remove{" "}
            <span className="text-gray-900 font-bold">
              {selectedApplicant?.fname}'s
            </span>{" "}
            application from the database?
          </div>
          <DialogFooter className="sm:justify-center gap-3">
            <Button
              variant="ghost"
              className="rounded-xl flex-1 border border-gray-100"
              onClick={() => setOpenDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="rounded-xl flex-1 bg-red-500 hover:bg-red-600 shadow-lg shadow-red-100"
              onClick={() => {
                handleDeleteApplicant(selectedApplicant._id);
                setOpenDialog(false);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
