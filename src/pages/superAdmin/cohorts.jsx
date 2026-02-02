import React, { useState, useEffect } from "react";
import AdminLayout from "./layout";
import { 
  Calendar, Layers, Plus, Trash2, Clock, Globe, 
  ChevronRight, AlertCircle, CheckCircle2, Search, X 
} from "lucide-react";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // Assuming you use sonner for sleek notifications

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function Cohorts() {
  const [cohorts, setCohorts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCohort, setSelectedCohort] = useState(null);
  
  const [form, setForm] = useState({
    name: "",
    startDate: "",
    applicationDeadline: "",
    availableTracks: "",
  });

  const fetchCohorts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/applications/cohorts`);
      const data = await res.json();
      setCohorts(data.data || []);
    } catch (err) {
      console.error("Error fetching cohorts:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCohorts(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/applications/cohorts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({
          ...form,
          availableTracks: form.availableTracks.split(",").map((t) => t.trim()),
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Cohort launched successfully");
        setIsCreateModalOpen(false);
        setForm({ name: "", startDate: "", applicationDeadline: "", availableTracks: "" });
        fetchCohorts();
      }
    } catch (err) {
      toast.error("Failed to create cohort");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/applications/cohorts/${selectedCohort}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
      });
      if (res.ok) {
        toast.success("Cohort removed");
        fetchCohorts();
      }
    } finally {
      setIsDeleteModalOpen(false);
      setSelectedCohort(null);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto space-y-8 pb-20">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Cohorts</h2>
            <p className="text-gray-500 text-sm mt-1 font-medium">Manage and monitor student intake cycles.</p>
          </div>
          
          <Button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-gray-900 hover:bg-gray-800 text-white rounded-md px-6 py-3 h-auto flex gap-2 shadow-xl shadow-gray-200 transition-transform active:scale-95"
          >
            <Plus className="w-5 h-5" />
            <span className="font-bold">New Cohort</span>
          </Button>
        </div>

        {/* --- Main Content Grid --- */}
        {loading && cohorts.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 rounded-[2rem] bg-gray-50 animate-pulse border border-gray-100" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
            {cohorts.map((cohort) => (
              <div 
                key={cohort._id}
                className="group relative bg-white border border-gray-100 rounded-[2rem] p-8 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 cursor-default"
              >
                {/* Status Badge */}
                <div className="flex justify-between items-start mb-6">
                  <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                    cohort.isActive 
                      ? "bg-emerald-50 border-emerald-100 text-emerald-600" 
                      : "bg-gray-50 border-gray-100 text-gray-400"
                  }`}>
                    {cohort.isActive ? "● Active" : "Closed"}
                  </div>
                  
                  <button 
                    onClick={() => { setSelectedCohort(cohort._id); setIsDeleteModalOpen(true); }}
                    className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {cohort.name}
                </h3>
                
                {/* Tracks Visualization */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {cohort.availableTracks?.slice(0, 3).map((track, i) => (
                    <span key={i} className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">
                      {track.toUpperCase()}
                    </span>
                  ))}
                  {cohort.availableTracks?.length > 3 && (
                    <span className="text-[10px] font-bold text-gray-400">+{cohort.availableTracks.length - 3}</span>
                  )}
                </div>

                {/* Dates Section */}
                <div className="space-y-3 pt-6 border-t border-gray-50">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Start Date</p>
                      <p className="font-bold text-gray-700">{new Date(cohort.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Deadline</p>
                      <p className="font-bold text-gray-700">{new Date(cohort.applicationDeadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --- Create Cohort Modal --- */}
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] p-10 border-none shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black">Launch Cohort</DialogTitle>
              <DialogDescription className="text-gray-500 font-medium">
                Set up a new student intake cycle.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleCreate} className="space-y-6 mt-4">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase text-gray-400 ml-1">Cohort Name</label>
                  <input 
                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-gray-900 transition-all outline-none"
                    placeholder="e.g. Winter 2026 Alpha"
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase text-gray-400 ml-1">Start Date</label>
                    <input 
                      type="date"
                      className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm outline-none"
                      value={form.startDate}
                      onChange={(e) => setForm({...form, startDate: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-black uppercase text-gray-400 ml-1">Deadline</label>
                    <input 
                      type="date"
                      className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm outline-none"
                      value={form.applicationDeadline}
                      onChange={(e) => setForm({...form, applicationDeadline: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-black uppercase text-gray-400 ml-1">Available Tracks</label>
                  <textarea 
                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm min-h-[100px] outline-none"
                    placeholder="Frontend, Backend, Product Design..."
                    value={form.availableTracks}
                    onChange={(e) => setForm({...form, availableTracks: e.target.value})}
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full py-7 rounded-2xl bg-gray-900 text-white font-bold text-lg hover:bg-gray-800 transition-all"
                disabled={loading}
              >
                {loading ? "Processing..." : "Launch Cohort"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* --- Delete Confirmation --- */}
        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogContent className="sm:max-w-[400px] rounded-3xl border-none p-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <DialogTitle className="text-xl font-bold">Delete Cohort?</DialogTitle>
              <DialogDescription className="mt-2 text-gray-500">
                This will archive the cohort. Applicants will no longer be able to apply. This cannot be undone.
              </DialogDescription>
            </div>
            <DialogFooter className="flex gap-3 mt-6">
              <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)} className="flex-1 rounded-xl">Cancel</Button>
              <Button onClick={handleDelete} className="flex-1 bg-red-500 hover:bg-red-600 rounded-xl">Delete Forever</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>
    </AdminLayout>
  );
}