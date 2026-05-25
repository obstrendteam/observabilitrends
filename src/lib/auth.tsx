/**
 * Auth-ready stub. Replace with real provider (Google/GitHub OAuth, Lovable Cloud, etc.)
 * Keeps the rest of the app provider-agnostic.
 */
import { createContext, useContext, useState, ReactNode } from "react";

export interface AuthUser { id: string; name: string; email: string; avatarUrl?: string; }
interface AuthCtx {
  user: AuthUser | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithGitHub: () => Promise<void>;
  signOut: () => Promise<void>;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user] = useState<AuthUser | null>(null);
  const value: AuthCtx = {
    user, loading: false,
    signInWithGoogle: async () => { /* TODO: integrate provider */ },
    signInWithGitHub: async () => { /* TODO: integrate provider */ },
    signOut: async () => { /* TODO: integrate provider */ },
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used within AuthProvider");
  return c;
}
