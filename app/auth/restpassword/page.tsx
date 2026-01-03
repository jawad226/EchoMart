'use client';

import React, { useState, Suspense } from "react";
import { MdHome } from "react-icons/md";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export const dynamic = 'force-dynamic';


const ResetPasswordContent = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // token from URL

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validations
    if (!password || !confirmPassword) return alert("All fields are required");
    if (password !== confirmPassword) return alert("Passwords do not match");
    if (!token) return alert("Invalid or expired reset token");

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://looks-shop-backend-production.up.railway.app"}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }), // Match backend
      });

      const data = await res.json();

      if (!res.ok) return alert(data.message || "Failed to reset password");

      alert("Password reset successful. Please login.");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 w-full max-w-md bg-white rounded-3xl shadow-xl">
        <div className="flex items-center justify-start mb-8 relative">
          <span className="border-2 border-gray-700 p-3 bg-gray-200 rounded-full text-3xl text-gray-800">
            <MdHome />
          </span>
          <span className="absolute left-1/9 font-bold bg-gray-900 px-6 py-2 rounded-full text-white">
            Looks Shop
          </span>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-1 text-center">
          Reset Password
        </h1>
        <p className="text-gray-500 text-sm text-center mb-6">
          Enter your new password
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded-xl"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border p-3 rounded-xl"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-800 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Remembered your password?{" "}
            <Link
              href="/auth/login"
              className="text-blue-800 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-800"></div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
};

export default ResetPasswordPage;
