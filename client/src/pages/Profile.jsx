import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import EditProfileModal from "../components/EditProfileModal.jsx";
import Resume from "../components/Resume.jsx";
import PrivateInfo from "../components/PrivateInfo.jsx";
import SalaryInfo from "../components/SalaryInfoNew.jsx";

const Profile = () => {
  const { user, checkAuth } = useAuth();
  const [activeTab, setActiveTab] = useState("Resume");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleProfileUpdate = async () => {
    // Refresh user data after update
    await checkAuth();
  };

  if (!user) {
    return (
      <div className="w-full min-h-screen p-6 md:p-8">
        <div className="w-full min-h-screen rounded-2xl bg-zinc-900 flex justify-center items-center">
          <div className="text-zinc-400">Loading profile...</div>
        </div>
      </div>
    );
  }

  const EditIcon = () => (
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
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  );

  return (
    <>
      <div className="min-h-screen w-full bg-zinc-950 text-white">
        <div className="mx-4 md:mx-6 lg:mx-8 py-6">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center px-6 md:px-8 py-6 border-b border-zinc-700">
              <h1 className="text-2xl md:text-3xl font-bold">My Profile</h1>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
              >
                <EditIcon />
                Edit Profile
              </button>
            </div>

            {/* Profile Header */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 md:p-8 border-b border-zinc-700">
              {/* Profile Picture */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-zinc-800 border border-zinc-700 flex justify-center items-center overflow-hidden">
                    {user.profileImage?.url ? (
                      <img
                        src={user.profileImage.url}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-4xl md:text-5xl font-bold text-zinc-400">
                        {user.name?.charAt(0)?.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="absolute -bottom-2 -right-2 w-10 h-10 bg-zinc-800 border border-zinc-700 rounded-full flex justify-center items-center cursor-pointer hover:bg-zinc-700 transition-colors"
                  >
                    <EditIcon />
                  </button>
                </div>
              </div>

              {/* Personal Details */}
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-zinc-300">
                    Full Name:
                  </span>
                  <p className="text-lg text-zinc-400">{user.name}</p>
                </div>

                <div>
                  <span className="text-sm font-medium text-zinc-300">
                    Email:
                  </span>
                  <p className="text-lg text-zinc-400">{user.email}</p>
                </div>

                {user.phone && (
                  <div>
                    <span className="text-sm font-medium text-zinc-300">
                      Phone:
                    </span>
                    <p className="text-lg text-zinc-400">{user.phone}</p>
                  </div>
                )}
              </div>

              {/* Work Details */}
              <div className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-zinc-300">
                    Role:
                  </span>
                  <p className="text-lg text-zinc-400 capitalize">
                    {user.role?.toLowerCase()}
                  </p>
                </div>

                <div>
                  <span className="text-sm font-medium text-zinc-300">
                    Year of Joining:
                  </span>
                  <p className="text-lg text-zinc-400">{user.yearOfJoining}</p>
                </div>

                <div>
                  <span className="text-sm font-medium text-zinc-300">
                    Status:
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                      user.isActive
                        ? "bg-green-900/30 text-green-400 border border-green-700"
                        : "bg-red-900/30 text-red-400 border border-red-700"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        user.isActive ? "bg-green-400" : "bg-red-400"
                      }`}
                    />
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Navigation */}
            <div className="flex border-b border-zinc-700">
              {["Resume", "PrivateInfo", "SalaryInfo"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab
                      ? "border-blue-500 text-blue-400 bg-blue-500/10"
                      : "border-transparent text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800/50"
                  }`}
                >
                  {tab === "PrivateInfo"
                    ? "Personal Info"
                    : tab === "SalaryInfo"
                    ? "Salary Info"
                    : tab}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 p-6 md:p-8">
              {activeTab === "Resume" && <Resume user={user} />}
              {activeTab === "PrivateInfo" && <PrivateInfo user={user} />}
              {activeTab === "SalaryInfo" && <SalaryInfo user={user} />}
            </div>
          </div>
        </div>
      </div>

      <EditProfileModal
        user={user}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleProfileUpdate}
      />
    </>
  );
};

export default Profile;
