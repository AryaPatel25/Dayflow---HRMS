import React, { useState } from "react";
import Resume from "../components/Resume.jsx";
import PrivateInfo from "../components/PrivateInfo.jsx";
import SalaryInfo from "../components/SalaryInfo.jsx";

const Profile = () => {

    const [activeTab, setActiveTab] = useState('Resume');


  return (
    <div className="w-full min-h-screen p-8">
      <div className="w-full min-h-screen rounded-2xl bg-zinc-900 flex flex-col">
        <h1 className="text-3xl font-bold px-8 py-4 w-full border-b border-zinc-700">
          My Profile
        </h1>

        <div className="grid grid-cols-3 items-center p-6 pb-10 mt-6 border-b border-zinc-700">
          <div className="profile size-50 rounded-full bg-zinc-800 border border-zinc-700 relative flex justify-center items-center mx-auto">
            <div className="flex items-center justify-center size-12 bg-zinc-900 absolute rounded-full -bottom-6 border border-zinc-700 cursor-pointer hover:bg-zinc-950">
              <EditIcon />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-4xl font-bold">John Doe</h2>
            <h2 className="">Serial No.: <p className="text-lg inline text-zinc-400">ODARRA20000001</p></h2>
            <h2 className="">Email Id: <p className="text-lg inline text-zinc-400">john@doe.com</p></h2>
            <h2 className="">Mobile No.: <p className="text-lg inline text-zinc-400">123 456 789</p></h2>
            <h2 className="">Gender: <p className="text-lg inline text-zinc-400">Male</p></h2>
            <h2 className="">Date of birth: <p className="text-lg inline text-zinc-400">25-09-98</p></h2>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="">Company: <p className="text-lg inline text-zinc-400">X Corp.</p></h2>
            <h2 className="">Email Id: <p className="text-lg inline text-zinc-400">john@doe.com</p></h2>
            <h2 className="">Department: <p className="text-lg inline text-zinc-400">Developer</p></h2>
            <h2 className="">Role: <p className="text-lg inline text-zinc-400">Software Developer</p></h2>
            <h2 className="">Location: <p className="text-lg inline text-zinc-400">123 Front Street, near bank</p></h2>
          </div>
         
        </div>

        <div className="w-full flex gap-12 p-2 border-b border-zinc-700 text-xl font-medium">
            <h1 onClick={() => setActiveTab('Resume')} className="hover:bg-zinc-800 rounded-2xl px-4 py-2 cursor-pointer">Resume</h1>
            <h1 onClick={() => setActiveTab('PrivateInfo')} className="hover:bg-zinc-800 rounded-2xl px-4 py-2 cursor-pointer">Private Info.</h1>
            <h1 onClick={() => setActiveTab('SalaryInfo')} className="hover:bg-zinc-800 rounded-2xl px-4 py-2 cursor-pointer">Salary Info.</h1>
        </div>

        {activeTab === 'Resume' && <Resume />}
        {activeTab === 'PrivateInfo' && <PrivateInfo />}
        {activeTab === 'SalaryInfo' && <SalaryInfo />}

      </div>
    </div>
  );
};

// Edit Icon Component
const EditIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className=""
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
};

export default Profile;
