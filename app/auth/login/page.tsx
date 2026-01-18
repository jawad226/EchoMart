"use client";
import React, { useState } from "react";
import { MdHome } from "react-icons/md";
import { Eye, EyeOff } from "lucide-react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://looks-shop-backend-production-176a.up.railway.app"}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) toast.error(data.message || "Login failed.");
      else {
        login(data.access_token, data.user);
        if (data.user.role === "admin") {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 w-full max-w-md bg-white rounded-3xl shadow-xl">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8 relative">
          <img src="/logo.png" alt="EchoMart Logo" className="w-24 h-18 object-contain" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-1 text-center">Welcome Back</h1>
        <p className="text-gray-500 text-sm text-center mb-6">Log in to continue shopping</p>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border p-3 rounded-xl"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="border p-3 rounded-xl w-full pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>



          <button
            type="submit"
            disabled={loading}
            className="bg-blue-800 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          <div className="relative flex items-center justify-center my-4">
            <div className="border-t w-full border-gray-200"></div>
            <span className="bg-white px-3 text-xs text-gray-500 font-medium">Or continue with</span>
            <div className="border-t w-full border-gray-200"></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button type="button" onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_API_URL || "https://looks-shop-backend-production-176a.up.railway.app"}/auth/google`} className="flex items-center justify-center gap-2 p-2.5 border rounded-xl hover:bg-gray-50 transition-all text-gray-700 font-medium text-sm">
              <FaGoogle className="text-red-500 text-lg" /> Google
            </button>
            <button type="button" onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_API_URL || "https://looks-shop-backend-production-176a.up.railway.app"}/auth/facebook`} className="flex items-center justify-center gap-2 p-2.5 border rounded-xl hover:bg-gray-50 transition-all text-gray-700 font-medium text-sm">
              <FaFacebook className="text-blue-600 text-lg" /> Facebook
            </button>
          </div>

          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <label>
              <input type="checkbox" className="accent-red-500" /> Remember me
            </label>
            <Link href="/auth/forgetpassword" className="text-blue-800 hover:underline">
              Forget Password?
            </Link>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-blue-800 font-medium hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
