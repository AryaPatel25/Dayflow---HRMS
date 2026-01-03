import React from "react";

const PrivateInfo = () => {
  // Sample private info data - replace with actual data from API
  const privateInfoData = {
    dateOfBirth: "19-08-1998",
    residingAddress: "123, Main Street, City, Country",
    nationality: "Indian",
    personalEmail: "abc@example.com",
    gender: "Male",
    maritalStatus: "Single",
    dateOfJoining: "01-01-2020",
  };

  const bankDetails = {
    accountNumber: "1234567890",
    bankName: "ABC Bank",
    ifscCode: "ABCD0123456",
    panNo: "ABCDE1234F",
    uanNo: "123456789012",
    empCode: "EMP001",
  };

  return (
    <div className="p-10">
      <div className="grid grid-cols-2 gap-20">
        {/* Left Column - Personal Information */}
        <div className="space-y-8">
          <div className="space-y-2">
            <label className="text-lg block">Date of Birth</label>
            <input
              type="text"
              defaultValue={privateInfoData.dateOfBirth}
              className="w-full bg-transparent border-b border-zinc-600 pb-2 outline-none focus:border-zinc-400 transition"
              placeholder=""
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg block">Residing Address</label>
            <input
              type="text"
              defaultValue={privateInfoData.residingAddress}
              className="w-full bg-transparent border-b border-zinc-600 pb-2 outline-none focus:border-zinc-400 transition"
              placeholder=""
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg block">Nationality</label>
            <input
              type="text"
              defaultValue={privateInfoData.nationality}
              className="w-full bg-transparent border-b border-zinc-600 pb-2 outline-none focus:border-zinc-400 transition"
              placeholder=""
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg block">Personal Email</label>
            <input
              type="email"
              defaultValue={privateInfoData.personalEmail}
              className="w-full bg-transparent border-b border-zinc-600 pb-2 outline-none focus:border-zinc-400 transition"
              placeholder=""
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg block">Gender</label>
            <input
              type="text"
              defaultValue={privateInfoData.gender}
              className="w-full bg-transparent border-b border-zinc-600 pb-2 outline-none focus:border-zinc-400 transition"
              placeholder=""
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg block">Marital Status</label>
            <input
              type="text"
              defaultValue={privateInfoData.maritalStatus}
              className="w-full bg-transparent border-b border-zinc-600 pb-2 outline-none focus:border-zinc-400 transition"
              placeholder=""
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg block font-bold">Date of Joining</label>
            <input
              type="text"
              defaultValue={privateInfoData.dateOfJoining}
              className="w-full bg-transparent border-b border-zinc-600 pb-2 outline-none focus:border-zinc-400 transition"
              placeholder=""
            />
          </div>
        </div>

        {/* Right Column - Bank Details */}
        <div className="space-y-8">
          <h2 className="text-xl font-bold mb-6">Bank Details</h2>

          <div className="space-y-2">
            <label className="text-lg block">Account Number</label>
            <input
              type="text"
              defaultValue={bankDetails.accountNumber}
              className="w-full bg-transparent border-b border-zinc-600 pb-2 outline-none focus:border-zinc-400 transition"
              placeholder=""
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg block">Bank Name</label>
            <input
              type="text"
              defaultValue={bankDetails.bankName}
              className="w-full bg-transparent border-b border-zinc-600 pb-2 outline-none focus:border-zinc-400 transition"
              placeholder=""
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg block">IFSC Code</label>
            <input
              type="text"
              defaultValue={bankDetails.ifscCode}
              className="w-full bg-transparent border-b border-zinc-600 pb-2 outline-none focus:border-zinc-400 transition"
              placeholder=""
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg block">PAN No</label>
            <input
              type="text"
              defaultValue={bankDetails.panNo}
              className="w-full bg-transparent border-b border-zinc-600 pb-2 outline-none focus:border-zinc-400 transition"
              placeholder=""
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg block">UAN NO</label>
            <input
              type="text"
              defaultValue={bankDetails.uanNo}
              className="w-full bg-transparent border-b border-zinc-600 pb-2 outline-none focus:border-zinc-400 transition"
              placeholder=""
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg block">Emp Code</label>
            <input
              type="text"
              defaultValue={bankDetails.empCode}
              className="w-full bg-transparent border-b border-zinc-600 pb-2 outline-none focus:border-zinc-400 transition"
              placeholder=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateInfo;