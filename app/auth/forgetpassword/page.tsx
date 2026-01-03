"use client";
import React, { useState } from "react";
import { MdHome } from "react-icons/md";
import Link from "next/link";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return alert("Email is required");

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://looks-shop-backend-production.up.railway.app"}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) return alert(data.message || "Something went wrong");
      alert("Reset link sent to your email");
      setEmail("");
    } catch (err) {
      alert("Server error");
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

        <h1 className="text-3xl font-bold text-gray-800 mb-1 text-center">Forget Password</h1>
        <p className="text-gray-500 text-sm text-center mb-6">Enter your email to reset your password</p>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-3 rounded-xl" />
          <button type="submit" disabled={loading} className="bg-blue-800 text-white py-3 rounded-xl font-semibold disabled:opacity-50">
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Remembered your password?{" "}
            <Link href="/auth/login" className="text-blue-800 font-medium hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
