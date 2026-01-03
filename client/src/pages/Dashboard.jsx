import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { adminAPI } from "../http/api.js";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === "ADMIN") {
      fetchStats();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getEmployees({ page: 1, limit: 1000 });

      if (response?.success && response?.employees) {
        const employees = response.employees;
        setStats({
          total: employees.length,
          active: employees.filter((emp) => emp.isActive !== false).length,
          inactive: employees.filter((emp) => emp.isActive === false).length,
        });
      }
    } catch (error) {
      console.error("Failed to fetch employee stats:", error);
    } finally {
      setLoading(false);
    }
  };

  if (user?.role === "ADMIN") {
    return (
      <div className="min-h-screen w-full bg-zinc-950 text-white font-sans">
        {/* Admin Dashboard Content with proper margins */}
        <div className="mx-4 md:mx-6 lg:mx-8 py-6">
          {/* Welcome Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Admin Dashboard
                </h1>
                <p className="text-zinc-400 text-lg">
                  Welcome back, {user?.name?.split(" ")[0] || "User"}!
                </p>
              </div>
              <Link
                to="/admin/employees/create"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors self-start sm:self-auto"
              >
                + Add Employee
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">Total Employees</p>
                  <p className="text-2xl font-bold text-white">{stats.total}</p>
                </div>
                <div className="size-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg
                    className="size-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">Active</p>
                  <p className="text-2xl font-bold text-green-400">
                    {stats.active}
                  </p>
                </div>
                <div className="size-12 bg-green-600 rounded-full flex items-center justify-center">
                  <svg
                    className="size-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-zinc-400 text-sm">Inactive</p>
                  <p className="text-2xl font-bold text-red-400">
                    {stats.inactive}
                  </p>
                </div>
                <div className="size-12 bg-red-600 rounded-full flex items-center justify-center">
                  <svg
                    className="size-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/admin/employees"
                className="bg-zinc-900 border border-zinc-700 rounded-lg p-4 hover:bg-zinc-800 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                    <svg
                      className="size-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Manage Employees</h3>
                    <p className="text-sm text-zinc-400">
                      View and edit employee details
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                to="/admin/employees/create"
                className="bg-zinc-900 border border-zinc-700 rounded-lg p-4 hover:bg-zinc-800 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-green-600 rounded-lg flex items-center justify-center group-hover:bg-green-700 transition-colors">
                    <svg
                      className="size-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Add Employee</h3>
                    <p className="text-sm text-zinc-400">
                      Create new employee account
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                to="/profile"
                className="bg-zinc-900 border border-zinc-700 rounded-lg p-4 hover:bg-zinc-800 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 bg-purple-600 rounded-lg flex items-center justify-center group-hover:bg-purple-700 transition-colors">
                    <svg
                      className="size-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-white">My Profile</h3>
                    <p className="text-sm text-zinc-400">
                      Update account settings
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Recent Activity</h2>
              <Link
                to="/admin/employees"
                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                View All Employees →
              </Link>
            </div>
            <p className="text-zinc-400">
              Use the employee management section to view, create, and manage
              all employees.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Employee Dashboard
  return (
    <div className="min-h-screen w-full bg-zinc-950 text-white font-sans">
      <div className="mx-4 md:mx-6 lg:mx-8 py-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Employee Dashboard
          </h1>
          <p className="text-zinc-400 text-lg">
            Welcome back, {user?.name?.split(" ")[0] || "User"}!
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/profile"
            className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 hover:bg-zinc-800 transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="size-12 bg-purple-600 rounded-full flex items-center justify-center group-hover:bg-purple-700 transition-colors">
                <svg
                  className="size-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">My Profile</h3>
                <p className="text-zinc-400">
                  View and edit your profile information
                </p>
              </div>
            </div>
          </Link>

          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="size-12 bg-blue-600 rounded-full flex items-center justify-center">
                <svg
                  className="size-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Account Status</h3>
                <p className="text-zinc-400">
                  {user?.isActive ? "Active Employee" : "Inactive Account"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Summary */}
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">Profile Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-zinc-400">Email</p>
              <p className="text-white font-medium">{user?.email}</p>
            </div>
            {user?.phone && (
              <div>
                <p className="text-sm text-zinc-400">Phone</p>
                <p className="text-white font-medium">{user.phone}</p>
              </div>
            )}
            {user?.loginId && (
              <div>
                <p className="text-sm text-zinc-400">Login ID</p>
                <p className="text-white font-medium">{user.loginId}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
