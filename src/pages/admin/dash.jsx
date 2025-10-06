import React from 'react';
import { Users, Star, Activity, UserPlus } from 'lucide-react';
import AdminLayout from './layout';

export default function AdmindashboardPage() {
  // Ideally fetched from backend API
  const stats = {
    totalUsers: 2400,
    premiumUsers: 420,
    activeSessions: 125,
    newUsers: 58,
  };

  return (
    <AdminLayout>
      <div className='lg:m-0 m-4'>
        <h1 className="text-[22px] md:text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
          <StatCard
            icon={<Users className="w-6 h-6 text-blue-600" />}
            title="Total Users"
            value={stats.totalUsers}
          />
          <StatCard
            icon={<Star className="w-6 h-6 text-yellow-500" />}
            title="Premium Users"
            value={stats.premiumUsers}
          />
          <StatCard
            icon={<Activity className="w-6 h-6 text-green-600" />}
            title="Active Sessions"
            value={stats.activeSessions}
          />
          <StatCard
            icon={<UserPlus className="w-6 h-6 text-purple-600" />}
            title="New Signups"
            value={stats.newUsers}
          />
        </div>

        {/* Optional chart or recent activity */}
        <div className="mt-10 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <ul className="text-gray-600 text-sm space-y-2">
            <li>✅ New premium user: <strong>Mary Johnson</strong></li>
            <li>✅ User <strong>Alex N.</strong> completed onboarding</li>
            <li>⚡ Server uptime: 99.9%</li>
            <li>🚀 Total growth this week: +14%</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 flex items-center gap-4 hover:shadow-md transition-shadow">
      <div className="p-3 bg-gray-100 rounded-lg">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
    </div>
  );
}
