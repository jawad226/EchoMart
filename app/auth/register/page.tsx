"use client";
import React, { useState } from "react";
import { MdHome } from "react-icons/md";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !phone || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://looks-shop-backend-production.up.railway.app"}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await res.json();

      if (!res.ok) setError(data.message || "Registration failed.");
      else {
        setSuccess("Account created successfully!");
        login(data.access_token, data.user);
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 w-full max-w-md bg-white rounded-3xl shadow-xl">
        {/* Logo */}
        <div className="flex items-center justify-start mb-8 relative">
          <span className="border-2 border-gray-700 p-3 bg-gray-200 rounded-full text-3xl text-gray-800">
            <MdHome />
          </span>
          <span className="absolute left-1/9 font-bold bg-gray-900 px-6 py-2 rounded-full text-white">
            Looks Shop
          </span>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-1 text-center">Create Account</h1>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="border p-3 rounded-xl" />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-3 rounded-xl" />
          <input type="tel" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} className="border p-3 rounded-xl" />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="border p-3 rounded-xl" />
          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="border p-3 rounded-xl" />

          <button type="submit" disabled={loading} className="bg-blue-800 text-white py-3 rounded-xl font-semibold disabled:opacity-50">
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-center text-sm text-gray-500 mt-4">
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
