import React, { useState, useEffect } from "react";
import AdminLayout from "./layout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function Cohorts() {
  const [cohorts, setCohorts] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [selectedCohort, setSelectedCohort] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    startDate: "",
    applicationDeadline: "",
    availableTracks: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch cohorts
  const fetchCohorts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/applications/cohorts`);
      const data = await res.json();
      setCohorts(data.data || []);
    } catch (err) {
      console.error("Error fetching cohorts:", err);
    }
  };

  useEffect(() => {
    fetchCohorts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const { name, startDate, applicationDeadline, availableTracks } = form;

    if (!name || !startDate || !applicationDeadline) {
      setError("Please fill in all required fields.");
      setTimeout(() => setError(""), 5000);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/applications/cohorts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({
          name,
          startDate,
          applicationDeadline,
          availableTracks: availableTracks
            ? availableTracks.split(",").map((t) => t.trim())
            : [],
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("Cohort created successfully!");
        setForm({ name: "", startDate: "", applicationDeadline: "", availableTracks: "" });
        fetchCohorts();
      } else {
        setError(data.message || "Error creating cohort");
      }
    } catch (err) {
      console.error(err);
      setError("Server error creating cohort");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setMessage(""); 
        setError("");
      }, 5000);
    }
  };

  const handleDelete = async () => {
    if (!selectedCohort) return;
    try {
      const res = await fetch(`${BASE_URL}/api/applications/cohorts/${selectedCohort}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Cohort deleted successfully!");
        fetchCohorts();
      } else {
        setError(data.message || "Error deleting cohort");
      }
    } catch (err) {
      console.error(err);
      setError("Server error deleting cohort");
    } finally {
      setDialogOpen(false);
      setSelectedCohort(null);
      setTimeout(() => {
        setMessage("");
        setError("");
      }, 5000);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 min-h-screen space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Cohort Management</h2>

        {/* Create Form */}
        <form
          onSubmit={handleCreate}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-[100%] gap-4 p-4 sm:p-6 bg-white rounded-xl shadow-md"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Cohort Name"
              required
              className="mt-1 w-full border-gray-300 rounded-lg shadow-sm px-3 py-2 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
              className="mt-1 w-full border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Application Deadline</label>
            <input
              type="date"
              name="applicationDeadline"
              value={form.applicationDeadline}
              onChange={handleChange}
              required
              className="mt-1 w-full border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <label className="block text-sm font-medium text-gray-700">Available Tracks</label>
            <input
              type="text"
              name="availableTracks"
              value={form.availableTracks}
              onChange={handleChange}
              placeholder="Tracks (comma-separated)"
              className="mt-1 w-full border-gray-300 rounded-lg px-3 py-2"
            />
          </div>

          {message && <p className="col-span-full text-blue-600">{message}</p>}
          {error && <p className="col-span-full text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="col-span-full mt-2 px-6 py-3 rounded-lg bg-neutral-700 text-white hover:bg-neutral-900 transition"
          >
            {loading ? "Creating..." : "Create Cohort"}
          </button>
        </form>

        {/* Cohorts Table */}
        <ScrollArea className="w-full rounded-xl shadow-md bg-white/80 backdrop-blur-sm">
          {/* Desktop Table */}
          <Card className="bg-white shadow-md rounded-xl overflow-hidden hidden sm:block">
            <CardContent className="p-4">
              <ScrollArea className="w-full rounded-lg shadow-sm">
                <Table className="min-w-[600px] table-auto border-collapse">
                  <TableHeader className="bg-gray-100/50 backdrop-blur-sm">
                    <TableRow>
                      <TableHead className="px-4 py-3 text-left font-medium">Cohort</TableHead>
                      <TableHead className="px-4 py-3 text-left font-medium">Applications Open</TableHead>
                      <TableHead className="px-4 py-3 text-left font-medium">Start Date</TableHead>
                      <TableHead className="px-4 py-3 text-left font-medium">Action</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                          Loading...
                        </TableCell>
                      </TableRow>
                    ) : cohorts.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6 text-gray-500">
                          No cohorts found
                        </TableCell>
                      </TableRow>
                    ) : (
                      cohorts.map((c, i) => (
                        <TableRow key={i} className="hover:bg-gray-50 transition-colors rounded-lg">
                          <TableCell className="px-4 py-3">{c.name}</TableCell>
                          <TableCell className="px-4 py-3">{c.isActive ? "Yes" : "No"}</TableCell>
                          <TableCell className="px-4 py-3">{c.startDate ? new Date(c.startDate).toLocaleDateString() : "TBA"}</TableCell>
                          <TableCell className="px-4 py-3"><button
                    onClick={() => {
                      setSelectedCohort(c._id);
                      setDialogOpen(true);
                    }}
                    className="mt-3 w-full py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                  >
                    Delete
                  </button></TableCell>

                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Mobile Stacked Cards */}
          <div className="md:hidden flex flex-col gap-4">
            {cohorts.length === 0 ? (
              <p className="text-center py-6 text-gray-500">No cohorts created yet</p>
            ) : (
              cohorts.map((c) => (
                <div
                  key={c._id}
                  className="bg-white/70 backdrop-blur-md rounded-xl p-7 shadow-lg hover:shadow-2xl transition-all border border-gray-200"
                >
                  <p className="text-lg font-semibold text-gray-900 mb-2">{c.name}</p>
                  <div className="grid grid-cols-2 gap-2 text-gray-600 text-sm">
                    <p>
                      <span className="font-medium">Start:</span>{" "}
                      {c.startDate ? new Date(c.startDate).toLocaleDateString() : "TBA"}
                    </p>
                    <p>
                      <span className="font-medium">Deadline:</span>{" "}
                      {c.applicationDeadline ? new Date(c.applicationDeadline).toLocaleDateString() : "TBA"}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCohort(c._id);
                      setDialogOpen(true);
                    }}
                    className="mt-3 w-full py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Delete Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <p>Are you sure you want to delete this cohort? This action cannot be undone.</p>
            <div className="flex justify-end mt-4 gap-3">
              <button
                onClick={() => setDialogOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-800"
              >
                Delete
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
