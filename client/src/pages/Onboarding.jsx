import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { userAPI, onboardingAPI } from "../http/api.js";

const Onboarding = () => {
  const [step, setStep] = useState("password"); // password, avatar, complete
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { user, checkAuth } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await userAPI.changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      if (response.success) {
        setStep("avatar");
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      setError("Please select an avatar image");
      return;
    }

    setLoading(true);
    setError("");

    const formDataToSend = new FormData();
    formDataToSend.append("avatar", selectedFile);

    try {
      const response = await onboardingAPI.complete(formDataToSend);

      if (response.success) {
        setStep("complete");
        await checkAuth(); // Refresh user data
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload avatar");
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-white font-sans flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-zinc-900 rounded-2xl border border-zinc-700 p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="size-16 mx-auto mb-4 rounded-full border border-zinc-700 flex justify-center items-center bg-zinc-800">
              <img
                src="https://res.cloudinary.com/ddbpvv06y/image/upload/v1764147032/vercel_as3pro.png"
                alt="DayFlow Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Welcome to DayFlow
            </h1>
            <p className="text-zinc-400 text-sm">
              {step === "password" && "Let's secure your account"}
              {step === "avatar" && "Upload your profile picture"}
              {step === "complete" && "Setup complete!"}
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div
                className={`w-3 h-3 rounded-full ${
                  step === "password" ? "bg-blue-600" : "bg-green-600"
                }`}
              ></div>
              <div
                className={`w-8 h-0.5 ${
                  step === "complete" ? "bg-green-600" : "bg-zinc-700"
                }`}
              ></div>
              <div
                className={`w-3 h-3 rounded-full ${
                  step === "avatar"
                    ? "bg-blue-600"
                    : step === "complete"
                    ? "bg-green-600"
                    : "bg-zinc-700"
                }`}
              ></div>
              <div
                className={`w-8 h-0.5 ${
                  step === "complete" ? "bg-green-600" : "bg-zinc-700"
                }`}
              ></div>
              <div
                className={`w-3 h-3 rounded-full ${
                  step === "complete" ? "bg-green-600" : "bg-zinc-700"
                }`}
              ></div>
            </div>
          </div>

          {/* Step 1: Password Change */}
          {step === "password" && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-white">
                  Change Your Password
                </h3>
                <p className="text-sm text-zinc-400 mt-1">
                  Create a secure password for your account
                </p>
              </div>

              <div>
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-zinc-300 mb-2"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Enter current password"
                  disabled={loading}
                />
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-zinc-300 mb-2"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Enter new password"
                  disabled={loading}
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-zinc-300 mb-2"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Confirm new password"
                  disabled={loading}
                />
              </div>

              {error && (
                <div className="bg-red-900/20 border border-red-700 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                {loading ? "Changing Password..." : "Change Password"}
              </button>
            </form>
          )}

          {/* Step 2: Avatar Upload */}
          {step === "avatar" && (
            <form onSubmit={handleAvatarSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-white">
                  Upload Profile Picture
                </h3>
                <p className="text-sm text-zinc-400 mt-1">
                  Add a profile picture to personalize your account
                </p>
              </div>

              <div className="text-center">
                <div className="size-32 mx-auto mb-4 rounded-full border border-zinc-700 flex justify-center items-center bg-zinc-800 overflow-hidden">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Avatar Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-zinc-500 text-4xl font-bold">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="file"
                    id="avatar"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={loading}
                  />
                  <label
                    htmlFor="avatar"
                    className="inline-block bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-medium py-2 px-4 rounded-lg cursor-pointer transition-colors"
                  >
                    Choose Image
                  </label>
                </div>
              </div>

              {error && (
                <div className="bg-red-900/20 border border-red-700 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setStep("complete")}
                  className="flex-1 bg-zinc-700 hover:bg-zinc-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  Skip for Now
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  {loading ? "Uploading..." : "Upload Avatar"}
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Complete */}
          {step === "complete" && (
            <div className="text-center space-y-6">
              <div className="size-16 mx-auto bg-green-600 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="size-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Setup Complete!
                </h3>
                <p className="text-sm text-zinc-400">
                  Welcome to DayFlow HRMS. Your account is ready to use.
                </p>
              </div>

              <button
                onClick={handleComplete}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Continue to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
