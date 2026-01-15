import { AuthApi } from "@/infrastructure/api/auth.api";
import { useSessionStore } from "@/state/session.store";

export async function login(email: string, password: string) {
  const { token } = await AuthApi.login({ email, password });

  await useSessionStore.getState().setToken(token);

  const user = await AuthApi.me();
  await useSessionStore.getState().setUser(user);

  return user;
}
