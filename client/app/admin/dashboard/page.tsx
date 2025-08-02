"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { AdminWrapper } from "../../../components/AuthWrapper";
import { useAuth } from "../../../hooks/useAuth";
import { useEffect, useState } from "react";
import Background from "@/components/ui/background";
import Header from "@/components/ui/header";
import {
  DashboardStatsSkeleton,
  LoadingSpinner,
} from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, TrendingUp, Settings } from "lucide-react";

function AdminDashboardContent() {
  const { user, isAuthenticated, isLoading, redirectBasedOnRole } = useAuth();
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    // Only redirect if the user is authenticated but not an admin
    if (isAuthenticated && user && user.role !== "admin-arats") {
      redirectBasedOnRole();
    }
  }, [isAuthenticated, user, redirectBasedOnRole]);

  useEffect(() => {
    // Simulate loading admin data
    const timer = setTimeout(() => {
      setIsLoadingData(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <>
      <Background />
      <Header />

      <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Welcome back, {user?.firstName || user?.email}! Manage your events
              and users.
            </p>
          </div>

          {/* Quick Stats */}
          {isLoadingData ? (
            <DashboardStatsSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Events
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">
                    +2 from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Users
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">
                    +12 from last week
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Registrations
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">342</div>
                  <p className="text-xs text-muted-foreground">
                    +23 from yesterday
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    System Status
                  </CardTitle>
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    Online
                  </div>
                  <p className="text-xs text-muted-foreground">
                    All systems operational
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Admin Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Manage Events</CardTitle>
                <CardDescription>
                  Create, edit, and manage event listings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Manage Events</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  View and manage user accounts and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  Manage Users
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>
                  View detailed analytics and reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
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
