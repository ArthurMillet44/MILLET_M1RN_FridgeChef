import type { ReactNode } from "react";
import { createContext, useContext } from "react";

type AuthContextValue = { userId: string };

const AuthContext = createContext<AuthContextValue>({ userId: "" });

// Fournit l'ID de l'utilisateur connecté à tous les composants enfants.
export function AuthProvider({
  userId,
  children,
}: {
  userId: string;
  children: ReactNode;
}) {
  return (
    <AuthContext.Provider value={{ userId }}>{children}</AuthContext.Provider>
  );
}

// Retourne l'ID de l'utilisateur connecté.
export function useAuth(): AuthContextValue {
  return useContext(AuthContext);
}
