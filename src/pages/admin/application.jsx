import React, { useEffect, useState, useMemo } from "react";
import AdminLayout from "./layout";
import {
  Search, MoreHorizontal, Mail, Trash2, ShieldCheck,
  ArrowUpRight, Download, CircleDot, Filter
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function ApplicationsDashboard() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [typeFilter, setTypeFilter] = useState("All Types");

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/applications/apply`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) setApplications(data.data || []);
    } catch (err) {
      toast.error("Error fetching applications");
    } finally {
      setLoading(false);
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

  const filteredApps = useMemo(() => {
    return applications.filter(app => {
      const matchesSearch = 
        app.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        `${app.fname} ${app.lname}`.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All Status" || app.status === statusFilter;
      const isPremium = app.package === "Premium";
      const matchesType = typeFilter === "All Types" || 
                         (typeFilter === "Premium" && isPremium) || 
                         (typeFilter === "Free" && !isPremium);
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [applications, searchQuery, statusFilter, typeFilter]);

  return (
    <AdminLayout>
      <div className="space-y-6 pb-10 px-4 md:px-0">
        {/* --- Header Section --- */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              Intern Applications
            </h1>
            <p className="text-sm md:text-base text-gray-500 font-medium">
              Review and manage incoming requests.
            </p>
          </div>
          <Button className="w-full sm:w-auto rounded-2xl bg-indigo-600 hover:bg-indigo-700 h-11 px-6 shadow-lg shadow-indigo-100 font-bold transition-all">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>

        {/* --- Responsive Filters Bar --- */}
        <Card className="p-4 border-none shadow-sm rounded-[1.5rem] md:rounded-[2rem] bg-white">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search - Full width on mobile, 2/4 on large */}
            <div className="relative flex-grow lg:flex-[2]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input 
                placeholder="Search name or email..." 
                className="pl-11 h-12 rounded-2xl border-gray-100 bg-gray-50/50 focus:bg-white transition-all w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Selects - Side by side on small screens */}
            <div className="grid grid-cols-2 lg:flex lg:flex-row gap-4 flex-grow lg:flex-[1.5]">
              <select 
                className="h-12 bg-gray-50/50 border border-gray-100 rounded-2xl px-3 md:px-4 text-xs md:text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 ring-indigo-500/20 w-full"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option>All Types</option>
                <option>Premium</option>
                <option>Free</option>
              </select>

              <select 
                className="h-12 bg-gray-50/50 border border-gray-100 rounded-2xl px-3 md:px-4 text-xs md:text-sm font-bold text-gray-700 focus:outline-none focus:ring-2 ring-indigo-500/20 w-full"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All Status</option>
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
            </div>
          </div>
        </Card>

        {/* --- Applications Content --- */}
        <Card className="border-none shadow-sm rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-white">
          {/* Mobile View: Cards (Visible only on < 768px) */}
          <div className="block md:hidden divide-y divide-gray-50">
            {loading ? (
               <div className="p-10 text-center animate-pulse text-gray-400 font-bold">Loading...</div>
            ) : filteredApps.map((app) => (
              <div key={app._id} className="p-5 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs">
                      {app.fname[0]}{app.lname[0]}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm flex items-center gap-1">
                        {app.fname} {app.lname}
                        {app.slackUserId && <CircleDot className="w-3 h-3 text-emerald-500" />}
                      </p>
                      <p className="text-[10px] text-gray-400 font-medium truncate max-w-[150px]">{app.email}</p>
                    </div>
                  </div>
                  <MobileActionsDropdown 
                    app={app} 
                    onStatusChange={handleStatusChange} 
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                   <Badge className={app.package === "Premium" ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-gray-50 text-gray-400"}>
                     {app.package === "Premium" ? "PREMIUM" : "FREE"}
                   </Badge>
                   <Badge variant="outline" className="text-gray-500 text-[10px]">{app.track}</Badge>
                   <Badge className={app.status === "Approved" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600 ml-auto"}>
                     {app.status}
                   </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View: Table (Hidden on < 768px) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Intern Info</th>
                  <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Plan</th>
                  <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Course</th>
                  <th className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {loading ? (
                   <tr><td colSpan={5} className="p-20 text-center animate-pulse text-gray-400">Loading Applications...</td></tr>
                ) : filteredApps.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50/50 transition-all group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                          {app.fname[0]}{app.lname[0]}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{app.fname} {app.lname}</p>
                          <p className="text-xs text-gray-400">{app.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      {app.package === "Premium" ? (
                        <Badge className="bg-amber-50 text-amber-600 border-amber-100 font-black text-[10px]">PREMIUM</Badge>
                      ) : (
                        <Badge variant="outline" className="text-gray-400 font-bold text-[10px]">FREE</Badge>
                      )}
                    </td>
                    <td className="px-6 py-5 font-bold text-gray-600">{app.track}</td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase ${
                        app.status === "Approved" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <MobileActionsDropdown 
                        app={app} 
                        onStatusChange={handleStatusChange} 
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}

// Reusable Actions Component
// Reusable Actions Component
function MobileActionsDropdown({ app, onStatusChange }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-gray-100">
          <MoreHorizontal className="w-4 h-4 text-gray-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-2xl bg-white! w-52 p-2 shadow-2xl border-gray-100">
        {/* Approve Action */}
        <DropdownMenuItem 
          onClick={() => onStatusChange(app._id, "Approved")}
          className="text-emerald-600 font-bold rounded-xl cursor-pointer"
        >
          Approve
        </DropdownMenuItem>

        {/* Reject Action */}
        <DropdownMenuItem 
          onClick={() => onStatusChange(app._id, "Rejected")}
          className="text-red-600 font-bold rounded-xl cursor-pointer"
        >
          Reject
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        
        <DropdownMenuItem className="rounded-xl cursor-pointer">
          <Mail className="w-4 h-4 mr-2" /> Email
        </DropdownMenuItem>
        
        <DropdownMenuItem className="text-gray-400 rounded-xl cursor-pointer">
          <Trash2 className="w-4 h-4 mr-2" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}