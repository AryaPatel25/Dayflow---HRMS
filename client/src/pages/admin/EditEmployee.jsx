import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminAPI } from "../../http/api";

const EditEmployee = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [employee, setEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    yearOfJoining: "",
    designation: "",
    department: "",
    isActive: true,
  });

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      // Since there's no single employee endpoint, get all and find the one
      const response = await adminAPI.getEmployees({ limit: 1000 });
      if (response.success) {
        const emp = response.employees.find((e) => e._id === id);
        if (emp) {
          setEmployee(emp);
          setFormData({
            name: emp.name || "",
            email: emp.email || "",
            phone: emp.phone || "",
            yearOfJoining: emp.yearOfJoining || new Date().getFullYear(),
            designation: emp.designation || "",
            department: emp.department || "",
            isActive: emp.isActive !== false,
          });
        } else {
          setError("Employee not found");
        }
      }
    } catch (err) {
      console.error("Error fetching employee:", err);
      setError("Failed to load employee data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await adminAPI.updateEmployee(id, formData);
      if (response.success) {
        setSuccess("Employee updated successfully!");
        setTimeout(() => {
          navigate("/admin/employees");
        }, 2000);
      } else {
        setError(response.message || "Failed to update employee");
      }
    } catch (err) {
      console.error("Error updating employee:", err);
      setError(err.response?.data?.message || "Failed to update employee");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-zinc-950 text-white font-sans">
        <div className="mx-4 md:mx-6 lg:mx-8 py-6">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 flex items-center justify-center">
            <div className="text-lg">Loading employee data...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="min-h-screen w-full bg-zinc-950 text-white font-sans">
        <div className="mx-4 md:mx-6 lg:mx-8 py-6">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Employee Not Found</h1>
              <button
                onClick={() => navigate("/admin/employees")}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
              >
                ← Back to Employees
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-white font-sans">
      <div className="mx-4 md:mx-6 lg:mx-8 py-6">
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 md:px-8 py-6 border-b border-zinc-700">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-1">
                Edit Employee
              </h1>
              <p className="text-zinc-400">Update employee information</p>
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

              {/* Status Toggle */}
              <div className="pt-6 border-t border-zinc-700">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="w-4 h-4 text-blue-600 bg-zinc-800 border-zinc-700 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="isActive"
                    className="text-sm font-medium text-zinc-300"
                  >
                    Employee is Active
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-zinc-700">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg font-medium transition-colors"
                >
                  {saving ? "Updating Employee..." : "Update Employee"}
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

export default EditEmployee;
