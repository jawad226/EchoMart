"use client";

import React, { FC } from "react";
import { MdHome } from "react-icons/md";

interface ResetPasswordProps {
  handleLogin: () => void;
}

const ResetPassword: FC<ResetPasswordProps> = ({ handleLogin }) => {
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

        {/* Heading */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">Reset Password</h1>
          <p className="text-gray-500 text-sm">
            Enter your new password to continue
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col space-y-4">
          <input
            type="password"
            placeholder="New Password"
            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-900 transition"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-900 transition"
          />

          <button
            type="submit"
            className="bg-blue-800 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-blue-900 transition"
          >
            Reset Password
          </button>

          {/* Login link */}
          <div className="text-center text-gray-500 text-sm">
            Remembered your password?{" "}
            <span
              className="text-blue-800 font-medium cursor-pointer hover:underline"
              onClick={handleLogin}
            >
              Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
