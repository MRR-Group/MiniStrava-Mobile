import { create } from "zustand";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth.token";
const USER_KEY = "auth.user";

export type AuthUser = {
  id: number;
  email: string;
  name: string;

  first_name: string | null;
  last_name: string | null;
  birth_date: string | null;

  height: number | null;
  weight: number | null;

  avatar: string;
  created_at: string;
};

type SessionState = {
  token: string | null;
  user: AuthUser | null;
  hydrated: boolean;

  hydrate: () => Promise<void>;
  setToken: (token: string) => Promise<void>;
  setUser: (user: AuthUser) => Promise<void>;
  clearSession: () => Promise<void>;
};

export const useSessionStore = create<SessionState>((set) => ({
  token: null,
  user: null,
  hydrated: false,

  hydrate: async () => {
    const [token, userJson] = await Promise.all([
      SecureStore.getItemAsync(TOKEN_KEY),
      SecureStore.getItemAsync(USER_KEY),
    ]);

    const user = userJson ? (JSON.parse(userJson) as AuthUser) : null;
    set({ token: token ?? null, user, hydrated: true });
  },

  setToken: async (token) => {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    set({ token });
  },

  setUser: async (user) => {
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
    set({ user });
  },

  clearSession: async () => {
    await Promise.all([
      SecureStore.deleteItemAsync(TOKEN_KEY),
      SecureStore.deleteItemAsync(USER_KEY),
    ]);
    set({ token: null, user: null });
  },
}));
