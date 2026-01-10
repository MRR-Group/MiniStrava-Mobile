import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSessionStore } from "@/state/session.store";
import { AuthApi } from "@/infrastructure/api/auth.api";
import { initI18n } from "@/core/i18n/i18n";

const qc = new QueryClient();

export function AppProviders({ children }: { children: React.ReactNode }) {
  const hydrate = useSessionStore((s) => s.hydrate);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    initI18n().finally(() => setReady(true));
  }, []);

  useEffect(() => {
    const { token, user } = useSessionStore.getState();

    if (!token || user) return;

    AuthApi.me()
      .then((u) => useSessionStore.getState().setUser(u))
      .catch(() => useSessionStore.getState().clearSession());
  }, []);

  if (!ready) {
    return null;
  }
  
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}
