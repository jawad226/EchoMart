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

      // Instead of logging in directly, redirect to login page for "verification"
      router.push(`/auth/login?token=${token}&type=social`);
    } else {
      router.push("/auth/login");
    }
  }, [searchParams, router]);

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
