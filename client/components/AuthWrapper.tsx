// client/components/AuthWrapper.tsx
"use client";

import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthWrapperProps {
  children: React.ReactNode;
  requiredRole?: "arats-user" | "admin-arats";
  redirectTo?: string;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({
  children,
  requiredRole,
  redirectTo = "/login",
}) => {
  const { isAuthenticated, isLoading, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    if (requiredRole && role !== requiredRole) {
      // Redirect based on actual role
      const redirectPath =
        role === "admin-arats" ? "/admin/dashboard" : "/user/dashboard";
      router.push(redirectPath);
    }
  }, [isAuthenticated, isLoading, role, requiredRole, router, redirectTo]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  if (requiredRole && role !== requiredRole) {
    return null; // Will redirect
  }

  return <>{children}</>;
};

// Role-specific wrapper components
export const AdminWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <AuthWrapper requiredRole="admin-arats">{children}</AuthWrapper>;

export const UserWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <AuthWrapper requiredRole="arats-user">{children}</AuthWrapper>;
