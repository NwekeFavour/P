import React, { useEffect, useState } from "react";
import { 
  Users, LogOut, LayoutDashboard, Menu, Layers, 
  Settings, ChevronRight, AlertCircle, Loader2, FileText 
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch Admin Profile & Check Permissions
  useEffect(() => {
    const fetchAdmin = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setAdminData(response.data.data);
          // Kick out if not an admin
          if (response.data.data.role !== "admin") {
            toast.error("Access Denied: Admin privileges required");
            navigate("/login");
          }
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
    { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, path: "/admin" },
    { name: "Applications", icon: <FileText className="w-5 h-5" />, path: "/admin/applications" },
    { name: "Cohorts", icon: <Layers className="w-5 h-5" />, path: "/admin/cohorts" },
    { name: "Users", icon: <Users className="w-5 h-5" />, path: "/admin/users" },
    { name: "Settings", icon: <Settings className="w-5 h-5" />, path: "/admin/settings" },
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
            className={`flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200 group ${
              isActive 
                ? "bg-gray-900 text-white shadow-md shadow-gray-400/20" 
                : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`${isActive ? "text-white" : "text-gray-400 group-hover:text-gray-900"}`}>
                {link.icon}
              </span>
              <span className="font-medium text-[15px]">{link.name}</span>
            </div>
            {isActive && <ChevronRight className="w-4 h-4 opacity-50" />}
          </Link>
        );
      })}
    </nav>
  );

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-gray-900" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#FBFBFC]  antialiased text-slate-900">
      
      {/* --- DESKTOP SIDEBAR (Visible lg and up) --- */}
      <aside className="w-64 fixed top-0 left-0 bottom-0 bg-white border-r border-gray-100 p-6 hidden lg:flex flex-col justify-between z-40">
        <div>
          <div className="flex items-center gap-2 px-2 mb-10">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_8px_white]" />
            </div>
            <h2 className="text-xl font-bold tracking-tight">Knownly</h2>
          </div>
          
          <p className="px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-4">Management</p>
          <NavLinks />
        </div>

        {/* Profile Card */}
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-[10px] font-bold uppercase">
              {adminData?.fname?.[0]}{adminData?.lname?.[0]}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-gray-900 truncate">{adminData?.fname} {adminData?.lname}</p>
              <p className="text-[10px] text-gray-500 truncate">{adminData?.email}</p>
            </div>
          </div>
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* --- MOBILE HEADER (Visible below lg) --- */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-900 rounded flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_4px_white]" />
          </div>
          <h2 className="text-lg font-bold">Knownly</h2>
        </div>

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-gray-100 rounded-xl">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-6 border-none">
            <SheetHeader className="text-left mb-8">
              <SheetTitle className="text-xl font-bold">Menu</SheetTitle>
            </SheetHeader>
            <NavLinks closeMenu={() => setIsMobileMenuOpen(false)} />
            
            <div className="absolute bottom-8 left-6 right-6">
               <button
                onClick={() => { setIsMobileMenuOpen(false); setIsLogoutModalOpen(true); }}
                className="flex items-center gap-2 text-sm font-bold text-red-500 w-full p-4 bg-red-50 rounded-2xl"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      {/* ml-0 on mobile, lg:ml-64 on desktop 
          pt-24 on mobile to clear the header, lg:pt-10 on desktop
      */}
      <main className="flex-1 transition-all lg:ml-64 bg-[#FBFBFC]">
        <div className="max-w-[1400px] mx-auto p-6 md:p-10 md:pt-20 pt-24 lg:pt-10">
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
            {children}
          </div>
        </div>
      </main>

      {/* --- LOGOUT DIALOG --- */}
      <Dialog open={isLogoutModalOpen} onOpenChange={setIsLogoutModalOpen}>
        <DialogContent className="sm:max-w-[400px] rounded-3xl border-none p-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <DialogHeader>
              <SheetTitle className="text-xl font-bold text-center w-full">Sign Out</SheetTitle>
              <DialogDescription className="text-gray-500 mt-2">
                Are you sure you want to log out, {adminData?.fname}?
              </DialogDescription>
            </DialogHeader>
          </div>
          <DialogFooter className="flex gap-3 mt-6 sm:justify-center">
            <Button variant="outline" onClick={() => setIsLogoutModalOpen(false)} className="rounded-xl flex-1">
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout} className="rounded-xl flex-1 bg-red-500">
              Sign Out
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}