import React, { useState } from 'react';
import AdminLayout from './layout';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Users() {
  const [admin] = useState("Joshua");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "User", plan: "Free" },
    { id: 2, name: "Mary Johnson", email: "mary@example.com", role: "Premium", plan: "Premium" },
    { id: 3, name: "Alex Smith", email: "alex@example.com", role: "User", plan: "Free" },
    { id: 4, name: "Grace Okafor", email: "grace@techlaunch.com", role: "Premium", plan: "Platinum" },
    { id: 5, name: "David Brown", email: "david@techlaunch.com", role: "User", plan: "Free" },
    { id: 6, name: "Nkechi Obi", email: "nkechi@techlaunch.com", role: "Premium", plan: "Premium" },
    { id: 7, name: "Samuel Ojo", email: "samuel@techlaunch.com", role: "User", plan: "Free" },
    { id: 8, name: "Chika Eze", email: "chika@techlaunch.com", role: "User", plan: "Free" },
    { id: 9, name: "Ifeanyi Nwosu", email: "ifeanyi@techlaunch.com", role: "Premium", plan: "Premium" },
  ];

  const totalPages = Math.ceil(users.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <AdminLayout>
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 lg:mb-3">
          <h2 className="text-[22px] md:text-2xl font-bold text-gray-800">Users</h2>
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
              {currentUsers.map((user) => (
                <tr
                  key={user.id}
                  className="bg-gray-50 hover:bg-gray-100 transition-colors rounded-lg"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 rounded-l-lg">
                    {user.name}
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.role}</td>
                  <td className="px-6 py-4 rounded-r-lg">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.plan === "Free"
                          ? "bg-gray-200 text-gray-700"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {user.plan}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 lg:hidden">
          {currentUsers.map((user) => (
            <div
              key={user.id}
              className="bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.plan === "Free"
                      ? "bg-gray-200 text-gray-700"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {user.plan}
                </span>
              </div>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-sm text-gray-500 mt-1">{user.role}</p>
            </div>
          ))}
        </div>

        {/* Pagination */}
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
      </div>
    </AdminLayout>
  );
}
