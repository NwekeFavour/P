import React, { useState } from "react";
import {
  Users,
  Star,
  LogOut,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"; // ensure you have ShadCN's sheet component installed

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  const NavLinks = () => (
    <nav className="space-y-4">
      <Link
        to="/admin"
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
        onClick={() => setOpen(false)}
      >
        <LayoutDashboard className="w-5 h-5" />
        <span>Dashboard</span>
      </Link>

      <Link
        to="/admin/users"
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
        onClick={() => setOpen(false)}
      >
        <Users className="w-5 h-5" />
        <span>Users</span>
      </Link>

      <Link
        to="/admin/premium"
        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
        onClick={() => setOpen(false)}
      >
        <Star className="w-5 h-5 text-yellow-400" />
        <span>Premium</span>
      </Link>
    </nav>
  );

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Desktop Sidebar */}
      <aside className="w-72 h-screen fixed top-0 left-0 bg-black text-white p-6 hidden lg:flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-10">Admin Panel</h2>
          <NavLinks />
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </aside>

      {/* Mobile Header + Sheet */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-neutral-800 text-white flex items-center justify-between px-5 py-4 ">
        <h2 className="text-lg font-bold">Admin Panel</h2>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="p-2  rounded-lgtransition">
              {open ? "" : <Menu className="w-5 h-5" />}
            </button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-black text-white border-none p-6 flex flex-col justify-between"
          >
            <div>
              <SheetHeader>
                <SheetTitle className="text-xl font-bold mb-6">
                  Admin Menu
                </SheetTitle>
              </SheetHeader>
              <NavLinks />
            </div>

            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="flex items-center gap-3 p-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors mt-8"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main content */}
      <main className="flex-1 p-3 lg:p-8 pt-20 lg:pt-8 lg:ml-72">{children}</main>
    </div>
  );
}
