import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { adminAPI } from "../../http/api";

const AdminEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchEmployees();
  }, [currentPage, filter]);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getEmployees({
        page: currentPage,
        filter,
        search: searchTerm,
      });

      if (response.success) {
        setEmployees(response.employees || []);
        setPagination(response.pagination || {});
      }
    } catch (err) {
      console.error("Error fetching employees:", err);
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = async (employeeId) => {
    try {
      await adminAPI.deactivateEmployee(employeeId);
      fetchEmployees(); // Refresh the list
    } catch (err) {
      console.error("Error deactivating employee:", err);
    }
  };

  // Filter employees based on search term and filter
  const filteredEmployees = employees.filter((employee) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && employee.isActive) ||
      (filter === "inactive" && !employee.isActive);

    const matchesSearch =
      searchTerm === "" ||
      employee.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.loginId?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-white font-sans">
      <div className="mx-4 md:mx-6 lg:mx-8 py-6">
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-6 md:px-8 py-6 border-b border-zinc-700">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">
                Employee Management
              </h1>
              <p className="text-zinc-400">Manage your team members</p>
            </div>
            <Link
              to="/admin/employees/create"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add Employee
            </Link>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8">
            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors"
              >
                <option value="all">All Employees</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
            </div>

            {/* Employee Table */}
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-zinc-800 border-b border-zinc-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
                        Employee
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
                        Login ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
                        Year Joined
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-zinc-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-700">
                    {loading ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-6 py-8 text-center text-zinc-400"
                        >
                          Loading employees...
                        </td>
                      </tr>
                    ) : filteredEmployees.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-6 py-8 text-center text-zinc-400"
                        >
                          No employees found
                        </td>
                      </tr>
                    ) : (
                      filteredEmployees.map((employee) => (
                        <tr key={employee._id} className="hover:bg-zinc-800/50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="size-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                                {employee.name?.charAt(0)?.toUpperCase()}
                              </div>
                              <div>
                                <div className="text-sm font-medium text-white">
                                  {employee.name}
                                </div>
                                <div className="text-sm text-zinc-400">
                                  {employee.email}
                                </div>
                                {employee.phone && (
                                  <div className="text-xs text-zinc-500">
                                    {employee.phone}
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-white font-mono">
                            {employee.loginId}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                                employee.isActive
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {employee.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-white">
                            {employee.yearOfJoining || "N/A"}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <Link
                                to={`/admin/employees/edit/${employee._id}`}
                                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                              >
                                Edit
                              </Link>
                              {employee.isActive && (
                                <button
                                  onClick={() => handleDeactivate(employee._id)}
                                  className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                                >
                                  Deactivate
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-zinc-400">
                  Showing {(currentPage - 1) * 10 + 1} to{" "}
                  {Math.min(currentPage * 10, pagination.totalEmployees || 0)}{" "}
                  of {pagination.totalEmployees || 0} employees
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 transition-colors"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 text-white">
                    {currentPage} of {pagination.totalPages || 1}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(prev + 1, pagination.totalPages || 1)
                      )
                    }
                    disabled={currentPage === (pagination.totalPages || 1)}
                    className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEmployees;
