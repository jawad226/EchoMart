"use client";

import React, { useState, useEffect } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { MdHome } from "react-icons/md";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: "login" | "register" | "forgot-password";
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialView = "login" }) => {
  const [view, setView] = useState<"login" | "register" | "forgot-password">(initialView);
  const { login } = useAuth();
  const router = useRouter();

  // Common Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  
  // Visibility States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Status States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (isOpen) {
      setView(initialView);
      setError("");
      setSuccess("");
    }
    
    // Prevent scrolling when modal is open
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, initialView]);

  const resetForm = () => {
    setError("");
    setSuccess("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setPhone("");
  };

  const handleLogin = async (e: React.FormEvent) => {
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
        onClose();
        if (data.user.role === "admin") router.push("/dashboard");
        else router.push("/");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
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
          onClose();
          router.push("/");
        }, 1500);
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return setError("Email is required");

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://looks-shop-backend-production.up.railway.app"}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.message || "Something went wrong");
      setSuccess("Reset link sent to your email");
      setEmail("");
    } catch (err) {
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-[450px] bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-8 relative">
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 p-1.5 rounded-full hover:bg-gray-100 transition-colors z-10"
          >
            <X size={20} className="text-gray-500" />
          </button>

          {/* Brand Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center justify-start relative w-fit mb-4">
              <span className="border-2 border-gray-700 p-2 bg-gray-200 rounded-full text-2xl text-gray-800">
                <MdHome />
              </span>
              <span className="absolute left-6 font-bold bg-gray-900 px-5 py-1.5 rounded-full text-white text-sm whitespace-nowrap">
                Looks Shop
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {view === "login" && "Welcome Back"}
              {view === "register" && "Create Account"}
              {view === "forgot-password" && "Reset Password"}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {view === "login" && "Log in to continue shopping"}
              {view === "register" && "Join us for a better experience"}
              {view === "forgot-password" && "Enter your email to get a reset link"}
            </p>
          </div>

          {/* Status Messages */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-red-500 text-sm text-center font-medium animate-in slide-in-from-top-2 duration-300">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-100 rounded-xl text-green-500 text-sm text-center font-medium animate-in slide-in-from-top-2 duration-300">
              {success}
            </div>
          )}

          {/* Forms */}
          <div className="space-y-4">
            {view === "login" && (
              <form onSubmit={handleLogin} className="flex flex-col space-y-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  required
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="border p-3 rounded-xl w-full pr-10 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-800 text-white py-3 rounded-xl font-semibold shadow-lg shadow-blue-100 hover:bg-blue-900 transition-all disabled:opacity-50"
                >
                  {loading ? "Logging in..." : "Log In"}
                </button>

                <div className="flex justify-between text-xs text-gray-500">
                  <label className="flex items-center gap-1.5 cursor-pointer hover:text-gray-700 transition-colors">
                    <input type="checkbox" className="accent-blue-800 rounded sm:w-4 sm:h-4 focus:ring-blue-800" /> Remember me
                  </label>
                  <button 
                    type="button"
                    onClick={() => { setView("forgot-password"); setError(""); }}
                    className="text-blue-800 hover:underline font-medium transition-all"
                  >
                    Forget Password?
                  </button>
                </div>

                <p className="text-center text-sm text-gray-500 pt-2">
                  Don't have an account?{" "}
                  <button 
                    type="button"
                    onClick={() => { setView("register"); resetForm(); }}
                    className="text-blue-800 font-bold hover:underline transition-all"
                  >
                    Register
                  </button>
                </p>
              </form>
            )}

            {view === "register" && (
              <form onSubmit={handleRegister} className="flex flex-col space-y-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  required
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="border p-3 rounded-xl w-full pr-10 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={confirmPassword && !showConfirmPassword ? "password" : "text"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="border p-3 rounded-xl w-full pr-10 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-800 text-white py-3 rounded-xl font-semibold mt-2 shadow-lg shadow-blue-100 hover:bg-blue-900 transition-all disabled:opacity-50"
                >
                  {loading ? "Creating Account..." : "Register"}
                </button>

                <p className="text-center text-sm text-gray-500 pt-2">
                  Already have an account?{" "}
                  <button 
                    type="button"
                    onClick={() => { setView("login"); resetForm(); }}
                    className="text-blue-800 font-bold hover:underline transition-all"
                  >
                    Login
                  </button>
                </p>
              </form>
            )}

            {view === "forgot-password" && (
              <form onSubmit={handleForgotPassword} className="flex flex-col space-y-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="border p-3 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-800 text-white py-3 rounded-xl font-semibold shadow-lg shadow-blue-100 hover:bg-blue-900 transition-all disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>

                <button 
                  type="button"
                  onClick={() => { setView("login"); setError(""); }}
                  className="text-center text-sm text-blue-800 font-medium hover:underline pt-2 transition-all"
                >
                  Back to Login
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
