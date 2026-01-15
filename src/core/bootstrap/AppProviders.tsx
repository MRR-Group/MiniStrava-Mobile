import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSessionStore } from "@/state/session.store";
import { AuthApi } from "@/infrastructure/api/auth.api";
import { initI18n } from "@/core/i18n/i18n";
import { useDb } from "@infra/db/use-db";
import { ConfirmProvider } from "@ui/confirm/ConfirmContext";
import { ensureLocationTaskDefined } from "@infra/device/location-tracker";

const qc = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 10_000,
    },
  },
});

export function AppProviders({ children }: { children: React.ReactNode }) {
  const hydrate = useSessionStore((s) => s.hydrate);
  const [ready, setReady] = useState(false);
  
  useDb();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    initI18n().finally(() => setReady(true));
  }, []);

  useEffect(() => {
    ensureLocationTaskDefined();
  });

  useEffect(() => {
    const { token, user } = useSessionStore.getState();

    if (!token) return;
    // If we already have user from cache, don't force refresh; allow manual refresh on profile.
    if (user) return;

    AuthApi.me()
      .then((u) => useSessionStore.getState().setUser(u))
      .catch(() => useSessionStore.getState().clearSession());
  }, []);

  useEffect(() => {
    const unsub = useSessionStore.subscribe((state, prev) => {
      if (prev.token && !state.token) {
        qc.clear();
      }
    });
    return unsub;
  }, []);


  if (!ready) {
    return null;
  }
  
  return (
    <ConfirmProvider>
      <QueryClientProvider client={qc}>{children}</QueryClientProvider>
  </ConfirmProvider>
  )
}
