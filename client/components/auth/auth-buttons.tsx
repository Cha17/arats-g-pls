"use client";

import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";

export function AuthButtons() {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="rounded-md bg-blue-950 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-pink-300 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
      {isAuthenticated ? (
        <LogoutLink>Log out</LogoutLink>
      ) : (
        <LoginLink postLoginRedirectURL="/api/auth/kinde_callback">
          Log in
        </LoginLink>
      )}
    </div>
  );
}
