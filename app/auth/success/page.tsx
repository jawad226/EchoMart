"use client";

import { useEffect, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

const AuthSuccessContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

    const processing = useRef(false);

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
        if (processing.current) return;
        processing.current = true;

      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const user = {
            id: payload.sub,
            email: payload.email,
            role: payload.role,
            name: "User", // Placeholder until we fetch profile
        };
        
        login(token, user);
        toast.success("Successfully logged in via Social Account!");
        router.push(user.role === 'admin' ? '/dashboard' : '/');
      } catch (e) {
        toast.error("Failed to process login");
        router.push("/auth/login");
      }
    } else {
      router.push("/auth/login");
    }
  }, [searchParams, login, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

const AuthSuccess = () => {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>}>
      <AuthSuccessContent />
    </Suspense>
  );
};

export default AuthSuccess;
