import React from "react";

const Resume = ({ user }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-6">Resume & Work Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Work Info */}
        <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
          <h3 className="font-semibold mb-4 text-lg">Employment Details</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-zinc-400">Employee ID</label>
              <p className="text-white font-medium">
                {user?.loginId || "Not assigned"}
              </p>
            </div>
            <div>
              <label className="text-sm text-zinc-400">Role</label>
              <p className="text-white font-medium capitalize">
                {user?.role?.toLowerCase() || "Not specified"}
              </p>
            </div>
            <div>
              <label className="text-sm text-zinc-400">Year of Joining</label>
              <p className="text-white font-medium">
                {user?.yearOfJoining || "Not specified"}
              </p>
            </div>
            <div>
              <label className="text-sm text-zinc-400">Status</label>
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

        {/* Contact Information */}
        <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
          <h3 className="font-semibold mb-4 text-lg">Contact Information</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-zinc-400">Email</label>
              <p className="text-white font-medium">{user?.email}</p>
            </div>
            {user?.phone && (
              <div>
                <label className="text-sm text-zinc-400">Phone</label>
                <p className="text-white font-medium">{user.phone}</p>
              </div>
            )}
            <div>
              <label className="text-sm text-zinc-400">Account Status</label>
              <div className="flex items-center gap-2">
                {user?.isAccountVerified ? (
                  <>
                    <svg
                      className="w-4 h-4 text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-green-400">Verified</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-amber-400">Pending Verification</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Upload Section */}
      <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
        <h3 className="font-semibold mb-4 text-lg">Resume & Documents</h3>
        <div className="border-2 border-dashed border-zinc-600 rounded-lg p-8 text-center">
          <div className="text-zinc-400 mb-4">
            <svg
              className="w-12 h-12 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 48 48"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              />
            </svg>
            <p>Upload your resume and relevant documents</p>
            <p className="text-sm">PDF, DOC, DOCX files up to 5MB</p>
          </div>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            Browse Files
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resume;
