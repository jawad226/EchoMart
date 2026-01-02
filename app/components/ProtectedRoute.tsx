"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                router.push("/auth/login");
            } else if (allowedRoles && !allowedRoles.includes(user.role)) {
                router.push("/"); // Redirect unauthorized roles to home
            }
        }
    }, [user, isLoading, router, allowedRoles]);

    if (isLoading || !user || (allowedRoles && !allowedRoles.includes(user.role))) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;
