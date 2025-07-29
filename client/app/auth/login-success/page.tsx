// client/app/auth/login-success/page.tsx
"use client";

import { useAuth } from "../../../hooks/useAuth";
import { useEffect } from "react";

export default function LoginSuccessPage() {
  const { isAuthenticated, isLoading, redirectBasedOnRole } = useAuth();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      // Redirect user based on their role
      redirectBasedOnRole();
    }
  }, [isAuthenticated, isLoading, redirectBasedOnRole]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            Redirecting you to your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Login Successful!</h1>
        <p className="text-gray-600 mt-2">
          Redirecting you to your dashboard...
        </p>
      </div>
    </div>
  );
}
