"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { AdminWrapper } from "../../../components/AuthWrapper";
import { useAuth } from "../../../hooks/useAuth";
import { useEffect } from "react";
import Background from "@/components/ui/background";
import Header from "@/components/ui/header";

function AdminDashboardContent() {
  const { user, isAuthenticated, isLoading, redirectBasedOnRole } = useAuth();

  useEffect(() => {
    // Auto-redirect authenticated users to their dashboard
    if (isAuthenticated && user) {
      redirectBasedOnRole();
    }
  }, [isAuthenticated, user, redirectBasedOnRole]);

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
  //       <div className="sm:mx-auto sm:w-full sm:max-w-md">
  //         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
  //           <div className="text-center">
  //             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
  //             <p className="text-gray-600">Loading...</p>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      <Background />
      <Header />
    </>
  );
}

export default function AdminDashboard() {
  return (
    <AdminWrapper>
      <AdminDashboardContent />
    </AdminWrapper>
  );
}
