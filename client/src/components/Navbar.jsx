import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const links = [
    { name: "Employees", path: "/dashboard" },
    { name: "Attendance", path: "#" },
    { name: "Time Off", path: "#" },
  ];

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <div className="w-full h-20 border-b border-zinc-700 flex justify-between items-center px-10">
      <div className="flex items-center gap-10">
        <Link to="/dashboard">
          <div className="size-10 aspect-square overflow-hidden rounded-full border border-zinc-700 flex justify-center items-center">
            <img
              src="https://res.cloudinary.com/ddbpvv06y/image/upload/v1764147032/vercel_as3pro.png"
              alt="Company Logo"
              className="w-full h-full object-contain"
            />
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

      <div className="flex items-center gap-4">
        <div className="size-10 rounded-full border border-zinc-700 bg-red-500" />
        <div
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          className="size-10 rounded-full border border-zinc-700 flex justify-center items-center text-white cursor-pointer select-none relative"
        >
          <ProfileIcon />
        </div>
        {isProfileMenuOpen && (
          <div className="absolute text-sm flex flex-col gap-1 bg-zinc-900 border border-zinc-700 rounded-lg px-1 py-1 top-18 right-10 justify-center">
            <Link
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              to="/profile"
              className="flex items-center justify-center cursor-pointer hover:bg-zinc-800 px-4 py-2 rounded-lg"
            >
              <span className="inline-block rounded-full mr-2">
                <ProfileIcon />
              </span>
              Profile
            </Link>
            <Link
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center justify-center cursor-pointer hover:bg-zinc-800 px-4 py-2 rounded-lg"
            >
              <span className="inline-block rounded-full mr-2">
                <LogoutIcon />
              </span>
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

const ProfileIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="icon icon-tabler icons-tabler-filled icon-tabler-user size-4"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
      <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
    </svg>
  );
};

const LogoutIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-logout size-4"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
      <path d="M9 12h12l-3 -3" />
      <path d="M18 15l3 -3" />
    </svg>
  );
};
