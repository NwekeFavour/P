import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Users, Clock, CheckCircle, XCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import AdminLayout from "./layout";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const AdminPrem = () => {
  const [premiumUsers, setPremiumUsers] = useState([]);
  const [premiumStats, setPremiumStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPremiumData = async () => {
      try {
        const [usersRes, statsRes] = await Promise.all([
          fetch(`${BASE_URL}/api/applications/apply?package=premium`),
          fetch(`${BASE_URL}/api/applications/stats/premium`),
        ]);

        const usersResult = await usersRes.json();
        const statsResult = await statsRes.json();
        setPremiumUsers(usersResult.data || []);
        setPremiumStats(statsResult.stats || {});
      } catch (error) {
        console.error("Error fetching premium data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPremiumData();
  }, []);

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 bg-gray-50 min-h-screen space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Premium Applications Dashboard</h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-[#E8EfE5] shadow-sm border-none">
            <CardContent className="flex flex-col items-center justify-center py-6">
              <Users className="text-gray-600 w-6 h-6 mb-2" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-700">
                {premiumStats.totalPremium || 0}
              </h3>
              <p className="text-sm text-gray-600 text-center">Total Premium Users</p>
            </CardContent>
          </Card>

          <Card className="bg-[#E1E6EE] shadow-sm border-none">
            <CardContent className="flex flex-col items-center justify-center py-6">
              <Clock className="text-gray-600 w-6 h-6 mb-2" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-700">
                {premiumStats.pendingPremium || 0}
              </h3>
              <p className="text-sm text-gray-600 text-center">Pending Applications</p>
            </CardContent>
          </Card>

          <Card className="bg-[#F6EBD8]/70 shadow-sm border-none">
            <CardContent className="flex flex-col items-center justify-center py-6">
              <CheckCircle className="text-gray-600 w-6 h-6 mb-2" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-700">
                {premiumStats.approvedPremium || 0}
              </h3>
              <p className="text-sm text-gray-600 text-center">Approved</p>
            </CardContent>
          </Card>

          <Card className="bg-[#FCECD3] shadow-sm border-none">
            <CardContent className="flex flex-col items-center justify-center py-6">
              <XCircle className="text-gray-600 w-6 h-6 mb-2" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-700">
                {premiumStats.rejectedPremium || 0}
              </h3>
              <p className="text-sm text-gray-600 text-center">Rejected</p>
            </CardContent>
          </Card>
        </div>

        {/* Applications Table */}
        <Card>
          <CardHeader>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Premium Applicants</h2>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center py-4">Loading...</p>
            ) : premiumUsers.length === 0 ? (
              <p className="text-center py-4 text-gray-500">No premium applications found.</p>
            ) : (
              <ScrollArea className="w-full">
                <table className="w-full min-w-[600px] sm:min-w-full text-left text-gray-700 text-sm border-separate border-spacing-y-2">
                  <thead className="text-gray-600 uppercase text-xs sm:text-sm font-semibold">
                    <tr>
                      <th className="px-3 sm:px-4 py-2">Name</th>
                      <th className="px-3 sm:px-4 py-2">Email</th>
                      <th className="px-3 sm:px-4 py-2">Status</th>
                      <th className="px-3 sm:px-4 py-2">Date Applied</th>
                    </tr>
                  </thead>
                  <tbody>
                    {premiumUsers.map((user, i) => (
                      <tr
                        key={i}
                        className="bg-gray-50 hover:bg-gray-100 rounded-lg transition"
                      >
                        <td className="px-3 sm:px-4 py-2">{user.fullName || "N/A"}</td>
                        <td className="px-3 sm:px-4 py-2">{user.email || "N/A"}</td>
                        <td
                          className={`px-3 sm:px-4 py-2 font-semibold ${
                            user.status === "Approved"
                              ? "text-green-600"
                              : user.status === "Rejected"
                              ? "text-red-600"
                              : "text-blue-600"
                          }`}
                        >
                          {user.status || "Pending"}
                        </td>
                        <td className="px-3 sm:px-4 py-2">
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminPrem;
