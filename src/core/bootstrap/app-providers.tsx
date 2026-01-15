import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AuthUser } from "@/state/session.store";
import { useSessionStore } from "@/state/session.store";
import { AuthApi } from "@/infrastructure/api/auth.api";
import { initI18n } from "@/core/i18n/i18n";
import { useDb } from "@infra/db/use-db";
import { ConfirmProvider } from "@ui/confirm/confirm-context";
import { ensureLocationTaskDefined } from "@infra/device/location-tracker";

const qc = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 10_000,
    },
  },
});

type SessionState = ReturnType<typeof useSessionStore.getState>;

export function AppProviders({ children }: { children: React.ReactNode }) {
  const hydrate = useSessionStore((s: SessionState) => s.hydrate);
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

    if (!token) {
      return;
    }
    if (user) {
      return;
    }

    AuthApi.me()
      .then((u: AuthUser) => useSessionStore.getState().setUser(u))
      .catch(() => useSessionStore.getState().clearSession());
  }, []);

  useEffect(() => {
    const unsub = useSessionStore.subscribe((state: SessionState, prev: SessionState) => {
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
  );
}
