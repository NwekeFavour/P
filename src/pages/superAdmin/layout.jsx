import React, { useEffect, useState } from "react";
import {
  Users,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
  Layers,
  Settings,
  ChevronRight,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Briefcase,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner"; // Assuming you use sonner for notifications

export default function SuperAdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        if (response.data.success) {
          // Extra security check for Super Admin role if needed
          setAdminData(response.data.data);
        }
      } catch (error) {
        console.error("Session invalid:", error);
        localStorage.removeItem("adminToken");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("user");
    setIsLogoutModalOpen(false);
    navigate("/login");
  };

  const navItems = [
    {
      name: "Overview",
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: "/dashboard",
    },
    {
      name: "Manage Users",
      icon: <Users className="w-5 h-5" />,
      path: "/dashboard/users",
    },
    {
      name: "Active Cohorts",
      icon: <Layers className="w-5 h-5" />,
      path: "/dashboard/cohorts",
    },
    {
      name: "Applications",
      icon: <Briefcase className="w-5 h-5" />,
      path: "/dashboard/applications",
    },
    {
      name: "System Settings",
      icon: <Settings className="w-5 h-5" />,
      path: "/dashboard/settings",
    },
  ];

  const NavLinks = ({ closeMenu = () => {} }) => (
    <nav className="space-y-1.5 mt-4">
      {navItems.map((link) => {
        const isActive = location.pathname === link.path;
        return (
          <Link
            key={link.name}
            to={link.path}
            onClick={closeMenu}
            className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
              isActive
                ? "bg-gray-900 text-white shadow-lg shadow-gray-200"
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-900"}`}
              >
                {link.icon}
              </span>
              <span className="font-semibold text-[14px]">{link.name}</span>
            </div>
            {isActive && <ChevronRight className="w-4 h-4 opacity-50" />}
          </Link>
        );
      })}
    </nav>
  );

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-gray-900 mb-4" />
        <p className="text-gray-500 font-medium animate-pulse">
          Securing Session...
        </p>
      </div>
    );
  }

  return (
    <div className="flex bg-[#F8F9FA] min-h-screen antialiased text-slate-900">
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="w-72 fixed top-0 left-0 bottom-0 bg-white border-r border-gray-100 p-6 hidden lg:flex flex-col justify-between z-50">
        <div>
          <div className="flex items-center gap-3 px-2 mb-10">
            <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center shadow-xl shadow-gray-200">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold leading-tight">Knownly</h2>
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                Super Admin
              </span>
            </div>
          </div>

          <p className="px-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4">
            Core Management
          </p>
          <NavLinks />
        </div>

        {/* PROFILE SECTION */}
        <div className="pt-6 border-t border-gray-100">
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shadow-lg shadow-indigo-100">
                {adminData?.fname?.[0]}
                {adminData?.lname?.[0]}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {adminData?.fname} {adminData?.lname}
                </p>
                <p className="text-[11px] text-gray-500 truncate">
                  {adminData?.email}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white bg-red-500 hover:bg-red-600 transition-all w-full shadow-md shadow-red-100"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* --- MOBILE HEADER --- */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 z-[60] px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-indigo-600" />
          <h2 className="text-xl font-bold">Knownly</h2>
        </div>

        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full bg-gray-50"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-80 p-6 border-none flex flex-col justify-between bg-white"
          >
            <div>
              <SheetHeader className="mb-8">
                <SheetTitle className="text-left flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-indigo-600" />
                  Super Admin
                </SheetTitle>
              </SheetHeader>
              <NavLinks closeMenu={() => setIsMobileOpen(false)} />
            </div>

            {/* MOBILE PROFILE & LOGOUT SECTION (Added here) */}
            <div className="pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3 mb-6 px-2">
                <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shadow-lg uppercase">
                  {adminData?.fname?.[0]}
                  {adminData?.lname?.[0]}
                </div>
                <div className="overflow-hidden">
                  <p className="text-base font-bold text-gray-900 truncate">
                    {adminData?.fname} {adminData?.lname}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {adminData?.email}
                  </p>
                </div>
              </div>
              <Button
                variant="destructive"
                className="w-full bg-red-500 rounded-2xl h-12 font-bold flex items-center gap-2 shadow-lg shadow-red-100"
                onClick={() => {
                  setIsMobileOpen(false); // Close the drawer first
                  setIsLogoutModalOpen(true); // Open the logout dialog
                }}
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 lg:ml-72 transition-all min-h-screen">
        <div className="max-w-[1600px] mx-auto p-3 lg:p-12 pt-28 lg:pt-12">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            {children}
          </div>
        </div>
      </main>

      {/* --- LOGOUT MODAL --- */}
      <Dialog open={isLogoutModalOpen} onOpenChange={setIsLogoutModalOpen}>
        <DialogContent className="sm:max-w-[420px] rounded-[2rem] border-none p-10 shadow-2xl bg-white!">
          <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-2xl font-black">
                End Session?
              </DialogTitle>
              <DialogDescription className="text-gray-500 text-base mt-2">
                You are about to sign out of the{" "}
                <span className="font-bold text-gray-900">
                  Knownly Super Admin
                </span>{" "}
                portal. Do you wish to proceed?
              </DialogDescription>
            </DialogHeader>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-8">
            <Button
              variant="outline"
              onClick={() => setIsLogoutModalOpen(false)}
              className="rounded-2xl h-12 flex-1 border-2 border-gray-100 font-bold hover:bg-gray-50"
            >
              Stay Logged In
            </Button>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="rounded-2xl h-12 flex-1 bg-red-500 hover:bg-red-600 font-bold shadow-lg shadow-red-200"
            >
              Sign Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
