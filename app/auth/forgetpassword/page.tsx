"use client";
import React, { useState } from "react";
import { MdHome } from "react-icons/md";
import Link from "next/link";
import toast from "react-hot-toast";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required");

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://echomart-backend.onrender.com"}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) return toast.error(data.message || "Something went wrong");
      toast.success("Reset link sent to your email");
      setEmail("");
    } catch (err) {
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 w-full max-w-md bg-white rounded-3xl shadow-xl">
        <div className="flex items-center justify-center mb-8 relative">
          <img src="/logo.png" alt="EchoMart Logo" className="w-24 h-18 object-contain" />
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
