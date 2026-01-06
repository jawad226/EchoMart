"use client";
import React, { useState } from "react";
import { MdHome } from "react-icons/md";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://looks-shop-backend-production.up.railway.app"}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) setError(data.message || "Login failed.");
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

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-800 text-white py-3 rounded-xl font-semibold disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

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
