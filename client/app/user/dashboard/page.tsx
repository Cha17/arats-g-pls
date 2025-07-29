"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
// client/app/user/dashboard/page.tsx
import { UserWrapper } from "../../../components/AuthWrapper";
import { useAuth } from "../../../hooks/useAuth";

export default function UserDashboard() {
  return (
    <UserWrapper>
      <UserDashboardContent />
    </UserWrapper>
  );
}

function UserDashboardContent() {
  const { user } = useAuth();

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          User Dashboard
        </h1>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Welcome, {user?.firstName || "User"}!
          </h2>
          <p className="text-gray-600 mb-4">Email: {user?.email}</p>
          <p className="text-gray-600 mb-4">Role: {user?.role}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-900">Your Profile</h3>
              <p className="text-blue-700 text-sm mt-2">
                Manage your account settings
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-green-900">Your Data</h3>
              <p className="text-green-700 text-sm mt-2">
                View your personal data
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="font-semibold text-purple-900">Settings</h3>
              <p className="text-purple-700 text-sm mt-2">
                Configure your preferences
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <LogoutLink>Log out</LogoutLink>
        </div>
      </div>
    </>
  );
}
