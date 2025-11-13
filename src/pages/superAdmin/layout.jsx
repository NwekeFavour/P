import React, { useEffect, useState } from "react";
import { Users, LogOut, LayoutDashboard, Menu, X, Layers } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Star from "../../assets/images/star.svg"
export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const tokenFromStorage = localStorage.getItem("adminToken");
  const [token, setToken] = useState(tokenFromStorage);
  const [refresh, setRefresh] = useState(0);
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("user")
    setRefresh(prev => prev + 1)
    navigate("/login");
  };

   useEffect(() => {
  const currentToken = localStorage.getItem("adminToken");
  if (!currentToken) {
    navigate("/login");
  } else {
    setToken(currentToken);
  }
}, [refresh, navigate]);

  const NavLinks = () => (
    <nav className="space-y-2 mt-6">
      {[
        { name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, path: "/dashboard" },
        { name: "Users", icon: <Users className="w-5 h-5" />, path: "/dashboard/users" },
        { name: "Premium", icon: <img src={Star} className="w-5 h-5" alt="star-icon" />, path: "/dashboard/premium" },
        { name: "Cohorts", icon: <Layers className="w-5 h-5 text-blue-500" />, path: "/dashboard/cohorts" },
      ].map((link) => (
        <Link
          key={link.name}
          to={link.path}
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium text-gray-700"
          onClick={() => setOpen(false)}
        >
          <div className="w-8 h-8 bg-gray-200 text-gray-600 rounded-lg flex items-center justify-center transition-colors group-hover:bg-gray-300">
            {link.icon}
          </div>
          <span>{link.name}</span>
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans text-gray-800">
      {/* Desktop Sidebar */}
      <aside className="w-72 fixed top-0 left-0 bottom-0 bg-transparent shadow-md p-6 hidden xl:flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Admin Panel</h2>
          <NavLinks />
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-medium"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </aside>

      {/* Mobile Header + Sheet */}
      <div className="xl:hidden fixed top-0 left-0 w-full bg-white shadow-md flex items-center justify-between px-5 py-4 z-50">
        <h2 className="text-lg font-bold text-gray-800">Admin Panel</h2>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-white text-gray-800 border-none p-6 flex flex-col justify-between shadow-lg w-64"
          >
            <div>
              <SheetHeader>
                <SheetTitle className="text-xl font-bold mb-6">Menu</SheetTitle>
              </SheetHeader>
              <NavLinks />
            </div>
            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="flex items-center gap-3 p-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors mt-8 font-medium"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 xl:ml-72 pt-24 xl:pt-8 transition-all">
        {children}
      </main>
    </div>
  );
}