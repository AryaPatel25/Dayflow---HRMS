import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminAPI } from "../../http/api";

const AddEmployee = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    yearOfJoining: new Date().getFullYear(),
    designation: "",
    department: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await adminAPI.createEmployee(formData);
      if (response.success) {
        setSuccess("Employee created successfully!");
        setTimeout(() => {
          navigate("/admin/employees");
        }, 2000);
      } else {
        setError(response.message || "Failed to create employee");
      }
    } catch (err) {
      console.error("Error creating employee:", err);
      setError(err.response?.data?.message || "Failed to create employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-white font-sans">
      <div className="mx-4 md:mx-6 lg:mx-8 py-6">
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 md:px-8 py-6 border-b border-zinc-700">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">
                Add New Employee
              </h1>
              <p className="text-zinc-400">Create a new employee account</p>
            </div>
            <button
              onClick={() => navigate("/admin/employees")}
              className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-white transition-colors"
            >
              ← Back to Employees
            </button>
          </div>

          {/* Form */}
          <div className="p-6 md:p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-400">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-900/30 border border-green-700 rounded-lg text-green-400">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-zinc-300 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-zinc-300 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Enter email address"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-zinc-300 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label
                    htmlFor="yearOfJoining"
                    className="block text-sm font-medium text-zinc-300 mb-2"
                  >
                    Year of Joining
                  </label>
                  <input
                    type="number"
                    id="yearOfJoining"
                    name="yearOfJoining"
                    value={formData.yearOfJoining}
                    onChange={handleChange}
                    min="2000"
                    max="2030"
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="designation"
                    className="block text-sm font-medium text-zinc-300 mb-2"
                  >
                    Designation
                  </label>
                  <input
                    type="text"
                    id="designation"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Enter designation"
                  />
                </div>

                <div>
                  <label
                    htmlFor="department"
                    className="block text-sm font-medium text-zinc-300 mb-2"
                  >
                    Department
                  </label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Enter department"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-zinc-700">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg font-medium transition-colors"
                >
                  {loading ? "Creating Employee..." : "Create Employee"}
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/admin/employees")}
                  className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
