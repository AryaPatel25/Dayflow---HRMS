import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { authAPI } from "../http/api.js";

const EmailVerification = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [canResend, setCanResend] = useState(true);
  const [countdown, setCountdown] = useState(0);

  const { user, checkAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.emailVerified) {
      navigate("/dashboard");
    }
  }, [user?.emailVerified, navigate]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await authAPI.verifyEmail(otp);
      if (response.success) {
        await checkAuth(); // Refresh user data
        navigate("/dashboard");
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;

    setResendLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await authAPI.sendVerifyOtp();
      if (response.success) {
        setMessage("OTP sent successfully!");
        setCanResend(false);
        setCountdown(60); // 60 seconds countdown
        setOtp("");
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-white font-sans flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-zinc-900 rounded-2xl border border-zinc-700 p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="size-16 mx-auto mb-4 rounded-full border border-zinc-700 flex justify-center items-center bg-zinc-800">
              <svg
                className="size-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 4.26c.3.15.7.15 1 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Verify Your Email
            </h1>
            <p className="text-zinc-400 text-sm">
              We've sent a 6-digit code to
              <br />
              <span className="text-blue-400 font-medium">{user?.email}</span>
            </p>
          </div>

          {/* OTP Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-zinc-300 mb-2"
              >
                Verification Code
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-center text-xl tracking-widest placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="000000"
                maxLength="6"
                disabled={loading}
              />
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-700 rounded-lg p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {message && (
              <div className="bg-green-900/20 border border-green-700 rounded-lg p-3">
                <p className="text-green-400 text-sm">{message}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
          </form>

          {/* Resend Section */}
          <div className="mt-6 text-center">
            <p className="text-zinc-400 text-sm mb-3">
              Didn't receive the code?
            </p>
            <button
              onClick={handleResendOtp}
              disabled={!canResend || resendLoading}
              className="text-blue-400 hover:text-blue-300 disabled:text-zinc-500 disabled:cursor-not-allowed text-sm font-medium transition-colors"
            >
              {resendLoading
                ? "Sending..."
                : canResend
                ? "Resend Code"
                : `Resend in ${countdown}s`}
            </button>
          </div>

          {/* Skip Option */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-zinc-400 hover:text-zinc-300 text-sm transition-colors"
            >
              Skip for Now →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
