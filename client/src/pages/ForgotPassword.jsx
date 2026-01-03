import React, { useState } from "react";
import { Link } from "react-router-dom";
import { authAPI } from "../http/api.js";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState("email"); // email, success

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await authAPI.forgotPassword(email);
      if (response.success) {
        setMessage("Password reset OTP sent to your email");
        setStep("success");
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
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
              Forgot Password
            </h1>
            <p className="text-zinc-400 text-sm">
              {step === "email"
                ? "Enter your email to reset your password"
                : "Check your email for reset instructions"}
            </p>
          </div>

          {step === "email" && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-zinc-300 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Enter your email address"
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
                {loading ? "Sending..." : "Send Reset Email"}
              </button>
            </form>
          )}

          {step === "success" && (
            <div className="text-center space-y-6">
              <div className="bg-green-900/20 border border-green-700 rounded-lg p-4">
                <p className="text-green-400 text-sm">{message}</p>
              </div>

              <div className="space-y-4">
                <p className="text-zinc-400 text-sm">
                  Check your email inbox and click the reset link to create a
                  new password.
                </p>

                <Link
                  to="/reset-password"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Enter Reset Code
                </Link>
              </div>
            </div>
          )}

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
