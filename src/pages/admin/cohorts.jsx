import React, { useState, useEffect } from "react";
import AdminLayout from "./layout";
import {
  Settings2,
  Calendar,
  Users,
  X,
  AlertCircle,
  ChevronRight,
  Trash2,
  ExternalLink,
  CheckCircle2,
  History,
  Edit3,
  RefreshCcw
} from "lucide-react";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { toast } from "sonner";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function CohortManagement() {
  const [cohorts, setCohorts] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [activeTab, setActiveTab] = useState("students");
  const [submissions, setSubmissions] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState(null);
  const [students, setStudents] = useState([]);
  const [fetchingStudents, setFetchingStudents] = useState(false);
  const [isDeleteSheetOpen, setIsDeleteSheetOpen] = useState(false);
  const [submissionToManage, setSubmissionToManage] = useState(null);
  const [activeLogUser, setActiveLogUser] = useState(null);
  const [reviewFilter, setReviewFilter] = useState("all");
const [selectedSub, setSelectedSub] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
  const openDeleteManager = (sub) => {
    setSubmissionToManage(sub);
    setIsDeleteSheetOpen(true);
  };

  const openEditModal = (submission) => {
  setSelectedSub(submission);
  setIsModalOpen(true);
};

  const handleSheetClose = (open) => {
    setIsDeleteSheetOpen(open);
    if (!open) setConfirmDelete(false);
  };

  const fetchSubmissions = async (cohortId) => {
    if (!cohortId) {
    console.warn("Cohort not selected, fetching all submissions instead...");
    // optional: you could fetch all submissions for admin, or skip fetch
    return;
  }
    try {
      const res = await fetch(
        `${BASE_URL}/api/applications/cohorts/${cohortId}/submissions`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        },
      );
      const data = await res.json();
      if (data.success) setSubmissions(data.data);
    } catch (err) {
      toast.error("Failed to load submissions");
    }
  };

  const handleCohortClick = async (cohort) => {
    setSelectedCohort(cohort);
    setFetchingStudents(true);
    try {
      const res = await fetch(
        `${BASE_URL}/api/applications/${cohort._id}/incubees`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        },
      );
      const data = await res.json();
      if (data.success) setStudents(data.data);
    } catch (err) {
      toast.error("Connection error");
    } finally {
      setFetchingStudents(false);
    }
  };

  const fetchCohorts = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/applications/cohorts`);
      const data = await res.json();
      setCohorts(data.data || []);
    } catch (err) {
      toast.error("Failed to sync cohorts");
    }
  };

  useEffect(() => {
    fetchCohorts();
  }, []);

  const handleDeleteSubmission = async (submissionId) => {
    try {
      const res = await fetch(
        `${BASE_URL}/api/applications/submissions/${submissionId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        },
      );

      const data = await res.json();
      if (data.success) {
        toast.success("Submission deleted");
        fetchSubmissions(selectedCohort._id);
        handleCohortClick(selectedCohort);
      }
    } catch (err) {
      toast.error("Failed to delete submission");
    }
  };

  const uniqueStudents = Array.from(
    new Map(students.map((s) => [s.email, s])).values(),
  );

  const canReviewApplicant = (app) =>
    app?.package === "Premium" && app?.status === "Approved";

  const filteredSubmissions = submissions.filter((sub) => {
    if (activeLogUser && sub.application?._id !== activeLogUser._id) {
      return false;
    }

    const app = sub.application;

    if (reviewFilter === "premium") {
      return app?.package === "Premium";
    }

    if (reviewFilter === "approved") {
      return app?.status === "Approved";
    }

    if (reviewFilter === "reviewable") {
      return canReviewApplicant(app);
    }

    return true; // all
  });

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* --- Header --- */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Cohort Registry
            </h1>
            <p className="text-sm sm:text-base text-slate-500 font-medium">
              Manage admission windows and track progress.
            </p>
          </div>
          <div className="h-10 w-10 sm:h-12 sm:w-12 bg-slate-100 rounded-xl sm:rounded-2xl flex items-center justify-center">
            <Settings2 className="w-5 h-5 sm:w-6 sm:h-6 text-slate-600" />
          </div>
        </div>

        {!selectedCohort ? (
          /* --- Responsive Cohort Grid --- */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {cohorts.map((cohort) => (
              <div
                key={cohort._id}
                onClick={() => handleCohortClick(cohort)}
                className="group bg-white border border-slate-100 rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-8 hover:shadow-xl transition-all cursor-pointer relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      cohort.isActive
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
                    {cohort.isActive ? "Accepting Apps" : "Paused"}
                  </div>
                  <ChevronRight className="w-5 h-5 text-indigo-600 md:opacity-0 group-hover:opacity-100 transition-all" />
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-4">
                  {cohort.name}
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase">
                      Deadline
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                      {new Date(
                        cohort.applicationDeadline,
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase">
                      Capacity
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-indigo-500" />
                      {cohort.maxCapacity || "∞"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* --- DETAIL VIEW --- */
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
            {/* Header & Tab Switcher */}
            <div className="flex flex-col gap-6 bg-white p-4 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-slate-100">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSelectedCohort(null);
                    setActiveLogUser(null);
                  }}
                  className="group text-slate-500 hover:text-indigo-600 font-bold -ml-2"
                >
                  <X className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" />
                  Close Details
                </Button>

                <div className="flex w-full sm:w-auto bg-slate-100 p-1 rounded-xl">
                  <button
                    onClick={() => setActiveTab("students")}
                    className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                      activeTab === "students"
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-slate-400"
                    }`}
                  >
                    Incu-bees ({uniqueStudents.length})
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("submissions");
                      setActiveLogUser(null);
                      fetchSubmissions(selectedCohort._id);
                    }}
                    className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                      activeTab === "submissions"
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-slate-400"
                    }`}
                  >
                    Submissions
                  </button>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="bg-white border border-slate-100 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden">
              {activeTab === "students" ? (
                <>
                  {/* MOBILE VIEW: List Cards (Hidden on sm+) */}
                  <div className="block sm:hidden divide-y divide-slate-50">
                    {uniqueStudents.map((student) => (
                      <div
                        key={student._id}
                        onClick={() => {
                          setActiveLogUser(student);
                          setActiveTab("submissions");
                          fetchSubmissions(selectedCohort._id);
                        }}
                        className="p-4 active:bg-slate-50 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 shrink-0 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                            {student.fname[0]}
                            {student.lname[0]}
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-900">
                              {student.fname} {student.lname}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-slate-400 font-bold uppercase">
                                {student.track}
                              </span>
                              <span className="text-[10px] text-indigo-500 font-black">
                                {student.progress}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-300" />
                      </div>
                    ))}
                  </div>

                  {/* DESKTOP VIEW: Table (Hidden on < sm) */}
                  <div className="hidden sm:block overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-50/50 border-b border-slate-100">
                        <tr>
                          <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Student
                          </th>
                          <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            Progress
                          </th>
                          <th className="px-8 py-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {uniqueStudents.map((student) => (
                          <tr
                            key={student._id}
                            onClick={() => {
                              setActiveLogUser(student);
                              setActiveTab("submissions");
                              fetchSubmissions(selectedCohort._id);
                            }}
                            className="hover:bg-indigo-50/30 transition-all group cursor-pointer border-b border-slate-50 last:border-0"
                          >
                            <td className="px-8 py-5">
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                                  {student.fname[0]}
                                  {student.lname[0]}
                                </div>
                                <div>
                                  <p className="text-sm font-black text-slate-900">
                                    {student.fname} {student.lname}
                                    {student?.package === "Premium" && (
                                      <span className="px-2 py-0.5 rounded-full text-[8px] font-black bg-amber-100 text-amber-700">
                                        PAID
                                      </span>
                                    )}
                                  </p>
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                                    {student.track}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-5">
                              <div className="flex items-center gap-3">
                                <div className="w-32 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-indigo-500"
                                    style={{ width: `${student.progress}%` }}
                                  />
                                </div>
                                <span className="text-[10px] font-black text-slate-400">
                                  {student.progress}%
                                </span>
                              </div>
                            </td>
                            <td className="px-8 py-5 text-right">
                              <ChevronRight className="w-4 h-4 text-indigo-500 inline-block group-hover:translate-x-1 transition-transform" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                /* --- Submissions View --- */
                <div className="overflow-x-auto">
                  {activeLogUser && (
                    <div className="p-4 bg-indigo-50/50 border-b border-indigo-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <History className="w-3.5 h-3.5 text-indigo-600" />
                        <p className="text-xs font-bold text-indigo-900 truncate">
                          Logs for{" "}
                          <span className="font-black">
                            {activeLogUser.fname}
                          </span>
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveLogUser(null)}
                        className="h-7 px-3 text-[9px] font-black bg-white"
                      >
                        CLEAR FILTER
                      </Button>
                    </div>
                  )}
                  {/* For Submissions, horizontal scroll is usually preferred to preserve link integrity */}
                  <div className="bg-white border border-slate-100 rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden">
                    {/* MOBILE VIEW: Card List (Visible on < 640px) */}
                    <div className="block sm:hidden divide-y divide-slate-50">
                      {filteredSubmissions.map((sub) => {
                        const reviewable = canReviewApplicant(sub.application);
                        console.log(sub);
                        return (
                          <div
                            key={sub._id}
                            className="p-4 flex flex-col gap-3"
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <p className="text-sm font-black text-slate-900 leading-tight">
                                    {sub.application?.fname}{" "}
                                    {sub.application?.lname}
                                  </p>

                                  {sub.application?.package !== "Premium" && (
                                    <span className="px-2 py-0.5 rounded-full text-[8px] font-black bg-slate-100 text-slate-500">
                                      FREE
                                    </span>
                                  )}

                                  {sub.application?.package === "Premium" &&
                                    sub.application?.status !== "Approved" && (
                                      <span className="px-2 py-0.5 rounded-full text-[8px] font-black bg-amber-100 text-amber-700">
                                        PAID - NOT APPROVED
                                      </span>
                                    )}

                                  {canReviewApplicant(sub.application) && (
                                    <span className="px-2 py-0.5 rounded-full text-[8px] font-black bg-emerald-100 text-emerald-700">
                                      REVIEWABLE
                                    </span>
                                  )}
                                </div>

                                <p className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest">
                                  {sub.application?.track}
                                </p>
                              </div>
                              <span
                                className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase ${
                                  sub.status === "Pending Review"
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-emerald-100 text-emerald-700"
                                }`}
                              >
                                {sub.status}
                              </span>
                            </div>

                            <div className="flex items-center justify-between mt-1">
                              <a
                                href={sub.projectLink}
                                target="_blank"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg active:scale-95 transition-all"
                              >
                                View Project{" "}
                                <ExternalLink className="w-3 h-3" />
                              </a>

                               <button
                                    onClick={() => openDeleteManager(sub)}
                                    className="p-2 hover:bg-red-50 rounded-lg text-slate-300 hover:text-red-600 transition-all"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                            </div>
                          </div>
                        );
                      })}
                      {filteredSubmissions.length === 0 && (
                        <div className="p-8 text-center text-slate-400 text-xs font-bold">
                          No submissions found.
                        </div>
                      )}
                    </div>

                    {/* DESKTOP VIEW: Table (Visible on >= 640px) */}
                    <div className="hidden sm:block overflow-x-auto">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50/50 border-b border-slate-100">
                          <tr>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              Incu-bee
                            </th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              Project
                            </th>
                            <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                              Status
                            </th>
                            <th className="px-6 py-4 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {filteredSubmissions.map((sub) => (
                            <tr
                              key={sub._id}
                              className="hover:bg-slate-50/30 transition-colors group"
                            >
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <p className="text-sm font-black text-slate-900">
                                    {sub.application?.fname}{" "}
                                    {sub.application?.lname}
                                  </p>

                                  {/* STATUS BADGES */}
                                  {sub.application?.package !== "Premium" ? (
                                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-slate-100 text-slate-500">
                                      FREE
                                    </span>
                                  ) : (
                                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-amber-100 text-amber-700 border border-amber-200 shadow-sm">
                                      PREMIUM
                                    </span>
                                  )}

                                  {sub.application?.package === "Premium" &&
                                    sub.application?.status !== "Approved" && (
                                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black bg-rose-50 text-rose-600 border border-rose-100">
                                        PENDING APPROVAL
                                      </span>
                                    )}
                                </div>

                                <p className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest mt-1">
                                  {sub.application?.track}
                                </p>
                              </td>

                              <td className="px-6 py-4">
                                <a
                                  href={sub.projectLink}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:underline"
                                >
                                  View Link <ExternalLink className="w-3 h-3" />
                                </a>
                              </td>

                              <td className="px-6 py-4">
                                <span
                                  className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                                    sub.status === "Pending Review" ||
                                    sub.status === "Pending"
                                      ? "bg-amber-100 text-amber-700"
                                      : "bg-emerald-100 text-emerald-700"
                                  }`}
                                >
                                  {sub.status}
                                </span>
                              </td>

                              <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  {/* EDIT BUTTON: Only for Premium */}
                                  {(sub.application?.package === "Premium" || sub.application?.track === "UI/UX Design" || sub.application?.track === "Digital Marketing") && (
                                    <button
                                      onClick={() => openEditModal(sub)} // You'll need to define this function
                                      className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-black hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                                    >
                                      <Edit3 className="w-3 h-3" />
                                      REVIEW
                                    </button>
                                  )}

                                  {/* DELETE BUTTON: Visible on hover */}
                                  <button
                                    onClick={() => openDeleteManager(sub)}
                                    className="p-2 opacity-0 group-hover:opacity-100 hover:bg-red-50 rounded-lg text-slate-300 hover:text-red-600 transition-all"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}

                        </tbody>
                      </table>
                    </div>
                  </div>
                  <ReviewSubmissionModal 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)}
      submission={selectedSub}
      onUpdateSuccess={fetchSubmissions} // Assuming this is your data-fetcher
    />
                  {filteredSubmissions.length === 0 && (
                    <div className="py-12 text-center text-slate-400 text-xs font-bold">
                      No submissions found.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      

      {/* --- Responsive Delete Sheet --- */}
      <Sheet open={isDeleteSheetOpen} onOpenChange={handleSheetClose}>
        <SheetContent
          side="bottom"
          className="sm:side-right h-[80vh] sm:h-full sm:max-w-md rounded-t-[2rem] sm:rounded-t-none"
        >
          <SheetHeader className="space-y-4 text-left">
            <div className="h-12 w-12 bg-red-50 rounded-2xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <SheetTitle className="text-2xl font-black">
              Manage Submission
            </SheetTitle>
            <SheetDescription className="font-medium">
              Reviewing work for{" "}
              <span className="text-slate-900 font-bold">
                {submissionToManage?.application?.fname}
              </span>
              .
            </SheetDescription>
          </SheetHeader>

          <div className="mt-8 space-y-6">
            {!confirmDelete ? (
              <div className="space-y-6">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">
                      Project Link
                    </p>
                    <a
                      href={submissionToManage?.projectLink}
                      target="_blank"
                      className="text-sm font-bold text-indigo-600 break-all flex items-center gap-2"
                    >
                      View Link <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase">
                        Auto Score
                      </p>
                      <p className="text-lg font-black">
                        {submissionToManage?.autoScore || 0}%
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase">
                        Track
                      </p>
                      <p className="text-xs font-bold text-slate-700">
                        {submissionToManage?.application?.track}
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full h-12 rounded-xl font-bold text-red-600 border-red-100"
                  onClick={() => setConfirmDelete(true)}
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Delete Submission
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <Button
                  variant="destructive"
                  className="w-full h-14 rounded-xl font-black uppercase tracking-widest"
                  onClick={() => {
                    handleDeleteSubmission(submissionToManage._id);
                    setIsDeleteSheetOpen(false);
                  }}
                >
                  Confirm Permanently Delete
                </Button>
                <Button
                  variant="ghost"
                  className="w-full h-12 font-bold text-slate-400"
                  onClick={() => setConfirmDelete(false)}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </AdminLayout>
  );
}



function ReviewSubmissionModal({ isOpen, onClose, submission, onUpdateSuccess }) {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(submission?.feedback || "");
  const [selectedStatus, setSelectedStatus] = useState(submission?.status || "Pending");

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/submissions/${submission._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({ 
          status: selectedStatus, 
          feedback 
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Submission updated successfully");
        onUpdateSuccess(); // Refresh the list in the parent
        onClose();
      }
    } catch (err) {
      toast.error("Failed to update submission");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] rounded-[2rem] border-none shadow-2xl p-8">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-700 uppercase tracking-widest">
              Premium Review
            </span>
          </div>
          <DialogTitle className="text-2xl font-black text-slate-900">
            Review {submission?.application?.fname}'s Project
          </DialogTitle>
          <DialogDescription className="font-medium text-slate-500">
            Evaluate the submission and provide constructive feedback.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Project Link Preview */}
          <div className="p-4 bg-indigo-50 rounded-2xl flex justify-between items-center border border-indigo-100">
            <div>
              <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Submitted Link</p>
              <p className="text-sm font-bold text-indigo-900 truncate max-w-[250px]">{submission?.projectLink}</p>
            </div>
            <a 
              href={submission?.projectLink} 
              target="_blank" 
              className="p-2 bg-white rounded-xl text-indigo-600 hover:shadow-md transition-all"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Status Selection */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: "Accepted", icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
              { id: "Needs Revision", icon: RefreshCcw, color: "text-amber-600", bg: "bg-amber-50" }
            ].map((status) => (
              <button
                key={status.id}
                onClick={() => setSelectedStatus(status.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                  selectedStatus === status.id 
                  ? "border-indigo-600 bg-indigo-50/50" 
                  : "border-gray-50 bg-gray-50/30 hover:border-gray-200"
                }`}
              >
                <status.icon className={`w-6 h-6 ${status.color}`} />
                <span className="text-xs font-black uppercase tracking-tight">{status.id}</span>
              </button>
            ))}
          </div>

          {/* Feedback Input */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Feedback to Intern</label>
            <Textarea 
              placeholder="Explain what they did well or what needs to be improved..."
              className="min-h-[120px] rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:ring-indigo-500/20 transition-all"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="ghost" onClick={onClose} className="flex-1 rounded-2xl font-bold">Cancel</Button>
          <Button 
            disabled={loading}
            onClick={handleUpdate}
            className="flex-[2] rounded-2xl bg-indigo-600 hover:bg-indigo-700 font-black shadow-lg shadow-indigo-100"
          >
            {loading ? "Saving..." : "Submit Review"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}