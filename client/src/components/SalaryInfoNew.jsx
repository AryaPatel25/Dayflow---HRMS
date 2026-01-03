import React from "react";

const SalaryInfo = ({ user }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-6">
        Salary & Benefits Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Salary Info */}
        <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
          <h3 className="font-semibold mb-4 text-lg">Compensation</h3>
          <div className="space-y-4 text-zinc-400">
            <p className="mb-4">
              Salary information is confidential and maintained by the HR
              department.
            </p>
            <div className="space-y-2">
              <div>
                <label className="text-sm text-zinc-400">Base Salary</label>
                <p className="text-zinc-500 text-sm">Contact HR for details</p>
              </div>
              <div>
                <label className="text-sm text-zinc-400">Pay Grade</label>
                <p className="text-zinc-500 text-sm">Contact HR for details</p>
              </div>
              <div>
                <label className="text-sm text-zinc-400">
                  Payment Frequency
                </label>
                <p className="text-zinc-500 text-sm">Monthly</p>
              </div>
            </div>
          </div>
        </div>

        {/* Employment Status */}
        <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
          <h3 className="font-semibold mb-4 text-lg">Employment Status</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-zinc-400">Employee Type</label>
              <p className="text-white font-medium capitalize">
                {user?.role?.toLowerCase() || "Not specified"}
              </p>
            </div>
            <div>
              <label className="text-sm text-zinc-400">Joined Date</label>
              <p className="text-white font-medium">
                {user?.yearOfJoining
                  ? `${user.yearOfJoining}`
                  : "Not specified"}
              </p>
            </div>
            <div>
              <label className="text-sm text-zinc-400">Current Status</label>
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    user?.isActive ? "bg-green-400" : "bg-red-400"
                  }`}
                />
                <span className="text-white font-medium">
                  {user?.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Information */}
      <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
        <h3 className="font-semibold mb-4 text-lg">Benefits & Allowances</h3>
        <div className="text-zinc-400">
          <p className="mb-4">
            Employee benefits and allowances information is managed by the HR
            department.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Health Insurance</label>
              <p className="text-zinc-500 text-sm">Contact HR for details</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Paid Time Off</label>
              <p className="text-zinc-500 text-sm">Contact HR for details</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Retirement Plan</label>
              <p className="text-zinc-500 text-sm">Contact HR for details</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Other Benefits</label>
              <p className="text-zinc-500 text-sm">Contact HR for details</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryInfo;
