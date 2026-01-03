import React from "react";

const PrivateInfo = ({ user }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-6">Private Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Details */}
        <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
          <h3 className="font-semibold mb-4 text-lg">Personal Details</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-zinc-400">Full Name</label>
              <p className="text-white font-medium">{user?.name}</p>
            </div>
            <div>
              <label className="text-sm text-zinc-400">Email Address</label>
              <p className="text-white font-medium">{user?.email}</p>
            </div>
            {user?.phone && (
              <div>
                <label className="text-sm text-zinc-400">Phone Number</label>
                <p className="text-white font-medium">{user.phone}</p>
              </div>
            )}
          </div>
        </div>

        {/* Additional Information Placeholder */}
        <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
          <h3 className="font-semibold mb-4 text-lg">Additional Information</h3>
          <div className="space-y-4 text-zinc-400">
            <p>
              Additional personal information can be added here by the admin or
              through profile updates.
            </p>
            <div className="space-y-2">
              <div>
                <label className="text-sm text-zinc-400">Date of Birth</label>
                <p className="text-zinc-500 text-sm">Not specified</p>
              </div>
              <div>
                <label className="text-sm text-zinc-400">Gender</label>
                <p className="text-zinc-500 text-sm">Not specified</p>
              </div>
              <div>
                <label className="text-sm text-zinc-400">Address</label>
                <p className="text-zinc-500 text-sm">Not specified</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700">
        <h3 className="font-semibold mb-4 text-lg">Emergency Contacts</h3>
        <div className="text-zinc-400">
          <p className="mb-4">
            Emergency contact information will be maintained here for safety
            purposes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Primary Contact</label>
              <p className="text-zinc-500 text-sm">Not specified</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-zinc-400">Secondary Contact</label>
              <p className="text-zinc-500 text-sm">Not specified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateInfo;
