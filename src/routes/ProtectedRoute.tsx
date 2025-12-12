import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const storedUser =
    localStorage.getItem("taskflow_user") ??
    localStorage.getItem("taskflow-username");

  const isLoggedIn = !!storedUser;

  if (!isLoggedIn) {
    // Jeśli użytkownik nie jest zalogowany, przekierowujemy go na /login
    return <Navigate to="/login" replace />;
  }

  // Jeśli jest zalogowany, normalnie renderujemy children
  return <>{children}</>;
}
