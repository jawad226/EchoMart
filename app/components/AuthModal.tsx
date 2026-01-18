"use client";

import React, { useState, useEffect } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


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

  useEffect(() => {
    if (isOpen) {
      setView(initialView);
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
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setPhone("");
  };

  const handleLogin = async (e: React.FormEvent) => {
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
        onClose();
        if (data.user.role === "admin") router.push("/dashboard");
        else router.push("/");
        toast.success("Logged in successfully!");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone || !password || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
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
        // Fix: Using correct property for token based on backend response, assuming standard or adjust if needed
        // If login expects specific structure, ensure data maps to it. 
        // Previous code used login(data.access_token, data.user)
        toast.success("Account created successfully!");
        login(data.access_token, data.user);
        setTimeout(() => {
          onClose();
          router.push("/");
        }, 1500);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return toast.error("Email is required");

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://looks-shop-backend-production-176a.up.railway.app"}/auth/forgot-password`, {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="p-5 relative">
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute right-6 top-6 p-1.5 rounded-full hover:bg-gray-100 transition-colors z-10"
          >
            <X size={20} className="text-gray-500" />
          </button>

          {/* Brand Header */}
          <div className="flex flex-col items-center mb-4">
            <div className="flex items-center justify-center relative w-fit">
              <img src="/logo.png" alt="EchoMart Logo" className="w-16 h-12 object-contain" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">
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

                <div className="relative flex items-center justify-center my-4">
                  <div className="border-t w-full border-gray-200"></div>
                  <span className="bg-white px-3 text-xs text-gray-500 font-medium">Or continue with</span>
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

                <div className="flex justify-between text-xs text-gray-500">
                  <label className="flex items-center gap-1.5 cursor-pointer hover:text-gray-700 transition-colors">
                    <input type="checkbox" className="accent-blue-800 rounded sm:w-4 sm:h-4 focus:ring-blue-800" /> Remember me
                  </label>
                  <button 
                    type="button"
                    onClick={() => { setView("forgot-password"); }}
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
              <form onSubmit={handleRegister} className="flex flex-col space-y-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={e => setName(e.target.value.replace(/[^a-zA-Z\s]/g, ""))}
                  className="border p-2 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                  required
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="border p-2 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={e => {
                    const value = e.target.value.replace(/\D/g, "").slice(0, 11);
                    setPhone(value);
                  }}
                  maxLength={11}
                  className="border p-2 rounded-xl focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                  required
                />
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="border p-2 rounded-xl w-full pr-8 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                      required
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
                      type={confirmPassword && !showConfirmPassword ? "password" : "text"}
                      placeholder="Confirm"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className="border p-2 rounded-xl w-full pr-8 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
                      required
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

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-800 text-white py-2 rounded-xl font-semibold mt-1 shadow-lg shadow-blue-100 hover:bg-blue-900 transition-all disabled:opacity-50 text-sm"
                >
                  {loading ? "Creating Account..." : "Register"}
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

                <p className="text-center text-xs text-gray-500 pt-1">
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
                  onClick={() => { setView("login"); }}
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
