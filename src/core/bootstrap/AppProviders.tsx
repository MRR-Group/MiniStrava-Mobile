import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSessionStore } from "@/state/session.store";
import { AuthApi } from "@/infrastructure/api/auth.api";

const qc = new QueryClient();

export function AppProviders({ children }: { children: React.ReactNode }) {
  const hydrate = useSessionStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    const { token, user } = useSessionStore.getState();

    if (!token || user) return;

    AuthApi.me()
      .then((u) => useSessionStore.getState().setUser(u))
      .catch(() => useSessionStore.getState().clearSession());
  }, []);

  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}
