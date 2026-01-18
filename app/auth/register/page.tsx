"use client";
import React, { useState } from "react";
import { MdHome } from "react-icons/md";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

const RegisterPage = () => {

  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    const nameRegex = /^[a-zA-Z\s]*$/;
    const phoneRegex = /^[0-9]*$/;

    if (!nameRegex.test(name)) {
      toast.error("Name must contain only alphabetic characters.");
      return;
    }

    if (!phoneRegex.test(phone)) {
      toast.error("Phone number must contain only numbers.");
      return;
    }

    if (phone.length !== 11) {
      toast.error("Phone number must be exactly 11 digits.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://looks-shop-backend-production-176a.up.railway.app"}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await res.json();

      if (!res.ok) toast.error(data.message || "Registration failed.");
      else {
        toast.success("Account created successfully!");
        setTimeout(() => {
          router.push("/auth/login");
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-3">
      <div className="p-5 w-full max-w-md bg-white rounded-2xl shadow-xl">
        {/* Logo */}
        {/* Logo */}
        <div className="flex items-center justify-center mb-4 relative">
          <img src="/logo.png" alt="EchoMart Logo" className="w-24 h-18 object-contain" />
        </div>

        <h1 className="text-xl font-bold text-gray-800 mb-2 text-center">Create Account</h1>

        <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>

          <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value.replace(/[^a-zA-Z\s]/g, ""))} className="border p-2 rounded-xl text-sm outline-none focus:ring-1 focus:ring-blue-800" />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 rounded-xl text-sm outline-none focus:ring-1 focus:ring-blue-800" />
          <input type="tel" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))} maxLength={11} className="border p-2 rounded-xl text-sm outline-none focus:ring-1 focus:ring-blue-800" />
          <div className="grid grid-cols-2 gap-2">
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="border p-2 rounded-xl w-full pr-8 text-sm outline-none focus:ring-1 focus:ring-blue-800"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className="border p-2 rounded-xl w-full pr-8 text-sm outline-none focus:ring-1 focus:ring-blue-800"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="bg-blue-800 text-white py-2 rounded-xl font-semibold text-sm disabled:opacity-50 mt-1">
            {loading ? "Registering..." : "Register"}
          </button>

          <div className="relative flex items-center justify-center my-2">
            <div className="border-t w-full border-gray-200"></div>
            <span className="bg-white px-3 text-xs text-gray-500 font-medium">Or join with</span>
            <div className="border-t w-full border-gray-200"></div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_API_URL || "https://looks-shop-backend-production-176a.up.railway.app"}/auth/google`} className="flex items-center justify-center gap-2 p-2 border rounded-xl hover:bg-gray-50 transition-all text-gray-700 font-medium text-xs">
              <FaGoogle className="text-red-500 text-lg" /> Google
            </button>
            <button type="button" onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_API_URL || "https://looks-shop-backend-production-176a.up.railway.app"}/auth/facebook`} className="flex items-center justify-center gap-2 p-2 border rounded-xl hover:bg-gray-50 transition-all text-gray-700 font-medium text-xs">
              <FaFacebook className="text-blue-600 text-lg" /> Facebook
            </button>
          </div>

          <p className="text-center text-xs text-gray-500 mt-2">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-800 font-medium hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
