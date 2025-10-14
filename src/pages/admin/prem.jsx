import React, { useEffect, useState } from 'react';
import AdminLayout from './layout';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminPrem() {
  const [admin] = useState("Joshua");
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  const usersPerPage = 6;

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch("https://p2-three.vercel.app/api/applications/apply?package=premium");
        const result = await res.json();
        setUserData(result.data || []); // ✅ handle your API structure
        // console.log(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const totalPages = Math.ceil(userData.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  // ✅ Skeleton preloader (for table rows)
  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </td>
    </tr>
  );

  return (
    <AdminLayout>
      <div className="p-2 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 lg:mb-3">
          <h2 className="text-[22px] md:text-2xl font-bold text-gray-800">Premium Users</h2>
          <Link
            className="flex items-center gap-2 cursor-pointer px-3 py-1 rounded-md bg-gray-100 transition"
            onClick={() => {}}
          >
            <p className="m-0 font-semibold text-sm">{admin}</p>
            <ChevronDown className="w-4 h-4 inline-block ml-1" />
          </Link>
        </div>

        <p className="m-0 text-gray-400 md:mt-0 mt-2 text-[13px] mb-6 md:w-full w-1/2">
          Review and manage user accounts
        </p>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700 bg-transparent border-separate border-spacing-y-2">
            <thead className="bg-gray-300/30 text-gray-600 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-3 rounded-l-lg">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3 rounded-r-lg">Plan</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />) : currentUsers.length == 0  ? (
                    <tr>
                        <td  className="m-0 text-center text-gray-500 font-medium py-4" colSpan="4">No Current Premium Subscribers</td>
                    </tr>                
                ) 
                : currentUsers.map((user) => (
                    <tr
                      key={user._id || user.id}
                      className="bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 rounded-l-lg">
                        {user.fname ? `${user.fname} ${user.lname}` : user.name}
                      </td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.role || "User"}</td>
                      <td className="px-6 py-4 rounded-r-lg">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.level === "free"
                              ? "bg-gray-200 text-gray-700"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {user.package == "Free" ? "Free" : "Premium"}
                        </span>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 lg:hidden">                
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-100 p-4 rounded-xl border border-gray-200"
                >
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                </div>
              ))
              :userData.length === 0 ?
                (
                    <div>
                        <p className="m-0 text-center py-5">No Current Premium Subscribers</p>
                    </div>
                )
            : currentUsers.map((user) => (
                <div
                  key={user._id || user.id}
                  className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {user.fname ? `${user.fname} ${user.lname}` : user.name}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.level === "free"
                          ? "bg-gray-200 text-gray-700"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {user.package == "free" ? "Free" : "Premium"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {user.role || "User"}
                  </p>
                </div>
              ))}
        </div>

        {/* Pagination */}
        {!loading && (
          <div className="flex justify-center sm:justify-end items-center gap-3 mt-6">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>

            <span className="text-sm text-gray-600">
              Page <strong>{currentPage}</strong> of {totalPages}
            </span>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
