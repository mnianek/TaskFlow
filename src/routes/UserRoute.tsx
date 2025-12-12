import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function UserRoute({ children }: ProtectedRouteProps) {
  const storedUser =
    localStorage.getItem("taskflow_user") ??
    localStorage.getItem("taskflow-username");

  const isLoggedIn = !!storedUser;

  if (isLoggedIn) {
    // Jeśli użytkownik jest zalogowany, przekierowujemy go na /boards
    return <Navigate to="/boards" replace />;
  }

  return <>{children}</>;
}
