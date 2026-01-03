import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const links = [
    { name: "Dashboard", path: "/dashboard" },
    ...(user?.role === "ADMIN"
      ? [{ name: "Employees", path: "/admin/employees" }]
      : []),
    { name: "Profile", path: "/profile" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="w-full h-20 border-b border-zinc-700 flex justify-between items-center px-10">
      <div className="flex items-center gap-10">
        <Link to="/dashboard">
          <div className="size-10 aspect-square overflow-hidden rounded-full border border-zinc-700 flex justify-center items-center">
            <svg
              className="w-6 h-6 text-blue-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7v10c0 5.55 3.84 9.99 9 11 5.16-1.01 9-5.45 9-11V7l-10-5z" />
              <path d="M12 7v5l4 2-4 2v5" fill="white" />
            </svg>
          </div>
        </Link>

        <div className="flex items-center gap-4 text-white text-sm">
          {links.map((item, index) => (
            <Link key={index} to={item.path} className="hover:underline">
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        {/* Email Verification Badge */}
        {user?.isAccountVerified ? (
          <div className="flex items-center gap-2 px-3 py-1 bg-green-900/20 text-green-400 rounded-full border border-green-700 text-xs font-medium">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="hidden sm:inline">Verified</span>
          </div>
        ) : (
          <Link
            to="/email-verification"
            className="flex items-center gap-2 px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-full transition-colors text-xs font-medium"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="hidden sm:inline">Verify Email</span>
          </Link>
        )}

        {/* User Profile Menu */}
        <div className="relative">
          <div
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-zinc-700 bg-blue-600 flex justify-center items-center text-white cursor-pointer select-none font-medium hover:bg-blue-700 transition-colors overflow-hidden"
          >
            {user?.profileImage?.url ? (
              <img
                src={user.profileImage.url}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            ) : (
              user?.name?.charAt(0)?.toUpperCase() || "U"
            )}
          </div>

          {isProfileMenuOpen && (
            <div className="absolute text-sm flex flex-col bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl top-12 right-0 min-w-60 z-50 overflow-hidden">
              {/* User Info */}
              <div className="p-4 border-b border-zinc-700 bg-zinc-800/50">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full border border-zinc-600 bg-blue-600 flex justify-center items-center text-white font-medium overflow-hidden">
                    {user?.profileImage?.url ? (
                      <img
                        src={user.profileImage.url}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      user?.name?.charAt(0)?.toUpperCase() || "U"
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-white">{user?.name}</div>
                    <div className="text-xs text-zinc-400">{user?.email}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-900/30 text-blue-400 text-xs rounded-full border border-blue-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    {user?.role?.toLowerCase()}
                  </span>
                  {user?.isAccountVerified && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded-full border border-green-700">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Verified
                    </span>
                  )}
                </div>
              </div>

              <div className="p-2">
                <Link
                  onClick={() => setIsProfileMenuOpen(false)}
                  to="/profile"
                  className="flex items-center gap-3 cursor-pointer hover:bg-zinc-800 px-3 py-2.5 rounded-lg transition-colors"
                >
                  <ProfileIcon />
                  My Profile
                </Link>

                {user?.role === "ADMIN" && (
                  <Link
                    onClick={() => setIsProfileMenuOpen(false)}
                    to="/admin/employees"
                    className="flex items-center gap-3 cursor-pointer hover:bg-zinc-800 px-3 py-2.5 rounded-lg transition-colors"
                  >
                    <UsersIcon />
                    Manage Employees
                  </Link>
                )}

                <div className="my-1 border-t border-zinc-700"></div>

                <button
                  onClick={() => {
                    setIsProfileMenuOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-3 cursor-pointer hover:bg-zinc-800 px-3 py-2.5 rounded-lg transition-colors text-red-400 hover:text-red-300"
                >
                  <LogoutIcon />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="icon icon-tabler icons-tabler-filled icon-tabler-user"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
      <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
    </svg>
  );
};

const UsersIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );
};

const LogoutIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
      <path d="M9 12h12l-3 -3" />
      <path d="M18 15l3 -3" />
    </svg>
  );
};

export default Navbar;
