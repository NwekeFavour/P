import React, { useEffect, useState } from "react";
import AdminLayout from "./layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"; 
import { toast } from "sonner";
import { User2Icon } from "lucide-react";

export default function AdminDashboard() {
  const [cohorts, setCohorts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState([]);
  const [loadingCohorts, setLoadingCohorts] = useState(true);
  const [loadingApps, setLoadingApps] = useState(true);
  const [active, setActive] = useState(false)
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("adminToken");
  const [role, setRole] = useState("");
  const [user, setUser] = useState("");
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
        setLoading(true)
        const data = await res.json();
        setRole(data.data.role);
        setUser(data.data.fname + " " + data.data.lname);
      } catch (err) {
        console.error("Failed to fetch admin:", err);
      }finally{
        setLoading(true)
      }
    };
    fetchAdmin();
  }, [token]);
  const handleDeleteApplicant = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/applications/${id}`, { 
        method: "DELETE",   
        headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${localStorage.getItem("adminToken")}` },
      });
      const data = await res.json();
      if (res.ok) {
        toast(data.message || "Status updated successfully.");
        setApplications((prev) => prev.filter((app) => app._id !== id));
      } else {
        setError(data.message || "Failed to delete applicant.");
      }
    } catch (error) {
      console.error(error);
    }
  }
  // Fetch all cohorts

    const confirmDelete = (applicant) => {
    setSelectedApplicant(applicant);
    setOpenDialog(true);
  };
  const fetchCohorts = async (activeOnly = false) => {
    try {
      const url = activeOnly
        ? `${BASE_URL}/api/applications/cohorts/active`
        : `${BASE_URL}/api/applications/cohorts`;
      const res = await fetch(url, {
        headers: {"Authorization" : `Bearer ${localStorage.getItem("adminToken")}` }
      });
      const data = await res.json();
      if (res.ok){ 
        setActive(activeOnly)
        setCohorts(activeOnly ? [data.data] : data.data);
      }
      else {
        setTimeout(() => {
          setError("")
        }, 5000)
        setError(data.message)};
    } catch (error) {
      console.log(error)
      console.log(error?.message)
      setError(error.message || "Failed to fetch cohorts");
    } finally {
      setLoadingCohorts(false);
    }
  };

  // Fetch all applications
  const fetchApplications = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/applications/apply`);
      const data = await res.json();
      if (data.success && data.data) {
        console.log(data.data)
        setApplications(data.data || [])
      } else {console.error(data.message);}
    } catch (error) {
      setError("Error fetching applications." || error)
      console.error(error);
      toast(error.message || "Error fetching applications.");
    } finally {
      setLoadingApps(false);
    }
  };

  useEffect(() => {
    fetchCohorts();
    fetchApplications();
  }, []);

  // Delete applicant
    const onDeleteConfirmed = () => {
    if (selectedApplicant) {
      handleDeleteApplicant(selectedApplicant._id);
      setSelectedApplicant(null);
      setOpenDialog(false);
    }
  };

  // Update applicant status
  const handleStatusChange = async (id, status) => {
    try {
      const res = await fetch(`${BASE_URL}/api/applications/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" , "Authorization" : `Bearer ${localStorage.getItem("adminToken")}` },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (res.ok) {
        setApplications((prev) =>
          prev.map((app) => (app._id === id ? { ...app, status } : app))
        );
        toast(data.message || "Status updated successfully.");
      } else {
        setError(data.message || "Failed to update status.");
      }
    } catch (error) {
      console.error(error);
    } finally{
      setTimeout(() => {
        setError("")
      }, 5000)
    }
  };

  // Mobile-friendly row renderer
  const renderMobileRow = (data, fields) => (
    <div className="bg-white rounded-lg shadow p-4 mb-4 space-y-2" > 
      {fields.map((field, index) => (
        <div key={`${field.key}-${index}`} className="flex justify-between">
          <span className="text-gray-500 font-medium">{field.label}</span>
          <span className="text-gray-800">{field.value ?? data[field.key] ?? "-"}</span>
        </div>
      ))}
    </div>
  );

  return (
    <AdminLayout>
      <div className=" sm:p-6 bg-gray-50 min-h-screen space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Admin Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">

            {/* Mobile Dropdown Trigger */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="sm:hidden w-fit border rounded-full p-2">
                  <User2Icon className="w-6 h-5" />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="sm:hidden w-48">
                <DropdownMenuLabel className="font-semibold">Account Info</DropdownMenuLabel>

                <DropdownMenuItem>
                  <span className="font-medium mr-1 capitalize">Role:</span> {role}
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <span className="font-medium mr-1 capitalize">User:</span> {user}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Desktop Info */}  
            {loading ? (
              <div className="hidden sm:flex items-center">
                <div>
                  <User2Icon className="w-6 h-5" />
                </div>
                <div className="ml-2">
                  <p className="font-semibold text-sm text-gray-800 capitalize">{role}</p>
                  <p className="text-xs text-gray-500 capitalize">{user}</p>
                </div>
              </div>
            ) : (
              <div className="hidden sm:block animate-pulse bg-gray-200 rounded-md w-24 h-6"></div>
            )}

          </div>       
        </div>

        {/* Filter Button for Active Cohorts */}
        <div className="flex gap-2 mb-4">
          <Button
            className={`${!active ? "bg-black text-white" : "bg-white text-black"} hover:text-white`}
            onClick={() => fetchCohorts(false)}
          >
            All Cohorts
          </Button>
          <Button
            className={`${active ? "bg-black text-white" : "bg-white text-black"} hover:text-white`}
            onClick={() => fetchCohorts(true)}
          >
            Active Cohorts
          </Button>

        </div>

        {/* Cohorts Card */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )  
        }
        <Card className="shadow-none w-full max-w-[330px] sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto lg:mx-0 border-none rounded-xl bg-transparent overflow-x-auto">
          <CardHeader className="bg-gray-100 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">Cohorts</h2>
          </CardHeader>
          <CardContent className="p-0">
            {/* Desktop Table */}
            <div className="block overflow-x-auto">
              <table className="w-full text-left divide-y divide-gray-200 min-w-[600px]">
                <thead className="bg-gray-50">
                  <tr>
                    {["Name", "Start Date", "Applications Open", "Capacity"].map(
                      (header) => (
                        <th
                          key={header}
                          className="px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {loadingCohorts ? (
                    <tr>
                      <td colSpan={5} className="text-center py-6 text-gray-400">
                        Loading...
                      </td>
                    </tr>
                  ) : cohorts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-6 text-gray-400">
                        No cohorts found
                      </td>
                    </tr>
                  ) : (
                    cohorts.map((cohort) => (
                      <tr key={cohort._id} className="hover:bg-gray-50 transition-all">
                        <td className="px-6 py-3 text-gray-800">{cohort.name}</td>
                        <td className="px-6 py-3 text-gray-600">
                          {new Date(cohort.startDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-3 text-gray-600">
                          {cohort.isActive ? "Yes" : "No"}
                        </td>
                        <td className="px-6 py-3 text-gray-600">
                          {cohort.maxCapacity || "Unlimited"}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Applications Card */}
        <Card className="shadow-none w-full max-w-[330px] mx-auto md:max-w-2xl sm:max-w-xl lg:max-w-4xl lg:mx-0 border-none rounded-xl bg-transparent overflow-x-auto">
          <CardHeader className="bg-gray-100 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">Applications</h2>
          </CardHeader>
          <CardContent className="p-0">
            {/* Desktop Table */}
            <div className="block overflow-x-auto">
              <table className="w-full text-left divide-y divide-gray-200 min-w-[700px]">
                <thead className="bg-gray-50">
                  <tr>
                    {["Applicant", "Email", "Cohort", "Track", "Status", "Reviewed At", "Actions"].map(
                      (header) => (
                        <th
                          key={header}
                          className="px-6 py-3 text-sm font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {loadingApps ? (
                    <tr>
                      <td colSpan={7} className="text-center py-6 text-gray-400">
                        Loading...
                      </td>
                    </tr>
                  ) : applications.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-6 text-gray-400">
                        No applications found
                      </td>
                    </tr>
                  ) : (
                    applications.map((app) => (
                      <tr key={app._id} className="hover:bg-gray-50 transition-all">
                        <td className="px-6 py-3 text-gray-800">
                          {app.fname} {app.lname}
                        </td>
                        <td className="px-6 py-3 text-gray-600">{app.email}</td>
                        <td className="px-6 py-3 text-gray-600">{app.cohort?.name}</td>
                        <td className="px-6 py-3 text-gray-600">{app.track}</td>
                        <td className="px-6 py-3 text-gray-600">
                          <select
                            value={app.status}
                            onChange={(e) => handleStatusChange(app._id, e.target.value)}
                            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="px-6 py-3 text-gray-600">
                          {app.reviewedAt ? new Date(app.reviewedAt).toLocaleString() : "-"}
                        </td>
                        <td className="px-6 py-3 flex gap-2">
                           <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => confirmDelete(app)}
                            >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </CardContent>
        </Card>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4 text-gray-700">
            Are you sure you want to delete <strong>{selectedApplicant?.fname} {selectedApplicant?.lname}</strong>?
          </div>
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button variant="destructive" onClick={onDeleteConfirmed}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
