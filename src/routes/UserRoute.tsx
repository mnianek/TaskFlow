import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function UserRoute({ children }: ProtectedRouteProps) {
  // Sprawdzamy, czy użytkownik jest zalogowany na podstawie localStorage.
  // Obsługujemy oba możliwe klucze, żeby nie było problemu, jeśli gdzieś użyto innej nazwy.
  const storedUser =
    localStorage.getItem("taskflow_user") ??
    localStorage.getItem("taskflow-username");

  const isLoggedIn = !!storedUser;

  if (isLoggedIn) {
    // Jeśli użytkownik nie jest zalogowany, przekierowujemy go na /login
    return <Navigate to="/boards" replace />;
  }

  // Jeśli jest zalogowany, normalnie renderujemy dzieci (czyli stronę chronioną)
  return <>{children}</>;
}
