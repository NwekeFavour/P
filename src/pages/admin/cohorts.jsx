import React, { useState, useEffect } from "react";
import AdminLayout from "./layout";
import { 
  Settings2, Calendar, Users, Edit3, Save, X, 
  AlertCircle, CheckCircle2, ChevronRight, Hash
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function CohortManagement() {
  const [cohorts, setCohorts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCohort, setSelectedCohort] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  
  // Edit Form State
  const [editForm, setEditForm] = useState({
    name: "",
    startDate: "",
    applicationDeadline: "",
    maxCapacity: "",
    availableTracks: ""
  });

  const fetchCohorts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/applications/cohorts`);
      const data = await res.json();
      setCohorts(data.data || []);
    } catch (err) { toast.error("Failed to sync cohorts"); }
  };

  useEffect(() => { fetchCohorts(); }, []);

  // Open Edit Panel
  const handleEditClick = (cohort) => {
    setSelectedCohort(cohort);
    setEditForm({
      name: cohort.name,
      startDate: cohort.startDate ? cohort.startDate.split("T")[0] : "",
      applicationDeadline: cohort.applicationDeadline ? cohort.applicationDeadline.split("T")[0] : "",
      maxCapacity: cohort.maxCapacity || "",
      availableTracks: cohort.availableTracks?.join(", ") || ""
    });
    setIsEditOpen(true);
  };

  // Submit PATCH Request
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    // Frontend Validation (Matching your backend logic)
    if (new Date(editForm.applicationDeadline) <= new Date()) {
      return toast.error("Deadline must be a future date");
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/applications/cohorts/${selectedCohort._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({
          ...editForm,
          availableTracks: editForm.availableTracks.split(",").map(t => t.trim()).filter(t => t !== ""),
          maxCapacity: Number(editForm.maxCapacity)
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Cohort configuration updated");
        setIsEditOpen(false);
        fetchCohorts();
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (err) {
      toast.error("Server connection error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Cohort Registry</h1>
            <p className="text-slate-500 font-medium">Configure admission windows and track availability.</p>
          </div>
          <div className="h-12 w-12 bg-slate-100 rounded-2xl flex items-center justify-center">
            <Settings2 className="w-6 h-6 text-slate-600" />
          </div>
        </div>

        {/* --- Cohort Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cohorts.map((cohort) => (
            <div 
              key={cohort._id} 
              className="group bg-white border border-slate-100 rounded-[2rem] p-8 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                  cohort.isActive ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400"
                }`}>
                  {cohort.isActive ? "Accepting Apps" : "Paused"}
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => handleEditClick(cohort)}
                  className="rounded-xl hover:bg-slate-50 text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  <Edit3 className="w-5 h-5" />
                </Button>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-2">{cohort.name}</h3>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase">Deadline</p>
                  <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                    {new Date(cohort.applicationDeadline).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-400 uppercase">Capacity</p>
                  <p className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-indigo-500" />
                    {cohort.maxCapacity || "Unlimited"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- Edit Slide-over Panel --- */}
        <Sheet open={isEditOpen} onOpenChange={setIsEditOpen}>
          <SheetContent className="w-full sm:max-w-md bg-white border-none shadow-2xl p-0">
            <div className="h-full flex flex-col">
              <SheetHeader className="p-8 bg-slate-50/50 border-b border-slate-100">
                <SheetTitle className="text-2xl font-black text-slate-900">Edit Configuration</SheetTitle>
                <SheetDescription className="font-medium text-slate-500">
                  Update parameters for <span className="text-indigo-600 font-bold">{selectedCohort?.name}</span>
                </SheetDescription>
              </SheetHeader>

              <form onSubmit={handleUpdate} className="flex-1 overflow-y-auto p-8 space-y-6">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase text-slate-400 ml-1">Cohort Name</label>
                  <Input 
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="rounded-2xl border-slate-100 bg-slate-50/50 py-6 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase text-slate-400 ml-1 text-xs">Start Date</label>
                    <Input 
                      type="date"
                      value={editForm.startDate}
                      onChange={(e) => setEditForm({...editForm, startDate: e.target.value})}
                      className="rounded-2xl border-slate-100 bg-slate-50/50 py-6"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-black uppercase text-slate-400 ml-1">Deadline</label>
                    <Input 
                      type="date"
                      value={editForm.applicationDeadline}
                      onChange={(e) => setEditForm({...editForm, applicationDeadline: e.target.value})}
                      className="rounded-2xl border-slate-100 bg-slate-50/50 py-6"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase text-slate-400 ml-1">Max Capacity</label>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input 
                      type="number"
                      value={editForm.maxCapacity}
                      onChange={(e) => setEditForm({...editForm, maxCapacity: e.target.value})}
                      className="rounded-2xl border-slate-100 bg-slate-50/50 py-6 pl-11"
                      placeholder="e.g. 100"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-black uppercase text-slate-400 ml-1">Available Tracks</label>
                  <textarea 
                    value={editForm.availableTracks}
                    onChange={(e) => setEditForm({...editForm, availableTracks: e.target.value})}
                    className="w-full min-h-[120px] rounded-[1.5rem] border border-slate-100 bg-slate-50/50 p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="Frontend, Backend, UI/UX..."
                  />
                </div>
              </form>

              <div className="p-8 border-t border-slate-100 bg-white">
                <Button 
                  onClick={handleUpdate}
                  disabled={loading}
                  className="w-full py-7 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg shadow-xl shadow-indigo-100"
                >
                  {loading ? "Synchronizing..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </AdminLayout>
  );
}