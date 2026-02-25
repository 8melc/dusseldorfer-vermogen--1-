import React from "react";
import { UserGuard } from "app";

export interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  // Use the UserGuard component from the Firebase Auth Extension
  // This handles authentication state, loading, and redirects
  return <UserGuard>{children}</UserGuard>;
}
