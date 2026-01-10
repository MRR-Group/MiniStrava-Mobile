import { AuthApi } from "@/infrastructure/api/auth.api";
import { useSessionStore } from "@/state/session.store";

export async function logout() {
  try {
    await AuthApi.logout();
  } finally {
    await useSessionStore.getState().clearSession();
  }
}
