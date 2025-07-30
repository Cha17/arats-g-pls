"use client";

import { UserWrapper } from "../../../components/AuthWrapper";
import { useAuth } from "../../../hooks/useAuth";
import Background from "@/components/ui/background";
import Header from "@/components/ui/header";

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
      <Background />
      <Header />
    </>
  );
}
