"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { user, login } = useAuth();
  const router = useRouter();

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [picture, setPicture] = useState(user?.picture || "");
  const [loading, setLoading] = useState(false);

  // Redirect if not logged in
  if (!user) {
    if (typeof window !== "undefined") router.push("/auth/login");
    return null;
  }

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://looks-shop-backend-production-176a.up.railway.app"}/user/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name, picture })
      });

      if (res.ok) {
        // Update local context
        const updatedUser = { ...user, name, picture };
        // We reuse login to update the user state & storage
        login(token!, updatedUser);
        setEditMode(false);
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header / Cover */}
        <div className="bg-blue-800 h-32 w-full relative">
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
             {/* Avatar Display */}
             {picture ? (
                <img 
                  src={picture} 
                  alt={name} 
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md bg-white"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-4xl text-blue-600 font-bold border-4 border-white shadow-md">
                  {name.charAt(0).toUpperCase()}
                </div>
              )}
          </div>
        </div>

        <div className="pt-16 pb-8 px-8 text-center">
          {!editMode ? (
            <>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-500 text-sm mt-1">{user.email}</p>
              
              <button 
                onClick={() => setEditMode(true)}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full font-medium shadow hover:bg-blue-700 transition"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <div className="flex flex-col space-y-4 mt-2">
               <div className="text-left">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Profile Picture URL</label>
                  <input 
                    type="text" 
                    value={picture}
                    onChange={(e) => setPicture(e.target.value)}
                    placeholder="https://..."
                    className="w-full border p-2 rounded-lg mt-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <p className="text-[10px] text-gray-400 mt-1">Paste a URL for your avatar image.</p>
               </div>

               <div className="text-left">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Full Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border p-2 rounded-lg mt-1 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
               </div>

               <div className="flex gap-2 justify-center mt-4">
                 <button 
                   onClick={() => setEditMode(false)}
                   className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
                 >
                   Cancel
                 </button>
                 <button 
                   onClick={handleSave}
                   disabled={loading}
                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium disabled:opacity-50"
                 >
                   {loading ? "Saving..." : "Save Changes"}
                 </button>
               </div>
            </div>
          )}
        </div>

        {/* Info Grid */}
        {!editMode && (
          <div className="border-t border-gray-100 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Account Information</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Email</span>
                <span className="text-gray-900 font-medium">{user.email}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Role</span>
                <span className="text-gray-900 font-medium capitalize">{user.role}</span>
              </div>
               <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Member Since</span>
                <span className="text-gray-900 font-medium">Jan 2026</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
