import React, { useEffect, useState } from 'react';
import AdminLayout from './layout';
import { ChevronDown, ChevronLeft, ChevronRight, User2, Mail, Search, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Users() {
  const [admin] = useState("Joshua");
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const usersPerPage = 8;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("adminToken")}`
          },
        });
        const result = await res.json();
        if (result.success && Array.isArray(result.data)) {
          setUserData(result.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const totalPages = Math.ceil(userData.length / usersPerPage);
  const currentUsers = userData.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 md:space-y-8 pb-20">
        
        {/* Header Section - Stacks on Mobile */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">User Management</h1>
            <p className="text-gray-400 text-xs md:text-sm font-medium">Configure permissions and monitor platform access.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
             <div className="relative group flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search users..." 
                  className="w-full pl-10 pr-4 py-2.5 md:py-2 bg-white border border-gray-100 rounded-xl text-sm focus:ring-4 focus:ring-gray-50 outline-none md:w-64 transition-all"
                />
             </div>
          </div>
        </div>

        {/* Stats Summary - 2 Columns on Mobile, 4 on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Total Users</p>
                <p className="text-lg md:text-xl font-bold text-gray-900">{userData.length}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-[9px] md:text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Active Now</p>
                <p className="text-lg md:text-xl font-bold text-emerald-600">{userData.filter(u => u.isActive).length}</p>
            </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
          
          {/* Desktop Table - Hidden on Mobile */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/30">
                  <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">User</th>
                  <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Contact</th>
                  <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Cohorts</th>
                  <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {!loading && currentUsers.map((user) => (
                  <tr key={user._id} className="group hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center font-bold text-gray-700 group-hover:bg-gray-900 group-hover:text-white transition-all text-sm">
                          {user.fname?.[0] || <User2 size={16} />}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900 leading-none mb-1">{user.fname} {user.lname}</p>
                          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">@{user.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-gray-500">{user.email}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${user.isActive ? 'bg-emerald-500' : 'bg-red-400'}`} />
                        <span className="text-[11px] font-bold text-gray-700 capitalize">{user.isActive ? 'Active' : 'Disabled'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {user.assignedCohorts?.slice(0, 2).map((c, i) => (
                          <span key={i} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[9px] font-bold rounded-md">
                            {c.name}
                          </span>
                        ))}
                        {user.assignedCohorts?.length > 2 && <span className="text-[9px] text-gray-400">+{user.assignedCohorts.length - 2} more</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors"><ChevronRight size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List - Hidden on Desktop */}
          <div className="md:hidden divide-y divide-gray-50">
            {!loading && currentUsers.map((user) => (
              <div key={user._id} className="p-4 space-y-3 active:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center font-bold text-sm">
                      {user.fname?.[0]}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">{user.fname} {user.lname}</h3>
                      <p className="text-xs text-gray-400">@{user.role}</p>
                    </div>
                  </div>
                  <button className="p-1 text-gray-400"><MoreVertical size={18} /></button>
                </div>
                
                <div className="flex flex-col gap-2 bg-gray-50/50 p-3 rounded-xl">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Mail size={12} />
                    <span className="text-xs font-medium">{user.email}</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <div className="flex flex-wrap gap-1">
                        {user.assignedCohorts?.map((c, i) => (
                          <span key={i} className="px-2 py-0.5 bg-white border border-gray-100 text-gray-500 text-[9px] font-bold rounded-md">
                            {c.name}
                          </span>
                        ))}
                     </div>
                     <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest ${user.isActive ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
                        {user.isActive ? 'Active' : 'Off'}
                     </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer - Dynamic Text for Mobile */}
          <div className="px-6 py-4 bg-gray-50/30 border-t border-gray-50 flex items-center justify-between">
            <p className="text-[10px] md:text-xs text-gray-400 font-medium">
              Page <span className="text-gray-900">{currentPage}</span> of <span className="text-gray-900">{totalPages}</span>
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl bg-white border border-gray-100 disabled:opacity-30 active:scale-90 transition-all shadow-sm"
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl bg-white border border-gray-100 disabled:opacity-30 active:scale-90 transition-all shadow-sm"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}